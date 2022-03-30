import { useWeb3React } from "@web3-react/core";
import { Button } from "react-bootstrap";
import { useMarketContext } from "../../../../libs/marketContext";
import Card from "../../../Cards";

type Props = {};

export default function StakeBoard({}: Props) {
  const { totalStake } = useMarketContext();

  return (
    <Card title="Stake">
      <div className="grid grid-cols-5 bg-slate-300 justify-center rounded-xl h-36 items-center">
        <h1 className="text-5xl col-start-2 col-span-3 text-center">
          {totalStake}
        </h1>
        <span className="flex-none pl-3">DGR</span>
      </div>
      <div className="flex justify-evenly mt-3">
        <Button className="rounded-xl w-24" variant="dark">
          Stake
        </Button>
        <Button
          className="rounded-xl w-24"
          variant="dark"
          disabled={totalStake == 0}
        >
          Unstake
        </Button>
      </div>
    </Card>
  );
}
