import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 500,
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  companyHeadingBox: {
    textAlign: "center",
  },
  companyHeading: {
    fontSize: 22,
    fontWeight: 500,
    fontFamily: "Open Sans",
    color: "black",
  },
  taxHeading: {
    textAlign: "center",
    margin: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    fontSize: 25,
  },
  upperBox: {
    display: "flex",
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  addressBox: {
    display: "flex",
    flexDirection: "column",
    width: "33%",

    borderRight: "1px solid #e0e0e0",
    borderStyle: "dashed",
    // paddingLeft: 20,
    paddingRight: 15,
  },
  upperBoxMainHeading: {
    fontSize: 13,
    color: "black",
    marginBottom: 10,
    fontWeight: 500,
    fontFamily: "Open Sans",
    // textAlign: "left",
  },

  upperBoxText: {
    fontSize: 12,
    padding: 1,
  },

  companyDetailsBox: {
    display: "flex",
    flexDirection: "column",

    width: "37%",
    textAlign: "right",
    borderRight: "1px solid #e0e0e0",
    paddingRight: 20,
  },
  invoiceBox: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    width: "40%",
  },
  invoiceBoxText: {
    fontSize: 13,
    marginBottom: 10,
  },
  invoiceBoxTextOrder: {
    fontSize: 13,
    display: "flex",
    flexWrap: "wrap",
  },

  invoiceBoxView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  table: {
    paddingLeft: 15,
    paddingRight: 15,
  },

  tableFirstRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
    borderTop: "1px solid #e0e0e0",
    borderBottom: "1px solid #e0e0e0",
  },
  tableRemRow: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
  },
  tableFirstRowHeadings: {
    fontSize: 8,
    fontWeight: 500,
    fontFamily: "Open Sans",
  },
  tableFirstCol: {
    width: "38%",
    display: "flex",
    flexDirection: "row",
  },
  remTableFirstCol: {
    width: "40%",
    display: "flex",
    flexDirection: "row",
  },
  tableFirstColSN: {
    width: "15%",
  },
  remTableFirstColSN: {
    width: "15%",
  },

  tableFirstColName: {
    width: "85%",
  },
  remTableFirstColName: {
    width: "85%",
  },

  remTableText: {
    fontSize: 9,
  },
  remTableTextWithMarging: {
    fontSize: 9,
    marginLeft: 30,
  },
  productNameText: {
    fontSize: 9,
    fontWeight: 500,
    fontFamily: "Open Sans",
  },
  tableRemCol: {
    width: "62%",
    display: "flex",
    flexDirection: "row",
    // gap: "13px",
    justifyContent: "space-evenly",
  },
  remTableRemCol: {
    width: "60%",
    display: "flex",
    flexDirection: "row",

    justifyContent: "space-evenly",
    // backgroundColor: "red",
  },

  netTotalCol: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 20,
  },
  netTotalHiddenRow: {
    width: "60%",
    borderBottom: "1px solid #e0e0e0",
  },
  netTotalRow: {
    width: "40%",
    fontSize: 10,
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid black",
    justifyContent: "space-evenly",
    padding: 7,
    fontWeight: 500,
    fontFamily: "Open Sans",
    borderBottom: "1px solid #e0e0e0",
  },
});

