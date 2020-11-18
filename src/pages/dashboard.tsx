import { useMeQuery } from "../generated/graphql";

const Dashboard = () => {
  const [{data, fetching}] = useMeQuery()
  let body = null
  
  if(fetching) {
    body = <div>...loading</div>
  } else if (!data?.me) {
    body = (<div>Login</div>)
  } else {
    body = (<div>{data.me.username}</div>)
  }

return <div>{body}</div>;
};

export default Dashboard;
