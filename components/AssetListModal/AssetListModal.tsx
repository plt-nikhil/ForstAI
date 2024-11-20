import styles from "./AssetListModal.module.scss";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import DragAndDrop from "../FileInput/DropZoneFileInput";
import uploadImg from "/public/assets/images/upload.svg";
import {
  ChangeEvent,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { IMessageResponse, Response } from "@/@types/CommonTypes";
import RegisterWorkContext from "@/context/WorkContext";
import WorkAssetsContext from "@/context/CommonContext";
import toast from "react-hot-toast";
import EclipseLoader from "/public/assets/images/EclipseLoader.svg";

type IAssetListModal = {
  showModal: boolean;
  handleHide: () => void;
  onSuccess: (data: any) => void;
  fileType: string;
};

type IAssetCreationSuccess = {
  assetId: string;
  fileName: string;
  type: string;
  url: string;
};

function AssetListModal({
  showModal,
  handleHide,
  onSuccess,
  fileType,
}: IAssetListModal) {
  const { data: session, status } = useSession();
  const workContext = useContext(RegisterWorkContext);
  const workAssetContext = useContext(WorkAssetsContext);
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [shortUud, setShortUUD] = useState<any>();
  const [shortUUDError, setShortUUDError] = useState<any>();
  const [state, setState] = useState<{
    file?: File | any;
    isUploading: boolean;
  }>({
    file: undefined,
    isUploading: false,
  });
  console.log("fileType", fileType);
  const fileFormats = useMemo(() => {
    switch (fileType) {
      case "Image":
        return "image/jpeg, image/png";
      case "Audio":
        return "audio/*";
      case "Video":
        return "video/*";
      case "GenAI":
        return ".safetensors";
      default:
        return "image/*";
    }
  }, [fileType]);

  const uploadRef = useRef<HTMLInputElement>(null);

  function isValidFile(file: File[] | any) {
    return file.name.split(".").pop() === "safetensors";
  }
  const dropZoneChangeHandler = (value: File[] | any) => {
    const fileType = getFileType();

    if (fileType === "safetensors" && !shortUud) {
      setShortUUDError("Shhort UUD/Trigger is requred");
    }

    if (typeof value === "string" && fileType === "safetensors") {
      setState({ ...state, file: value });
      return;
    }

    const file = value[0];
    if (fileType === "image") {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setInputImage(e.target?.result as string);
          setState({ ...state, file: file });
        };
        reader.readAsDataURL(file);
      }
    } else if (fileType === "video") {
      if (file && file.type.startsWith("video/")) {
        setState({ ...state, file: file });
      }
    } else if (fileType === "audio") {
      if (file && file.type.startsWith("audio/")) {
        setState({ ...state, file: file });
      }
    } else if (fileType === "safetensors") {
      if (file && isValidFile(file)) {
        setState({ ...state, file: file });
      }
    }
  };

  const handleFileBrowserClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
    event.stopPropagation();
    event.preventDefault();
  };

  const getFileType = () => {
    let fileFormat = "image";
    switch (fileType) {
      case "Video":
        fileFormat = "video";
        break;
      case "Audio":
        fileFormat = "audio";
      case "GenAI":
        fileFormat = "safetensors";
        break;
    }
    return fileFormat;
  };
  // const getFileNameFromURL = (url: string) => url.split("/").pop();
  const UploadPreview = () => {
    switch (getFileType()) {
      case "image":
        return (
          <Image src={inputImage as string} height={500} width={500} alt="" />
        );
      case "video":
        return <div style={{ color: "white" }}>{state.file?.name}</div>;
      case "audio":
        return <div style={{ color: "white" }}>{state.file?.name}</div>;
      case "safetensors":
        return (
          <div style={{ color: "white" }}>{state.file?.name || state.file}</div>
        );
      default:
        return <div>Invalid file type</div>;
    }
  };

  const handleFileUpload = () => {
    if (!shortUud && getFileType() === "safetensors") {
      setShortUUDError("Shhort UUD/Trigger is requred");
      return;
    }
    const bodyData = new FormData();
    const image = state.file as File;
    const fileType =
      getFileType() === "safetensors" ? "genAiModel" : getFileType();

    if (typeof image === "string") {
      bodyData.append("image", "");
      bodyData.append("url", image);
    } else {
      bodyData.append("image", image);
    }
    bodyData.append("type", fileType);
    bodyData.append("triggerWord", shortUud);
    bodyData.append(
      "assetGroup",
      workAssetContext?.selectedAssetGroup?.assetGroupId as any
    );

    if (status === "authenticated") {
      const toastId = toast.loading("Please Wait");
      setState({ ...state, isUploading: true });
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/works/owned/${workContext?.workId}/asset/create`,
          bodyData,
          {
            headers: {
              Authorization: `Bearer ${session.user.access}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          const result = response.data;
          if (result.success) {
            const { data } = result as Response<IAssetCreationSuccess>;
            toast.success("Asset uploaded successfully", { id: toastId });
            onSuccess(data);
            handleHide();
          } else {
            const { data } = result as IMessageResponse;
            toast.error(data.message, { id: toastId });
          }
          setState({ ...state, isUploading: false });
        })
        .catch((error) => {
          toast.error("Asset upload failed", { id: toastId });
          setState({ ...state, isUploading: false });
        });
    }
  };

  useEffect(() => {
    if (!showModal) {
      setState({ file: undefined, isUploading: false });
      setInputImage(null);
    }
  }, [showModal]);

  const getFileCheck = () => {
    if (getFileType() == "safetensors") {
      if (shortUud) {
        return true;
      } else {
        return;
      }
    } else {
      return true;
    }
  };

  const onClose = () => {
    setShortUUD(null);
    setShortUUDError(null);
    handleHide();
  };

  return (
    <div className={`${styles.Modal_contain}`}>
      <Modal
        className={`${styles.Modal_contain_inner} nml_modal assets_modal`}
        show={showModal}
        onHide={onClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className={styles.header}></Modal.Header>
        <Modal.Body className={styles.modal_body}>
          <DragAndDrop useInput={false} onChange={dropZoneChangeHandler}>
            <div className={styles.image_upload} id={styles.dsc_h}>
              {state.file && getFileCheck() ? (
                <UploadPreview />
              ) : (
                <>
                  <Image src={uploadImg} alt="" />
                  {getFileType() == "safetensors" ? (
                    <>
                      <h6>
                        {`Drag and drop your ${getFileType()} file`} or <br />
                        You can copy and paste the URL here, or simply write it
                        out.
                      </h6>
                      <div
                        className="form-group theme-form-group"
                        style={{
                          color: "black",
                          maxWidth: "90%",
                          margin: "0px auto",
                          width: "100%",
                        }}
                      >
                        <label className="text-white text-sm">URL</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ color: "black" }}
                          onChange={(e) =>
                            dropZoneChangeHandler(e.target.value)
                          }
                        />
                      </div>

                      <div
                        className="form-group theme-form-group"
                        style={{
                          color: "black",
                          maxWidth: "90%",
                          margin: "0px auto",
                          width: "100%",
                        }}
                      >
                        <label className="text-white text-sm">
                          Short UUD/Trigger
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ color: "black" }}
                          onChange={(e) => {
                            setTimeout(() => {
                              setShortUUD(e.target.value);
                            }, 1000);
                            if (e.target.value) {
                              setShortUUDError(null);
                            }
                          }}
                        />
                        {shortUUDError && (
                          <span style={{ color: "red" }}>{shortUUDError}</span>
                        )}
                      </div>
                    </>
                  ) : (
                    <h6>{`Drag and drop your ${getFileType()} file`}</h6>
                  )}
                  <span className={styles.or}>Or</span>
                  <input
                    type="file"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const files = e.target.files;
                      if (files) dropZoneChangeHandler(Array.from(files));
                    }}
                    style={{ display: "none" }}
                    ref={uploadRef}
                    accept={fileFormats}
                  ></input>
                  <button
                    className={styles.blue_b_btn}
                    type="button"
                    onClick={handleFileBrowserClick}
                  >
                    Choose {getFileType()}
                  </button>
                </>
              )}
            </div>
          </DragAndDrop>
          <button
            className={styles.primary_btn}
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
    </div>
  );
}

