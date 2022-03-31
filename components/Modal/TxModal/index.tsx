import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Modal from "..";

type Props = {
  title: string;
  children: string | JSX.Element | (JSX.Element | null | string)[];
  show: boolean;
  txState: TxState;
  setTxState: React.Dispatch<React.SetStateAction<TxState>>;
  onHide: () => void;
  error: string;
};

export enum TxState {
  None = "None",
  Pending = "Pending",
  Success = "Success",
  Error = "Error",
}

export interface ProviderError {
  code: number;
  message: string;
  data: string;
}

export default function TxModal({
  title,
  children,
  show,
  onHide,
  txState,
  setTxState,
  error,
}: Props) {
  function content() {
    switch (txState) {
      case TxState.None:
        return children;
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
    <Modal show={show} onHide={onHide}>
      <div className="flex flex-col align-items-center mx-auto gap-3">
        <h1>{title}</h1>
        {content()}
      </div>
    </Modal>
  );
}
