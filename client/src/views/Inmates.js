import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_INMATE_QUERY } from "assets/utils/queries/Queries";
import { Link } from "react-router-dom";
import { SingleInmate } from "variables/InmateModel";

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
import { useMutation } from "@apollo/react-hooks";
import { EDIT_REMARKS_MUTATION } from "assets/utils/queries/Queries";
import { FETCH_INMATES_QUERY } from "assets/utils/queries/Queries";

function Inmates() {
  const [modalSearch, setmodalSearch] = useState(false);
  const [modal, setmodal] = useState(false);
  const [errors, setErrors] = useState(false);
  const [remarksModal, setRemarksModal] = useState(false);
  const [inmateName, setInmateName] = useState("");
  const [remarks, setRemarks] = useState("");
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  const toggleRemarksModal = () => {
    setRemarksModal(!remarksModal);
  };
  const { data } = useQuery(FETCH_INMATE_QUERY, {
    variables: {
      name: inmateName,
    },
  });
  const [updateRemarks] = useMutation(EDIT_REMARKS_MUTATION, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    update() {
      setRemarksModal(!remarksModal);
    },
    variables: {
      name: inmateName,
      remarks,
    },
    refetchQueries: [{ query: FETCH_INMATES_QUERY }],
  });
  function onChange(e) {
    setmodal(!modal);
    setInmateName(e.target.value);
  }
  function editRemarks() {
    setRemarksModal(!remarksModal);
  }
  function editRemarksCallback() {
    updateRemarks();
    setRemarks("");
    toggleRemarksModal();
  }
  function onRemark(e) {
    setRemarks(e.target.value);
  }
  let inmateDetails;
  if (!data) {
    inmateDetails = <Loader />;
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
      profilePic,
    } = data.getInmate;
    inmateDetails = (
      <SingleInmate
        name={name}
        profilePic={profilePic}
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
        editRemarks={editRemarks}
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
                <h4 className="title">Inmates</h4>
              </CardHeader>
              <CardBody className="all-icons">
                <Row>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <Link to="/admin/addInmate">
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-simple-add" />
                        <h4>Add Inmate</h4>
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
                      <i className="tim-icons icon-zoom-split" />
                      <h4>Search Inmate</h4>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <Link to="/admin/allInmate">
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-single-02" />
                        <h4>Get All Inmates</h4>
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
        isOpen={remarksModal}
        toggle={toggleRemarksModal}
      >
        <ModalHeader>
          <Input
            placeholder="Enter Remarks"
            type="text"
            onChange={onRemark}
            name="remarks"
            value={remarks}
          />
          <Button color="green" content="Save" onClick={editRemarksCallback} />
        </ModalHeader>
      </StrapModal>
      <StrapModal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input
            placeholder="Enter Inmate Name"
            type="text"
            onChange={onChange}
            name="inmateName"
            value={inmateName}
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
          {inmateDetails}
          <br />
          <Button
            color="blue"
            content="Close"
            onClick={(modal) => setmodal(!modal)}
          />
        </Modal.Content>
      </Modal>
    </>
  );
}

export default Inmates;