export default AssetListModal;

// import styles from "./AssetListModal.module.scss";
// import Modal from "react-bootstrap/Modal";
// import Image from "next/image";
// import DragAndDrop from "../FileInput/DropZoneFileInput";
// import uploadImg from "/public/assets/images/upload.svg";
// import {
//   ChangeEvent,
//   MouseEvent,
//   useContext,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { useSession } from "next-auth/react";
// import axios from "axios";
// import RegisterWorkContext from "@/context/WorkContext";
// import WorkAssetsContext from "@/context/CommonContext";
// import toast from "react-hot-toast";
// import EclipseLoader from "/public/assets/images/EclipseLoader.svg";

// type IAssetListModal = {
//   showModal: boolean;
//   handleHide: () => void;
//   onSuccess: (data: any) => void;
//   fileType: string;
// };

// type IAssetCreationSuccess = {
//   assetId: string;
//   fileName: string;
//   type: string;
//   url: string;
// };

// function AssetListModal({
//   showModal,
//   handleHide,
//   onSuccess,
//   fileType,
// }: IAssetListModal) {
//   const { data: session, status } = useSession();
//   const workContext = useContext(RegisterWorkContext);
//   const workAssetContext = useContext(WorkAssetsContext);
//   const [shortUud, setShortUUD] = useState<string | null>(null);
//   const [shortUUDError, setShortUUDError] = useState<string | null>(null);
//   const [state, setState] = useState<{
//     files: File[];
//     isUploading: boolean;
//   }>({
//     files: [],
//     isUploading: false,
//   });

