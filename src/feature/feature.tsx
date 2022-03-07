import { SocketEnd } from "../socketConnection/socketConfig";
import { useFeatureStyles } from "./feature.styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { updateMineSign } from "./featureReducer";

interface Props {
  mapData: string[];
}

export const Feature = ({ mapData }: Props) => {
  const dispatch = useDispatch();
  const classes = useFeatureStyles();
  const featureState = useSelector((state: RootState) => state.feature);
  const mineSign = featureState.mineSign;

  /** Cell mouse left click event function */
  const onCellClick = (y: number, x: number, e: any) => {
    SocketEnd.socket.send(`open ${x} ${y}`);
  };

  /** Cell mouse right click event function */
  const onCellRightClick = (y: number, x: number, e: any) => {
    e.preventDefault();
    if (featureState.message === "You lose") {
      return;
    } else if (mineSign.find((element: any) => element === `cell-${y}-${x}`)) {
      dispatch(
        updateMineSign(
          mineSign.filter((item: any) => !`cell-${y}-${x}`.includes(item)),
        ),
      );
    } else {
      dispatch(updateMineSign([...mineSign, `cell-${y}-${x}`]));
    }
  };

  const renderMap = (items: any) => {
    const level = items.length;
    const height = `calc((100vh - 300px) / ${level})`;

    return items.map((item: any, rowIndex: number) => {
      const squares = item.split("");
      const arrLength = squares.length;
      const row = squares.map((square: any, columnIndex: number) => {
        const key = `cell-${rowIndex}-${columnIndex}`;
        const testId = `cell-${rowIndex}-${columnIndex}`;
        if (square !== "□") {
          return (
            <div
              onClick={(e: any) => onCellClick(rowIndex, columnIndex, e)}
              key={key}
              onContextMenu={(e: any) => e.preventDefault()}
              className={classes.cell}
              style={{
                height: height,
                width: height,
                backgroundColor: "#e6e6e6",
              }}
              data-testid={testId}
            >
              {square && square !== "0" && (
                <p
                  className={classes.text}
                  style={{
                    lineHeight: height,
                    fontSize: arrLength !== 100 || arrLength !== 500 ? 18 : 10,
                  }}
                >
                  {square}
                </p>
              )}
            </div>
          );
        }

        return (
          <div
            onClick={(e: any) =>
              !mineSign.find((element) => element === key) &&
              onCellClick(rowIndex, columnIndex, e)
            }
            key={key}
            onContextMenu={(e: any) =>
              onCellRightClick(rowIndex, columnIndex, e)
            }
            className={classes.cell}
            style={{
              height: height,
              width: height,
            }}
            data-testid={testId}
          >
            {mineSign.find((element) => element === key) && (
              <p
                style={{
                  lineHeight: height,
                  margin: 0,
                  fontSize: arrLength !== 100 || arrLength !== 500 ? 18 : 10,
                }}
              >
                💣
              </p>
            )}
          </div>
        );
      });

      return (
        <div className={classes.row} key={`cell-row-${rowIndex}`}>
          {row}
        </div>
      );
    });
  };

  return <>{renderMap(mapData)}</>;
};
