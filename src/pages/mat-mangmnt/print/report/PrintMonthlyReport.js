import React, { Fragment, useState, useEffect } from "react";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import PrintMaterialDCTable from "./PrintDailyReportReceiptTable";
import { useLocation } from "react-router-dom";
import PrintDailyReportReceiptTable from "./PrintDailyReportReceiptTable";
import PrintMonthlyTable from "./PrintMonthlyTable";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

import { postRequest } from "../../../api/apiinstance";
import { endpoints } from "../../../api/constants";
function PrintMonthlyReport(props) {
  const [PDFData, setPDFData] = useState({});

  const location = useLocation();
  // console.log(
  //   "date = ",
  //   location.state.date,
  //   " thirdTab = ",
  //   location.state.thirdTab,
  //   " fourthTab = ",
  //   location.state.fourthTab,
  //   " totalobj = ",
  //   location.state.totalobj,
  //   " purchaseDetails = ",
  //   location.state.purchaseDetails,
  //   " saleDetails = ",
  //   location.state.saleDetails
  // );

  const handleClose = () => props.setPrintReportOpen(false);

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
      const adjustment = "Monthly_Report";
      await axios.post(endpoints.pdfServer, { adjustment });

      const blob = await pdf(
        <PrintMonthlyTable
          date={props.date}
          thirdTab={props.thirdTab}
          fourthTab={props.fourthTab}
          totalobj={props.totalobj}
          purchaseDetails={props.purchaseDetails}
          saleDetails={props.saleDetails}
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
      <Modal show={props.printReportOpen} onHide={handleClose} fullscreen>
        <Modal.Header closeButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Modal.Title>Print Monthly Report</Modal.Title>
            <button className="button-style" onClick={savePdfToServer}>
              Save to Server
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <PrintMonthlyTable
                date={props.date}
                thirdTab={props.thirdTab}
                fourthTab={props.fourthTab}
                totalobj={props.totalobj}
                purchaseDetails={props.purchaseDetails}
                saleDetails={props.saleDetails}
                PDFData={PDFData}
              />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PrintMonthlyReport;