//   const fileFormats = useMemo(() => {
//     switch (fileType) {
//       case "Image":
//         return "image/jpeg, image/png";
//       case "Audio":
//         return "audio/*";
//       case "Video":
//         return "video/*";
//       case "GenAI":
//         return ".safetensors";
//       default:
//         return "image/*";
//     }
//   }, [fileType]);

//   const uploadRef = useRef<HTMLInputElement>(null);

//   const dropZoneChangeHandler = (files: File[] | string) => {
//     if (Array.isArray(files)) {
//       const validFiles = files.filter((file) =>
//         file.type.startsWith(fileType.toLowerCase())
//       );
//       setState((prev) => ({
//         ...prev,
//         files: [...prev.files, ...validFiles],
//       }));
//     } else if (typeof files === "string") {
//       setShortUUD(files);
//     }
//   };

//   const handleFileBrowserClick = (event: MouseEvent<HTMLButtonElement>) => {
//     if (uploadRef.current) {
//       uploadRef.current.click();
//     }
//     event.stopPropagation();
//     event.preventDefault();
//   };

//   const getFileType = () => {
//     let fileFormat = "image";
//     switch (fileType) {
//       case "Video":
//         fileFormat = "video";
//         break;
//       case "Audio":
//         fileFormat = "audio";
//         break;
//       case "GenAI":
//         fileFormat = "safetensors";
//         break;
//     }
//     return fileFormat;
//   };

