import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
export default function SecondTable(props) {
  return (
    <>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor">
          <tr>
            <th>SL No</th>
            <th>Mtrl Stock ID</th>
            <th>Weight</th>
            <th>Scrap Weight</th>
            <th>RV ID</th>
          </tr>
        </thead>
        <tbody>
          {props.secondTableData.map((val, key) => (
            <tr
              onClick={() => props.selectRowSecondFun(val)}
              className={
                // checking if item exist then classname...rowSelectedClass else ''
                props.thirdTableData.some(
                  (el) => el.MtrlStockID === val.MtrlStockID
                )
                  ? "rowSelectedClass"
                  : ""
              }
              key={key}
            >
              <td>{key + 1}</td>
              <td>{val.MtrlStockID}</td>

              <td>{parseFloat(val.Weight).toFixed(2)}</td>
              <td>{parseFloat(val.ScrapWeight).toFixed(2)}</td>
              <td>{val.RVId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
