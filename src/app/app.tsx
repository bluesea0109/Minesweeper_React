import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { newRound, initRound, updateMineSign } from "../feature/featureReducer";
import { RootState } from "../store";
import { Feature } from "../feature/feature";
import { useAppStyles, Item, lightTheme } from "./app.styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const App = () => {
  const dispatch = useDispatch();
  const classes = useAppStyles();
  const [showFail, setShowFail] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [level, setLevel] = useState(1);
  const [showMain, setShowMain] = useState(false);
  const [changeDifficulty, setChangeDifficulty] = useState(true);
  const [totalMineNumber, setTotalMineNumber] = useState<number>();
  const featureState = useSelector((state: RootState) => state.feature);

  useEffect(() => {
    dispatch(initRound());
  }, [dispatch]);

  /** Emoticon and Score showing function */
  useEffect(() => {
    if (featureState.message.includes("win")) {
      setShowWin(true);
      setShowFail(false);
    } else if (featureState.message.includes("lose")) {
      setShowWin(false);
      setShowFail(true);
    } else {
      setShowWin(false);
      setShowFail(false);
    }
  }, [featureState]);

  /** Select difficulty function */
  const onSelectDifficulty = (difficulty: any) => {
    dispatch(initRound());
    dispatch(newRound(`new ${difficulty}`));
    setLevel(difficulty);
    if (difficulty === 1) {
      setTotalMineNumber(15);
    } else if (difficulty === 2) {
      setTotalMineNumber(100);
    } else if (difficulty === 3) {
      setTotalMineNumber(700);
    } else if (difficulty === 4) {
      setTotalMineNumber(1000);
    }
    setChangeDifficulty(false);
    setShowMain(true);
  };

  /** Changing difficulty function */
  const onChangeDifficulty = () => {
    setShowFail(false);
    setShowWin(false);
    dispatch(initRound());
    setChangeDifficulty(true);
    setShowMain(false);
  };

  /** Restart game function */
  const onStartAgain = () => {
    setShowFail(false);
    setShowWin(false);
    dispatch(updateMineSign([]));
    dispatch(initRound());
    dispatch(newRound(`new ${level}`));
  };

  /** Modal actions */
  const handleClose = () => {
    setShowWin(false);
    setShowFail(false);
  };

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Modal
          open={showWin || showFail}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onBackdropClick={() => onStartAgain()}
        >
          <div className={classes.modal}>
            {showWin && <p className={classes.cong}>Congratulations !</p>}
            {showFail && <p className={classes.lose}>Failed !</p>}
            <Button variant="outlined" onClick={() => onStartAgain()}>
              OK
            </Button>
          </div>
        </Modal>
        <div className={classes.layout}>
          <Item elevation={2} className={classes.container}>
            {showMain && (
              <div className={classes.mineContainer}>
                <div className={classes.score}>
                  {featureState.mineSign.length} / {totalMineNumber}
                </div>
                <div className={classes.coverer}>
                  <Feature mapData={featureState.map} />
                </div>
              </div>
            )}
            {changeDifficulty && (
              <>
                <div className={classes.headText}>Minesweeper</div>
                <div className={classes.boxContainer}>
                  <Box
                    className={classes.boxes}
                    onClick={() => onSelectDifficulty(1)}
                  >
                    10 ✕ 10
                  </Box>
                  <Box
                    className={classes.boxes}
                    onClick={() => onSelectDifficulty(2)}
                  >
                    40 ✕ 20
                  </Box>
                  <Box
                    className={classes.boxes}
                    onClick={() => onSelectDifficulty(3)}
                  >
                    100 ✕ 50
                  </Box>
                  <Box
                    className={classes.boxes}
                    onClick={() => onSelectDifficulty(4)}
                  >
                    500 ✕ 50
                  </Box>
                </div>
              </>
            )}

            {!changeDifficulty && (
              <div className={classes.footer}>
                <div className={classes.buttonContainer}>
                  <div
                    className={classes.actionButtons}
                    onClick={() => onChangeDifficulty()}
                  >
                    Set difficulty
                  </div>
                  <div
                    className={classes.actionButtons}
                    onClick={() => onStartAgain()}
                  >
                    Start again
                  </div>
                </div>
              </div>
            )}
          </Item>
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
