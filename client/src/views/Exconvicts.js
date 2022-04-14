import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_EXCONVICT_QUERY } from "assets/utils/queries/Queries";
import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Modal as StrapModal,
  ModalHeader,
  Input,
} from "reactstrap";
import { Button, Loader, Modal } from "semantic-ui-react";
import { SingleExconvict } from "variables/Models";

function Exconvict() {
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [modal, setmodal] = React.useState(false);
  const [exconvictName, setExconvictName] = React.useState("");
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };

  const { data } = useQuery(FETCH_EXCONVICT_QUERY, {
    variables: {
      name: exconvictName,
    },
  });
  function onChange(e) {
    setmodal(!modal);
    setExconvictName(e.target.value);
  }
  let exconvictDetails;
  if (!data) {
    exconvictDetails = <Loader />;
  } else {
    const {
      name,
      age,
      address,
      duration,
      nextOfKin,
      crime,
      gender,
      releaseDate,
      courtOfConviction,
      stateOfOrigin,
      LGA,
      remarks,
    } = data.getExconvict;
    exconvictDetails = (
      <SingleExconvict
        name={name}
        age={age}
        address={address}
        duration={duration}
        crime={crime}
        gender={gender}
        nextOfKin={nextOfKin}
        releaseDate={releaseDate}
        courtOfConviction={courtOfConviction}
        stateOfOrigin={stateOfOrigin}
        LGA={LGA}
        remarks={remarks}
      />
    );
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h4 className="title">Exconvicts</h4>
              </CardHeader>
              <CardBody className="all-icons">
                <Row>
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
                      <i className="tim-icons icon-zoom-split" />
                      <h4>Search Exconvict</h4>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <Link to="/admin/allExconvict">
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-single-02" />
                        <h4>Get All Exconvicts</h4>
                      </div>
                    </Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <StrapModal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input
            placeholder="Enter Exconvict Name"
            type="text"
            onChange={onChange}
            name="exconvictName"
            value={exconvictName}
          />
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </StrapModal>
      <Modal
        onClose={() => modal(false)}
        onOpen={() => modal(true)}
        open={data && modal ? true : false}
        size="fullscreen"
        style={{ background: "black" }}
      >
        <Modal.Content style={{ background: "#ffffff13", marginTop: "3%" }}>
          {exconvictDetails}
          <br />
          <Button
            color="facebook"
            content="Close"
            onClick={(modal) => setmodal(!modal)}
          />
        </Modal.Content>
      </Modal>
    </>
  );
}

export default Exconvict;
