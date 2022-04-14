import React from "react";
import { Button, Loader } from "semantic-ui-react";
import { Card as StrapCard, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useQuery } from "@apollo/client";
import { FETCH_GUESTS_QUERY } from "assets/utils/queries/Queries";
import { GuestModel } from "variables/Models";
import { GuestReport } from "variables/Reports";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import logo from "assets/img/emilyz.jpg";

function AllIGuest() {
  const { data, loading } = useQuery(FETCH_GUESTS_QUERY);

  return (
    <div className="content">
      <StrapCard>
        <br />
        <Row>
          <Col className="pr-md-1" md="9">
            <CardHeader>
              <h4 className="title">ALL GUESTS</h4>
            </CardHeader>
          </Col>
          <Col className="pr-md-1" md="3">
            <Link to="/admin/guestsreport">
              <Button color="blue" onClick="">
                <i className="tim-icons icon-upload" />
                Generate Report
              </Button>
            </Link>
          </Col>
        </Row>
        <br />
      </StrapCard>
      <Row>
        {loading ? (
          <Loader />
        ) : (
          data &&
          data.getGuests.map((guest) => (
            <GuestModel key={guest.id} guest={guest} />
          ))
        )}
      </Row>
    </div>
  );
}

export default AllIGuest;
