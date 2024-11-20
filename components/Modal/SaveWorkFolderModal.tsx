"use client";
import styles from "./Modal.module.scss";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import closedFolder from "/public/assets/images/closed_folder.svg";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { IMessageResponse, Response } from "@/@types/CommonTypes";

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
  selectedFolderCallback: (value: string) => void;
};

function SaveWorkFolderModal({
  showModal,
  selectedFolderCallback,
  handleHide,
}: ISaveWorkFolderModalProps) {
  const [state, setState] = useState<ISaveWorkFolderState>({
    showCreateFolder: false,
    folders: [],
  });
  const { data: session, status } = useSession();

  const schema = yup.object().shape({
    folderName: yup
      .string()
      .required("Folder name required")
      .max(30, "Folder name limit exceeded")
      .matches(/^(?!\s*$).+/, "Invalid folder name"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const handleShowNewFolder = () => {
    setState({ ...state, showCreateFolder: true });
  };

  const submitHandler = (value: any) => {
    if (status === "authenticated") {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/works/folder/root`, value, {
          headers: {
            Authorization: `Bearer ${session.user.access}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const result = response.data;
          if (result.success) {
            const { data } = result as Response<{ folder: IFolderType }>;
            setState({
              ...state,
              folders: [...state.folders, data.folder],
              showCreateFolder: false,
            });
            reset();
          } else {
            const { data } = result as IMessageResponse;
            toast.error(data.message);
          }
        })
        .catch((error) => {
          const { response } = error;
          const result = response.data;
          const { data } = result as IMessageResponse;
          toast.error(data.message);
        });
    }
  };

  async function fetchRootFolders() {
    if (status === "authenticated") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/works/folder/root`, {
          headers: {
            //@ts-ignore
            Authorization: `Bearer ${session.user.access}`,
          },
        })
        .then((response) => {
          const result = response.data;
          if (result.success) {
            const { data } = result;
            setState({ ...state, folders: data.folders });
          } else {
            toast.error("fetching folder data failed");
          }
        })
        .catch((error) => toast.error("fetching folder data failed"));
    }
  }

  const handleFolderSelection = (folderId: string) => {
    setState({ ...state, selectedFolder: folderId });
  };

  const handleHideInternally = () => {
    setState({ ...state, selectedFolder: undefined });
    handleHide();
  };

  const handleSaveWorkClick = () => {
    if (state.selectedFolder) {
      selectedFolderCallback(state.selectedFolder);
      setState({ ...state, selectedFolder: undefined });
      handleHide();
    }
  };

  useEffect(() => {
    fetchRootFolders();
  }, []);

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
            Choose a folder to save work
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={`${styles.modal_inner} ${styles.dark_background} ${styles.dark_background_inner}`}
            style={{ maxHeight: "65vh", overflow: "auto" }}
          >
            <div
              className={`${styles.modal_inner_left} ${styles.modal_inner_box} m-lg-3`}
            >
              {state.folders.length ? (
                state.folders.map((folder, idx) => (
                  <div
                    className={`${styles.align_items_start} align-items-start`}
                    key={idx}
                    onClick={() => handleFolderSelection(folder.folderId)}
                    style={{
                      backgroundColor:
                        state.selectedFolder === folder.folderId
                          ? "#AE46CA"
                          : "initial",
                    }}
                  >
                    <div>
                      <Image src={closedFolder} alt="" />
                    </div>
                    <div>
                      <span className={styles.folder_name}>{folder.name}</span>
                    </div>
                  </div>
                ))
              ) : (
                <span style={{ color: "white" }}>No folders</span>
              )}
              {/* ------------------- */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.save_footer}>
          <div className={styles.footer_btn}>
            <button className={styles.add_btn} onClick={handleShowNewFolder}>
              New Folder
            </button>
            <button
              className={styles.primary_btn}
              onClick={handleSaveWorkClick}
              style={{ display: state.selectedFolder ? "block" : "none" }}
            >
              Save Work
            </button>
          </div>
          <Modal
            show={state.showCreateFolder}
            size="sm"
            className={`${styles.Modal_contain_inner} ${styles.generate_modal} ${styles.sm_modal} nml_modal generate_modal`}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                New Folder
              </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(submitHandler)}>
              <Modal.Body>
                <div className={`${styles.modal_inner}`}>
                  <div className={styles.normal_form}>
                    <input
                      className={styles.inputfld}
                      type="text"
                      {...register("folderName")}
                    />
                    {errors.folderName && (
                      <span style={{ color: "red" }}>
                        {errors.folderName.message}
                      </span>
                    )}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className={styles.sm_modal_footer}>
                <div className={styles.footer_btn}>
                  <button
                    className={styles.skeletal_btn}
                    type="button"
                    onClick={() => {
                      reset();
                      setState({ ...state, showCreateFolder: false });
                    }}
                  >
                    Cancel
                  </button>
                  <button className={styles.primary_btn}>Create</button>
                </div>
              </Modal.Footer>
            </form>
          </Modal>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SaveWorkFolderModal;
