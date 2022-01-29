import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { callApi } from "../api";

const AccountForm = ({ action, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = action === "login";
  const title = isLogin ? "Login" : "Register";
  const oppositeTitle = isLogin ? "Register" : "Login";
  const oppositeAction = isLogin ? "register" : "login";
  //   const actionURL = isLogin ? API_LOGIN : API_REGISTER;
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await callApi({
      url: `/users/${action}`,
      body: { username, password },
      method: "POST",
    });
    const token = data?.data?.token;
    if (token) {
      localStorage.setItem("token", token);
      setUsername("");
      setPassword("");
      setToken(token);
      history.push("/");
    }
  };
  return (
    <div id="register-fields">
      <h4 className="page-title">{title}</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>

        <button type="submit">{title} </button>
      </form>
      <Link to={`/${oppositeAction}`}>{oppositeTitle}</Link>
    </div>
  );
};

export default AccountForm;
