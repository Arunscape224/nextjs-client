import { Layout } from '../components/Layout'
function MyApp({ Component, pageProps }: any) {
  return (
    <Layout>
      {/* <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      > */}
        <Component {...pageProps} />
      {/* </ColorModeProvider> */}
    </Layout>
  );
}

export default MyApp;
