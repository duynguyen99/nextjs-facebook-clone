import { Html, Head, Main, NextScript } from "next/document";
// TODO: override default document when 
function Document() {
  return (
    <Html>
      <Head>
        <meta content="a application demo for Next js" title="Next.js Demo application by Duy Nguyen" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
