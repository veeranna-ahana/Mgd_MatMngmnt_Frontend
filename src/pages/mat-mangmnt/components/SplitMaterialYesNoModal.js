import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function SplitMaterialYesNoModal(props) {
  let { show, setShow, message, modalResponse } = props;
  const handleNo = () => {
    modalResponse("no");
    setShow(false);
  };
  const handleYes = () => {
    modalResponse("yes");
    setShow(false);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleNo}
        style={{ backgroundColor: "#0000005e" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>Please Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "12px" }}>{message}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleYes}
            style={{ backgroundColor: " #2b3a55", fontSize: "12px" }}
          >
            Yes
          </Button>
          <Button
            variant="secondary"
            onClick={handleNo}
            style={{ fontSize: "12px" }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
