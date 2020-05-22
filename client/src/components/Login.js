import React, { useState } from "react";
import { axiosWithAuth, setToken } from "../utils";
import { useHistory } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
};

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formData, setFormData] = useState(initialValues);
  const { push } = useHistory();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", formData)
      .then((res) => {
        //res.data.payload
        setToken(res.data.payload);
        push("/bubbles");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        name="username"
        placeholder="Username..."
        value={formData.username}
        onChange={handleInput}
      />
      <input
        type="password"
        name="password"
        placeholder="Password..."
        value={formData.password}
        onChange={handleInput}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Login;
