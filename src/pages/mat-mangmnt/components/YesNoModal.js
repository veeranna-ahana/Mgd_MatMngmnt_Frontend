import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function YesNoModal(props) {
  let { show, setShow, message, modalResponse, resetState } = props;

  const resetModalState = () => {
    if (resetState) {
      resetState();
    }
  };

  const handleNo = () => {
    modalResponse("no");
    setShow(false);
    resetModalState();
  };
  const handleYes = () => {
    modalResponse("yes");
    setShow(false);
    resetModalState();
  };

  return (
    <>
      <Modal show={show} onHide={handleNo}>
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

export default YesNoModal;
