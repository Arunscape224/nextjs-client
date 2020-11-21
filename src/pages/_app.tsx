import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";
import theme from "../theme";
import { Layout } from '../components/Layout'
function MyApp({ Component, pageProps }: any) {
  return (
    <Layout>
    <ThemeProvider theme={theme}>
      {/* <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      > */}
        <CSSReset />
        <Component {...pageProps} />
      {/* </ColorModeProvider> */}
    </ThemeProvider>
    </Layout>
  );
}

export default MyApp;
