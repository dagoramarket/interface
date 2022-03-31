import { hooks as metaMaskHooks, metaMask } from "@/connectors/metamask";
import { MarketProvider } from "@/libs/marketContext";
import "@/styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { SSRProvider } from "react-bootstrap";
import Container from "./_container";
config.autoAddCss = false;

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];

function MyApp(pageProps: AppProps) {
  return (
    <SSRProvider>
      <Web3ReactProvider connectors={connectors}>
        <MarketProvider>
          <Container {...pageProps} />
        </MarketProvider>
      </Web3ReactProvider>
    </SSRProvider>
  );
}

export default MyApp;