//   const UploadPreview = () => {
//     return (
//       <div className={styles.previewContainer}>
//         {state.files.map((file, index) => (
//           <div key={index} className={styles.previewItem}>
//             {file.type.startsWith("image/") ? (
//               <Image
//                 src={URL.createObjectURL(file)}
//                 height={500}
//                 width={500}
//                 alt={`Preview ${index}`}
//               />
//             ) : (
//               <div style={{ color: "white" }}>{file.name}</div>
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const handleFileUpload = async () => {
//     if (!shortUud && getFileType() === "safetensors") {
//       setShortUUDError("Short UUD/Trigger is required");
//       return;
//     }

//     // const bodyData = new FormData();
//     // const image = state.file as File;
//     // const fileType =
//     //   getFileType() === "safetensors" ? "genAiModel" : getFileType();

//     // if (typeof image === "string") {
//     //   bodyData.append("image", "");
//     //   bodyData.append("url", image);
//     // } else {
//     //   bodyData.append("image", image);
//     // }
//     // bodyData.append("type", fileType);
//     // bodyData.append("triggerWord", shortUud);
//     // bodyData.append(
//     //   "assetGroup",
//     //   workAssetContext?.selectedAssetGroup?.assetGroupId as any
//     // );
//     // console.log("/////", state)

//     console.log("state 45454545", state);

//     return;

//     const bodyData = new FormData();
//     const fileTypeKey = fileType.toLowerCase();
//     const image = state.files as any;
//     if (typeof image === "string") {
//       bodyData.append("image", "");
//       bodyData.append("url", image);
//     } else {
//       state.files.forEach((file, index) => {
//         bodyData.append(`image${index}`, file);
//       });
//       // bodyData.append("image", image);
//     }

//     bodyData.append("type", fileTypeKey);
//     //@ts-ignore
//     bodyData.append("triggerWord", shortUud);
//     bodyData.append(
//       "assetGroup",
//       workAssetContext?.selectedAssetGroup?.assetGroupId as any
//     );

//     if (status === "authenticated") {
//       const toastId = toast.loading("Uploading...");
//       setState({ ...state, isUploading: true });

//       try {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/works/owned/${workContext?.workId}/asset/create`,
//           bodyData,
//           {
//             headers: {
//               Authorization: `Bearer ${session.user.access}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         if (response.data.success) {
//           toast.success("Assets uploaded successfully", { id: toastId });
//           onSuccess(response.data.data);
//           handleHide();
//         } else {
//           toast.error("Failed to upload assets", { id: toastId });
//         }
//       } catch (error) {
//         toast.error("Upload error", { id: toastId });
//       } finally {
//         setState({ files: [], isUploading: false });
//       }
//     }
//   };

//   useEffect(() => {
//     if (!showModal) {
//       setState({ files: [], isUploading: false });
//       setShortUUD(null);
//     }
//   }, [showModal]);

//   const getFileCheck = () => {
//     if (getFileType() === "safetensors") {
//       if (shortUud) {
//         return true;
//       } else {
//         setShortUUDError("Please enter a valid short UUD/Trigger.");
//         return false;
//       }
//     } else {
//       return true;
//     }
//   };

//   const onClose = () => {
//     setShortUUD(null);
//     setShortUUDError(null);
//     handleHide();
//   };

//   return (
//     <div className={`${styles.Modal_contain}`}>
//       <Modal
//         className={`${styles.Modal_contain_inner} nml_modal assets_modal`}
//         show={showModal}
//         onHide={onClose}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton className={styles.header}></Modal.Header>
//         <Modal.Body className={styles.modal_body}>
//           <DragAndDrop useInput={false} onChange={dropZoneChangeHandler}>
//             <div className={styles.image_upload} id={styles.dsc_h}>
//               {state.files.length > 0 && getFileCheck() ? (
//                 <UploadPreview />
//               ) : (
//                 <>
//                   <Image src={uploadImg} alt="" />
//                   {getFileType() === "safetensors" ? (
//                     <>
//                       <h6>
//                         {`Drag and drop your ${getFileType()} file`} or <br />
//                         You can copy and paste the URL here, or simply write it
//                         out.
//                       </h6>
//                       <div
//                         className="form-group theme-form-group"
//                         style={{
//                           color: "black",
//                           maxWidth: "90%",
//                           margin: "0px auto",
//                           width: "100%",
//                         }}
//                       >
//                         <label className="text-white text-sm">URL</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           style={{ color: "black" }}
//                           onChange={(e) =>
//                             dropZoneChangeHandler(e.target.value)
//                           }
//                         />
//                       </div>

//                       <div
//                         className="form-group theme-form-group"
//                         style={{
//                           color: "black",
//                           maxWidth: "90%",
//                           margin: "0px auto",
//                           width: "100%",
//                         }}
//                       >
//                         <label className="text-white text-sm">
//                           Short UUD/Trigger
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           style={{ color: "black" }}
//                           onChange={(e) => {
//                             setTimeout(() => {
//                               setShortUUD(e.target.value);
//                             }, 1000);
//                             if (e.target.value) {
//                               setShortUUDError(null);
//                             }
//                           }}
//                         />
//                         {shortUUDError && (
//                           <span style={{ color: "red" }}>{shortUUDError}</span>
//                         )}
//                       </div>
//                     </>
//                   ) : (
//                     <h6>{`Drag and drop your ${getFileType()} file`}</h6>
//                   )}
//                   <span className={styles.or}>Or</span>
//                   <input
//                     type="file"
//                     multiple
//                     onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                       const files = e.target.files;
//                       if (files) dropZoneChangeHandler(Array.from(files));
//                     }}
//                     style={{ display: "none" }}
//                     ref={uploadRef}
//                     accept={fileFormats}
//                   ></input>
//                   <button
//                     className={styles.blue_b_btn}
//                     type="button"
//                     onClick={handleFileBrowserClick}
//                   >
//                     Choose {getFileType()}
//                   </button>
//                 </>
//               )}
//             </div>
//           </DragAndDrop>
//           <button
//             className={styles.primary_btn}
//             disabled={state.files.length === 0 || !getFileCheck()}
//             onClick={handleFileUpload}
//           >
//             {state.isUploading ? (
//               <Image src={EclipseLoader} alt="loader" height={30} width={30} />
//             ) : (
//               <>Upload</>
//             )}
//           </button>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default AssetListModal;
