import React from "react";

import Box from "@mui/material/Box";

import array2d from "../../array2d";
import * as bn6 from "../../saveedit/bn6";

const NAVICUST_COLORS = {
  red: {
    name: {
      en: "red",
      ja: "赤",
    },
    color: "#de1000",
    plusColor: "#bd0000",
  },
  pink: {
    name: {
      en: "pink",
      ja: "ピンク",
    },
    color: "#de8cc6",
    plusColor: "#bd6ba5",
  },
  yellow: {
    name: {
      en: "yellow",
      ja: "黄",
    },
    color: "#dede00",
    plusColor: "#bdbd00",
  },
  green: {
    name: {
      en: "green",
      ja: "緑",
    },
    color: "#18c600",
    plusColor: "#00a500",
  },
  blue: {
    name: {
      en: "blue",
      ja: "青",
    },
    color: "#2984de",
    plusColor: "#0860b8",
  },
  white: {
    name: {
      en: "white",
      ja: "白",
    },
    color: "#dedede",
    plusColor: "#bdbdbd",
  },
};

function placementsToArray2D(
  placements: {
    id: number;
    rot: number;
    row: number;
    col: number;
    compressed: boolean;
  }[]
) {
  const cust = array2d.full(-1, 7, 7);
  for (let idx = 0; idx < placements.length; ++idx) {
    const placement = placements[idx];
    const ncp = bn6.NCPS[placement.id]!;

    let squares = array2d.from(ncp.squares, 5, 5);
    for (let i = 0; i < placement.rot; ++i) {
      squares = array2d.rot90(squares);
    }

    for (let i = 0; i < squares.nrows; ++i) {
      for (let j = 0; j < squares.ncols; ++j) {
        const i2 = i + placement.row - 2;
        const j2 = j + placement.col - 2;
        if (i2 >= cust.nrows || j2 >= cust.ncols) {
          continue;
        }
        const v = squares[i * squares.ncols + j];
        if (v == 0) {
          continue;
        }
        if (placement.compressed && v != 1) {
          continue;
        }
        cust[i2 * cust.ncols + j2] = idx;
      }
    }
  }
  return cust;
}

const borderWidth = 4;
const borderColor = "#29314a";
const emptyColor = "#105284";

