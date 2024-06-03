import React from "react";
import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";
import { formatDate } from "../../../../utils";
// import MLLogo from "../../../../../../frontend/src/ML-LOGO.png";
import MLLogo from "../../../../../src/ML-LOGO.png";

//function PrintMaterialDCTable() {

let headerFontSize = "13px";
let subheaderFontsize = "11px";
let fontSize = "9px";
const styles = StyleSheet.create({
  pageStyling: {
    padding: "2%",
    // paddingTop: "3%",
    fontSize: fontSize,
    fontFamily: "Helvetica",
  },
  globalPadding: { padding: "0.6%" },
  footerRowPadding: { padding: "3px" },
  // globalPadding: { padding: "0.6%" },
  fontBold: {
    //   fontWeight: "bold",
    fontSize: fontSize,
    fontFamily: "Helvetica-Bold",
  },

  insideBox: { borderBottom: "1px", padding: "0.6%" },
  page: {
    fontSize: 11,
    flexDirection: "column",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  topspace: {
    width: "100%",
    marginTop: "70px",
  },
  betweenspace: {
    width: "100%",
    marginTop: "20px",
  },
  titleFull: {
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "14px",
  },
  title1: {
    width: "100%",
    // fontWeight: "bold",
    // fontSize: "12px",
    // paddingLeft: "15px",
  },
  line1: {
    width: "100%",
    paddingLeft: "15px",
  },
  material: {
    width: "35%",
    marginLeft: "28px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  para: {
    width: "10%",
    marginLeft: "5px",
    marginTop: "10px",
    fontSize: 10,
    fontWeight: "bold",
  },
  emptyblock1: {
    width: "40%",
  },
  totalFinal: {
    // width: "25%",
    // marginLeft: "5px",
    marginTop: "13px",
    marginBottom: "10px",
    fontSize: 10,
  },

  qtyFinal: {
    width: "8%",
    marginLeft: "5px",
    marginTop: "13px",
    marginBottom: "10px",
    fontSize: 10,
  },

  weightFinal: {
    width: "8%",
    marginLeft: "15px",
    marginTop: "13px",
    marginBottom: "10px",
    fontSize: 10,
  },
});

//return <div>PrintMaterialDCTable</div>;
//}
const PrintReportFullStockListTable = (props) => (
  <Document>
    <Page size="A4" style={{ ...styles.pageStyling }}>
      {/* <View>
        <Text style={{ padding: "1%" }}></Text>
      </View> */}
      <View>
        {/* Top */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Image src={MLLogo} style={{ width: "8.3%" }} />
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                borderBottom: "1px",
                ...styles.fontBold,
                fontSize: headerFontSize,
              }}
            >
              Material Stock List as On : {formatDate(new Date(), 7)}
            </Text>

            <Text style={{ ...styles.fontBold, fontSize: subheaderFontsize }}>
              {props.PDFData.RegisteredName}
            </Text>
            <Text style={{ ...styles.fontBold }}>
              GST: {props.PDFData.GST_No} CIN: {props.PDFData.CIN_No}
            </Text>
            <Text>{props.PDFData.RegistredOfficeAddress}</Text>

            <Text>
              {props.PDFData.PhonePrimary}, {props.PDFData.PhoneSecondary},{" "}
              {props.PDFData.Email}, {props.PDFData.URL}
            </Text>
          </View>
          <Text style={{ padding: "3%" }}></Text>
        </View>
        <Text style={{ padding: "1%" }}></Text>
        <View style={{ border: "1px" }}>
          {/* Cust */}
          <View style={styles.insideBox}>
            <Text style={{ ...styles.fontBold }}>Customer Name:</Text>
            <View style={{ paddingLeft: "1%" }}>
              <Text style={{ ...styles.title1, ...styles.fontBold }}>
                {props.customerDetails.customerName}
              </Text>
              <Text style={styles.title1}>{props.customerDetails.address}</Text>
              <Text style={styles.title1}>{props.customerDetails.city}</Text>
            </View>
          </View>

          {/* material stock */}
          <View style={styles.insideBox}>
            <Text style={{ ...styles.title1, ...styles.fontBold }}>
              Material Stock Details
            </Text>

            {/*  */}

            {props.fullStockTable.map((item, index) => {
              return (
                <>
                  <View style={{ ...styles.insideBox }}>
                    <Text style={{ ...styles.title1, ...styles.fontBold }}>
                      {item.material}
                    </Text>
                    <View
                      style={{
                        ...styles.insideBox,
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: "0%",
                      }}
                    >
                      <Text style={{ ...styles.material, ...styles.fontBold }}>
                        Material
                      </Text>
                      <Text style={{ ...styles.para, ...styles.fontBold }}>
                        Para1
                      </Text>
                      <Text style={{ ...styles.para, ...styles.fontBold }}>
                        Para2
                      </Text>
                      <Text style={{ ...styles.para, ...styles.fontBold }}>
                        Qty
                      </Text>
                      <Text style={{ ...styles.para, ...styles.fontBold }}>
                        Weight
                      </Text>
                      <Text style={{ ...styles.para, ...styles.fontBold }}>
                        Status
                      </Text>
                    </View>

                    <View
                      style={{
                        ...styles.insideBox,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {item.data.map((item, index) => {
                        return (
                          <>
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <Text style={styles.material}>
                                {item.Mtrl_Code}
                              </Text>
                              <Text style={styles.para}>
                                {item.DynamicPara1}
                              </Text>
                              <Text style={styles.para}>
                                {item.DynamicPara2}
                              </Text>
                              <Text style={styles.para}>{item.Qty}</Text>
                              <Text style={styles.para}>{item.Weight}</Text>
                              <Text style={styles.para}>
                                {item.Locked !== 0 ? " Locked" : ""}
                              </Text>
                            </View>
                          </>
                        );
                      })}
                    </View>

                    {/* <Text style={styles.line1}>
                      _________________________________________________________________________________________
                    </Text> */}
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        // justifyContent: "flex-end",
                      }}
                    >
                      <Text style={styles.emptyblock1}></Text>
                      <Text
                        style={{ ...styles.totalFinal, ...styles.fontBold }}
                      >
                        Total Quantity and Weight :
                      </Text>
                      <Text style={styles.qtyFinal}>{item.totqty}</Text>
                      <Text style={styles.weightFinal}>
                        {item.totwt.toFixed(3)}
                      </Text>
                      {/* <Text style={styles.line1}>
                      _________________________________________________________________________________________
                    </Text> */}
                      <Text style={{ padding: "3.5%" }}></Text>
                    </View>
                  </View>
                </>
              );
            })}
            {/*  */}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PrintReportFullStockListTable;
