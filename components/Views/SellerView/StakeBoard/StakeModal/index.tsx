import Modal from "@/components/Modal";
import { MINIMUM_STAKE } from "@/constants";
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

enum TxState {
  None = "None",
  Pending = "Pending",
  Success = "Success",
  Error = "Error",
}

type Props = {
  type: ModalOpen;
  onHide: () => void;
};

interface ProviderError {
  code: number;
  message: string;
  data: string;
}

export default function StakeModal({ type, onHide }: Props) {
  const [val, setVal] = useState("0");
  const [error, setError] = useState("");
  const { totalStake, stake, unstake } = useMarketContext();
  const [txState, setTxState] = useState(TxState.None);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  function content() {
    switch (txState) {
      case TxState.None:
        return (
          <>
            <input
              pattern="[0-9]*\.?[0-9]{0,18}"
              value={val}
              className="bg-slate-400 rounded w-full text-6xl text-center"
              onChange={(e) => {
                setVal(e.target.validity.valid ? e.target.value : val);
              }}
            ></input>
            <p className="text-gray-700">Minimum Amount: {formatEther(MINIMUM_STAKE)} DGR</p>
            {error && <p className="text-red-500">{error}</p>}
            <div className="w-full flex justify-evenly mt-3">
              <Button
                className="rounded-xl w-24"
                variant="dark"
                onClick={onHide}
              >
                Cancel
              </Button>
              <Button
                className="rounded-xl w-24"
                variant="dark"
                onClick={onSubmit}
              >
                Confirm
              </Button>
            </div>
          </>
        );
      case TxState.Pending:
        return (
          <Spinner
            animation="border"
            role="status"
            style={{ width: "10rem", height: "10rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        );
      case TxState.Success:
        return <FontAwesomeIcon icon={faCheck} size="10x" />;
      case TxState.Error:
        return (
          <>
            <FontAwesomeIcon icon={faXmark} size="10x" />
            {error && <p className="text-red-500">{error}</p>}
          </>
        );
    }
  }

  return (
    <Modal show={type !== ModalOpen.None} onHide={onHide}>
      <div className="flex flex-col align-items-center mx-auto gap-3">
        <h1>{type}</h1>
        {content()}
      </div>
    </Modal>
  );
}
