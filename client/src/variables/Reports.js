import { useQuery } from "@apollo/client";
import React from "react";
import "variables/reports.css";
import { Row, Card, Button } from "reactstrap";
import { Image, Loader } from "semantic-ui-react";
import moment from "moment";
import { FETCH_GUESTS_QUERY } from "assets/utils/queries/Queries";
import Exconvicts, { GuestModel } from "./Models";
import { FETCH_INMATES_QUERY } from "assets/utils/queries/Queries";
import Inmate from "./InmateModel";
import { FETCH_EXCONVICTS_QUERY } from "assets/utils/queries/Queries";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// import { Button, Loader, Modal } from "semantic-ui-react";

export function GuestReport() {
  const { data, loading } = useQuery(FETCH_GUESTS_QUERY);
  function generateReport() {
    const report = document.getElementById("printArea");
    html2canvas(report).then((canvas) => {
      const dataURL = canvas.toDataURL();
      const pdf = new jsPDF();
      pdf.addImage(dataURL, "JPEG", 20, 20, 180, 160);
      pdf.autoPrint();
      pdf.save("GuestsReport.pdf");
    });
  }
  return (
    <>
      <div id="printArea">
        <div className="report">
          <Image
            className="post-img"
            size="small"
            src={require("assets/img/coa.png").default}
          />
          <h3>
            FEDERAL GOVERNMENT OF NIGERIA
            <h3>NIGERIAN CORRECTIONAL SERVICE, IKOT EKPENE </h3>
            <h3>{`GUESTS DATABASE AS AT ${moment().local()}`}</h3>
          </h3>
        </div>
        <Row>
          <Card>
            {loading ? (
              <Loader />
            ) : (
              data &&
              data.getGuests.map((guest) => (
                <GuestModel key={guest.id} guest={guest} />
              ))
            )}
          </Card>
          <Card style={{ textAlign: "center", padding: "10px" }}>
            <h4>{`Total Available Guest = ${data?.getGuests.length}`}</h4>
          </Card>
        </Row>
      </div>
      <Button color="blue" onClick={generateReport}>
        <i className="tim-icons icon-cloud-download-93" />
        Download Report
      </Button>
    </>
  );
}
export function InmateReport() {
  const { data, loading } = useQuery(FETCH_INMATES_QUERY);
  function generateReport() {
    const report = document.getElementById("printArea");
    html2canvas(report).then((canvas) => {
      const dataURL = canvas.toDataURL();
      const pdf = new jsPDF();
      pdf.addImage(dataURL, "JPEG", 20, 20, 180, 160);
      pdf.autoPrint();
      pdf.save("InmateReport.pdf");
    });
  }
  return (
    <>
      <div id="printArea">
        <div className="report">
          <Image
            className="post-img"
            size="small"
            src={require("assets/img/coa.png").default}
          />
          <h3>
            FEDERAL GOVERNMENT OF NIGERIA
            <h3>NIGERIAN CORRECTIONAL SERVICE, IKOT EKPENE </h3>
            <h3>{`INMATE DATABASE AS AT ${moment().local()}`}</h3>
          </h3>
        </div>
        <Row>
          <Card>
            {loading ? (
              <Loader />
            ) : (
              data &&
              data.getInmates.map((inmate) => (
                <Inmate key={inmate.id} inmate={inmate} />
              ))
            )}
          </Card>
          <Card style={{ textAlign: "center", padding: "10px" }}>
            <h4>{`Total Available Inmates = ${data?.getInmates.length}`}</h4>
          </Card>
        </Row>
      </div>
      <Button color="blue" onClick={generateReport}>
        <i className="tim-icons icon-cloud-download-93" />
        Download Report
      </Button>
    </>
  );
}
export function ExconvictReport() {
  const { data, loading } = useQuery(FETCH_EXCONVICTS_QUERY);
  function generateReport() {
    const report = document.getElementById("printArea");
    html2canvas(report).then((canvas) => {
      const dataURL = canvas.toDataURL();
      const pdf = new jsPDF();
      pdf.addImage(dataURL, "JPEG", 20, 20, 180, 160);
      pdf.autoPrint();
      pdf.save("ExconvictsReport.pdf");
    });
  }
  return (
    <>
      <div id="printArea">
        <div className="report">
          <Image
            className="post-img"
            size="small"
            src={require("assets/img/coa.png").default}
          />
          <h3>
            FEDERAL GOVERNMENT OF NIGERIA
            <h3>NIGERIAN CORRECTIONAL SERVICE, IKOT EKPENE </h3>
            <h3>{`EXCONVICTS DATABASE AS AT ${moment().local()}`}</h3>
          </h3>
        </div>
        <Row>
          <Card>
            {loading ? (
              <Loader />
            ) : (
              data &&
              data.getExconvicts.map((exconvict) => (
                <Exconvicts key={exconvict.id} exconvict={exconvict} />
              ))
            )}
          </Card>
          <Card style={{ textAlign: "center", padding: "10px" }}>
            <h4>{`Total Available Exconvict = ${data?.getExconvicts.length}`}</h4>
          </Card>
        </Row>
      </div>
      <Button color="blue" onClick={generateReport}>
        <i className="tim-icons icon-cloud-download-93" />
        Download Report
      </Button>
    </>
  );
}
