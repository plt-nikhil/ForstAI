"use client";

import styles from "./ownedworksfolder.module.scss";
import styles_modal from "@/components/AssetListModal/AssetListModal.module.scss";
import Image from "next/image";
import openFolderImg from "@/public/assets/images/open_folder.svg";
import closeFolderImg from "@/public/assets/images/closed_folder.svg";
import uploadImg from "@/public/assets/images/upload.svg";
import EclipseLoader from "@/public/assets/images/EclipseLoader.svg";
import CsvIcon from "@/public/assets/images/csv_icon.svg";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import { IMessageResponse, Response } from "@/@types/CommonTypes";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import DragAndDrop from "../FileInput/DropZoneFileInput";
import { stat } from "fs";

type IFolderListData = {
  folderId: string;
  totalWorks: number;
  name: string;
};

type IFolderInfo = {
  folders: number;
  totalWorks: number;
};

type IWorkListData = {
  name: string;
  image: string;
  worksId: string;
};

type IFolderViewState = {
  folders: IFolderListData[];
  showCreateFolder: boolean;
  folderInfo: IFolderInfo;
  showUpload: boolean;
};

type IFolderViewProps = {
  folders: IFolderListData[];
  count: IFolderInfo;
};

function OwnedWorksFolder({ folders, count }: IFolderViewProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetchWorks = (folderId: string) => {
    if (status === "authenticated") {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/works/folder/view/${folderId}`,
          {
            headers: {
              Authorization: `Bearer ${session.user.access}`,
            },
          }
        )
        .then((response) => {
          const result = response.data;
          if (result.success) {
            const { works } = result.data as { works: IWorkListData[] };
            setState({ ...state, folders: [] });
          }
        });
    }
  };

  const [state, setState] = useState<IFolderViewState>({
    folders: [],
    showCreateFolder: false,
    folderInfo: { folders: 0, totalWorks: 0 },
    showUpload: false,
  });

  const handleFolderOpen = (folderId: string) => {
    router.push(`/myownedworks/${folderId}`);
  };

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
            const { data } = result as Response<{ folder: IFolderListData }>;
            const { folder } = data;
            folder.totalWorks = 0;
            setState({
              ...state,
              folders: [...state.folders, folder],
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

  const getDataIfo = () => {
    if (state.folders.length) {
      return { folders: state.folders, folderInfo: state.folderInfo };
    } else {
      return { folders, folderInfo: count };
    }
  };

  const handleCSVUploadSuccess = () => {};

  const handleCSVUploadHide = () => {
    setState({ ...state, showUpload: false });
  };

  const handleCSVUploadButtonClick = () => {
    setState({ ...state, showUpload: true });
  };

  const foldernameFormatter = (name: string) => {
    if (name.length < 20) {
      return name;
    }
    return "".concat(name.substring(0, 20), "...");
  };
  useEffect(() => {
    setState({ ...state, folders: folders, folderInfo: count });
  }, [folders]);
  return (
    <section className={styles.ownedNewWork_contain}>
      <div className={styles.licensed_header}>
        <h1>
          My Owned Works - <span>{getDataIfo().folderInfo.folders}</span>{" "}
          Folders, <span>{getDataIfo().folderInfo.totalWorks}</span> Works
        </h1>
        <button className={styles.primary_btn} onClick={handleShowNewFolder}>
          New Folder
        </button>
        <button
          className={styles.primary_btn}
          onClick={handleCSVUploadButtonClick}
        >
          + Import CSV
        </button>
      </div>
      <div className={styles.card}>
        <div className={styles.card_inner}>
          {getDataIfo().folders.map((folder, idx) => (
            <div
              className={styles.card_box}
              key={idx}
              onDoubleClick={() => handleFolderOpen(folder.folderId)}
            >
              <div className={styles.img_box}>
                <Image src={closeFolderImg} alt="folder" />
              </div>
              <h4>{foldernameFormatter(folder.name)}</h4>
              <p>{folder.totalWorks} Works</p>
            </div>
          ))}
        </div>
      </div>
      <Modal
        show={state.showCreateFolder}
        size="sm"
        className={`${styles.Modal_contain_inner} ${styles.generate_modal} nml_modal generate_modal`}
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
          <Modal.Footer>
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
      <FileUploadPopup
        showUpload={state.showUpload}
        handleHide={handleCSVUploadHide}
        onSuccess={handleCSVUploadSuccess}
      />
    </section>
  );
}

export default OwnedWorksFolder;

type IFileUploadProp = {
  showUpload: boolean;
  handleHide: () => void;
  onSuccess: (data: any) => void;
};
function FileUploadPopup({
  showUpload,
  handleHide,
  onSuccess,
}: IFileUploadProp) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const [state, setState] = useState<{ file?: File; isUploading: boolean }>({
    isUploading: false,
  });
  const dropZoneChangeHandler = (value: File[]) => {
    const file = value[0];
    if (file && file.type === "text/csv") {
      setState({ ...state, file: file });
    }
  };
  const handleFileUpload = () => {
    const formData = new FormData();
    if (state.file) formData.append("file", state.file);
    setState({ ...state, isUploading: true });
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/works/import`, formData, {
        headers: {
          Authorization: `Bearer ${session?.user.access}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const result = response.data as IMessageResponse;
        if (result.success) {
          toast.success(result.data.message);
          setState({ ...state, isUploading: false });
          handleModalHiddenOnClick();
        } else {
          toast.error("Something went wrong");
          setState({ ...state, isUploading: false });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        setState({ ...state, isUploading: false });
      });
  };

  const handleFileBrowserClick = () => {
    uploadRef.current?.click();
  };

  const handleModalHiddenOnClick = () => {
    setState({ ...state, file: undefined });
    handleHide();
  };

  return (
    <Modal
      className={`${styles_modal.Modal_contain_inner} nml_modal assets_modal`}
      show={showUpload}
      onHide={handleModalHiddenOnClick}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={styles_modal.header}></Modal.Header>
      <Modal.Body className={styles_modal.modal_body}>
        <DragAndDrop useInput={false} onChange={dropZoneChangeHandler}>
          <div className={styles_modal.image_upload} id={styles_modal.dsc_h}>
            {state.file ? (
              <>
                <Image src={CsvIcon} alt="csv icon"></Image>
                <div style={{ color: "white" }}>{state.file.name}</div>
              </>
            ) : (
              <>
                <Image src={uploadImg} alt="" />
                <h6>{`Drag and drop your CSV file`}</h6>
                <span className={styles_modal.or}>Or</span>
                <input
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files) dropZoneChangeHandler(Array.from(files));
                  }}
                  style={{ display: "none" }}
                  accept=".csv"
                  ref={uploadRef}
                ></input>
                <button
                  className={styles_modal.blue_b_btn}
                  type="button"
                  onClick={handleFileBrowserClick}
                >
                  Browse file
                </button>
              </>
            )}
          </div>
        </DragAndDrop>
        <button
          className={styles_modal.primary_btn}
          disabled={!state.file}
          onClick={handleFileUpload}
        >
          {state.isUploading ? (
            <Image src={EclipseLoader} alt="loader" height={30} width={30} />
          ) : (
            <>Upload</>
          )}
        </button>
      </Modal.Body>
    </Modal>
  );
}
