// project import
import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Routes from "./routes";
import ThemeCustomization from "./themes";
import ScrollTop from "./components/ScrollTop";
import { makeAuthApi } from "./pages/extra-pages/api";
import { setUser } from "./store/reducers/auth";
import { useDispatch } from "react-redux";
import { Hub, Logger } from "aws-amplify";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = ({ signOut, user }) => {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setEmail(user.attributes.email);
    });

    const listener = (data) => {
      switch (data.payload.event) {
        case "signOut":
          dispatch(setUser({ user: {} }));
          break;
      }
    };

    Hub.listen("auth", listener);
    getUserType();
  }, []);
  const getUserType = () => {
    makeAuthApi({
      api: "auth/all-my-access"
    })
      .then(({ data }) => {
        dispatch(setUser({ user: data }));
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("user", user);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default withAuthenticator(App);
