import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SSRProvider } from "react-bootstrap";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MarketProvider } from "../libs/marketContext";
import { MetaMask } from "@web3-react/metamask";
import { metaMask, hooks as metaMaskHooks } from "../connectors/metamask";
config.autoAddCss = false;

function getLibrary(provider: any) {
  return new Web3Provider(provider);
}
const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Web3ReactProvider connectors={connectors}>
        <MarketProvider>
          <Component {...pageProps} />
        </MarketProvider>
      </Web3ReactProvider>
    </SSRProvider>
  );
}

export default MyApp;
