import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import { FETCH_EXCONVICTS_QUERY } from "assets/utils/queries/Queries";
import { ADD_EXCONVICT_MUTATION } from "assets/utils/queries/Queries";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample4,
} from "variables/charts.js";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_INMATES_QUERY } from "assets/utils/queries/Queries";

function Dashboard() {
  const [addExconvict] = useMutation(ADD_EXCONVICT_MUTATION, {
    refetchQueries: [
      { query: FETCH_EXCONVICTS_QUERY },
      { query: FETCH_INMATES_QUERY },
    ],
  });
  useEffect(() => {
    addExconvict();
  }, []);
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Total Visits</h5>
                    <CardTitle tag="h2">Guests</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Female
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Male
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total Inmates</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-single-02 text-info" /> 115
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total Exconvict</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-single-02 text-success" /> 93
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
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
                      <th className="text-center">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Amos Asuquo Eyoh</td>
                      <td>Male</td>
                      <td>22</td>
                      <td className="text-center">Good health</td>
                    </tr>
                    <tr>
                      <td>Akpan Moses Ini</td>
                      <td>Male</td>
                      <td>40</td>
                      <td className="text-center">Good health</td>
                    </tr>
                    <tr>
                      <td>Sandra Uduak Okon</td>
                      <td>Feale</td>
                      <td>29</td>
                      <td className="text-center">Sick</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
