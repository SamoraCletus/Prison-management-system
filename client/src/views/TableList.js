import { useQuery } from "@apollo/react-hooks";
import { FETCH_GUESTS_QUERY } from "assets/utils/queries/Queries";
import { FETCH_INMATES_QUERY } from "assets/utils/queries/Queries";
import moment from "moment";
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import { Loader } from "semantic-ui-react";
export function GuestTable() {
  const { data, loading } = useQuery(FETCH_GUESTS_QUERY);
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Guests Table</CardTitle>
        <p className="category"></p>
      </CardHeader>
      <CardBody>
        <Table className="tablesorter" responsive>
          <thead className="text-primary">
            <tr>
              <th>Name</th>
              <th>Purpose</th>
              <th>Phone Number</th>
              <th>Inmate Name</th>
              <th className="text-center">Time of Visit</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? null
              : data &&
                data.getGuests.map((guest) => (
                  <tr key={guest.id}>
                    <td>{guest.name}</td>
                    <td>{guest.purpose}</td>
                    <td>{guest.phone}</td>
                    <td>{guest.inmateName}</td>
                    <td>{moment(guest.createdAt).calendar()}</td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
function Tables() {
  const { data, loading } = useQuery(FETCH_INMATES_QUERY, FETCH_GUESTS_QUERY);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Inmates Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Age</th>
                      <th>Crime</th>
                      <th className="text-center">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading
                      ? null
                      : data &&
                        data.getInmates.map((inmate) => (
                          <tr key={inmate.id}>
                            <td>{inmate.name}</td>
                            <td>{inmate.gender}</td>
                            <td>{inmate.age}</td>
                            <td>{inmate.crime}</td>
                            <td className="text-center">Good Health</td>
                          </tr>
                        ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <br />
          <br />
          <Col md="12">
            <GuestTable />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
