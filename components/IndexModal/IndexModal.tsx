import styles from "./IndexModal.module.scss";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";

type IIndexModalProps = {
  showModal: boolean;
  indexItem?: string;
  handleHide: () => void;
  onSuccess: (action: string, data: any, assetId?: any) => void;
};

function IndexModal({
  showModal,
  handleHide,
  indexItem,
  onSuccess,
}: IIndexModalProps) {
  const { data: session, status } = useSession();
  const handleAction = (action: any) => {
    onSuccess(action, { assetId: indexItem });
    handleHide();
  };
  return (
    <div className={`${styles.Modal_contain}`}>
      <Modal
        className={`${styles.Modal_contain_inner} nml_modal assets_modal`}
        show={showModal}
        onHide={handleHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className={styles.header}></Modal.Header>
        <Modal.Body className={styles.modal_body}>
          <div className="row">
            <div className="col-6">
              <button
                className={styles.primary_btn}
                onClick={() => handleAction("storeNotIndex")}
              >
                Store and not Index
              </button>
            </div>
            <div className="col-6">
              <button
                className={styles.primary_btn}
                onClick={() => handleAction("storeIndex")}
              >
                Store and Index
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default IndexModal;
