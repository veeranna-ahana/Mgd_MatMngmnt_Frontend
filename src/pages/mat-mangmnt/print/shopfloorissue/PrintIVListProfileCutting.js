import React, { Fragment, useState, useEffect } from "react";
import { PDFViewer, StyleSheet, Image } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import PrintIVListProfileCuttingTable1 from "./PrintIVListProfileCuttingTable1";
import PrintIVListProfileCuttingTable2 from "./PrintIVListProfileCuttingTable2";
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
  logoImage: {
    width: "50px",
    // marginLeft: "10px",
  },
  companyInfo: {
    marginTop: "5px",
    marginLeft: "20%",
    width: "60%",
    fontSize: "9",
    alignSelf: "center",
  },
});

function PrintIVListProfileCutting({
  isOpen,
  formHeader,
  tableData,
  setIsPrintModalOpen,
  noDetails,
  combineSheets,
}) {
  const location = useLocation();
  // console.log(
  //   "Second formheader = ",
  //   location.state.formHeader,
  //   " outdata = ",
  //   location.state.tableData,
  //   " nodetails = ",
  //   location.state.noDetails
  // );

  const [PDFData, setPDFData] = useState({});

  const handleClose = () => {
    setIsPrintModalOpen(false);
  };
  // console.log("formHeader", formHeader);

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

  // console.log("PDFData", PDFData);

  return (
    <Modal show={isOpen} onHide={handleClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Material : Floor Issue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Fragment>
          <PDFViewer
            width="1200"
            height="600"
            filename="IVListProfileCutting.pdf"
          >
            {noDetails === 0 ? (
              <PrintIVListProfileCuttingTable1
                // formHeader={location.state.formHeader}
                // tableData={location.state.tableData}

                formHeader={formHeader}
                tableData={tableData}
                PDFData={PDFData}
              />
            ) : (
              <PrintIVListProfileCuttingTable2
                // formHeader={location.state.formHeader}
                // tableData={location.state.tableData}
                // combineSheets={location.state.combineSheets}

                formHeader={formHeader}
                tableData={tableData}
                combineSheets={combineSheets}
                PDFData={PDFData}
              />
            )}
          </PDFViewer>
        </Fragment>
      </Modal.Body>
    </Modal>
  );
}

export default PrintIVListProfileCutting;
