import { metaMask } from "@/connectors/metamask";
import { DEPLOYED_CHAIN_ID } from "@/libs/contract";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { Button } from "react-bootstrap";

type Props = {};

export default function ConnectButton({}: Props) {
  const { isActive, chainId } = useWeb3React();

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
