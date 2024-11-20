import React, {
  ChangeEvent,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IRegisterWorkContextType } from "@/@types/ContextTypes";
import {
  IRegisterWorkType,
  IAssetGroupDataType,
  IWorkCreateResult,
} from "@/@types/WorkTypes";
import { IMessageResponse, Response } from "@/@types/CommonTypes";
import uploadImg from "/public/assets/images/upload_plus.svg";
import arrowDown from "/public/assets/images/acco_dwn.svg";
import RegisterWorkContext from "@/context/WorkContext";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
// import styles from "..RegNewWork.module.scss";
import styles from "../RegNewWork.module.scss";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import toast from "react-hot-toast";
import * as yup from "yup";
import TagInput from "@/components/TagInput/TagInput";
import SaveWorkFolderModal from "@/components/Modal/SaveWorkFolderModal";

/** create work */
type IWorkCreateProps = {
  createSubmitReference: React.RefObject<HTMLButtonElement>;
  section: string | null;
  workDetails: any | null;
};

type ICreateWorkState = {
  canShowFolderBrowser: boolean;
  formData?: object;
  likenessTypes: string[];
};

const schema = yup.object().shape({
  workName: yup.string().required("Work name is required"),
  likeType: yup.string().required("Likeness type is required"),
  workDescription: yup.string().required("Work description is required"),
  workKeywords: yup.array(),
  // .of(yup.string().required("Each keyword must be a string"))
  // .min(1, "At least one keyword is required")
  // .required("work keywords are required"),
  thumbnailImage: yup
    .mixed()
    .test("is-array", "Please choose image", (value) => {
      if (typeof value === "string" || Array.isArray(value)) {
        return true;
      }
      return false;
    })
    .test(
      "type",
      "Only the following formats are accepted: .jpeg, .jpg and .png",
      (value) => {
        if (typeof value === "string") {
          return true;
        }
        return (
          Array.isArray(value) &&
          (value[0].type === "image/jpeg" ||
            value[0].type === "image/jpg" ||
            value[0].type === "image/png")
        );
      }
    )
    .test("fileSize", "The file is too large", (value) => {
      // Skip validation if no file is selected
      if (typeof value === "string") {
        return true;
      }
      return Array.isArray(value) && value[0].size <= 10 * 1024 * 1024; // 10MB
    }),
  copyRightNumber: yup.string().optional(),
  certificate: yup.string().optional(),
});

