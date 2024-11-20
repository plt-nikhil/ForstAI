"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import styles from "./VerifyOtp.module.scss";
import logoImg from "/public/assets/images/flik-logo.svg";
import signinVector from "/public/assets/images/signin-vector.svg";

export default function VerifyOTP() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const email = localStorage.getItem('email');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!otp) {
      setError("OTP is required.");
      return;
    }
    setLoading(true);
    const loadingToast = toast.loading('Checking...');
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp?&otp=${otp}`);
      if (response && response.status === 200 || 201) {
        toast.success('OTP Verified', {
          id: loadingToast,
        });
        router.push("/auth/signin");
      }
    } catch (err: any) {
      toast.error(err.response.data.message || "Failed to verify", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
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
              <h1>Verify Your Email</h1>
              <p>Please check your email {email} for verification code</p>
              <form className={styles.signIn_form} onSubmit={handleSubmit}>
                <div className={styles.form_group}>
                  <label htmlFor="otp">Verification Code</label>
                  <input
                    className={`${styles.inputField} ${styles.inputField_password}`}
                    type='password'
                    placeholder="Enter your OTP"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className={`${styles.primary_btn} ${styles.signIn_btn}`}
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
