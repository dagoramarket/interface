import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { metaMask } from "../../../../connectors/metamask";
import { DEPLOYED_CHAIN_ID } from "../../../../libs/contract";

type Props = {};

export default function ConnectButton({}: Props) {
  const { isActive, chainId } = useWeb3React();

  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  function activate() {
    metaMask.activate(DEPLOYED_CHAIN_ID);
  }

  return (
    <Button
      onClick={activate}
      disabled={isActive && chainId == DEPLOYED_CHAIN_ID}
      variant={isActive && chainId == DEPLOYED_CHAIN_ID ? "success" : "primary"}
    >
      {!isActive
        ? "Connect Metamask"
        : chainId != DEPLOYED_CHAIN_ID
        ? "Change network"
        : "Connected"}
    </Button>
  );
}
