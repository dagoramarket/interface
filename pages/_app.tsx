import { hooks as metaMaskHooks, metaMask } from "@/connectors/metamask";
import { MarketProvider } from "@/libs/marketContext";
import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
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

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/flametuner/dagora",
  cache: new InMemoryCache(),
});

function MyApp(pageProps: AppProps) {
  return (
    <SSRProvider>
      <Web3ReactProvider connectors={connectors}>
        <MarketProvider>
          <ApolloProvider client={client}>
            <Container {...pageProps} />
          </ApolloProvider>
        </MarketProvider>
      </Web3ReactProvider>
    </SSRProvider>
  );
}

export default MyApp;
