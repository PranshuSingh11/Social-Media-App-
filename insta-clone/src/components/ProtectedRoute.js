import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  var login = localStorage.getItem("JWTtoken");
  return (
    
      <Route
        {...rest}
        render={(props) => {
          if (login) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/unauthorized",
                  state: { from: props.location },
                }}
              />
            );
          }
        }}
      />
    
  );
}

export default ProtectedRoute;
