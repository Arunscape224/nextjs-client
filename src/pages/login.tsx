import { Box, Button, CircularProgress } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Login: React.FC<{}> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          // console.log(values);
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/dashboard");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt="4">
              <InputField
                name="usernameOrEmail"
                placeholder="username or email"
                label="Username Or Email"
              />
            </Box>
            <Box mt="4">
              <InputField
                type="password"
                name="password"
                placeholder="password"
                label="Password"
              />
            </Box>
            <Box mt="4">
              <Button type="submit" color="primary">
              {isSubmitting ? <CircularProgress /> : <div>Login</div>}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);;
