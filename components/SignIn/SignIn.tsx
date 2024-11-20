"use client";
import { useState, FormEvent } from "react";
import styles from "./signin.module.scss";
import Link from "next/link";
import Image from "next/image";
import logoImg from "/public/assets/images/flik-logo.svg";
import signinVector from "/public/assets/images/signin-vector.svg";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-hot-toast';

export default function SignIn() {
  const [showcurPassword, setShowcurPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const schema = yup
    .object()
    .shape({
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

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (data) => {
    setLoading(true);
    const loadingToast = toast.loading('Checking...');
    const { email, password } = data
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) {
        toast.success('You are signed in', {
          id: loadingToast,
        });
        router.push("/dashboard");
      } else {
        toast.error(res?.error || "Login failed", {
          id: loadingToast,
        });
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed", {
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
              <p>Please sign-in to your account and start the adventure</p>
              <form className={styles.signIn_form} onSubmit={handleSubmit(onSubmit)}>
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

                <div className={styles.remember}>
                  <label
                    className={`${styles.checkbox} ${styles.checkbox_field}`}
                  >
                    <input type="checkbox" />
                    <div className={styles.checkbox__checkmark}></div>
                    <div className={styles.checkbox__body}>Remember Me</div>
                  </label>
                  <a href="">Forgot Password?</a>
                </div>
                <button
                  type="submit"
                  className={`${styles.primary_btn} ${styles.signIn_btn}`}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
              <p className={styles.sign_up_text}>
                Don&apos;t have an account?
                <Link href="/auth/signup" className={styles.sign_up_link}>
                  &nbsp;Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
