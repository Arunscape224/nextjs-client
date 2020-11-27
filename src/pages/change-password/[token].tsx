import { Box, Button, CircularProgress } from "@material-ui/core";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import React from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter()
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('')
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          // console.log(values);
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors)
            if('token' in errorMap) {
              setTokenError(errorMap.token)
            }
            setErrors(errorMap)
          } else if (response.data?.changePassword.user) {
            router.push("/dashboard");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt="4">
              <InputField
                name="newPassword"
                placeholder="new password"
                label="New Password"
                type="password"
              />
            </Box>

          {tokenError ?  <Box color="red">{tokenError}</Box> : null}

            <Box mt="4">
              <Button type="submit" color="primary">
                { isSubmitting ? <CircularProgress /> : <div>change password</div>}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
