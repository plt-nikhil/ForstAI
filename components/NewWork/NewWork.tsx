"use client";
import React, { ChangeEvent, useRef, useState, MouseEvent } from "react";
import styles from "./NewWork.module.scss";
import Image from "next/image";
import upload from "/public/assets/images/upload.svg";
import Form from "react-bootstrap/Form";
import DragAndDrop from "../FileInput/DropZoneFileInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import { IMessageResponse, Response } from "@/@types/CommonTypes";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  likeType: yup.string().required("Like type is required"),
  description: yup.string().required("description is required"),
  name: yup.string().required("name is required"),
  sourceType: yup.string().required("Source type is required"),
  restrictions: yup
    .mixed()
    .test("is-array", "Please choose restriction", (value) => {
      if (Array.isArray(value)) {
        if (value.length) {
          return true;
        }
        return false;
      }
      return false;
    }),
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
  parent: yup.string().required("Please select a parent"),
});
function NewWork() {
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const uploadRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

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
        setProfileImage(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
    trigger("image");
  };
  const performReset = () => {
    reset();
    setProfileImage(null);
  };
  const submitHandler = (data: any) => {
    const bodyData = new FormData();
    const image = data.image[0];
    bodyData.append("name", data.name);
    bodyData.append("likeType", data.likeType);
    bodyData.append("sourceType", data.sourceType);
    bodyData.append("description", data.description);
    bodyData.append("parent", data.parent);
    bodyData.append("image", image);
    data.restrictions.forEach((restriction: string) => {
      bodyData.append("restrictions[]", restriction);
    });
    if (status === "authenticated") {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/works`, bodyData, {
          headers: {
            Authorization: `Bearer ${session.user.access}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const result: IMessageResponse = response.data;
          if (result.success) {
            const { data } = result;
            toast.success(data.message);
            performReset();
          } else {
            const { data } = result;
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };
  return (
    <div className={`${styles.newWork_contain}`}>
      <h1>Register New Work</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="row">
          <div className="col-lg-6">
            <div className={styles.card}>
              <h2>Work Details</h2>
              <div className="row">
                <div className="col-lg-6">
                  <div className={`${styles.normal_form} mb-4`}>
                    <input
                      className={styles.inputfld}
                      type="text"
                      placeholder="Name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p style={{ color: "red" }}>{errors.name.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-lg-6" id={styles.advance_box}>
                  <Form.Group className="mb-4" controlId="parentInput">
                    <Form.Select
                      aria-label="Tattoo style"
                      className=""
                      id={styles.form_control}
                      {...register("parent")}
                    >
                      <option value="" selected disabled>
                        Child of
                      </option>
                      <option value="film">Film</option>
                      <option value="minimalist">Minimalist</option>
                      <option value="watercolor">Watercolor</option>
                      <option value="traditional">Traditional</option>
                    </Form.Select>
                  </Form.Group>
                  {errors.parent && (
                    <p style={{ color: "red" }}>{errors.parent.message}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className={`${styles.normal_form}`}>
                    <textarea
                      className={`${styles.inputfld} ${styles.textareafld}`}
                      {...register("description")}
                      placeholder="Text description of the content (be as descriptive as possible and use keywords)"
                    />
                    {errors.description && (
                      <p style={{ color: "red" }}>
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.card} ${styles.upload_card} mb-4`}>
              <h2>Thumbnail Image</h2>
              <DragAndDrop useInput={false} onChange={dropZoneChangeHandler}>
                {profileImage ? (
                  <Image src={profileImage} alt="" width={500} height={500} />
                ) : (
                  <div className={styles.image_upload} id={styles.dsc_h}>
                    <>
                      <Image src={upload} alt="" width={500} height={500} />
                      <h6>Drag and drop your image</h6>
                      <div className={styles.or}>Or</div>
                      <button
                        onClick={handleUploadClick}
                        className={styles.blue_b_btn}
                      >
                        Browse Here
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
          <div className="col-lg-6">
            <div className={`${styles.card} ${styles.tag_card}`}>
              <h2>Likeness Type</h2>
              <div className={styles.tag_box}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="Personal"
                    {...register("likeType")}
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Personal</div>
                </label>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="Character"
                    {...register("likeType")}
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Character</div>
                </label>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="radio" value="Audio" {...register("likeType")} />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Audio</div>
                </label>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="Video Shot"
                    {...register("likeType")}
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Video Shot</div>
                </label>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="Video Scene"
                    {...register("likeType")}
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Video Scene</div>
                </label>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="Video Title"
                    {...register("likeType")}
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Video Title</div>
                </label>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="Movement"
                    {...register("likeType")}
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Movement</div>
                </label>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="Setting"
                    {...register("likeType")}
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Setting</div>
                </label>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="radio" value="Prop" {...register("likeType")} />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Prop</div>
                </label>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="radio" value="Style" {...register("likeType")} />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Style</div>
                </label>
              </div>
              {errors.likeType && (
                <p style={{ color: "red" }}>{errors.likeType.message}</p>
              )}
            </div>
            <div
              className={`${styles.card} ${styles.tag_card} ${styles.data_type}`}
            >
              <h2>Source Data Type</h2>
              <div className={styles.tag_box}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="Images"
                    {...register("sourceType")}
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Images</div>
                </label>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="Videos"
                    {...register("sourceType")}
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Videos</div>
                </label>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="Audio"
                    {...register("sourceType")}
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Audio</div>
                </label>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="3D Models"
                    {...register("sourceType")}
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>3D Models</div>
                </label>
              </div>
              {errors.sourceType && (
                <p style={{ color: "red" }}>{errors.sourceType.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className={`${styles.card} ${styles.card_bottom}`}>
              <h2>Restriction on Use</h2>
              <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
                <input
                  type="checkbox"
                  {...register("restrictions")}
                  value="No immoral use (nudity, extreme violence, alcohol, drugs,
                  cigarettes, etc.)"
                />
                <div className={styles.checkbox__checkmark}></div>
                <div className={styles.checkbox__body}>
                  No immoral use (nudity, extreme violence, alcohol, drugs,
                  cigarettes, etc.)
                </div>
              </label>
              <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
                <input
                  type="checkbox"
                  {...register("restrictions")}
                  value="No alteration of likeness"
                />
                <div className={styles.checkbox__checkmark}></div>
                <div className={styles.checkbox__body}>
                  No alteration of likeness
                </div>
              </label>
              <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
                <input
                  type="checkbox"
                  {...register("restrictions")}
                  value="No concurrent use with any branded content"
                />
                <div className={styles.checkbox__checkmark}></div>
                <div className={styles.checkbox__body}>
                  No concurrent use with any branded content
                </div>
              </label>
              <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
                <input
                  type="checkbox"
                  {...register("restrictions")}
                  value="No concurrent use with other branded content"
                />
                <div className={styles.checkbox__checkmark}></div>
                <div className={styles.checkbox__body}>
                  No concurrent use with other branded content
                </div>
              </label>
              <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
                <input
                  type="checkbox"
                  {...register("restrictions")}
                  value="Require confirmation before contract"
                />
                <div className={styles.checkbox__checkmark}></div>
                <div className={styles.checkbox__body}>
                  Require confirmation before contract
                </div>
              </label>
              {errors.restrictions && (
                <p style={{ color: "red" }}>{errors.restrictions.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className={styles.footer_btn}>
          <button
            type="reset"
            className={styles.secondary_btn}
            onClick={performReset}
          >
            Cancel
          </button>
          <button type="submit" className={styles.primary_btn}>
            Register Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewWork;