const MyDocument = (props) => {
  const order = props.data;
  const unitPrice = Number(
    Number(order.orderPrice) - (Number(order.orderPrice) * 18) / 100
  ).toFixed(2);
  const tax18 = ((Number(order.orderPrice) * 18) / 100).toFixed(2);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.companyHeadingBox}>
          <Text style={styles.companyHeading}>FUSIONAVINYA. COM PVT LTD</Text>
        </View>
        <View style={styles.taxHeading}>
          <Text>TAX INVOICE</Text>
        </View>
        <View style={styles.upperBox}>
          <View style={styles.addressBox}>
            <Text style={styles.upperBoxMainHeading}>SHIPPING ADDRESS:</Text>
            <Text style={styles.upperBoxText}>{order.fullName}</Text>
            <Text style={styles.upperBoxText}>{order.addressLine1}</Text>

            <Text style={styles.upperBoxText}>{order.addressLine2}</Text>
            <Text style={styles.upperBoxText}>{order.contactNum}</Text>
            <Text style={styles.upperBoxText}>
              {order.city} - {order.cityPincode}
            </Text>
            <Text style={styles.upperBoxText}>
              {order.addressState}, {order.addressCountry}
            </Text>
          </View>
          <View style={styles.companyDetailsBox}>
            <Text style={styles.upperBoxMainHeading}>SOLD BY:</Text>
            <Text style={styles.upperBoxText}>FUSIONAVINYA. COM PVT LTD</Text>
            <Text style={styles.upperBoxText}>Banjarawala Chauwk</Text>
            <Text style={styles.upperBoxText}>
              {" "}
              Motthorawala Road near Agilus Lab
            </Text>{" "}
            <Text style={styles.upperBoxText}>Dehradun - 284001</Text>
            <Text style={styles.upperBoxText}>Uttarakhand, India</Text>
          </View>
          <View style={styles.invoiceBox}>
            <Text style={styles.upperBoxMainHeading}>INVOICE DETAILS:</Text>

            <View style={styles.invoiceBoxView}>
              <Text style={styles.invoiceBoxText}>Invoice No.</Text>
              <Text style={styles.upperBoxText}>
                : {order.paymentOrderId.split("_")[1]}
              </Text>
            </View>
            <View style={styles.invoiceBoxView}>
              <Text style={styles.invoiceBoxText}>Order Date</Text>
              <Text style={styles.upperBoxText}>
                : {order.day} {order.month}, {order.year}
              </Text>
            </View>
            <View style={styles.invoiceBoxView}>
              <Text style={styles.invoiceBoxText}>Order No.</Text>
              <Text style={styles.invoiceBoxTextOrder}></Text>
            </View>
            <View style={styles.invoiceBoxView}>
              {" "}
              <Text style={styles.invoiceBoxText}></Text>
              <Text style={styles.invoiceBoxTextOrder}>: {order.id}</Text>
            </View>

            <View style={styles.invoiceBoxView}>
              <Text style={styles.invoiceBoxText}>Method</Text>
              <Text style={styles.upperBoxText}>: {order.paymentMethod}</Text>
            </View>
          </View>
        </View>
        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableFirstRow}>
            <View style={styles.tableFirstCol}>
              <View style={styles.tableFirstColSN}>
                <Text style={styles.tableFirstRowHeadings}>S. NO.</Text>
              </View>
              <View style={styles.tableFirstColName}>
                <Text style={styles.tableFirstRowHeadings}>PRODUCT NAME</Text>
              </View>
            </View>
            <View style={styles.tableRemCol}>
              <Text style={styles.tableFirstRowHeadings}>QTY</Text>
              <Text style={styles.tableFirstRowHeadings}>UNIT PRICE</Text>
              <Text style={styles.tableFirstRowHeadings}>TAXABLE VALUE</Text>
              <Text style={styles.tableFirstRowHeadings}>CGST(9%)</Text>
              <Text style={styles.tableFirstRowHeadings}>SGST(9%)</Text>
              <Text style={styles.tableFirstRowHeadings}>TOTAL</Text>
            </View>
          </View>
          <View style={styles.tableRemRow}>
            <View style={styles.remTableFirstCol}>
              <View style={styles.remTableFirstColSN}>
                <Text style={styles.remTableText}>1</Text>
              </View>
              <View style={styles.remTableFirstColName}>
                <Text style={styles.productNameText}>{order.orderTitle}</Text>
                <Text style={styles.remTableText}>
                  Color: ({order.color}), Size : {order.size}
                </Text>
              </View>
            </View>
            <View style={styles.remTableRemCol}>
              <Text style={styles.remTableText}>1</Text>
              <Text style={styles.remTableTextWithMarging}>
                Rs. {unitPrice}
              </Text>
              <Text style={styles.remTableTextWithMarging}>{unitPrice}</Text>
              <Text style={styles.remTableTextWithMarging}>{tax18 / 2}</Text>
              <Text style={styles.remTableTextWithMarging}>{tax18 / 2}</Text>
              <Text style={styles.remTableTextWithMarging}>
                {order.orderPrice}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.netTotalCol}>
          <View style={styles.netTotalHiddenRow}></View>
          <View style={styles.netTotalRow}>
            <Text>NET TOTAL</Text>
            <Text>Rs . {order.orderPrice}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
