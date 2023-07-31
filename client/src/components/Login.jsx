import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Login({ setIsAuth }) {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");

  const cookies = new Cookies();
  const logIn = () => {
    // code goes here
    Axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true);
    });
  };
  return (
    <>
      <div className="login">
        <label>Log In</label>
        <input
          value={username}
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassWord(event.target.value);
          }}
        />
        <button onClick={logIn}>Log in</button>
      </div>
    </>
  );
}

export default Login;
