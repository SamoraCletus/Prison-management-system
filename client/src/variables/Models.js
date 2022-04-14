import React from "react";
import { Button, Card } from "semantic-ui-react";
import { Row, Col, Modal, ModalHeader } from "reactstrap";
import moment from "moment";
import { useMutation } from "@apollo/client";
import {
  SIGN_OUT_GUEST,
  FETCH_SIGNED_IN_GUEST_QUERY,
} from "assets/utils/queries/Queries";

export function GuestModel({ guest }) {
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [signOutGuest] = useMutation(SIGN_OUT_GUEST, {
    onError(err) {
      console.log(err);
    },
    update() {
      setmodalSearch(!modalSearch);
    },
    variables: {
      name: guest.name,
    },

    refetchQueries: [{ query: FETCH_SIGNED_IN_GUEST_QUERY }],
  });
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  return (
    <>
      <Col className="pr-md-1" md="12">
        <Card style={{ background: "#ffffff13" }} fluid>
          <Card.Content>
            <Row>
              <Col className="pr-md-1" md="10">
                <h4 style={{ textDecoration: "underline" }}>GUEST DETAILS</h4>
                <p>
                  Name: <b>{guest.name}</b>
                </p>
                <p>
                  Phone Number: <b>{guest.phone}</b>
                </p>
                <p>
                  Visited: <b>{guest.inmateName}</b>
                </p>
                <p>
                  Signed-In At: <b>{moment(guest.createdAt).calendar()}</b>
                </p>
                <p>
                  Purpose Of Visit: <b>{guest.purpose}</b>
                </p>
              </Col>
              {guest.signedOut ? null : (
                <Col className="pr-md-1" md="2">
                  <Button
                    color="teal"
                    content="Sign-Out"
                    onClick={signOutGuest}
                  />
                </Col>
              )}
            </Row>
          </Card.Content>
        </Card>
      </Col>
    </>
  );
}

export default function Exconvicts({ exconvict }) {
  return (
    <Col className="pr-md-1" md="12">
      <Card style={{ background: "#ffffff13" }} fluid>
        <Card.Content>
          <Row>
            <Col className="pr-md-1" md="2">
              <img alt="..." src={exconvict.profilePic} />
            </Col>
            <Col className="pr-md-1" md="5">
              <h4 style={{ textDecoration: "underline" }}>BASIC DETAILS</h4>
              <p>
                Name: <b>{exconvict.name}</b>
              </p>

              <p>
                Age: <b>{exconvict.age}</b>
              </p>
              <p>
                Gender: <b>{exconvict.gender}</b>
              </p>
              <p>
                Next Of Kin: <b>{exconvict.nextOfKin}</b>
              </p>
              <p>
                Next Of Kin Phone: <b>{exconvict.nextOfKinPhone}</b>
              </p>
              <p>
                State of Origin: <b>{exconvict.stateOfOrigin}</b>
              </p>
              <p>
                L.G.A: <b>{exconvict.LGA}</b>
              </p>
            </Col>
            <Col className="pl-md-1" md="5">
              <h4 style={{ textDecoration: "underline" }}>CRIMINAL DETAILS</h4>
              <p>
                Crime: <b>{exconvict.crime}</b>
              </p>
              <p>
                Court of Conviction: <b>{exconvict.courtOfConviction}</b>
              </p>
              <p>
                Address: <b>{exconvict.address}</b>
              </p>
              <p>
                Duration: <b>{exconvict.duration}</b> years
              </p>
              <p>
                Date of Release: <b>{exconvict.releaseDate}</b>
              </p>
              <p>
                Remarks: <b>{exconvict.remarks}</b>
              </p>
            </Col>
          </Row>
        </Card.Content>
      </Card>
    </Col>
  );
}
export function SingleExconvict({
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
}) {
  return (
    <Col className="pr-md-1" md="12">
      <Card style={{ background: "#ffffff13" }} fluid>
        <Card.Content>
          <Row>
            <Col className="pr-md-1" md="2">
              <img alt="..." src={require("assets/img/emilyz.jpg").default} />
            </Col>
            <Col className="pr-md-1" md="5">
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
          </Row>
        </Card.Content>
      </Card>
    </Col>
  );
}