export default function NavicustViewer({ editor }: { editor: bn6.Editor }) {
  const placements = React.useMemo(() => {
    const placements = [];
    for (let i = 0; i < 30; i++) {
      const ncp = editor.getNavicustBlock(i);
      if (ncp == null) {
        continue;
      }
      placements.push(ncp);
    }
    return placements;
  }, [editor]);

  const grid = React.useMemo(() => {
    const grid = [];
    const arr2d = placementsToArray2D(placements);
    for (let row = 0; row < arr2d.nrows; row++) {
      grid.push(array2d.row(arr2d, row));
    }
    return grid;
  }, [placements]);

  const colors = React.useMemo(() => {
    const colors = [];
    for (const placement of placements) {
      const color = bn6.NCPS[placement.id]!.colors[placement.variant];
      if (colors.indexOf(color) != -1) {
        continue;
      }
      colors.push(color);
    }
    return colors;
  }, [placements]);

  return (
    <Box>
      <div>
        <div
          style={{
            padding: "20px",
            background: {
              falzar: "#E78C39",
              gregar: "#08BD73",
            }[editor.getGameInfo().version],
            display: "inline-block",
            borderRadius: "4px",
          }}
        >
          <div style={{ marginBottom: `${borderWidth * 2}px` }}>
            <table
              style={{
                display: "inline-block",
                background: borderColor,
                borderStyle: "solid",
                borderColor,
                borderWidth: `${borderWidth / 4}px`,
                borderSpacing: 0,
                borderCollapse: "separate",
              }}
            >
              <tbody>
                <tr>
                  {[...colors.slice(0, 4), null, null, null, null]
                    .slice(0, 4)
                    .map((color, i) => (
                      <td
                        key={i}
                        style={{
                          borderStyle: "solid",
                          borderColor,
                          borderWidth: `${borderWidth / 4}px`,
                        }}
                      >
                        <div
                          style={{
                            width: `${borderWidth * 6}px`,
                            height: `${borderWidth * 4}px`,
                            background:
                              color != null
                                ? NAVICUST_COLORS[
                                    color as keyof typeof NAVICUST_COLORS
                                  ].plusColor
                                : emptyColor,
                          }}
                        />
                      </td>
                    ))}
                </tr>
              </tbody>
            </table>
            <table
              style={{
                display: "inline-block",
                borderStyle: "solid",
                borderColor: "transparent",
                borderWidth: `${borderWidth / 4}px`,
                borderSpacing: 0,
                borderCollapse: "separate",
              }}
            >
              <tbody>
                <tr>
                  {colors.slice(4).map((color, i) => (
                    <td
                      key={i}
                      style={{
                        borderStyle: "solid",
                        borderColor: "transparent",
                        borderWidth: `${borderWidth / 4}px`,
                      }}
                    >
                      <div
                        style={{
                          width: `${borderWidth * 6}px`,
                          height: `${borderWidth * 4}px`,
                          background:
                            color != null
                              ? NAVICUST_COLORS[
                                  color as keyof typeof NAVICUST_COLORS
                                ].plusColor
                              : emptyColor,
                        }}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <table
                style={{
                  background: borderColor,
                  borderStyle: "solid",
                  borderColor,
                  borderWidth: `${borderWidth / 2}px`,
                  borderSpacing: 0,
                  borderCollapse: "separate",
                  borderRadius: "4px",
                }}
              >
                <tbody>
                  {grid.map((row, i) => (
                    <tr key={i}>
                      {row.map((placementIdx, j) => {
                        const placement =
                          placementIdx != -1 ? placements[placementIdx] : null;

                        const ncp =
                          placement != null ? bn6.NCPS[placement.id] : null;
                        const ncpColor =
                          ncp != null
                            ? NAVICUST_COLORS[
                                ncp.colors[
                                  placement!.variant
                                ] as keyof typeof NAVICUST_COLORS
                              ]
                            : null;

                        const background =
                          (i == 0 && j == 0) ||
                          (i == 0 && j == row.length - 1) ||
                          (i == grid.length - 1 && j == 0) ||
                          (i == grid.length - 1 && j == row.length - 1)
                            ? "transparent"
                            : ncpColor != null
                            ? ncp!.isSolid
                              ? ncpColor.color
                              : `conic-gradient(
                        from 90deg at ${borderWidth}px ${borderWidth}px,
                        ${ncpColor.color} 90deg,
                        ${ncpColor.plusColor} 0
                    )
                    calc(100% + ${borderWidth}px / 2) calc(100% + ${borderWidth}px / 2) /
                    calc(50% + ${borderWidth}px) calc(50% + ${borderWidth}px)`
                            : emptyColor;
                        return (
                          <td
                            style={{
                              borderColor: borderColor,
                              borderWidth: `${borderWidth / 2}px`,
                              borderStyle: "solid",
                              boxSizing: "border-box",
                              width: `${borderWidth * 9}px`,
                              height: `${borderWidth * 9}px`,
                              background,
                              opacity:
                                i == 0 ||
                                i == grid.length - 1 ||
                                j == 0 ||
                                j == row.length - 1
                                  ? 0.25
                                  : 1.0,
                            }}
                            key={j}
                          ></td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr
                style={{
                  top: `${borderWidth * 33}px`,
                  margin: 0,
                  padding: 0,
                  position: "absolute",
                  width: "100%",
                  borderColor,
                  borderLeftStyle: "none",
                  borderRightStyle: "none",
                  borderTopStyle: "none",
                  borderBottomStyle: "solid",
                  borderWidth: `${borderWidth}px`,
                }}
              />
              <hr
                style={{
                  bottom: `${borderWidth * 33}px`,
                  margin: 0,
                  padding: 0,
                  position: "absolute",
                  width: "100%",
                  borderColor,
                  borderLeftStyle: "none",
                  borderRightStyle: "none",
                  borderTopStyle: "solid",
                  borderBottomStyle: "none",
                  borderWidth: `${borderWidth}px`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
