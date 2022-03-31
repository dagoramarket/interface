import Card from "@/components/Cards";
import { useMarketContext } from "@/libs/marketContext";
import ConnectWallet from "@views/ConnectWallet";
import { constants } from "ethers";
import { formatEther, formatUnits } from "ethers/lib/utils";
import { useState } from "react";
import { Button } from "react-bootstrap";
import StakeModal, { ModalOpen } from "./StakeModal";

type Props = {};

export default function StakeBoard({}: Props) {
  const { connected, totalStake } = useMarketContext();
  const [openModal, setOpenModal] = useState(ModalOpen.None);

  if (!connected) {
    return <ConnectWallet />;
  }

  function getFormatedStake() {
    let res = formatEther(totalStake);
    if (res.includes(".")) {
      const parts = res.split(".");
      return parts[0] + "." + parts[1].slice(0, 2);
    }
    return res;
  }

  return (
    <>
      <Card title="Stake">
        <div
          className="grid grid-cols-5 bg-slate-300 justify-center rounded-xl h-36 items-center"
          title={formatUnits(totalStake, 18)}
        >
          <h1 className="text-5xl col-start-2 col-span-3 text-center">
            {getFormatedStake()}
          </h1>
          <span className="flex-none pl-3">DGR</span>
        </div>
        <div className="flex justify-evenly mt-3">
          <Button
            className="rounded-xl w-24"
            variant="dark"
            onClick={() => setOpenModal(ModalOpen.Stake)}
          >
            Stake
          </Button>
          <Button
            className="rounded-xl w-24"
            variant="dark"
            disabled={totalStake == constants.Zero}
            onClick={() => setOpenModal(ModalOpen.Unstake)}
          >
            Unstake
          </Button>
        </div>
      </Card>
      <StakeModal
        type={openModal}
        onHide={() => setOpenModal(ModalOpen.None)}
      />
    </>
  );
}
