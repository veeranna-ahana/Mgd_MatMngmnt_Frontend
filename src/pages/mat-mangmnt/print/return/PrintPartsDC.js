import React, { Fragment, useState, useEffect } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  pdf,
} from "@react-pdf/renderer";
import PrintMaterialDCTable from "./PrintMaterialDCTable";
import { useLocation } from "react-router-dom";
import PrintPartsDCTable from "./PrintPartsDCTable";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { postRequest } from "../../../api/apiinstance";
import { endpoints } from "../../../api/constants";
function PrintPartsDC(props) {
  const [PDFData, setPDFData] = useState({});

  const location = useLocation();
  // console.log(
  //   "Second formheader = ",
  //   location.state.formHeader,
  //   " outdata = ",
  //   location.state.outData,
  //   " custdata = ",
  //   location.state.custdata
  // );

  // console.log(" sum data...", location.state.outData[0].QtyReturned);
  // let sum = 0;

  let totalQTYVar = 0;
  // for (let i = 0; i < location.state.outData.length; i++) {
  //   const element = location.state.outData[i];
  //   console.log("element", element.QtyReturned);
  //   totalQTY = totalQTY + parseInt(element.QtyReturned);
  // }
  // console.log("totalQTY", totalQTY);
  // for (let i = 0; i < location.state.outData; i++) {
  //   sum = sum + location.state.outData[i].QtyReturned;
  //   console.log("summmmmmmmmmmm", sum);
  // }
  // console.log("total qty...", sum);

  for (let i = 0; i < props?.outData?.length; i++) {
    const element = props.outData[i];
    // console.log("element", element.QtyReturned);
    totalQTYVar = totalQTYVar + parseInt(element.QtyReturned);
  }
  // let totalQtyFunc = () => {
  //   return totalQTYVar;
  //   // console.log("totalQTY", totalQTY);
  //   // let sum = 0;
  //   // for (let i = 0; i < location.state.outData; i++) {
  //   //   sum = sum + location.state.outData[i].QtyReturned;
  //   // }
  //   // console.log("total qty...", sum);
  //   // return sum;
  // };

  // console.log("totalQTYVar", totalQTYVar);

  const handleClose = () => props.setPrintOpen(false);

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
      const adjustment = "PartDC";
      await axios.post(endpoints.pdfServer, { adjustment });

      const blob = await pdf(
        <PrintPartsDCTable
          //data={data}
          //selectedWeek={selectedWeek}
          //newData={newData}
          formHeader={props?.formHeader}
          outData={props?.outData}
          custdata={props?.custdata}
          dcRegister={props?.dcRegister}
          totalQTYVar={totalQTYVar}
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
      <Modal show={props.printOpen} onHide={handleClose} fullscreen>
        <Modal.Header closeButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Modal.Title>Outward Part Issue Voucher Print</Modal.Title>
            <button className="button-style" onClick={savePdfToServer}>
              Save to Server
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <PDFViewer
              width="1200"
              height="600"
              filename="OutwardPartIssueVoucher.pdf"
            >
              <PrintPartsDCTable
                //data={data}
                //selectedWeek={selectedWeek}
                //newData={newData}
                formHeader={props?.formHeader}
                outData={props?.outData}
                custdata={props?.custdata}
                dcRegister={props?.dcRegister}
                totalQTYVar={totalQTYVar}
                PDFData={PDFData}
              />
            </PDFViewer>
          </Fragment>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PrintPartsDC;
