import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Button } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
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
          colorScheme="orange"
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </div>
    );
  }

  return <div>{body}</div>;
};

export default withUrqlClient(createUrqlClient)(Dashboard);
