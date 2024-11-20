"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-hot-toast';
import styles from "./SignUp.module.scss";
import logoImg from "/public/assets/images/flik-logo.svg";
import signinVector from "/public/assets/images/signin-vector.svg";

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default function SignUp() {
  const router = useRouter();
  const [showcurPassword, setShowcurPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const schema = yup
    .object()
    .shape({
      firstName: yup.string().required("First name is required.").trim(),
      lastName: yup.string().required("Last name is required.").trim(),
      email: yup.string().email("Invalid email").required("Email is required.").trim(),
      password: yup.string().required("Password is required.").trim(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { firstName, lastName, email, password } = data;
    setLoading(true);
    const loadingToast = toast.loading('Checking...');
    try {
      const userDetails = {
        firstName,
        lastName,
        email,
        password,
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`
        , { ...userDetails });
      if (response && response.status === 201) {
        toast.success('Signed Up', {
          id: loadingToast,
        });
        localStorage.setItem('email', email);
        router.push("/auth/verify-otp");
      }
    } catch (err: any) {
      toast.error("Failed to sign up", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  const togglecurPasswordVisibility = () => {
    setShowcurPassword(!showcurPassword);
  };

  return (
    <section className={styles.sign_wrapper}>
      <div className="row">
        <div className="col-md-6">
          <div className={styles.sign_left_contain}>
            <div className={styles.sign_left_inner}>
              <Link href={"/auth/signin"} >
                <Image src={logoImg} alt="" />
              </Link>
              <p>
                Universal ID, Rights and Royalty Automation for AI Training Data
                and Generated Creations
              </p>
              <Image src={signinVector} alt="" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className={styles.sign_right_contain}>
            <div className={styles.sign_right_inner}>
              <h1>Welcome to ForstAI</h1>
              {/* <p>This Is A Temporary Signup Page</p> */}
              <form className={styles.signIn_form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form_group}>
                  <label htmlFor="fname">First Name</label>
                  <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Enter your first name"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <small className="text-danger">
                      {errors.firstName.message}
                    </small>
                  )}
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="lname">Last Name</label>
                  <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Enter your last name"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <small className="text-danger">
                      {errors.lastName.message}
                    </small>
                  )}
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="email">Email</label>
                  <input
                    className={styles.inputField}
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="password">Password</label>
                  <input
                    className={`${styles.inputField} ${styles.inputField_password}`}
                    type={showcurPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  <span className={showcurPassword ? styles.eye_open_btn : styles.eye_btn} onClick={togglecurPasswordVisibility}></span>
                  {errors.password && (
                    <small className="text-danger">
                      {errors.password.message}
                    </small>
                  )}
                </div>
                <button
                  type="submit"
                  className={`${styles.primary_btn} ${styles.signIn_btn}`}
                >
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </form>
              <p className={styles.sign_up_text}>
                Already have an account?
                <Link href="/auth/signin" className={styles.signinlink}>
                  &nbsp;Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
