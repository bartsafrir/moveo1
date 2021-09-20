import React, { useState, useEffect, useRef, useReducer } from "react";
import { Container, Row, Col, Button, Input, ButtonGroup } from "reactstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import a1 from "../sounds/120_future_funk_beats_25.mp3";
import a2 from "../sounds/120_stutter_breakbeats_16.mp3";
import a3 from "../sounds/Bass Warwick heavy funk groove on E 120 BPM.mp3";
import a4 from "../sounds/electric guitar coutry slide 120bpm - B.mp3";
import a5 from "../sounds/FUD_120_StompySlosh.mp3";
import a6 from "../sounds/GrooveB_120bpm_Tanggu.mp3";
import a7 from "../sounds/MazePolitics_120_Perc.mp3";
import a8 from "../sounds/PAS3GROOVE1.03B.mp3";
import a9 from "../sounds/SilentStar_120_Em_OrganSynth.mp3";

function Game() {
  // Rendering a square
  const renderBox = (i, title = "") => {
    //return <Input type="checkbox" id={"box" + i} onClick={() => handleTick(i)} className="square" />;
    return (
      <div id={"box" + i} onClick={() => handleTick(i)} className="square">
        <b>{"" + title}</b>
      </div>
    );
  };

  // Handling a square tick
  const handleTick = (i) => {
    var element = document.getElementById("box" + i);
    element.classList.toggle("active");
    sounds.current[i].pause();
    sounds.current[i].currentTime = 0;
    const temp = matrix.current.slice();
    temp[i] = !temp[i];
    setMatrix(temp);
  };

  // Handling the on/off switch toggle
  const handleSwitch = (state) => {
    if (state) {
      setBars(bars + 1);
    } else {
      setBars(0);
    }
  };

  // Creating an array representing all squares states (active/inactive)

  const initialMatrix = Array(9).fill(false);
  const matrix = useRef(initialMatrix);

  const setMatrix = (n) => {
    matrix.current = n;
  };

  // Storing all audio objects
  const sounds = useRef([new Audio(a1), new Audio(a2), new Audio(a3), new Audio(a4), new Audio(a5), new Audio(a6), new Audio(a7), new Audio(a8), new Audio(a9)]);

  // Bars counter. 0 is music off.
  const [bars, setBars] = useState(0);

  // Record will be pushed to this array
  const recLog = useRef([]);

  // Bars counter for record playback
  const [recBars, setRecBars] = useState(0);

  // Is recording
  const isRec = useRef(false);

  // Is there a recording playback available
  const [playbackAvailable, setPlaybackAvailable] = useState(false);

  // Handling bar change (to next bar / off)
  useEffect(() => {
    let myTimeout;
    if (bars > 0) {
      if (isRec.current) {
        recLog.current.push(matrix.current);
      }
      matrix.current.forEach((item, index) => {
        if (item) {
          sounds.current[index].pause();
          sounds.current[index].currentTime = 0;
          sounds.current[index].play();
        }
      });
      myTimeout = setTimeout(() => {
        setBars(bars + 1);
      }, 8000);
      return () => {
        clearTimeout(myTimeout);
      };
    } else {
      clearTimeout(myTimeout);
      matrix.current.forEach((item, index) => {
        sounds.current[index].pause();
        sounds.current[index].currentTime = 0;
      });
    }
  }, [bars]);

  /*** RECORDING RELATED CODE ***/

  // Handling record button press
  const handleRec = () => {
    if (!isRec.current) {
      recLog.current = [];
      setPlaybackAvailable(false);
      document.getElementsByClassName("rec-label")[0].innerHTML = " stop";
    }
    isRec.current = !isRec.current;
    document.getElementsByClassName("rec-circle")[0].classList.toggle("active");
    if (!isRec.current) {
      if (recLog.current.length > 0) setPlaybackAvailable(true);
      document.getElementsByClassName("rec-label")[0].innerHTML = " record";
    }
  };

  // Handling play record button press
  const handlePlayRec = () => {
    setBars(0);
    if (recBars < 1) setRecBars(recBars + 1);
    else setRecBars(0);
  };

  // Handling record playback bar change
  useEffect(() => {
    let myTimeout;
    if (recBars > 0 && recBars <= recLog.current.length) {
      recLog.current[recBars - 1].forEach((item, index) => {
        if (item) {
          sounds.current[index].pause();
          sounds.current[index].currentTime = 0;
          sounds.current[index].play();
        }
      });
      myTimeout = setTimeout(() => {
        setRecBars(recBars + 1);
      }, 8000);
      return () => {
        clearTimeout(myTimeout);
      };
    } else {
      clearTimeout(myTimeout);
      setRecBars(0);
      sounds.current.forEach((item, index) => {
        sounds.current[index].pause();
        sounds.current[index].currentTime = 0;
      });
    }
  }, [recBars]);

  return (
    <Container className="game-container">
      <Row className="text-center pb-4">
        <Col>
          <h1>Loop Machine</h1>
        </Col>
      </Row>
      <Row className="text-center gx-3 gy-3 pb-4">
        <Col xs="4">{renderBox(0, "Future funk")}</Col>
        <Col xs="4">{renderBox(1, "Stutter break")}</Col>
        <Col xs="4">{renderBox(2, "Warwick bass")}</Col>
        <Col xs="4">{renderBox(3, "Electric guitar")}</Col>
        <Col xs="4">{renderBox(4, "Drums 1")}</Col>
        <Col xs="4">{renderBox(5, "Tanggu")}</Col>
        <Col xs="4">{renderBox(6, "Maze Politics")}</Col>
        <Col xs="4">{renderBox(7, "Drums 2")}</Col>
        <Col xs="4">{renderBox(8, "Organ Synth")}</Col>
      </Row>

      <Row>
        <Col xs="5">
          <ButtonGroup>
            <Button color="danger" onClick={() => handleRec()}>
              <div className="rec-circle align-middle">{""}</div>
              <span className="rec-label">{" record"}</span>
            </Button>
            {playbackAvailable ? (
              <Button color="dark" onClick={() => handlePlayRec()}>
                {recBars > 0 ? "stop" : "play"}
              </Button>
            ) : (
              ""
            )}
          </ButtonGroup>
        </Col>
        <Col className="text-center" xs="2">
          <BootstrapSwitchButton
            checked={bars !== 0}
            onstyle="success"
            offstyle="dark"
            onChange={(checked) => {
              handleSwitch(checked);
            }}
          />
        </Col>
        <Col className="text-end text-secondary credit" xs="5">
          &copy; 2021 Bar Tsafrir
        </Col>
      </Row>
    </Container>
  );
}

export default Game;