export function CreateWork({
  createSubmitReference,
  section,
  workDetails,
}: IWorkCreateProps) {
  const { data: session, status } = useSession();
  const [thumbnailImage, setThumbnailImage] = useState<string | null>(
    workDetails.image
  );
  const [state, setState] = useState<ICreateWorkState>({
    canShowFolderBrowser: false,
    formData: undefined,
    likenessTypes: [],
  });
  const workContext = useContext(RegisterWorkContext);
  const workContextData = workContext as IRegisterWorkContextType;
  const {
    register,
    setValue,
    trigger,
    control,
    getValues,
    setError,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const uploadRef = useRef<HTMLInputElement>(null);
  const certificateRef = useRef<HTMLInputElement>(null);

  const certificateNameRef = useRef<HTMLDivElement>(null);

  const isEnabled = useMemo(() => {
    switch (section) {
      case "brand-guidelines":
        return false;
      case "contract-offers":
        return false;
      case "edit-work":
        return true;
      default:
        return true;
    }
  }, [section]);

  const dropZoneChangeHandler = (value: File[]) => {
    const file = value[0];
    if (file && file.type.startsWith("image/")) {
      setValue("thumbnailImage", value);
      const reader = new FileReader();

      reader.onload = (e) => {
        setThumbnailImage(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
    trigger("thumbnailImage");
  };

  const handleCertificateClick = () => {
    if (certificateRef.current) {
      certificateRef.current.click();
    }
  };
  const handleCertificateInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    if (files?.length) {
      const selectedFile = files[0];
      if (selectedFile && certificateNameRef.current) {
        certificateNameRef.current.innerText = selectedFile.name;
      }
    }
  };

  const handleUploadCertificateClick = () => {
    const value = certificateRef.current?.files?.[0];
    if (value) {
      if (status === "authenticated") {
        const bodyData = new FormData();
        bodyData.append("image", value);
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/works/upload`, bodyData, {
            headers: {
              Authorization: `Bearer ${session.user.access}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            const result = response.data;
            if (result.success) {
              const { data } = result;
              setValue("certificate", data.uploadUrl);
              toast.success("Certificate uploaded");
            } else {
              toast.error("Upload failed");
            }
          })
          .catch((error) => toast.error("Upload failed"));
      }
    }
  };

  const handleUpdateCopyRightClick = () => {
    const value = getValues("copyRightNumber");
    if (!value) {
      // setError("copyRightNumber", {
      //   type: "custom",
      //   message: "Copyright number is required",
      // });
      toast.error("Copyright number is required");
      return;
    }
    if (!workContext?.workId) {
      createSubmitReference.current?.click();
    } else {
      if (status === "authenticated") {
        axios
          .patch(
            `${process.env.NEXT_PUBLIC_API_URL}/works/owned/${workContext?.workId}`,
            { copyRightNumber: value },
            {
              headers: {
                Authorization: `Bearer ${session.user.access}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            const result = response.data;
            if (result.success) {
              const { data } = result;
              // toast.success("Work saved successfully", { id: toastId });
            } else {
              const { data } = result;
              // toast.error("saving work failed", { id: toastId });
            }
          })
          .catch((error) => {
            // toast.error("saving work failed", { id: toastId });
          });
      }
    }
  };

  const handleUploadClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
    // event.stopPropagation();
    // event.preventDefault();
  };

  const handleFolderBrowserModalHide = () => {
    setState({ ...state, canShowFolderBrowser: false });
  };

  const folderSelectionPopUpHandler = (folderId: string) => {
    const { formData } = state;
    let dataForSubmission = { folder: folderId };
    if (formData)
      dataForSubmission = { ...(formData as Object), ...dataForSubmission };
    submitData(dataForSubmission);
  };

  const submitHandler = (data: any) => {
    if (!workContext?.workId) {
      setState({ ...state, canShowFolderBrowser: true, formData: data });
    } else {
      submitData(data);
    }
  };

  const submitData = (data: any) => {
    console.log("datadatadata", data);

    const bodyData = new FormData();
    bodyData.append("name", data.workName);
    bodyData.append("likeType", data.likeType);
    bodyData.append("description", data.workDescription);
    if (typeof data.thumbnailImage != "string") {
      const image = data.thumbnailImage[0];
      bodyData.append("image", image);
    }
    if (data.workKeywords) {
      data.workKeywords.forEach((keyword: string) => {
        bodyData.append("keywords[]", keyword);
      });
    }
    if (data.copyRightNumber) {
      bodyData.append("copyRightNumber", data.copyRightNumber);
    }
    if (data.certificate) {
      bodyData.append("legalClearance", data.certificate);
    }
    if (!workContext?.workId) {
      bodyData.append("status", "draft");
      if (data.folder) {
        bodyData.append("folder", data.folder);
      }
    } else {
      bodyData.append("status", "completed");
    }

    if (status === "authenticated") {
      const toastId = toast.loading("Please wait..");
      if (!workContext?.workId) {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/works`, bodyData, {
            headers: {
              Authorization: `Bearer ${session.user.access}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            const result: Response<IWorkCreateResult> = response.data;
            if (result.success) {
              const { data } = result;
              workContext?.updateWorkState(data);
              toast.success("Work saved as draft successfully", {
                id: toastId,
              });
            } else {
              const { data } = result;
              toast.error("Saving work draft failed", { id: toastId });
            }
          })
          .catch((error) => {
            toast.error("Saving work draft failed", { id: toastId });
            // console.log(error.response);
          });
      } else {
        axios
          .patch(
            `${process.env.NEXT_PUBLIC_API_URL}/works?work=${workContext?.workId}`,
            bodyData,
            {
              headers: {
                Authorization: `Bearer ${session.user.access}`,
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            const result: Response<IWorkCreateResult> = response.data;
            if (result.success) {
              const { data } = result;
              workContext?.updateWorkState(data);
              toast.success("Work saved successfully", { id: toastId });
            } else {
              const { data } = result;
              toast.error("Saving work failed", { id: toastId });
            }
          })
          .catch((error) => {
            toast.error("Saving work failed", { id: toastId });
            // console.log(error.response);
          });
      }
    }
  };

  useEffect(() => {
    if (section && workDetails && workDetails.worksId && !workContext?.workId) {
      workContextData.workId = workDetails.worksId;
      setThumbnailImage(workDetails.image);
      const initialData = {
        workName: workDetails.name,
        likeType: workDetails.likeType,
        workDescription: workDetails.description,
        workKeywords: workDetails.keywords,
        thumbnailImage: workDetails.image,
        copyRightNumber: workDetails.copyRightNumber,
        certificate: workDetails.legalClearance,
      };
      reset(initialData);
      setState({ ...state, formData: initialData });
    } else {
      workContextData.workId = undefined;
    }
  }, [section, workDetails]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/works/likenessType`)
      .then((response) => {
        const result: Response<{ likenessType: string[] }> = response.data;
        if (result.success) {
          const { data } = result;
          setState((prev) => ({ ...prev, likenessTypes: data.likenessType }));
        }
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={styles.card}>
          <h2>Work Details</h2>
          <div className="row">
            <div className="col-md-3 col-lg-2">
              <div className={styles.upload_contain}>
                <div className={styles.image_upload}>
                  <div className={styles.image_upload_inner}>
                    {!thumbnailImage && isEnabled && (
                      <>
                        <button type="button" onClick={handleUploadClick}>
                          <div className={styles.uplode_icon_outer}>
                            <Image
                              src={uploadImg}
                              className={styles.uplode_icon}
                              alt=""
                              width={500}
                              height={500}
                            />
                            <span>Thumbnail</span>
                          </div>
                        </button>
                      </>
                    )}
                    {thumbnailImage && isEnabled ? (
                      <button
                        className={styles.upload_preview_img}
                        type="button"
                        onClick={handleUploadClick}
                      >
                        <Image
                          src={thumbnailImage}
                          alt=""
                          width={500}
                          height={500}
                        />
                      </button>
                    ) : !isEnabled && workDetails.image ? (
                      <button
                        className={styles.upload_preview_img}
                        type="button"
                        onClick={handleUploadClick}
                      >
                        <Image
                          src={workDetails.image}
                          alt=""
                          width={500}
                          height={500}
                        />
                      </button>
                    ) : null}
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      {...register("thumbnailImage")}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const files = e.target.files;
                        if (files) dropZoneChangeHandler(Array.from(files));
                      }}
                      style={{ display: "none" }}
                      ref={uploadRef}
                    />
                  </div>
                </div>
                {errors.thumbnailImage && (
                  <span style={{ color: "red" }}>
                    {errors.thumbnailImage.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-4 col-lg-5">
              <div className={styles.form_flex}>
                <div className={styles.normal_form}>
                  <input
                    className={styles.inputfld}
                    type="text"
                    placeholder="Enter Work Name"
                    {...register("workName")}
                  />
                  {errors.workName && (
                    <span style={{ color: "red" }}>
                      {errors.workName.message}
                    </span>
                  )}
                </div>
                <div className={styles.normal_form} id={styles.advance_box}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Select
                      aria-label="Tattoo style"
                      className=""
                      id={styles.form_control}
                      {...register("likeType")}
                      disabled={!isEnabled}
                    >
                      <option
                        className={styles.disbled}
                        value=""
                        disabled
                        selected
                      >
                        Likeness Type
                      </option>
                      {state.likenessTypes.map((likeType, index) => (
                        <option key={index} value={likeType}>
                          {likeType}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  {errors.likeType && (
                    <span style={{ color: "red" }}>
                      {errors.likeType.message}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.textareafld_contain}>
                <textarea
                  className={styles.textareafld}
                  placeholder="Enter Work Description"
                  {...register("workDescription")}
                ></textarea>
                {errors.workDescription && (
                  <span style={{ color: "red" }}>
                    {errors.workDescription.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-5 col-lg-5">
              <div className={styles.reg_right_box}>
                <div className={styles.new_flex}>
                  <div className={styles.new_flex_tex}>
                    <div className={styles.normal_form}>
                      <input
                        className={styles.inputfld}
                        type="text"
                        // placeholder="Copyright registration number"
                        placeholder="Copyright #"
                        {...register("copyRightNumber")}
                      />
                    </div>
                    {errors.copyRightNumber && (
                      <span style={{ color: "red" }}>
                        {errors.copyRightNumber.message}
                      </span>
                    )}
                  </div>
                  <div className={styles.new_flex_btn}>
                    <button
                      className={`${styles.add_bt} ${styles.big_btn}`}
                      type="button"
                      onClick={handleUpdateCopyRightClick}
                    >
                      {/* File Copyright */}
                      Add
                    </button>
                  </div>
                </div>

                <div className={styles.new_flex}>
                  <div className={styles.new_flex_tex}>
                    <div className={styles.normal_form}>
                      <div
                        className={styles.inputfld}
                        ref={certificateNameRef}
                        onClick={handleCertificateClick}
                      >
                        {/* Legal Certificate */}
                        Chain of Title
                      </div>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        ref={certificateRef}
                        onChange={handleCertificateInputChange}
                      />
                    </div>
                  </div>
                  <div className={styles.new_flex_btn}>
                    <button
                      className={`${styles.primary_btn} ${styles.big_btn}`}
                      type="button"
                      onClick={handleUploadCertificateClick}
                    >
                      Upload ...
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`${styles.Keywords} ${styles.textareafld_contain}`}
              >
                <Controller
                  control={control}
                  name="workKeywords"
                  render={({ field: { onChange } }) => (
                    <TagInput
                      showInput={true}
                      className={styles.textareafld}
                      styleName=""
                      onChange={onChange}
                      value={section ? workDetails?.keywords : undefined}
                    />
                  )}
                />
                {errors.workKeywords && (
                  <span style={{ color: "red" }}>
                    {errors.workKeywords.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          {isEnabled && (
            <button
              className={styles.primary_btn}
              style={{ display: "none" }}
              type="submit"
              ref={createSubmitReference}
            >
              Save Draft
            </button>
          )}
        </div>
      </form>
      <SaveWorkFolderModal
        showModal={state.canShowFolderBrowser}
        selectedFolderCallback={folderSelectionPopUpHandler}
        handleHide={handleFolderBrowserModalHide}
      />
    </>
  );
}
