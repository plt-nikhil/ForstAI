"use client";
import styles from "./Generate.module.scss";
import Image from "next/image";
import descr_user from "/public/assets/images/profile.png";
import upload from "/public/assets/images/upload.svg";
import g_1 from "/public/assets/images/g_1.png";
import loader from "/public/assets/images/aiLoader.webp";
import close from "/public/assets/images/close.svg";
import Form from "react-bootstrap/Form";
import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import DragAndDrop from "../FileInput/DropZoneFileInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMessageResponse, Response } from "@/@types/CommonTypes";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
const schema = yup.object().shape({
  image: yup
    .mixed()
    .test("is-array", "Please choose image", (value) => {
      if (Array.isArray(value)) {
        return true;
      }
      return false;
    })
    .test(
      "type",
      "Only the following formats are accepted: .jpeg, .jpg and .png",
      (value) => {
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
      return Array.isArray(value) && value[0].size <= 10 * 1024 * 1024; // 10MB
    }),
  promptId: yup.string().required("Prompt id required"),
});
function Generate() {
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { data: session, status } = useSession();
  const uploadRef = useRef<HTMLInputElement>(null);
  const [inputImage, setInputImage] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [state, setState] = useState<{
    toastId: string | null;
    isGenerating: string | null;
    requestId: string | null;
    imageUrl: string | null;
  }>({
    toastId: null,
    isGenerating: null,
    requestId: null,
    imageUrl: null,
  });

  const handleUploadClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
    event.stopPropagation();
    event.preventDefault();
  };

  const dropZoneChangeHandler = (value: File[]) => {
    const file = value[0];
    if (file && file.type.startsWith("image/")) {
      setValue("image", value);
      const reader = new FileReader();

      reader.onload = (e) => {
        setInputImage(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
    trigger("image");
  };

  const handleImageRemove = () => {
    setInputImage(null);
    setValue("image", undefined);
  };
  const handleCancelGenerate = () => {
    if (state.toastId) {
      toast.error("Aborted", {
        id: state.toastId as string,
      });
      setState({
        ...state,
        toastId: null,
        isGenerating: null,
        requestId: null,
      });
    }
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/generate/status/${state.requestId}`
        );
        if (response.status == 200) {
          const result = response.data as Response<{ url: string }>;
          const { data } = result;
          window.clearInterval(intervalRef.current as number);
          toast.success("Image Generated successfully", {
            id: state.toastId as string,
          });
          setState({
            ...state,
            isGenerating: "completed",
            requestId: null,
            imageUrl: data.url,
            toastId: null,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (state.requestId) {
      fetchData();
      intervalRef.current = window.setInterval(fetchData, 5000);
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [state.requestId]);

  const submitHandler = (data: any) => {
    const bodyData = new FormData();
    const image = data.image[0];
    bodyData.append("image", image);
    bodyData.append("promptId", data.promptId);
    if (status === "authenticated") {
      const toastId = toast.loading("Please wait..");
      setState({ ...state, toastId: toastId });
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/generate`, bodyData, {
          headers: {
            Authorization: `Bearer ${session.user.access}`,
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000,
        })
        .then((response) => {
          const result = response.data;
          if (result.success) {
            const { data } = result as Response<{ requestId: string }>;
            toast.loading("Generating...", { id: toastId });
            setState({
              ...state,
              isGenerating: "generating",
              toastId: toastId,
              requestId: data.requestId,
            });
          } else {
            const { data } = result as IMessageResponse;
            toast.error(data.message, { id: toastId });
          }
        })
        .catch((error) => {
          if (error.code === "ECONNABORTED") {
            toast.error("Request timed out", { id: toastId });
          } else {
            toast.error("Request failed", { id: toastId });
          }
          setState({
            ...state,
            isGenerating: null,
            toastId: null,
            requestId: null,
          });
        });
    }
  };

  return (
    <section className={styles.licensedwork}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <h4>Generate Image</h4>
          </div>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="col-md-12">
              <div className={styles.advanced_search_outer}>
                <div className="row">
                  <div className="col-md-12">
                    <h5>Image Generator</h5>
                  </div>
                  <div className="col-md-12">
                    <div className={styles.description_outer}>
                      <div className={styles.description} id={styles.dsc_h}>
                        <div className={styles.description_ul}>
                          <ul>
                            <li>
                              <input
                                {...register("promptId")}
                                type="radio"
                                name="promptId"
                                id="neanderthal"
                                value={1}
                                className={styles.radio_style}
                              />
                              <label htmlFor="neanderthal">Neanderthal</label>
                            </li>
                            <li>
                              <input
                                {...register("promptId")}
                                type="radio"
                                name="promptId"
                                id="spaceExplorer"
                                value={2}
                                className={styles.radio_style}
                              />
                              <label htmlFor="spaceExplorer">
                                Space explorer
                              </label>
                            </li>
                            <li>
                              <input
                                {...register("promptId")}
                                type="radio"
                                name="promptId"
                                id="pgaPlayer"
                                value={3}
                                className={styles.radio_style}
                              />
                              <label htmlFor="pgaPlayer">PGA golf player</label>
                            </li>
                            <li>
                              <input
                                {...register("promptId")}
                                type="radio"
                                name="promptId"
                                id="nikeFbPlayer"
                                value={4}
                                className={styles.radio_style}
                              />
                              <label htmlFor="nikeFbPlayer">
                                Nike football player
                              </label>
                            </li>
                            <li>
                              <input
                                {...register("promptId")}
                                type="radio"
                                name="promptId"
                                id="hmModel"
                                value={5}
                                className={styles.radio_style}
                              />
                              <label htmlFor="hmModel">H&M fashion model</label>
                            </li>
                          </ul>
                        </div>
                        {errors.promptId && (
                          <p style={{ color: "red" }}>
                            {errors.promptId.message}
                          </p>
                        )}
                      </div>

                      <div className={styles.or} id={styles.dsc_h}>
                        Or
                      </div>
                      <DragAndDrop
                        useInput={false}
                        onChange={dropZoneChangeHandler}
                      >
                        {inputImage ? (
                          <Image
                            src={inputImage}
                            alt=""
                            width={500}
                            height={500}
                          />
                        ) : (
                          <div
                            className={styles.image_upload}
                            id={styles.dsc_h}
                          >
                            <>
                              <Image src={upload} alt="" />
                              <h6> Drag and drop or Choose an image</h6>
                              <button
                                className={styles.blue_b_btn}
                                onClick={handleUploadClick}
                              >
                                Choose an Image
                              </button>
                            </>
                          </div>
                        )}
                        <input
                          type="file"
                          {...register("image")}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const files = e.target.files;
                            if (files) dropZoneChangeHandler(Array.from(files));
                          }}
                          style={{ display: "none" }}
                          ref={uploadRef}
                        ></input>
                      </DragAndDrop>
                      {errors.image && (
                        <p style={{ color: "red" }}>{errors.image.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-4 justify-content-center">
                  {state.isGenerating === "generating" && (
                    <div className="col-sm-6 col-md-4 col-lg-3">
                      <Image src={loader} alt="loader" />
                    </div>
                  )}
                  {state.isGenerating === "completed" && (
                    <div className="col-sm-6 col-md-4 col-lg-3">
                      <Image
                        src={state.imageUrl as string}
                        alt="image"
                        width={500}
                        height={500}
                      />
                    </div>
                  )}
                </div>
                <div className="row mt-4">
                  <div className="col-lg-8  col-md-8  mb-4">
                    <div className={styles.personal_likeness}>
                      <h4>
                        Personal Likeness{" "}
                        <span>
                          <Link href="#">View all</Link>
                        </span>
                      </h4>
                      <div className={styles.personal_likeness_box}>
                        <ul>
                          <li>
                            <Image src={g_1} alt="" />
                            <p>Cartoon 3D</p>
                          </li>
                          <li>
                            <Image src={g_1} alt="" />
                            <p>Cartoon 3D</p>
                          </li>
                          <li>
                            <Image src={g_1} alt="" />
                            <p>Cartoon 3D</p>
                          </li>
                          <li>
                            <Image src={g_1} alt="" />
                            <p>Cartoon 3D</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4  mb-4">
                    <div className={styles.personal_likeness}>
                      <h4>
                        Brand Overlay{" "}
                        <span>
                          <Link href="#">View all</Link>
                        </span>
                      </h4>
                      <div className={styles.personal_likeness_box}>
                        <ul>
                          <li>
                            <Image src={g_1} alt="" />
                            <p>Cartoon 3D</p>
                          </li>
                          <li>
                            <Image src={g_1} alt="" />
                            <p>Cartoon 3D</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.card_dash_box_r}>
                <button
                  className={styles.blue_b_btn}
                  onClick={handleCancelGenerate}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className={styles.red_b_btn}
                  disabled={state.toastId ? true : false}
                  type="submit"
                >
                  Generate
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Generate;
