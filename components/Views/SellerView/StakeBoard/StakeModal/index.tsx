import Modal from "@/components/Modal";
import TxModal, { ProviderError, TxState } from "@/components/Modal/TxModal";
import { useMarketContext } from "@/libs/marketContext";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProviderRpcError } from "@web3-react/types";
import { formatEther, parseEther } from "ethers/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { Button, Spinner } from "react-bootstrap";

export enum ModalOpen {
  Stake = "Stake",
  Unstake = "Unstake",
  None = "None",
}
type Props = {
  type: ModalOpen;
  onHide: () => void;
};

export default function StakeModal({ type, onHide }: Props) {
  const [val, setVal] = useState("0");
  const { minimumStake, stake, unstake } = useMarketContext();
  const [txState, setTxState] = useState(TxState.None);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (type !== ModalOpen.None) {
      setVal("0");
      setTxState(TxState.None);
    setError("");
    }
  }, [type]);

  async function onSubmit() {
    const amount = parseEther(val);
    if (amount.lte(0)) {
      setError("Amount must be greater than 0");
      return;
    }
    setTxState(TxState.Pending);
    try {
      if (type === ModalOpen.Stake) {
        await stake(amount);
      } else if (type === ModalOpen.Unstake) {
        await unstake(amount);
      }
      setTxState(TxState.Success);

      timerRef.current = setTimeout(() => onHide(), 1000);
    } catch (e) {
      setTxState(TxState.Error);
      const error = e as ProviderRpcError;
      const data = error.data as ProviderError;
      setError(data.message);
      timerRef.current = setTimeout(() => onHide(), 5000);
    }
  }

  return (
    <TxModal
      title={type}
      show={type !== ModalOpen.None}
      onHide={onHide}
      txState={txState}
      setTxState={setTxState}
      error={error}
    >
      <input
        pattern="[0-9]*\.?[0-9]{0,18}"
        value={val}
        className="bg-slate-400 rounded w-full text-6xl text-center"
        onChange={(e) => {
          setVal(e.target.validity.valid ? e.target.value : val);
        }}
      ></input>
      <p className="text-gray-700">
        Minimum Amount: {formatEther(minimumStake)} DGR
      </p>
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-full flex justify-evenly mt-3">
        <Button className="rounded-xl w-24" variant="dark" onClick={onHide}>
          Cancel
        </Button>
        <Button className="rounded-xl w-24" variant="dark" onClick={onSubmit}>
          Confirm
        </Button>
      </div>
    </TxModal>
  );
}
