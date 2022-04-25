import { websocketEvents } from "websocket-iterator";

import { Packet } from "./proto/matchmaking";

const PROTOCOL_VERSION = 0x0e;

export async function connect(
  peerConn: RTCPeerConnection,
  matchmakingConnectAddr: string,
  sessionID: string
) {
  const ws = new WebSocket(matchmakingConnectAddr);
  ws.binaryType = "arraybuffer";

  try {
    const events = websocketEvents(ws);
    await new Promise<void>((resolve, reject) => {
      ws.onopen = (_e) => {
        resolve();
      };
      ws.onerror = (e) => {
        reject(e);
      };
    });
    let isPolite = true;

    // eslint-disable-next-line no-console
    console.info("negotiation started");
    const offer = await peerConn.createOffer();
    await peerConn.setLocalDescription(offer);

    let txQueuingIceCandidates = true;
    const txIceCandidates: (RTCIceCandidateInit | null)[] = [];
    const flushTxIceCandidatesQueue = () => {
      ws.send(
        Packet.encode({
          start: undefined,
          offer: undefined,
          answer: undefined,
          iceCandidates: {
            iceCandidates: txIceCandidates
              .splice(0, txIceCandidates.length)
              .map((candidate) => JSON.stringify(candidate)),
          },
        }).finish()
      );
      txQueuingIceCandidates = false;
    };

    let rxQueuingIceCandidates = true;
    const rxIceCandidates: (RTCIceCandidateInit | null)[] = [];
    const flushRxIceCandidatesQueue = async () => {
      rxQueuingIceCandidates = false;
      for (const candidate of rxIceCandidates.splice(
        0,
        rxIceCandidates.length
      )) {
        if (candidate == null) {
          break;
        }
        await peerConn.addIceCandidate(candidate);
      }
    };

    let noMoreRxIceCandidates = false;
    let noMoreTxIceCandidates = false;

    peerConn.onicecandidate = ({ candidate }) => {
      txIceCandidates.push(candidate);
      if (candidate == null) {
        noMoreTxIceCandidates = true;
      }
      if (!txQueuingIceCandidates) {
        flushTxIceCandidatesQueue();
      }
      if (noMoreRxIceCandidates && noMoreTxIceCandidates) {
        if (txQueuingIceCandidates || rxQueuingIceCandidates) {
          throw "about to close signalling connection but ice candidates are still being queued?";
        }
        ws.close();
      }
    };

    ws.send(
      Packet.encode({
        start: {
          protocolVersion: PROTOCOL_VERSION,
          sessionId: sessionID,
          offerSdp: peerConn.localDescription!.sdp,
        },
        offer: undefined,
        answer: undefined,
        iceCandidates: undefined,
      }).finish()
    );

    // eslint-disable-next-line no-console
    console.info("negotiation start sent");

    for await (const { data } of events) {
      const packet = Packet.decode(new Uint8Array(data as ArrayBuffer));

      if (packet.start) {
        throw "unexpected start";
      } else if (packet.offer) {
        flushTxIceCandidatesQueue();

        // eslint-disable-next-line no-console
        console.info("received an offer, this is the polite side");
        await peerConn.setLocalDescription({ type: "rollback" });

        await peerConn.setRemoteDescription({
          type: "offer",
          sdp: packet.offer.sdp,
        });
        await flushRxIceCandidatesQueue();

        const answer = await peerConn.createAnswer();
        await peerConn.setLocalDescription(answer);

        ws.send(
          Packet.encode({
            start: undefined,
            offer: undefined,
            answer: {
              sdp: peerConn.localDescription!.sdp,
            },
            iceCandidates: undefined,
          }).finish()
        );
      } else if (packet.answer) {
        flushTxIceCandidatesQueue();

        // eslint-disable-next-line no-console
        console.info("received an answer, this is the impolite side");
        isPolite = false;

        await peerConn.setRemoteDescription({
          type: "answer",
          sdp: packet.answer.sdp,
        });
        await flushRxIceCandidatesQueue();
      } else if (packet.iceCandidates) {
        for (const raw of packet.iceCandidates.iceCandidates) {
          const candidate = JSON.parse(raw);
          if (candidate == null) {
            noMoreRxIceCandidates = true;
          }
          if (rxQueuingIceCandidates) {
            rxIceCandidates.push(candidate);
          } else {
            if (candidate != null) {
              await peerConn.addIceCandidate(candidate);
            }
          }
        }
      }

      if (noMoreRxIceCandidates && noMoreTxIceCandidates) {
        if (txQueuingIceCandidates || rxQueuingIceCandidates) {
          throw "about to close signalling connection but ice candidates are still being queued?";
        }
        break;
      }
    }

    return isPolite;
  } finally {
    ws.close();
  }
}
