import { useMutation } from "@apollo/client";
import { useForm } from "assets/utils/hooks";
import React from "react";
import {
  REGISTER_GUEST,
  FETCH_GUESTS_QUERY,
} from "assets/utils/queries/Queries";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Alert,
  Modal,
  ModalHeader,
} from "reactstrap";
import { Dropdown } from "semantic-ui-react";
import { FETCH_SIGNED_IN_GUEST_QUERY } from "assets/utils/queries/Queries";

function AddGuest() {
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [values, setValues] = React.useState({
    name: "",
    phone: "",
    inmateName: "",
    purpose: "",
  });
  const purposeOptions = [
    { key: "1", text: "Casual", value: "Casual" },
    { key: "2", text: "Official", value: "Official" },
    { key: "3", text: "Medicals", value: "Medicals" },
  ];

  const { onSubmit } = useForm(addGuestCallback);

  const [addGuest] = useMutation(REGISTER_GUEST, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    update() {
      setmodalSearch(true);
    },
    refetchQueries: [
      { query: FETCH_GUESTS_QUERY },
      { query: FETCH_SIGNED_IN_GUEST_QUERY },
    ],
    variables: values,
  });
  function ondropDown(e, { value }) {
    setValues({ ...values, purpose: value });
  }
  const onChange = (e) => {
    let value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };
  function addGuestCallback() {
    addGuest();
    setValues({ name: "", phone: "", inmateName: "", purpose: "" });
  }
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h3 className="title">Add Guest</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Full Name</label>
                        <Input
                          name="name"
                          value={values.name}
                          onChange={onChange}
                          placeholder="Enter Full Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Phone</label>
                        <Input
                          name="phone"
                          value={values.phone}
                          onChange={onChange}
                          placeholder="Enter Phone"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Purpose of Visit</label>
                        <Dropdown
                          fluid
                          value={values.purpose}
                          onChange={ondropDown}
                          placeholder="Purpose"
                          selection
                          options={purposeOptions}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Inmate Name</label>
                        <Input
                          placeholder="Enter Inmate Name"
                          value={values.inmateName}
                          onChange={onChange}
                          name="inmateName"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button className="btn-fill" color="primary" type="submit">
                    Save Guest
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/emilyz.jpg").default}
                    />
                    <h4 className="title">Amos Asuquo</h4>
                  </a>
                  <p className="description">Administrator</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {Object.keys(errors).length > 0 && (
          <ul className="list">
            {Object.values(errors).map((value) => (
              <Alert key={value} color="danger">
                <span>{value}</span>
              </Alert>
            ))}
          </ul>
        )}
      </div>
      <Modal
        color="success"
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader style={{ background: "green" }}>
          <h3>Guest Signed In Successfully</h3>
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
    </>
  );
}

export default AddGuest;
