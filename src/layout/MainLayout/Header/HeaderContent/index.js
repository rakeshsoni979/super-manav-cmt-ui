// material-ui
import React from 'react';
import { Box, IconButton, Link, useMediaQuery } from "@mui/material";
import { GithubOutlined } from "@ant-design/icons";

// project import
import Search from "./Search";
import Profile from "./Profile";
import Notification from "./Notification";
import MobileSection from "./MobileSection";
import { useSelector } from "react-redux";
import { Auth } from "aws-amplify";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const [email, setEmail] = React.useState();
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  console.log(user, 123);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setEmail(user.attributes.email);
    });
  }, []);

  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: "100%", ml: 1 }} />}
      {email} <br />{user.userType}
      <IconButton
        component={Link}
        href="https://github.com/codedthemes/mantis-free-react-admin-template"
        target="_blank"
        disableRipple
        color="secondary"
        title="Download Free Version"
        sx={{ color: "text.primary", bgcolor: "grey.100" }}
      >
        <GithubOutlined />
      </IconButton>
      <Notification />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
