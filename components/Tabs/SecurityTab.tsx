import React, { useState } from "react";
import styles from "./Tabs.module.scss";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

function SecurityTab() {
  const { data: session, status } = useSession();
  const [showcurPassword, setShowcurPassword] = useState(false);
  const [shownewPassword, setShownewPassword] = useState(false);
  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [curPasswordError, setCurPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [errMsg, seterrMsg] = useState(false);

  const togglecurPasswordVisibility = () => {
    setShowcurPassword(!showcurPassword);
  };
  const togglenewPasswordVisibility = () => {
    setShownewPassword(!shownewPassword);
  };
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    validatePassword(value);
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[\d\s\W]/.test(password);

    setPasswordValid(minLength && hasLowerCase && hasSpecialChar);
  };

  const handleSubmit = () => {
    let valid = true;

    if (!curPassword) {
      setCurPasswordError(true);
      valid = false;
    } else {
      setCurPasswordError(false);
    }

    if (!passwordValid) {
      setNewPasswordError(true);
      valid = false;
    } else {
      setNewPasswordError(false);
    }

    if (valid && status === "authenticated") {
      const loadingToast = toast.loading("Checking...");

      const myPromise = axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password/`,
          { curPassword: curPassword, newPassword: newPassword },
          {
            headers: {
              Authorization: `Bearer ${session.user.access}`,
            },
          }
        )
        .then((response) => {
          const result = response.data;
          if (result.success) {
            toast.success("Password changed successfully!", {
              id: loadingToast,
            });
            handleReset();
          } else {
            //seterrMsg(result.msg)
            toast.error(result.msg || "Error when fetching", {
              id: loadingToast,
            });
          }
        })
        .catch((error) => {
          toast.error(error.msg || "Error when fetching", {
            id: loadingToast,
          });
        });
    }
  };
  const handleReset = () => {
    setCurPassword("");
    setNewPassword("");
    setPasswordValid(false);
    setCurPasswordError(false);
    setNewPasswordError(false);
    setShowcurPassword(false);
    setShownewPassword(false);
  };
  return (
    <div className={styles.tab_content}>
      <div className={styles.tab_content_inner}>
        <h2>Change Password</h2>
        <div className="row">
          <div className="col-md-6">
            <div className={`${styles.normal_form} ${styles.normal_form_pswd}`}>
              <label>Current Password</label>
              <input
                className={styles.inputfld}
                value={curPassword}
                type={showcurPassword ? "text" : "password"}
                onChange={(e) => setCurPassword(e.target.value)}
                name="curpassword"
                placeholder="Current Password"
                autoComplete="new-password"
              />
              <span
                className={
                  showcurPassword ? styles.eye_open_btn : styles.eye_btn
                }
                onClick={togglecurPasswordVisibility}
              ></span>
            </div>
            {curPasswordError && (
              <p className={styles.error}>Current password cannot be empty.</p>
            )}
          </div>
          <div className="col-md-6">
            <div className={`${styles.normal_form} ${styles.normal_form_pswd}`}>
              <label>New Password</label>
              <input
                className={styles.inputfld}
                type={shownewPassword ? "text" : "password"}
                name="newpassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                placeholder="New Password"
              />
              <span
                className={
                  shownewPassword ? styles.eye_open_btn : styles.eye_btn
                }
                onClick={togglenewPasswordVisibility}
              ></span>
            </div>
            {newPasswordError && (
              <p className={styles.error}>
                New password does not meet the requirements.
              </p>
            )}
            {!passwordValid && newPassword && (
              <p className={styles.error}>
                New password does not meet the requirements.
              </p>
            )}
          </div>
        </div>
        <div className={styles.pswd_req}>
          <h4>Password Requirements:</h4>
          <ul>
            <li>Minimum 8 characters long - the more, the better</li>
            <li>At least one lowercase character</li>
            <li>At least one number, symbol, or whitespace character</li>
          </ul>
        </div>
        {errMsg && <p className={styles.error}>{errMsg}</p>}
        <div className={`${styles.footer_btn} ${styles.footer_Pswd}`}>
          <button className={styles.secondary_btn} onClick={handleReset}>
            Reset
          </button>
          <button
            className={styles.primary_btn}
            disabled={!passwordValid}
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
export default SecurityTab;
