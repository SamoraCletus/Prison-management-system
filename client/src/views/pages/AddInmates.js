import React from "react";
import { Dropdown } from "semantic-ui-react";
import location from "assets/utils/location.js";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Modal,
  ModalHeader,
  Alert,
} from "reactstrap";
import {
  ADD_INMATE_MUTATION,
  FETCH_INMATES_QUERY,
} from "assets/utils/queries/Queries";
import { useMutation } from "@apollo/client";
import { useForm } from "assets/utils/hooks";

function UserProfile() {
  const genderOptions = [
    { key: "1", text: "Male", value: "Male" },
    { key: "2", text: "Female", value: "Female" },
  ];
  const [errors, setErrors] = React.useState({});
  // const setDropdownOpen = React.useState(false);
  const [area, setArea] = React.useState(0);
  const [viewImage, setViewImage] = React.useState(undefined);

  const [modalSearch, setmodalSearch] = React.useState(false);
  const [values, setValues] = React.useState({
    name: "",
    gender: "Male",
    DOB: "",
    address: "",
    nextOfKin: "",
    nextOfKinPhone: "",
    crime: "",
    releaseDate: "",
    stateOfOrigin: "",
    LGA: "",
    courtOfConviction: "",
    picture: undefined,
  });
  const stateOptions = location.map(({ name, id }) => ({
    key: id,
    text: name,
    value: name,
  }));
  const { onSubmit } = useForm(addInmateCallback);
  const [addInmate] = useMutation(ADD_INMATE_MUTATION, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    update() {
      setmodalSearch(true);
    },
    refetchQueries: [{ query: FETCH_INMATES_QUERY }],
    variables: values,
  });
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  const onChange = (e) => {
    let value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };
  const onchange = (e, { options, value }) => {
    let key = options?.filter((i) => i.value.includes(value));
    setArea(key[0].key - 1);

    setValues({ ...values, stateOfOrigin: value });
  };
  const onLocalSelect = (e, { value }) => {
    setValues({ ...values, LGA: value });
  };
  const onFileChange = (e) => {
    let image = e.target.files[0];
    setValues({ ...values, picture: image });
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = function () {
        setViewImage(reader.result);
      };
    }
  };
  const onGenderSelect = (e, { value }) => {
    setValues({ ...values, gender: value });
  };
  const localOptions = location[area]?.locals.map(({ name, id }) => ({
    key: id,
    text: name,
    value: name,
  }));
  function addInmateCallback() {
    addInmate();
    setValues({
      name: "",
      gender: "Male",
      DOB: "",
      address: "",
      nextOfKin: "",
      nextOfKinPhone: "",
      crime: "",
      releaseDate: "",
      stateOfOrigin: "",
      LGA: "",
      courtOfConviction: "",
      picture: undefined,
    });
    setViewImage(undefined);
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h3 className="title">Add Inmate</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col className="pr-md-1" md="8">
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
                    <Col className="px-md-1" md="2">
                      <FormGroup>
                        <label>Date of Birth</label>
                        <Input
                          name="DOB"
                          onChange={onChange}
                          value={values.DOB}
                          placeholder="Enter Date of birth"
                          type="date"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="2">
                      <FormGroup>
                        <label>Gender</label>

                        <Dropdown
                          style={{ background: "gray" }}
                          fluid
                          placeholder="Gender"
                          selection
                          options={genderOptions}
                          onChange={onGenderSelect}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Next of Kin</label>
                        <Input
                          name="nextOfKin"
                          value={values.nextOfKin}
                          onChange={onChange}
                          placeholder="Enter Next of Kin"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="5">
                      <FormGroup>
                        <label>Court of Conviction</label>
                        <Input
                          name="courtOfConviction"
                          value={values.courtOfConviction}
                          onChange={onChange}
                          placeholder="Enter Court of Conviction "
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="2">
                      <FormGroup>
                        <label>Next of Kin phone</label>
                        <Input
                          name="nextOfKinPhone"
                          value={values.nextOfKinPhone}
                          onChange={onChange}
                          placeholder="Phone number"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          name="address"
                          value={values.address}
                          onChange={onChange}
                          placeholder="Enter Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>State</label>

                        <Dropdown
                          style={{ background: "gray" }}
                          fluid
                          search
                          placeholder="State"
                          selection
                          options={stateOptions}
                          onChange={onchange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="3">
                      <FormGroup>
                        <label>LGA</label>
                        <Dropdown
                          style={{ background: "gray" }}
                          fluid
                          placeholder="LGA"
                          selection
                          disabled={values.stateOfOrigin === "" ? true : false}
                          options={localOptions}
                          onChange={onLocalSelect}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Date Of Release</label>
                        <Input
                          name="releaseDate"
                          placeholder="Enter Release Date"
                          onChange={onChange}
                          value={values.releaseDate}
                          type="date"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="8">
                      <FormGroup>
                        <label>Crime/Offense</label>
                        <Input
                          name="crime"
                          value={values.crime}
                          onChange={onChange}
                          placeholder="Enter Inmate Crime"
                          rows="2"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button className="btn-fill" color="primary" type="submit">
                    Save Inmate
                  </Button>
                </Form>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <img
                    style={{ width: "70%", height: "90%" }}
                    alt="..."
                    className="avatar"
                    src={
                      values.picture
                        ? viewImage
                        : require("assets/img/default-avatar.png").default
                    }
                  />
                  <br />
                  <label className="title" htmlFor="add-photo">
                    <Button tag="span">Add Photo</Button>
                    <input
                      style={{ display: "none" }}
                      id="add-photo"
                      type="file"
                      name="picture"
                      onChange={onFileChange}
                    />
                  </label>
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
          <h3>Inmate Added Successfully</h3>
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

export default UserProfile;
