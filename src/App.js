import React, { useEffect, useState } from "react";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

/* src/App.js */
function App({ signOut, user }) {
  const [email, setEmail] = useState();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setEmail(user.attributes.email);
    });
  }, []);

  return (
    <>
      {/* Add Todo JSX here  */}
      <Heading level={1}>
        Hello, {user.username}, email: {email}
      </Heading>
      <Button onClick={signOut}>Sign out</Button>
    </>
  );
}

export default withAuthenticator(App);
