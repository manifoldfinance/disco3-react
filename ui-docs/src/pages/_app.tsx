import '~/styles/globals.css';

import * as React from 'react';

import { getThemeAccent, getThemeMode } from '~/utils/cookies';

import { AppProps } from 'next';
import Head from 'next/head';
import { MDX } from '~/components';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider } from 'disco-web3';
import { getLayout as getDocsLayout } from '~/layouts/docs';

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout || getDocsLayout;

  return (
    <ThemeProvider defaultAccent={getThemeAccent()} defaultMode={getThemeMode() ?? 'dark'}>
      <Head>
        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var d=document.documentElement;var e=document.cookie.split(";").find(x=>x.includes("mode"));if(e){d.setAttribute('data-theme',e.replace("mode=","").trim())}else{d.setAttribute('data-theme','dark');}}catch(t){}}();`,
          }}
        />
      </Head>

      <MDXProvider components={MDX}>{getLayout(<Component {...pageProps} />)}</MDXProvider>
    </ThemeProvider>
  );
};

export default App;
