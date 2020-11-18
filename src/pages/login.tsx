import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

const Login: React.FC<{}> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          // console.log(values);
          const response = await login({ options: values });
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
                name="username"
                placeholder="username"
                label="Username"
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
              <Button type="submit" isLoading={isSubmitting} colorScheme="blue">
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
