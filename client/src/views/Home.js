import { useQuery } from "@apollo/react-hooks";
import { FETCH_INMATE_QUERY } from "assets/utils/queries/Queries";
import { AuthContext } from "contexts/auth";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { Form, Icon, Loader, Modal } from "semantic-ui-react";
import { SingleInmate } from "variables/InmateModel";

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  let history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user]);
  const [modal, setmodal] = React.useState(true);
  const [inmateName, setInmateName] = React.useState("");

  const { data } = useQuery(FETCH_INMATE_QUERY, {
    variables: {
      name: inmateName,
    },
  });
  function onChange(e) {
    setInmateName(e.target.value);
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
      />
    );
  }
  return (
    <div className="login">
      <div className="login-container home-container">
        <img src={require("assets/img/coa.png").default} alt="logo" />
        <div className="login-text">
          <h1>Welcome Back {user?.name} </h1>
        </div>
        <div className="login-text">
          <h1>SEARCH INMATE </h1>
        </div>
        <Form>
          <div className="input-field">
            <Icon name="user" />
            <input
              type="text"
              onChange={onChange}
              name="inmateName"
              value={inmateName}
              placeholder="Enter Inmate Name you wish to search"
            />
          </div>

          {/* <Button type="submit">Search</Button> */}
        </Form>
      </div>
      <Button onClick={logout}>logout</Button>
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
          <Button color="blue" onClick={(modal) => setmodal(!modal)}>
            Close
          </Button>
        </Modal.Content>
      </Modal>
    </div>
  );
}
