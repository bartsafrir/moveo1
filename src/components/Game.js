import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Input } from "reactstrap";
import a1 from "../sounds/120_future_funk_beats_25.mp3";
import a2 from "../sounds/120_stutter_breakbeats_16.mp3";
import a3 from "../sounds/Bass Warwick heavy funk groove on E 120 BPM.mp3";
import a4 from "../sounds/electric guitar coutry slide 120bpm - B.mp3";
import a5 from "../sounds/FUD_120_StompySlosh.mp3";
import a6 from "../sounds/GrooveB_120bpm_Tanggu.mp3";
import a7 from "../sounds/MazePolitics_120_Perc.mp3";
import a8 from "../sounds/PAS3GROOVE1.03B.mp3";
import a9 from "../sounds/SilentStar_120_Em_OrganSynth.mp3";

function Second() {
  const renderBox = (i) => {
    return <Input type="checkbox" id={"box" + i} onClick={() => handleTick(i)} />;
  };

  const handleTick = (i) => {
    sounds.current[i].pause();
    sounds.current[i].currentTime = 0;
    const temp = matrix.current.slice();
    temp[i] = !temp[i];
    setMatrix(temp);
  };

  const initialMatrix = Array(9).fill(false);
  const matrix = useRef(initialMatrix);

  const setMatrix = (n) => {
    matrix.current = n;
  };

  const sounds = useRef([new Audio(a1), new Audio(a2), new Audio(a3), new Audio(a4), new Audio(a5), new Audio(a6), new Audio(a7), new Audio(a8), new Audio(a9)]);
  const [bars, setBars] = useState(0);

  useEffect(() => {
    if (bars > 0) {
      console.log(matrix.current);
      matrix.current.forEach((item, index) => {
        if (item) {
          console.log(index);
          sounds.current[index].pause();
          sounds.current[index].currentTime = 0;
          sounds.current[index].play();
        }
      });
      setTimeout(() => setBars(bars + 1), 8000);
    }
  }, [bars]);

  return (
    <Container className="try">
      <Row className="text-center">
        <Col xs="4">{renderBox(0)}</Col>
        <Col xs="4">{renderBox(1)}</Col>
        <Col xs="4">{renderBox(2)}</Col>
        <Col xs="4">{renderBox(3)}</Col>
        <Col xs="4">{renderBox(4)}</Col>
        <Col xs="4">{renderBox(5)}</Col>
        <Col xs="4">{renderBox(6)}</Col>
        <Col xs="4">{renderBox(7)}</Col>
        <Col xs="4">{renderBox(8)}</Col>
      </Row>

      <Row>
        <Col>
          <Button color="primary" onClick={() => setBars(bars + 1)}>
            Start
          </Button>
        </Col>
        <Col>{matrix.current.join(",")}</Col>
      </Row>
    </Container>
  );
}

export default Second;
