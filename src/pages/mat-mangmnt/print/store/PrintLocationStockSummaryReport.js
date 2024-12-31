import React, { Fragment, useState, useEffect } from "react";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import PrintLocationStockDetailTableReport from "./PrintLocationStockDetailTableReport";
import PrintLocationStockSummaryTableReport from "./PrintLocationStockSummaryTableReport";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

import { postRequest } from "../../../api/apiinstance";
import { endpoints } from "../../../api/constants";

function PrintLocationStockSummaryReport(props) {
  const [PDFData, setPDFData] = useState({});

  const location = useLocation();
  // console.log(
  //   "formHeader = ",
  //   location?.state?.formHeader,
  //   " tabledata = ",
  //   location?.state?.tableData
  //   //" weight = ",
  //   //location.state.totalweight1
  // );

  const handleClose = () => props.setSummaryReportPrintOpen(false);

  function fetchPDFData() {
    postRequest(endpoints.getPDFData, {}, (res) => {
      setPDFData(res[0]);
    });
  }

  useEffect(() => {
    fetchPDFData();
  }, []);

  const savePdfToServer = async () => {
    try {
      const adjustment = "Location_Stock_Summary_Report";
      await axios.post(endpoints.pdfServer, { adjustment });

      const blob = await pdf(
        <PrintLocationStockSummaryTableReport
          formHeader={props.formHeader}
          tableData={props.tableData}
          PDFData={PDFData}
        />
      ).toBlob();

      const file = new File([blob], "GeneratedPDF.pdf", {
        type: "application/pdf",
      });

      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post(endpoints.savePdf, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("PDF saved successfully!");
      }
    } catch (error) {
      console.error("Error saving PDF to server:", error);
    }
  };

  return (
    <>
      <Modal
        show={props.summaryReportPrintOpen}
        onHide={handleClose}
        fullscreen
      >
        <Modal.Header closeButton>
         
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Modal.Title>Location Stock Summary Report</Modal.Title>
            <button className="button-style" onClick={savePdfToServer}>
              Save to Server
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <PrintLocationStockSummaryTableReport
                formHeader={props.formHeader}
                tableData={props.tableData}
                PDFData={PDFData}
              />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PrintLocationStockSummaryReport;
