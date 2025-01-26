import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net";
import { makeGetRequest } from "../api/request";

const ExportData = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    setStartDate(formattedDate);
    setEndDate(formattedDate);

    $("#productTable").DataTable(); // Initialize DataTable
    checkCookie();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const checkCookie = () => {
    const cookies = document.cookie.split(";");
    const isLoggedIn = cookies.some((cookie) =>
      cookie.trim().startsWith("credential=")
    );
    const isAdmin = cookies.some((cookie) =>
      cookie.trim().startsWith("isAdmin=true")
    );

    if (isLoggedIn) {
      document.getElementById("logoutLink").style.display = "block";
      document.getElementById("shownews").style.display = "none";
      if (isAdmin) {
        document.getElementById("adminControlLink").style.display = "block";
        document.getElementById("adminControlExport").style.display = "block";
        document.getElementById("shownews").style.display = "block";
      }
    } else {
      document.getElementById("loginLink").style.display = "block";
      document.getElementById("signupLink").style.display = "block";
    }
  };

  const exportData = () => {
    if (endDate < startDate) {
      alert("End date must be greater than or equal to the start date.");
      $("#productTable").DataTable().clear().draw();
      return;
    }

    const payload = { startDate, endDate };

    makeGetRequest("report", payload, exportHtml, handleError, true);
  };

  const exportHtml = (data) => {
    data = data.report;

    const dataTable = $("#productTable").DataTable();
    dataTable.clear().draw();

    data.forEach((product) => {
      dataTable.row
        .add([product.agencyName, product.newsTitle, product.clickCount])
        .draw(false);
    });

    dataTable.order([]).draw();
  };

  const exportPdf = () => {
    if (endDate < startDate) {
      alert("End date must be greater than or equal to the start date.");
      $("#productTable").DataTable().clear().draw();
      return;
    }

    const payload = { startDate, endDate };

    makeGetRequest("report", payload, makePdf, handleError, true);
  };

  const makePdf = (result) => {
    let reportContent = `<div class="container">
      <h1 class="text-center p-3 mb-4 bg-danger text-white">Generated Report</h1>
      <table class="table table-striped">
          <thead>
              <tr>
                  <th scope="col">Agency Name</th>
                  <th scope="col">News Title</th>
                  <th scope="col">Click Count</th>
              </tr>
          </thead>
          <tbody>`;

    result.report.forEach((entry) => {
      reportContent += `<tr>
          <td>${entry.agencyName}</td>
          <td>${entry.newsTitle}</td>
          <td>${entry.clickCount}</td>
      </tr>`;
    });

    reportContent += `</tbody></table></div>`;

    const pdf = new jsPDF();
    pdf.fromHTML(reportContent, 15, 15, { width: 170 });
    pdf.save("exported_report.pdf");
  };

  const handleError = () => {
    alert("Error while making the AJAX call.");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand mr-auto" href="NewsFeed.html">
            Newsforyou
          </a>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item" id="loginLink" style={{ display: "none" }}>
              <a className="nav-link" href="Login.html">
                Login
              </a>
            </li>
            <li className="nav-item" id="shownews" style={{ display: "block" }}>
              <a className="nav-link" href="NewsFeed.html">
                All News
              </a>
            </li>
            <li
              className="nav-item"
              id="adminControlLink"
              style={{ display: "none" }}>
              <a className="nav-link" href="Admin.html">
                Admin Control
              </a>
            </li>
            <li
              className="nav-item"
              id="adminControlExport"
              style={{ display: "none" }}>
              <a className="nav-link" href="Export.html">
                Export
              </a>
            </li>
            <li
              className="nav-item"
              id="logoutLink"
              style={{ display: "none" }}>
              <a
                className="nav-link"
                href="#"
                onClick={() => {
                  document.cookie =
                    "credential=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  document.cookie =
                    "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  window.location.href = "login.html";
                }}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-3">
        <div className="card p-3">
          <div className="card-body text-center">
            <div className="row g-3">
              <div className="col">
                <label>Start date</label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="col">
                <label>End date</label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-primary me-md-2"
              type="button"
              onClick={exportData}>
              Export
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={exportPdf}>
              Export to PDF
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <table
          id="productTable"
          className="table table-striped table-bordered"
          style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Agency Name</th>
              <th>News Title</th>
              <th>Click Count</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};

export default ExportData;
