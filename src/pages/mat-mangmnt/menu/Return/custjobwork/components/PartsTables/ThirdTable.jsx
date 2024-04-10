import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";

import { FaArrowUp } from "react-icons/fa";

export default function ThirdTable(props) {
  function changeQTY(key, val) {
    // console.log("fdsffsfddsfadsfdafdsbv", key);
    let arr = [];
    for (let i = 0; i < props.thirdTableData.length; i++) {
      const element = props.thirdTableData[i];
      if (i === key) {
        element.QtyReturnedNew = val;
      }
      arr.push(element);
    }

    props.setThirdTableData(arr);
  }

  const sortedData = () => {
    let dataCopy = [...props.thirdTableData];

    if (props.sortConfigThird.key) {
      dataCopy.sort((a, b) => {
        if (
          !parseFloat(a[props.sortConfigThird.key]) ||
          !parseFloat(b[props.sortConfigThird.key])
        ) {
          // console.log("string");
          if (a[props.sortConfigThird.key] < b[props.sortConfigThird.key]) {
            return props.sortConfigThird.direction === "asc" ? -1 : 1;
          }
          if (a[props.sortConfigThird.key] > b[props.sortConfigThird.key]) {
            return props.sortConfigThird.direction === "asc" ? 1 : -1;
          }
          return 0;
        } else {
          // console.log("number");
          if (
            parseFloat(a[props.sortConfigThird.key]) <
            parseFloat(b[props.sortConfigThird.key])
          ) {
            return props.sortConfigThird.direction === "asc" ? -1 : 1;
          }
          if (
            parseFloat(a[props.sortConfigThird.key]) >
            parseFloat(b[props.sortConfigThird.key])
          ) {
            return props.sortConfigThird.direction === "asc" ? 1 : -1;
          }
          return 0;
        }
      });
    }

    return dataCopy;
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (
      props.sortConfigThird.key === key &&
      props.sortConfigThird.direction === "asc"
    ) {
      direction = "desc";
    }
    props.setSortConfigThird({ key, direction });
  };
  return (
    <>
      <Table
        hover
        condensed
        className="table-data border header-class table-striped"
      >
        <thead className="tableHeaderBGColor">
          <tr>
            <th>SL No</th>
            <th onClick={() => requestSort("PartIdNew")} className="cursor">
              Part ID
              <FaArrowUp
                className={
                  props.sortConfigThird.key === "PartIdNew"
                    ? props.sortConfigThird.direction === "desc"
                      ? "rotateClass"
                      : ""
                    : "displayNoneClass"
                }
              />
            </th>
            <th
              onClick={() => requestSort("QtyReturnedNew")}
              className="cursor"
            >
              Return
              <FaArrowUp
                className={
                  props.sortConfigThird.key === "QtyReturnedNew"
                    ? props.sortConfigThird.direction === "desc"
                      ? "rotateClass"
                      : ""
                    : "displayNoneClass"
                }
              />
            </th>
            <th onClick={() => requestSort("Remarks")} className="cursor">
              Remarks
              <FaArrowUp
                className={
                  props.sortConfigThird.key === "Remarks"
                    ? props.sortConfigThird.direction === "desc"
                      ? "rotateClass"
                      : ""
                    : "displayNoneClass"
                }
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData().map((val, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{val.PartIdNew}</td>
              <td>
                <input
                  type="number"
                  value={val.QtyReturnedNew}
                  min={"0"}
                  onChange={(e) => changeQTY(key, e.target.value)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                  }}
                />
                {/* {val.QtyReturnedNew} */}
              </td>
              <td>{val.Remarks}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
