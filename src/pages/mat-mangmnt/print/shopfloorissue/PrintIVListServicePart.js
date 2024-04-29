import React, { Fragment, useState, useEffect } from "react";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import PrintIVListServicePartTable from "./PrintIVListServicePartTable";
import Modal from "react-bootstrap/Modal";

const { getRequest, postRequest } = require("../../../api/apiinstance");
const { endpoints } = require("../../../api/constants");

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

function PrintIVListServicePart({
  isOpen,
  formHeader,
  tableData,
  setIsPrintModalOpen,
}) {
  const [PDFData, setPDFData] = useState({});
  const [logoBase64, setLogoBase64] = useState(null);
  const location = useLocation();
  // console.log(
  //   "Second formheader = ",
  //   location?.state?.formHeader,
  //   " outdata = ",
  //   location?.state?.tableData
  // );

  const handleClose = () => {
    setIsPrintModalOpen(false);
  };

  function fetchPDFData() {
    let url1 = endpoints.getPDFData;
    getRequest(url1, async (res) => {
      // console.log("res", res);
      setPDFData(res[0]);
    });
  }

  useEffect(() => {
    fetchPDFData();
  }, []);

  useEffect(() => {
    fetchPDFData();
  }, []);

  return (
    <Modal show={isOpen} onHide={handleClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Assembly Parts Issue Voucher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Fragment>
          <PDFViewer width="1200" height="600" filename="IVListPart.pdf">
            <PrintIVListServicePartTable
              formHeader={formHeader}
              tableData={tableData}
              PDFData={PDFData}
            />
          </PDFViewer>
        </Fragment>
      </Modal.Body>
    </Modal>
  );
}

export default PrintIVListServicePart;
