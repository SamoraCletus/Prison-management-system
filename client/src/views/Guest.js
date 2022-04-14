import { useQuery } from "@apollo/client";
import { FETCH_SIGNED_IN_GUEST_QUERY } from "assets/utils/queries/Queries";
import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, ModalHeader } from "reactstrap";
import { Loader, Modal } from "semantic-ui-react";
import { GuestModel } from "variables/Models";

function Guest() {
  const [modalSearch, setmodalSearch] = React.useState(false);
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  const { loading, data } = useQuery(FETCH_SIGNED_IN_GUEST_QUERY);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h4 className="title">Guests</h4>
              </CardHeader>
              <CardBody className="all-icons">
                <Row>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <Link to="/admin/addGuest">
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-double-left" />
                        <h4>Sign-In</h4>
                      </div>
                    </Link>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div
                      className="font-icon-detail"
                      onClick={toggleModalSearch}
                    >
                      <i className="tim-icons icon-double-right" />
                      <h4>Sign-Out</h4>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <Link to="/admin/allGuest">
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-paper" />
                        <h4>Guest Register</h4>
                      </div>
                    </Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        color="success"
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader style={{ background: "green", color: "white" }}>
          <span>Guest Signed Out Successfully</span>
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
      <Modal
        onClose={() => modalSearch(false)}
        onOpen={() => modalSearch(true)}
        open={data && modalSearch}
        size="fullscreen"
        style={{ background: "black" }}
      >
        <Modal.Content style={{ background: "#ffffff13", marginTop: "5%" }}>
          {loading ? (
            <Loader />
          ) : data && data?.getSignedInGuest.length > 0 ? (
            data.getSignedInGuest.map((guest) => (
              <GuestModel key={guest.id} guest={guest} />
            ))
          ) : (
            <>
              <h2>No Signed in Guest Available</h2>
            </>
          )}
        </Modal.Content>
      </Modal>
    </>
  );
}

export default Guest;
