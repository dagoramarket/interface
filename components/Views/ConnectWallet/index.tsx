import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { getAddChainParameters } from "../../../chains";
import { metaMask, hooks } from "../../../connectors/metamask";
import Card from "../../Cards";

const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

type Props = {};

export default function ConnectWallet({}: Props) {
    const chainId = useChainId()
  const {isActive, isActivating} = useWeb3React();
  const [desiredChainId, setDesiredChainId] = useState<number>(-1);

  useEffect(() => {
    void metaMask.connectEagerly();
    console.log("teste");
  }, []);

  const switchChain = useCallback(
    async (desiredChainId: number) => {
      setDesiredChainId(desiredChainId)
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) return
      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) return


      await metaMask.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
      
    },
    [chainId]
  )

  function activate() {
    metaMask.activate(
      desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId)
    );
  }

  useEffect(() => {
    if(!chainId) return;
    if(chainId != 80001) {
        console.log("TROCANDO DE REDEEE")
        console.log(chainId)
        switchChain(80001);
    }
  }, [chainId, switchChain])

  return (
    <Container>
      <Row className="justify-center">
        <Col sm={6}>
          <Card title="Connect Wallet">
            <Button onClick={activate}>Metamask</Button>
          </Card>
          {isActive && (<>Hello - </>)}
          {isActivating && (<>Hello2</>)}
          {chainId && (<>{chainId}</>)}
        </Col>
      </Row>
    </Container>
  );
}
