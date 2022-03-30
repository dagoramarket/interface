import { Modal as BSModal } from "react-bootstrap";
type Props = {
  show: boolean;
  onHide: () => void;
  children: string | JSX.Element | (JSX.Element | null)[];
};

export default function Modal({ children, show, onHide }: Props) {
  return (
    <BSModal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <BSModal.Body>{children}</BSModal.Body>
    </BSModal>
  );
}
