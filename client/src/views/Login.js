import React, { useContext, useState } from "react";
import "assets/css/login.css";
import { Button, Form, Icon } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "assets/utils/hooks";
import { AuthContext } from "contexts/auth";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "assets/utils/queries/Queries";
import { REGISTER_USER } from "assets/utils/queries/Queries";
import { ADMIN_LOGIN } from "assets/utils/queries/Queries";

export function AdminLogin() {
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    name: "",
    password: "",
  });
  let history = useHistory();
  const [adminLogin] = useMutation(ADMIN_LOGIN, {
    update(_, { data: { adminLogin: userData } }) {
      context.login(userData);
      history.push("/admin/dashboard");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  function loginUserCallback() {
    adminLogin();
  }
  return (
    <div className="login">
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="login-container">
        <img src={require("assets/img/coa.png").default} alt="logo" />
        <div className="login-text">
          <h1>Admin </h1>
        </div>
        <Form onSubmit={onSubmit}>
          <div className="input-field">
            <Icon name="user" />
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={onChange}
              placeholder="Enter Name"
            />
          </div>
          <div className="input-field">
            <Icon name="lock" />
            <input
              type="password"
              value={values.password}
              onChange={onChange}
              name="password"
              placeholder="Enter Password"
            />
          </div>

          <Button type="submit">Sign in</Button>
        </Form>
        <h5>
          User?
          <Link to="/login">
            <span>Login </span>
          </Link>
        </h5>
      </div>
    </div>
  );
}
export default function Login() {
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    name: "",
    password: "",
  });
  let history = useHistory();
  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push("/home");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  function loginUserCallback() {
    loginUser();
  }
  return (
    <div className="login">
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="login-container">
        <img src={require("assets/img/coa.png").default} alt="logo" />
        <div className="login-text">
          <h1>Sign in </h1>
        </div>
        <Form onSubmit={onSubmit}>
          <div className="input-field">
            <Icon name="user" />
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={onChange}
              placeholder="Enter Name"
            />
          </div>
          <div className="input-field">
            <Icon name="lock" />
            <input
              type="password"
              value={values.password}
              onChange={onChange}
              name="password"
              placeholder="Enter Password"
            />
          </div>

          <Button type="submit">Sign in</Button>
        </Form>
        <h5>
          <Link to="/register">
            <span>Register </span>
          </Link>
          <span>OR</span>
          <Link to="/adminlogin">
            <span> Admin</span>
          </Link>
        </h5>
      </div>
    </div>
  );
}
export function Register(props) {
  const [errors, setErrors] = useState({});

  const context = useContext(AuthContext);
  const { onChange, onSubmit, values } = useForm(registerUser, {
    name: "",
    email: "",
    password: "",
    inmateName: "",
    confirmPassword: "",
  });
  let history = useHistory();
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      history.push("/home");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  function registerUser() {
    addUser();
  }
  return (
    <div className="login">
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="login-container">
        <img src={require("assets/img/coa.png").default} alt="logo" />
        <div className="login-text">
          <h1>Register User </h1>
        </div>
        <Form onSubmit={onSubmit}>
          <div className="input-field">
            <Icon name="user" />
            <input
              type="text"
              name="name"
              onChange={onChange}
              value={values.name}
              placeholder="Enter Name"
            />
          </div>
          <div className="input-field">
            <Icon name="user" />
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={onChange}
              placeholder="Enter Email"
            />
          </div>
          <div className="input-field">
            <Icon name="user" />
            <input
              type="text"
              name="inmateName"
              value={values.inmateName}
              onChange={onChange}
              placeholder="Enter Inmate Name"
            />
          </div>
          <div className="input-field">
            <Icon name="lock" />
            <input
              type="password"
              name="password"
              onChange={onChange}
              value={values.password}
              placeholder="Enter Password"
            />
          </div>
          <div className="input-field">
            <Icon name="lock" />
            <input
              type="password"
              name="confirmPassword"
              onChange={onChange}
              value={values.confirmPassword}
              placeholder="Confirm Password"
            />
          </div>

          <Button type="submit">Register</Button>
        </Form>
        <h5>
          Already a user?{" "}
          <Link to="/login">
            <span>Sign In</span>
          </Link>
        </h5>
      </div>
    </div>
  );
}
