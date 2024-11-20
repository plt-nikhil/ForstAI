"use client";
import { useContext, useState } from "react";
import styles from "./Modal.module.scss";
import Modal from "react-bootstrap/Modal";
// import WorkAssetsContext from "@/context/CommonContext";
// import { IWorkAssetsContextType } from "@/@types/ContextTypes";

type IFolderType = {
  name: string;
  folderId: string;
};

type ISaveWorkFolderState = {
  showCreateFolder: boolean;
  folders: IFolderType[];
  selectedFolder?: string;
};
type ISaveWorkFolderModalProps = {
  showModal: boolean;
  handleHide: () => void;
  jsonData: any;
};

function JsonFileModal({
  showModal,
  handleHide,
  jsonData,
}: ISaveWorkFolderModalProps) {
  const handleHideInternally = () => {
    handleHide();
  };

  return (
    <div className={`${styles.Modal_contain}`}>
      <Modal
        className={`${styles.Modal_contain_inner} ${styles.generate_modal} nml_modal generate_modal`}
        show={showModal}
        onHide={handleHideInternally}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Json file Preview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={`${styles.modal_inner_json} ${styles.dark_background} ${styles.dark_background_inner} h-full w-full`}
            style={{ maxHeight: "65vh", overflow: "auto" }}
          >
            <pre className="text-left text-sm ">
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.save_footer}></Modal.Footer>
      </Modal>
    </div>
  );
}

export default JsonFileModal;
