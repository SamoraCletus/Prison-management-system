import React from "react";
import { Button, Loader } from "semantic-ui-react";
import { Card as StrapCard, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useQuery } from "@apollo/client";
import { FETCH_EXCONVICTS_QUERY } from "assets/utils/queries/Queries";
import Exconvicts from "variables/Models";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function AllExconvicts() {
  const { data, loading } = useQuery(FETCH_EXCONVICTS_QUERY);
  return (
    <div className="content">
      <StrapCard>
        <br />

        <Row>
          <Col className="pr-md-1" md="9">
            <CardHeader>
              <h4 className="title">ALL EXCONVICTS</h4>
            </CardHeader>
          </Col>
          <Col className="pr-md-1" md="3">
            <Link to="/admin/exconvictsreport">
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
          data.getExconvicts.map((exconvict) => (
            <Exconvicts key={exconvict.id} exconvict={exconvict} />
          ))
        )}
      </Row>
    </div>
  );
}

export default AllExconvicts;
