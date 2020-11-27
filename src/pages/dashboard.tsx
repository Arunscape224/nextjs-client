import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Button, CircularProgress } from "@material-ui/core";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import React from "react";
const Dashboard = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
    body = <div>...loading</div>;
  } else if (!data?.me) {
    body = <div>Login</div>;
  } else {
    body = (
      <div>
        <div>{data.me.username}</div>
        <Button
          color="primary"
          onClick={() => {
            logout();
          }}
        >
          {logoutFetching ? <CircularProgress /> : <div>Logout</div>}
        </Button>
      </div>
    );
  }

  return <div>{body}</div>;
};

export default withUrqlClient(createUrqlClient)(Dashboard);
