// project import
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Routes from './routes';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = ({ signOut, user }) => {
  const [email, setEmail] = useState();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setEmail(user.attributes.email);
    });
  }, []);
  console.log('user', user);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default withAuthenticator(App);
