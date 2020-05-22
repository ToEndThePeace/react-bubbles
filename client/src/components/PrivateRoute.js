import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../utils";

const PrivateRoute = ({ component: Component, ...props }) => {
  const token = getToken();
  return (
    <Route
      {...props}
      render={() => {
        if (token) {
          return <Component />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
