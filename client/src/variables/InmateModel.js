import React from "react";
import { Card } from "semantic-ui-react";
import { Row, Col } from "reactstrap";

export default function Inmate({ inmate }) {
  return (
    <Col className="pr-md-1" md="12">
      <Card style={{ background: "#ffffff13" }} fluid>
        <Card.Content>
          <Row>
            <Col className="pr-md-1" md="2">
              <img alt="..." src={inmate.profilePic} />
            </Col>
            <Col className="pr-md-1" md="5">
              <h4 style={{ textDecoration: "underline" }}>BASIC DETAILS</h4>
              <p>
                Name: <b>{inmate.name}</b>
              </p>

              <p>
                Age: <b>{inmate.age}</b>
              </p>
              <p>
                Gender: <b>{inmate.gender}</b>
              </p>
              <p>
                Next Of Kin: <b>{inmate.nextOfKin}</b>
              </p>
              <p>
                Next Of Kin Phone: <b>{inmate.nextOfKinPhone}</b>
              </p>
              <p>
                State of Origin: <b>{inmate.stateOfOrigin}</b>
              </p>
              <p>
                L.G.A: <b>{inmate.LGA}</b>
              </p>
            </Col>
            <Col className="pl-md-1" md="5">
              <h4 style={{ textDecoration: "underline" }}>CRIMINAL DETAILS</h4>
              <p>
                Crime: <b>{inmate.crime}</b>
              </p>
              <p>
                Court of Conviction: <b>{inmate.courtOfConviction}</b>
              </p>
              <p>
                Address: <b>{inmate.address}</b>
              </p>
              <p>
                Duration: <b>{inmate.duration}</b> years
              </p>
              <p>
                Date of Release: <b>{inmate.releaseDate}</b>
              </p>
              <p>
                Remarks: <b>{inmate.remarks}</b>
              </p>
            </Col>
          </Row>
        </Card.Content>
      </Card>
    </Col>
  );
}
export function SingleInmate({
  name,
  profilePic,
  age,
  address,
  nextOfKin,
  remarks,
  nextOfKinPhone,
  duration,
  crime,
  gender,
  releaseDate,
  courtOfConviction,
  stateOfOrigin,
  LGA,
  editRemarks,
}) {
  return (
    <Col className="pr-md-1" md="12">
      <Card style={{ background: "#ffffff13" }} fluid>
        <Card.Content>
          <Row>
            <Col className="pr-md-1" md="2">
              <img alt="..." src={profilePic} />
            </Col>
            <Col className="pr-md-1" md="4">
              <h4 style={{ textDecoration: "underline" }}>BASIC DETAILS</h4>
              <p>
                Name: <b>{name}</b>
              </p>
              <p>
                Age: <b>{age}</b>
              </p>
              <p>
                Gender: <b>{gender}</b>
              </p>
              <p>
                Next Of Kin: <b>{nextOfKin}</b>
              </p>
              <p>
                Next Of Kin Phone: <b>{nextOfKinPhone}</b>
              </p>
              <p>
                State of Origin: <b>{stateOfOrigin}</b>
              </p>
              <p>
                L.G.A: <b>{LGA}</b>
              </p>
            </Col>
            <Col className="pl-md-1" md="5">
              <h4 style={{ textDecoration: "underline" }}>CRIMINAL DETAILS</h4>
              <p>
                Crime: <b>{crime}</b>
              </p>
              <p>
                Court of Conviction: <b>{courtOfConviction}</b>
              </p>
              <p>
                Address: <b>{address}</b>
              </p>
              <p>
                Duration: <b>{duration}</b> years
              </p>
              <p>
                Date of Release: <b>{releaseDate}</b>
              </p>
              <p>
                Remarks: <b>{remarks}</b>
              </p>
            </Col>
            <Col className="pl-md-1" md="1">
              <div className="font-icon-detail" onClick={editRemarks}>
                <i className="tim-icons icon-pencil" />
                <p>Edit</p>
              </div>
            </Col>
          </Row>
        </Card.Content>
      </Card>
    </Col>
  );
}
