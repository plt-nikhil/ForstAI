import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Tabs.module.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ModalComp from "@/components/Modal/Modal";
import Button from "react-bootstrap/Button";
import SecurityTab from "./SecurityTab";
import Image from "next/image";
import profileImg from "/public/assets/images/avatar3d.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import axios from "axios";
import { IMessageResponse, Response } from "@/@types/CommonTypes";
import toast from "react-hot-toast";

function NavTabs() {
  return (
    <div className={`${styles.custom_tab} custom_tab`}>
      <Tabs
        defaultActiveKey="account"
        id="uncontrolled-tab-example"
        className={`${styles.tabs_container} account_tab`}
      >
        <Tab
          eventKey="account"
          title={
            <div className={styles.tab_nav}>
              <span className={styles.icon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.50033 0.041687C4.3142 0.041687 2.54199 1.81389 2.54199 4.00002C2.54199 6.18615 4.3142 7.95835 6.50033 7.95835C8.68645 7.95835 10.4587 6.18615 10.4587 4.00002C10.4587 1.81389 8.68645 0.041687 6.50033 0.041687ZM3.79199 4.00002C3.79199 2.50425 5.00455 1.29169 6.50033 1.29169C7.9961 1.29169 9.20866 2.50425 9.20866 4.00002C9.20866 5.49579 7.9961 6.70835 6.50033 6.70835C5.00455 6.70835 3.79199 5.49579 3.79199 4.00002Z"
                    fill="white"
                  />
                  <path
                    d="M11.5003 0.87502C11.1551 0.87502 10.8753 1.15484 10.8753 1.50002C10.8753 1.8452 11.1551 2.12502 11.5003 2.12502C12.5359 2.12502 13.3753 2.96449 13.3753 4.00002C13.3753 5.03555 12.5359 5.87502 11.5003 5.87502C11.1551 5.87502 10.8753 6.15484 10.8753 6.50002C10.8753 6.8452 11.1551 7.12502 11.5003 7.12502C13.2262 7.12502 14.6253 5.72591 14.6253 4.00002C14.6253 2.27413 13.2262 0.87502 11.5003 0.87502Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.06545 10.267C3.23159 9.60065 4.80088 9.20835 6.50033 9.20835C8.19977 9.20835 9.76906 9.60065 10.9352 10.267C12.0837 10.9233 12.9587 11.9251 12.9587 13.1667C12.9587 14.4082 12.0837 15.4101 10.9352 16.0664C9.76906 16.7327 8.19977 17.125 6.50033 17.125C4.80088 17.125 3.23159 16.7327 2.06545 16.0664C0.91699 15.4101 0.0419922 14.4082 0.0419922 13.1667C0.0419922 11.9251 0.91699 10.9233 2.06545 10.267ZM2.68562 11.3523C1.72283 11.9025 1.29199 12.5673 1.29199 13.1667C1.29199 13.7661 1.72283 14.4309 2.68562 14.9811C3.63073 15.5211 4.97811 15.875 6.50033 15.875C8.02254 15.875 9.36992 15.5211 10.315 14.9811C11.2778 14.4309 11.7087 13.7661 11.7087 13.1667C11.7087 12.5673 11.2778 11.9025 10.315 11.3523C9.36992 10.8123 8.02254 10.4584 6.50033 10.4584C4.97811 10.4584 3.63073 10.8123 2.68562 11.3523Z"
                    fill="white"
                  />
                  <path
                    d="M14.1342 10.0562C13.797 9.98226 13.4638 10.1956 13.3898 10.5328C13.3159 10.87 13.5293 11.2032 13.8664 11.2772C14.5268 11.422 15.0545 11.6707 15.4027 11.9557C15.7515 12.2411 15.8753 12.5198 15.8753 12.75C15.8753 12.9589 15.7748 13.2042 15.4977 13.4616C15.2187 13.7209 14.7899 13.9604 14.2368 14.1269C13.9063 14.2264 13.719 14.5751 13.8185 14.9056C13.9181 15.2361 14.2667 15.4234 14.5972 15.3238C15.2827 15.1174 15.8955 14.7982 16.3485 14.3774C16.8034 13.9548 17.1253 13.3989 17.1253 12.75C17.1253 12.0294 16.7301 11.4267 16.1943 10.9883C15.6581 10.5495 14.9358 10.232 14.1342 10.0562Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span>Account</span>
            </div>
          }
        >
          <AccountsSettings />
        </Tab>
        <Tab
          eventKey="security"
          title={
            <div className={styles.tab_nav}>
              <span className={styles.icon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.70866 12.3334C6.70866 11.0677 7.73467 10.0417 9.00033 10.0417C10.266 10.0417 11.292 11.0677 11.292 12.3334C11.292 13.599 10.266 14.625 9.00033 14.625C7.73467 14.625 6.70866 13.599 6.70866 12.3334ZM9.00033 11.2917C8.42503 11.2917 7.95866 11.7581 7.95866 12.3334C7.95866 12.9086 8.42503 13.375 9.00033 13.375C9.57562 13.375 10.042 12.9086 10.042 12.3334C10.042 11.7581 9.57562 11.2917 9.00033 11.2917Z"
                    fill="#D7D8ED"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.37533 6.75233V5.66669C3.37533 2.56009 5.89372 0.041687 9.00033 0.041687C12.1069 0.041687 14.6253 2.56009 14.6253 5.66669V6.75233C14.8144 6.76561 14.9925 6.78292 15.1601 6.80545C15.9102 6.9063 16.5418 7.12205 17.0434 7.62364C17.545 8.12524 17.7607 8.7568 17.8616 9.50689C17.9587 10.2294 17.9587 11.148 17.9587 12.2876V12.3791C17.9587 13.5187 17.9587 14.4373 17.8616 15.1598C17.7607 15.9099 17.545 16.5415 17.0434 17.0431C16.5418 17.5447 15.9102 17.7604 15.1601 17.8612C14.4376 17.9584 13.519 17.9584 12.3794 17.9584H5.62127C4.48161 17.9584 3.56301 17.9584 2.84053 17.8612C2.09044 17.7604 1.45888 17.5447 0.957285 17.0431C0.455688 16.5415 0.239943 15.9099 0.139096 15.1598C0.0419622 14.4373 0.0419758 13.5187 0.0419926 12.3791V12.2876C0.0419758 11.148 0.0419622 10.2294 0.139096 9.50689C0.239943 8.7568 0.455688 8.12524 0.957285 7.62364C1.45888 7.12205 2.09044 6.9063 2.84053 6.80545C3.00814 6.78292 3.1863 6.76562 3.37533 6.75233ZM4.62533 5.66669C4.62533 3.25044 6.58408 1.29169 9.00033 1.29169C11.4166 1.29169 13.3753 3.25044 13.3753 5.66669V6.71122C13.0641 6.70834 12.7323 6.70835 12.3794 6.70835H5.62126C5.26833 6.70835 4.9366 6.70834 4.62533 6.71122V5.66669ZM3.00709 8.04431C2.39561 8.12652 2.0718 8.27689 1.84117 8.50753C1.61053 8.73816 1.46016 9.06197 1.37795 9.67345C1.29332 10.3029 1.29199 11.1372 1.29199 12.3334C1.29199 13.5295 1.29332 14.3638 1.37795 14.9933C1.46016 15.6047 1.61053 15.9285 1.84117 16.1592C2.0718 16.3898 2.39561 16.5402 3.00709 16.6224C3.63655 16.707 4.47081 16.7084 5.66699 16.7084H12.3337C13.5298 16.7084 14.3641 16.707 14.9936 16.6224C15.605 16.5402 15.9288 16.3898 16.1595 16.1592C16.3901 15.9285 16.5405 15.6047 16.6227 14.9933C16.7073 14.3638 16.7087 13.5295 16.7087 12.3334C16.7087 11.1372 16.7073 10.3029 16.6227 9.67345C16.5405 9.06197 16.3901 8.73816 16.1595 8.50753C15.9288 8.27689 15.605 8.12652 14.9936 8.04431C14.3641 7.95968 13.5298 7.95835 12.3337 7.95835H5.66699C4.47081 7.95835 3.63655 7.95968 3.00709 8.04431Z"
                    fill="#D7D8ED"
                  />
                </svg>
              </span>
              <span>Security</span>
            </div>
          }
        >
          <SecurityTab></SecurityTab>
        </Tab>
        <Tab
          eventKey="billing"
          title={
            <div className={styles.tab_nav}>
              <span className={styles.icon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6875 16.5C14.2222 16.0248 15.0278 16.0248 15.5625 16.5C15.9258 16.8229 16.5 16.565 16.5 16.079V1.92087C16.5 1.43485 15.9258 1.17697 15.5625 1.49987C15.0278 1.97512 14.2222 1.97512 13.6875 1.49987C13.1528 1.02462 12.3472 1.02462 11.8125 1.49987C11.2778 1.97512 10.4722 1.97512 9.9375 1.49987C9.40284 1.02462 8.59716 1.02462 8.0625 1.49987C7.52784 1.97512 6.72216 1.97512 6.1875 1.49987C5.65284 1.02462 4.84716 1.02462 4.3125 1.49987C3.77784 1.97512 2.97216 1.97512 2.4375 1.49987C2.07424 1.17697 1.5 1.43484 1.5 1.92087V16.079C1.5 16.565 2.07424 16.8229 2.4375 16.5C2.97216 16.0248 3.77784 16.0248 4.3125 16.5C4.84716 16.9753 5.65284 16.9753 6.1875 16.5C6.72216 16.0248 7.52784 16.0248 8.0625 16.5C8.59716 16.9753 9.40284 16.9753 9.9375 16.5C10.4722 16.0248 11.2778 16.0248 11.8125 16.5C12.3472 16.9753 13.1528 16.9753 13.6875 16.5Z"
                    stroke="#D7D8ED"
                    stroke-width="1.5"
                  />
                  <path
                    d="M5.25 11.9167H12.75"
                    stroke="#D7D8ED"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5.25 9H12.75"
                    stroke="#D7D8ED"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5.25 6.08331H12.75"
                    stroke="#D7D8ED"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
              <span>Billing & Plans</span>
            </div>
          }
        >
          <div className={styles.tab_content}>
            <div className={styles.tab_content_inner}>
              <></>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default NavTabs;

type ISettingType = {
  country: string;
  email: string;
  firstName: string;
  image: string;
  lastName?: string;
  state: string;
  phone: string;
};
type ISettingResponse = Response<ISettingType>;
function AccountsSettings() {
  const { data: session, status, update } = useSession();
  const schema = yup
    .object()
    .shape({
      firstName: yup.string().required("First name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      phone: yup
        .string()
        .required("Phone number is required")
        .matches(
          /^\+?(\d{2}|\d{3})[-\s.]?\d{3}[-\s.]?\d{4}$/,
          "Invalid phone number format"
        ),
      country: yup.string().required("Country is required"),
      state: yup.string().required("State name is required"),
      lastName: yup.string(),
      image: yup
        .mixed<File[]>()
        .test(
          "type",
          "Only the following formats are accepted: .jpeg, .jpg and .png",
          (value: File[] | undefined) => {
            if (!value) return true;
            if (typeof value !== "string") {
              return (
                value &&
                (value[0].type === "image/jpeg" ||
                  value[0].type === "image/jpg" ||
                  value[0].type === "image/png")
              );
            } else {
              return true;
            }
          }
        )
        .test(
          "fileSize",
          "The file is too large",
          (value: File[] | undefined) => {
            if (!value) return true; //
            if (typeof value !== "string") {
              // Skip validation if no file is selected
              return value && value[0].size <= 10 * 1024 * 1024; // 10MB
            } else {
              return true;
            }
          }
        ),
    })
    .required();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleFormReset = () => {
    reset(formData);
  };

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/user/settings/account`, {
          headers: {
            Authorization: `Bearer ${session.user.access}`,
          },
        })
        .then((response) => {
          const result: ISettingResponse = response.data;
          if (result.success) {
            const { data } = result;
            const { image } = data;
            const { country, email, firstName, lastName, state, phone } = data;
            const userData = {
              country,
              email,
              firstName,
              lastName,
              state,
              phone,
            };
            reset(userData);
            setFormData(userData);
            setProfilePic(image);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, [status]);

  const uploadRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Omit<ISettingType, "image">>();
  const [profilePic, setProfilePic] = useState<string>();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("image", file);
    if (status === "authenticated") {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/settings/account/image`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session.user.access}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          const result: Response<{ image: string }> = response.data;
          if (result.success) {
            toast.success("Image Updated");
            setProfilePic(result.data.image);
            update({ image: result.data.image });
          }
        })
        .catch((error) => {
          console.log(error.response);
          toast.error("Failed to update");
        });
    }
  };

  const submitHandler = (data: Omit<ISettingType, "image">) => {
    if (status === "authenticated") {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/settings/account`,
          data,
          {
            headers: {
              Authorization: `Bearer ${session.user.access}`,
            },
          }
        )
        .then((response) => {
          const result: IMessageResponse = response.data;
          if (result.success) {
            const { data } = result;
            update({ name: data.user.name, email: data.user.email });
            toast.success(data.message);
          } else {
            const { data } = result;
            toast.error(data.message);
          }
        });
    }
  };

  const deleteHandler = (data: any) => {
    if (data.isConfirmDeletion && status === "authenticated") {
      axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/user/settings/account`, {
          headers: {
            Authorization: `Bearer ${session.user.access}`,
          },
        })
        .then((response) => {
          const result: IMessageResponse = response.data;
          if (result.success) {
            const { data } = result;
            toast.success(data.message);
          } else {
            const { data } = result;
            toast.error(data.message);
          }
        });
    }
  };
  const handleUploadClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };
  const deleteSchema = yup
    .object()
    .shape({
      isConfirmDeletion: yup
        .boolean()
        .oneOf([true], "Please confirm to delete"),
    })
    .required();
  const {
    register: addDeleteControls,
    handleSubmit: handleDelete,
    formState: { errors: deleteErrors },
  } = useForm({ resolver: yupResolver(deleteSchema) });
  return (
    <div className={styles.tab_content}>
      <div className={styles.tab_content_inner}>
        <div className={styles.profile_area}>
          <div className={styles.profile_pic}>
            <Image
              src={profilePic || profileImg}
              alt=""
              width={250}
              height={250}
            />
          </div>
          <div className={styles.profile_upload}>
            <button className={styles.primary_btn} onClick={handleUploadClick}>
              Upload New Photo
            </button>
            <span>Allowed JPG, GIF or PNG. Max size of 800K</span>
            <input
              type="file"
              ref={uploadRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className={styles.profile_form}>
            <div className="row">
              <div className="col-md-6">
                <div className={styles.normal_form}>
                  <label>First Name</label>
                  <input
                    className={styles.inputfld}
                    type="text"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p style={{ color: "red" }}>{errors.firstName.message}</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.normal_form}>
                  <label>Last Name</label>
                  <input
                    className={styles.inputfld}
                    type="text"
                    {...register("lastName")}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.normal_form}>
                  <label>Email Address</label>
                  <input
                    className={styles.inputfld}
                    type="text"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p style={{ color: "red" }}>{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.normal_form}>
                  <label>Phone Number</label>
                  <input
                    className={styles.inputfld}
                    type="text"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p style={{ color: "red" }}>{errors.phone.message}</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.normal_form}>
                  <label>State</label>
                  <input
                    className={styles.inputfld}
                    type="text"
                    {...register("state")}
                  />
                  {errors.state && (
                    <p style={{ color: "red" }}>{errors.state.message}</p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.normal_form}>
                  <label>Country</label>
                  <input
                    className={styles.inputfld}
                    type="text"
                    {...register("country")}
                  />
                  {errors.country && (
                    <p style={{ color: "red" }}>{errors.country.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.footer_btn}>
              <button
                className={styles.secondary_btn}
                onClick={handleFormReset}
              >
                Reset
              </button>
              <button className={styles.primary_btn} type="submit">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.tab_content_inner}>
        <form onSubmit={handleDelete(deleteHandler)}>
          <h2>Delete Account</h2>
          <div className={styles.warning_box}>
            <h6>Are you sure you want to delete your account?</h6>
            <p>
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
          <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
            <input
              type="checkbox"
              {...addDeleteControls("isConfirmDeletion")}
            />
            <div className={styles.checkbox__checkmark}></div>
            <div className={styles.checkbox__body}>
              I confirm to delete my account
            </div>
            {deleteErrors.isConfirmDeletion && (
              <p style={{ color: "red" }}>
                {deleteErrors.isConfirmDeletion.message}
              </p>
            )}
          </label>
          <button className={styles.del_btn} type="submit">
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
}
