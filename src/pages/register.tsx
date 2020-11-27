import { Box, Button, CircularProgress } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
// import DatePicker from "react-datepicker";
import TextField from "@material-ui/core/TextField/TextField";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "", birthday: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          // const response = await register({ options: values });
          // if (response.data?.register.errors) {
          //   setErrors(toErrorMap(response.data.register.errors));
          // } else if (response.data?.register.user) {
          //   router.push("/dashboard");
          // }
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
              <InputField name="email" placeholder="email" label="email" />
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
              <InputField
                type="date"
                placeholder="birthday"
                name="birthday"
                label="birthday"
              />
            </Box>
            <Box mt="4">
              <Button type="submit" color="primary">
                {isSubmitting ? <CircularProgress /> : <div>Register</div>}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
