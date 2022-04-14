import React from "react";
import { Button, Loader } from "semantic-ui-react";
import { Card as StrapCard, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useQuery } from "@apollo/client";
import { FETCH_INMATES_QUERY } from "assets/utils/queries/Queries";
import Inmate from "variables/InmateModel";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function AllInmates() {
  const { data, loading } = useQuery(FETCH_INMATES_QUERY);

  return (
    <div className="content">
      <StrapCard>
        <br />

        <Row>
          <Col className="pr-md-1" md="9">
            <CardHeader>
              <h4 className="title">ALL INMATES</h4>
            </CardHeader>
          </Col>
          <Col className="pr-md-1" md="3">
            <Link to="/admin/inmatesreport">
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
          data.getInmates.map((inmate) => (
            <Inmate key={inmate.id} inmate={inmate} />
          ))
        )}
      </Row>
    </div>
  );
}

export default AllInmates;
