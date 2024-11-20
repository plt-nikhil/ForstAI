"use client";

import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";
import Image from "next/image";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "/public/assets/images/logo.svg";
import logosmalmenu from "/public/assets/images/logosmalmenu.png";

function Sidebar({ isToggled, onToggle }) {
  const pathname = usePathname();
  
  return (
    <section className={`${styles.sidebar} ${isToggled ? "closemenu" : ""}`}>
      <div className={styles.navbar_head} id="close_head">
        <Link href={"/dashboard"} >
          <Image src={logo} alt="logo" className="logo" />
        </Link>
        <Link href={"/dashboard"} >
          <Image
            src={logosmalmenu}
            alt="logo"
            className="logosmalmenu"
            id={styles.logosmalmenu_hide}
          />
        </Link>
        <button
          className={isToggled ? "closemenu closebt" : ""}
          onClick={onToggle}
        >
          {" "}
          {isToggled ? "" : ""}
        </button>
      </div>
      <div className={styles.navbar_menu}>
        <Navbar>
          <Nav className=" navbar_list">

            <Link href="/dashboard" className={pathname === "/dashboard" && "active"}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M14.1489 2.43751C13.8441 2.13287 13.4309 1.96173 13 1.96173C12.5691 1.96173 12.1558 2.13287 11.8511 2.43751L1.04974 13.2373C0.974196 13.3128 0.914272 13.4025 0.873388 13.5012C0.832505 13.5999 0.811462 13.7057 0.811462 13.8125C0.811462 13.9193 0.832505 14.0251 0.873388 14.1238C0.914272 14.2225 0.974196 14.3122 1.04974 14.3878C1.2023 14.5403 1.40923 14.626 1.62499 14.626C1.73182 14.626 1.83761 14.605 1.93631 14.5641C2.03501 14.5232 2.1247 14.4633 2.20024 14.3878L13 3.58638L23.7997 14.3878C23.9523 14.5403 24.1592 14.626 24.375 14.626C24.5907 14.626 24.7977 14.5403 24.9502 14.3878C25.1028 14.2352 25.1885 14.0283 25.1885 13.8125C25.1885 13.5967 25.1028 13.3898 24.9502 13.2373L21.125 9.41364V4.06251C21.125 3.84702 21.0394 3.64036 20.887 3.48799C20.7346 3.33561 20.528 3.25001 20.3125 3.25001H18.6875C18.472 3.25001 18.2653 3.33561 18.113 3.48799C17.9606 3.64036 17.875 3.84702 17.875 4.06251V6.16363L14.1489 2.43751Z"
                    fill="white"
                  />
                  <path
                    d="M13 5.35114L22.75 15.1011V21.9375C22.75 22.584 22.4932 23.204 22.0361 23.6611C21.579 24.1182 20.959 24.375 20.3125 24.375H5.6875C5.04103 24.375 4.42105 24.1182 3.96393 23.6611C3.50681 23.204 3.25 22.584 3.25 21.9375V15.1011L13 5.35114Z"
                    fill="white"
                  />
                </svg>
              </span>
              Dashboard
            </Link>

            <div className={styles.menuline}></div>

            <Link href="/myownedworks" className={pathname === "/myownedworks" && "active"}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M4.69495 16.0413H4.5C3.79289 16.0413 3.43934 16.0413 3.21967 15.8216C3 15.6019 3 15.2484 3 14.5413V13.7073C3 13.3184 3 13.124 3.09988 12.9504C3.19977 12.7767 3.35045 12.6891 3.65183 12.5138C5.63593 11.3598 8.45366 10.7102 10.3343 11.8319C10.4607 11.9073 10.5743 11.9983 10.6714 12.1073C11.09 12.5775 11.0595 13.2871 10.5771 13.7081C10.4752 13.797 10.3666 13.8645 10.2573 13.8879C10.3471 13.8775 10.4333 13.8655 10.5154 13.8524C11.199 13.7434 11.7728 13.3781 12.2981 12.9813L13.6535 11.9574C14.1313 11.5965 14.8405 11.5964 15.3184 11.9573C15.7486 12.2821 15.8802 12.8171 15.6082 13.2531C15.291 13.7615 14.8441 14.412 14.4149 14.8094C13.9852 15.2075 13.3454 15.5628 12.8231 15.8149C12.2445 16.0942 11.6054 16.2551 10.9552 16.3603C9.63664 16.5738 8.26243 16.5412 6.95725 16.2723C6.2194 16.1203 5.4531 16.0413 4.69495 16.0413Z"
                    fill="#D7D8ED"
                  />
                  <path
                    d="M4.93934 1.93934C4.66426 2.21442 4.56141 2.59448 4.52296 3.18735C5.43672 3.17516 6.17516 2.43672 6.18735 1.52296C5.59448 1.56141 5.21442 1.66426 4.93934 1.93934Z"
                    fill="#D7D8ED"
                  />
                  <path
                    d="M13.0607 1.93934C12.7856 1.66426 12.4055 1.56141 11.8127 1.52296C11.8248 2.43672 12.5633 3.17516 13.477 3.18735C13.4386 2.59448 13.3357 2.21442 13.0607 1.93934Z"
                    fill="#D7D8ED"
                  />
                  <path
                    d="M13.0607 7.06066C12.7856 7.33574 12.4055 7.43859 11.8127 7.47704C11.8248 6.56328 12.5633 5.82483 13.477 5.81265C13.4386 6.40552 13.3357 6.78558 13.0607 7.06066Z"
                    fill="#D7D8ED"
                  />
                  <path
                    d="M4.93934 7.06066C5.21442 7.33574 5.59448 7.43859 6.18735 7.47704C6.17516 6.56328 5.43672 5.82484 4.52296 5.81265C4.56141 6.40552 4.66426 6.78558 4.93934 7.06066Z"
                    fill="#D7D8ED"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.5 4.3125C6.0533 4.3125 7.3125 3.0533 7.3125 1.5H10.6875C10.6875 3.0533 11.9467 4.3125 13.5 4.3125V4.6875C11.9467 4.6875 10.6875 5.9467 10.6875 7.5H7.3125C7.3125 5.9467 6.0533 4.6875 4.5 4.6875V4.3125ZM9 5.25C9.41421 5.25 9.75 4.91421 9.75 4.5C9.75 4.08579 9.41421 3.75 9 3.75C8.58579 3.75 8.25 4.08579 8.25 4.5C8.25 4.91421 8.58579 5.25 9 5.25Z"
                    fill="#D7D8ED"
                  />
                </svg>
              </span>
              My Owned Works
            </Link>

            <Link href="/register-new-work" className={pathname === "/register-new-work" && "active"}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <g clip-path="url(#clip0_268_3434)">
                    <path
                      d="M7.65625 1.25H6.96875C6.7625 0.53125 6.1 0 5.3125 0C4.525 0 3.8625 0.53125 3.65625 1.25H2.96875C2.7125 1.25 2.5 1.4625 2.5 1.71875V2.65625C2.5 3.25625 2.99375 3.75 3.59375 3.75H7.03125C7.63125 3.75 8.125 3.25625 8.125 2.65625V1.71875C8.125 1.4625 7.9125 1.25 7.65625 1.25Z"
                      fill="white"
                    />
                    <path
                      d="M8.90625 1.875H8.75V2.65625C8.75 3.60625 7.98125 4.375 7.03125 4.375H3.59375C2.64375 4.375 1.875 3.60625 1.875 2.65625V1.875H1.71875C0.76875 1.875 0 2.64375 0 3.59375V11.4062C0 12.3562 0.76875 13.125 1.71875 13.125H5.8375C5.525 12.4563 5.3375 11.7188 5.31875 10.9375H2.34375C2.0875 10.9375 1.875 10.725 1.875 10.4688C1.875 10.2125 2.0875 10 2.34375 10H5.36875C5.425 9.61875 5.51875 9.25625 5.64375 8.90625H2.34375C2.0875 8.90625 1.875 8.69375 1.875 8.4375C1.875 8.18125 2.0875 7.96875 2.34375 7.96875H6.09375C6.3375 7.56875 6.625 7.2 6.9625 6.875H2.34375C2.0875 6.875 1.875 6.6625 1.875 6.40625C1.875 6.15 2.0875 5.9375 2.34375 5.9375H8.24375C8.9625 5.5625 9.76875 5.3375 10.625 5.31875V3.59375C10.625 2.64375 9.85625 1.875 8.90625 1.875Z"
                      fill="white"
                    />
                    <path
                      d="M10.7812 6.5625C8.455 6.5625 6.5625 8.455 6.5625 10.7812C6.5625 13.1075 8.455 15 10.7812 15C13.1075 15 15 13.1075 15 10.7812C15 8.455 13.1075 6.5625 10.7812 6.5625ZM12.8138 9.94313L10.6263 12.4431C10.5125 12.5731 10.35 12.6506 10.1769 12.6562C10.17 12.6562 10.1631 12.6562 10.1562 12.6562C9.99062 12.6562 9.83188 12.5906 9.71438 12.4731L8.46438 11.2231C8.22 10.9788 8.22 10.5837 8.46438 10.3394C8.70875 10.095 9.10375 10.095 9.34812 10.3394L10.1256 11.1169L11.8731 9.11937C12.1006 8.86062 12.495 8.83312 12.755 9.06062C13.015 9.28812 13.0413 9.68313 12.8138 9.94313Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_268_3434">
                      <rect width="15" height="15" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              Register New Works
            </Link>

            <div className={styles.menuline}></div>

            <Link href="/licensedworks" className={pathname === "/licensedworks" && "active"}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.33398 8.50016V5.8335C1.33398 3.94788 1.33398 3.00507 1.91977 2.41928C2.50556 1.8335 3.44837 1.8335 5.33398 1.8335H10.6673C12.5529 1.8335 13.4957 1.8335 14.0815 2.41928C14.6673 3.00507 14.6673 3.94788 14.6673 5.8335V8.50016C14.6673 10.3858 14.6673 11.3286 14.0815 11.9144C13.6506 12.3453 13.0265 12.4592 11.976 12.4893C11.9735 11.9988 11.8031 11.5089 11.4647 11.1119C11.4456 11.0894 11.434 11.0615 11.4317 11.0321C11.3481 9.98442 10.5162 9.15249 9.4685 9.06889C9.43909 9.06654 9.41117 9.05498 9.38871 9.03584C8.58879 8.35415 7.41227 8.35415 6.61235 9.03584C6.58989 9.05498 6.56197 9.06654 6.53256 9.06889C5.48491 9.15249 4.65298 9.98442 4.56938 11.0321C4.56703 11.0615 4.55547 11.0894 4.53633 11.1119C4.19795 11.5089 4.02754 11.9988 4.02509 12.4893C2.97472 12.4592 2.35066 12.3453 1.91977 11.9144C1.33398 11.3286 1.33398 10.3858 1.33398 8.50016ZM5.50065 4.50016C5.50065 4.22402 5.72451 4.00016 6.00065 4.00016H10.0007C10.2768 4.00016 10.5007 4.22402 10.5007 4.50016C10.5007 4.7763 10.2768 5.00016 10.0007 5.00016H6.00065C5.72451 5.00016 5.50065 4.7763 5.50065 4.50016ZM4.66732 6.3335C4.39118 6.3335 4.16732 6.55735 4.16732 6.8335C4.16732 7.10964 4.39118 7.3335 4.66732 7.3335H11.334C11.6101 7.3335 11.834 7.10964 11.834 6.8335C11.834 6.55735 11.6101 6.3335 11.334 6.3335H4.66732Z"
                    fill="#D7D8ED"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.74009 9.79696C8.31393 9.43378 7.68713 9.43378 7.26097 9.79696C7.07835 9.95258 6.85129 10.0466 6.61211 10.0657C6.05396 10.1103 5.61075 10.5535 5.56621 11.1116C5.54713 11.3508 5.45307 11.5779 5.29745 11.7605C4.93427 12.1866 4.93427 12.8134 5.29745 13.2396C5.45307 13.4222 5.54713 13.6493 5.56621 13.8885C5.61075 14.4466 6.05396 14.8898 6.61211 14.9344C6.85129 14.9534 7.07835 15.0475 7.26097 15.2031C7.68713 15.5663 8.31393 15.5663 8.74009 15.2031C8.92271 15.0475 9.14977 14.9534 9.38895 14.9344C9.94709 14.8898 10.3903 14.4466 10.4348 13.8885C10.4539 13.6493 10.548 13.4222 10.7036 13.2396C11.0668 12.8134 11.0668 12.1866 10.7036 11.7605C10.548 11.5779 10.4539 11.3508 10.4348 11.1116C10.3903 10.5535 9.94709 10.1103 9.38895 10.0657C9.14977 10.0466 8.92271 9.95258 8.74009 9.79696ZM9.34181 12.199C9.54369 12.0106 9.5546 11.6942 9.36618 11.4923C9.17776 11.2905 8.86137 11.2796 8.65949 11.468L7.57208 12.4829L7.34181 12.268C7.13994 12.0796 6.82354 12.0905 6.63513 12.2923C6.44671 12.4942 6.45762 12.8106 6.65949 12.999L7.23092 13.5324C7.42303 13.7117 7.72114 13.7117 7.91324 13.5324L9.34181 12.199Z"
                    fill="#D7D8ED"
                  />
                </svg>
              </span>
              My Licensed Works
            </Link>

            <Link href="/search" className={pathname === "/search" && "active"}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M14.561 12.8925L12.306 10.8425C12.3688 10.7035 12.3872 10.5484 12.3586 10.3985C12.3299 10.2486 12.2557 10.1112 12.146 10.005L11.646 9.53255C11.5319 9.42499 11.3845 9.35947 11.2283 9.34675C11.072 9.33403 10.916 9.37486 10.786 9.46255L10.156 8.89255C11.8679 5.75063 9.45158 1.73709 5.85592 1.78758C-0.588212 2.05246 -0.586598 11.234 5.85601 11.5C6.82485 11.5011 7.77164 11.211 8.57362 10.6674L9.19352 11.2775C9.11863 11.4181 9.09154 11.5793 9.11634 11.7368C9.14114 11.8942 9.21647 12.0392 9.33098 12.15L9.83098 12.6225C9.94022 12.7256 10.08 12.7904 10.2293 12.8071C10.3785 12.8238 10.5292 12.7915 10.6585 12.715L12.826 14.845C12.9423 14.9619 13.0807 15.0545 13.233 15.1176C13.3853 15.1806 13.5486 15.2129 13.7135 15.2125C14.8967 15.2337 15.4406 13.6529 14.561 12.8925ZM10.4385 9.82255L9.50848 10.885C9.50814 10.8875 8.97674 10.3618 8.9763 10.3623C9.33077 10.0641 9.6405 9.71644 9.89598 9.33005L10.4385 9.82255ZM2.75348 8.43755V6.12505C2.75383 5.85994 2.8593 5.60579 3.04676 5.41833C3.23422 5.23087 3.48837 5.1254 3.75348 5.12505H4.49348V4.57255C4.49362 4.38031 4.57005 4.19598 4.70598 4.06005C4.84192 3.92411 5.02624 3.84769 5.21848 3.84755H6.49098C6.68322 3.84768 6.86755 3.92411 7.00348 4.06005C7.13942 4.19598 7.21584 4.38031 7.21598 4.57255V5.12505H7.95598C8.22109 5.1254 8.47524 5.23087 8.6627 5.41833C8.85016 5.60579 8.95563 5.85994 8.95598 6.12505V8.43755C8.95601 8.56888 8.93017 8.69893 8.87993 8.82027C8.82968 8.94161 8.75603 9.05186 8.66316 9.14473C8.5703 9.23759 8.46004 9.31125 8.3387 9.36149C8.21736 9.41174 8.08731 9.43758 7.95598 9.43755H3.75348C3.62215 9.43758 3.4921 9.41174 3.37075 9.3615C3.24941 9.31126 3.13916 9.2376 3.04629 9.14473C2.95343 9.05187 2.87977 8.94161 2.82953 8.82027C2.77929 8.69893 2.75344 8.56888 2.75348 8.43755ZM10.316 12.3125C10.2901 12.3133 10.2644 12.3088 10.2404 12.2993C10.2163 12.2899 10.1944 12.2757 10.176 12.2575L9.67598 11.785C9.6342 11.7446 9.6094 11.6898 9.60661 11.6318C9.60382 11.5737 9.62327 11.5168 9.66098 11.4725C9.68434 11.4459 10.9735 9.97005 10.9735 9.97005C11.0518 9.85598 11.1891 9.78909 11.3035 9.89755L11.8035 10.37C11.8266 10.3939 11.8444 10.4222 11.856 10.4533C11.8676 10.4844 11.8726 10.5176 11.8707 10.5507C11.8688 10.5838 11.8601 10.6162 11.8451 10.6457C11.8301 10.6753 11.8091 10.7015 11.7835 10.7225L10.451 12.245C10.4342 12.2649 10.4136 12.2811 10.3904 12.2927C10.3672 12.3043 10.3419 12.311 10.316 12.3125Z"
                    fill="white"
                  />
                  <path
                    d="M7.81125 6.785C7.9905 6.74175 8.3314 6.25027 8.45877 6.1275C8.45911 6.06163 8.44642 5.99634 8.42145 5.93538C8.39647 5.87443 8.35969 5.81901 8.31323 5.77231C8.26676 5.72561 8.21153 5.68856 8.1507 5.66328C8.08987 5.638 8.02464 5.62499 7.95877 5.625H7.59375V6.8025C7.66672 6.80904 7.74027 6.80312 7.81125 6.785Z"
                    fill="white"
                  />
                  <path
                    d="M3.90141 6.785C3.97236 6.80332 4.04594 6.80924 4.11891 6.8025V5.625H3.75391C3.62142 5.62538 3.49446 5.67819 3.40078 5.77187C3.30709 5.86556 3.25429 5.99251 3.25391 6.125C3.38207 6.251 3.71903 6.74071 3.90141 6.785Z"
                    fill="white"
                  />
                  <path
                    d="M6.71469 4.57266C6.71451 4.51304 6.69075 4.45591 6.64859 4.41375C6.60644 4.37159 6.54931 4.34783 6.48969 4.34766H5.21719C5.1577 4.34826 5.10082 4.37215 5.05875 4.41422C5.01668 4.45629 4.99279 4.51317 4.99219 4.57266V5.12516H6.71469V4.57266Z"
                    fill="white"
                  />
                  <path
                    d="M4.61719 5.625H7.08969V6.8025H4.61719V5.625Z"
                    fill="white"
                  />
                  <path
                    d="M8.45641 8.43758V6.89258L8.38641 6.97258C8.30455 7.07199 8.20246 7.15283 8.08694 7.20973C7.97142 7.26663 7.84511 7.29828 7.71641 7.30258H3.99391C3.84756 7.29477 3.7049 7.25381 3.5767 7.18278C3.4485 7.11175 3.33813 7.01252 3.25391 6.89258V8.43758C3.25389 8.50324 3.26681 8.56827 3.29193 8.62894C3.31705 8.68961 3.35388 8.74474 3.40031 8.79117C3.44674 8.83761 3.50187 8.87444 3.56254 8.89956C3.62321 8.92468 3.68824 8.9376 3.75391 8.93758H7.95641C8.02213 8.93781 8.08725 8.92503 8.14802 8.89998C8.20878 8.87493 8.26399 8.83811 8.31047 8.79164C8.35694 8.74516 8.39376 8.68995 8.41881 8.62919C8.44386 8.56842 8.45663 8.5033 8.45641 8.43758Z"
                    fill="white"
                  />
                </svg>
              </span>
              Search For Works
            </Link>

            <Link href="/my-generated-works" className={pathname === "/my-generated-works" && "active"}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M10.0026 4.8335C9.6346 4.8335 9.33594 4.53483 9.33594 4.16683V3.16683H6.66927V4.16683C6.66927 4.53483 6.3706 4.8335 6.0026 4.8335C5.6346 4.8335 5.33594 4.53483 5.33594 4.16683V3.16683C5.33594 2.4315 5.93394 1.8335 6.66927 1.8335H9.33594C10.0713 1.8335 10.6693 2.4315 10.6693 3.16683V4.16683C10.6693 4.53483 10.3706 4.8335 10.0026 4.8335Z"
                    fill="white"
                  />
                  <path
                    d="M8.47333 10.7537C8.35333 10.8004 8.18 10.8337 8 10.8337C7.82 10.8337 7.64667 10.8004 7.48667 10.7404L0 8.24707V13.3337C0 14.3471 0.82 15.1671 1.83333 15.1671H14.1667C15.18 15.1671 16 14.3471 16 13.3337V8.24707L8.47333 10.7537Z"
                    fill="white"
                  />
                  <path
                    d="M16 5.66683V7.1935L8.16 9.80683C8.10667 9.82683 8.05333 9.8335 8 9.8335C7.94667 9.8335 7.89333 9.82683 7.84 9.80683L0 7.1935V5.66683C0 4.6535 0.82 3.8335 1.83333 3.8335H14.1667C15.18 3.8335 16 4.6535 16 5.66683Z"
                    fill="white"
                  />
                </svg>
              </span>
              My Generated Works
            </Link>

            <Link href="/generate-image" className={pathname === "/generate-image" && "active"}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M4.48528 4.48528C3.17157 5.79899 3.17157 7.92893 4.48528 9.24264L6.33764 11.095C6.35155 11.0789 6.36614 11.0632 6.38141 11.0479L11.0481 6.38128C11.0633 6.36605 11.079 6.3515 11.095 6.33763L9.24264 4.48528C7.92893 3.17157 5.79899 3.17157 4.48528 4.48528Z"
                    fill="white"
                  />
                  <path
                    d="M12.3292 7.57181C12.3153 7.58784 12.3007 7.60349 12.2855 7.61872L7.61885 12.2854C7.60358 12.3007 7.58788 12.3152 7.5718 12.3292L18.7574 23.5147C20.0711 24.8284 22.201 24.8284 23.5147 23.5147C24.8284 22.201 24.8284 20.0711 23.5147 18.7574L12.3292 7.57181Z"
                    fill="white"
                  />
                  <path
                    d="M18.7834 2.69172C18.9711 2.21387 19.6449 2.21387 19.8327 2.69172L20.3348 3.96955C20.3921 4.11544 20.5072 4.23093 20.6525 4.28847L21.9257 4.79243C22.4018 4.9809 22.4018 5.65717 21.9257 5.84563L20.6525 6.3496C20.5072 6.40714 20.3921 6.52262 20.3348 6.66851L19.8327 7.94635C19.6449 8.4242 18.9711 8.4242 18.7834 7.94635L18.2813 6.66852C18.2239 6.52262 18.1089 6.40714 17.9635 6.3496L16.6904 5.84563C16.2143 5.65717 16.2143 4.9809 16.6904 4.79244L17.9635 4.28847C18.1089 4.23093 18.2239 4.11544 18.2813 3.96955L18.7834 2.69172Z"
                    fill="white"
                  />
                  <path
                    d="M23.295 10.651C23.4828 10.1732 24.1566 10.1732 24.3444 10.651L24.5274 11.1169C24.5848 11.2628 24.6998 11.3783 24.8452 11.4358L25.3094 11.6196C25.7854 11.8081 25.7854 12.4843 25.3094 12.6728L24.8452 12.8565C24.6998 12.9141 24.5848 13.0296 24.5274 13.1755L24.3444 13.6414C24.1566 14.1192 23.4828 14.1192 23.295 13.6414L23.112 13.1755C23.0546 13.0296 22.9396 12.9141 22.7942 12.8565L22.33 12.6728C21.854 12.4843 21.854 11.8081 22.33 11.6196L22.7942 11.4358C22.9396 11.3783 23.0546 11.2628 23.112 11.1169L23.295 10.651Z"
                    fill="white"
                  />
                  <path
                    d="M5.98873 17.8584C6.1765 17.3805 6.85028 17.3805 7.03805 17.8584L7.22112 18.3243C7.27845 18.4702 7.3935 18.5857 7.53886 18.6432L8.00304 18.827C8.47913 19.0154 8.47913 19.6917 8.00304 19.8801L7.53886 20.0639C7.3935 20.1214 7.27845 20.2369 7.22112 20.3828L7.03805 20.8487C6.85028 21.3266 6.1765 21.3266 5.98873 20.8487L5.80566 20.3828C5.74833 20.2369 5.63327 20.1214 5.48792 20.0639L5.02373 19.8801C4.54764 19.6917 4.54764 19.0154 5.02373 18.827L5.48792 18.6432C5.63327 18.5857 5.74833 18.4702 5.80566 18.3243L5.98873 17.8584Z"
                    fill="white"
                  />
                </svg>
              </span>
              Generate New
            </Link>

            <Link href="/settings" className={pathname === "/settings" && "active"}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <g clip-path="url(#clip0_268_3423)">
                    <path
                      d="M9.3749 8.12512C9.02929 8.12512 8.74995 8.40516 8.74995 8.75008V11.2501C8.74995 11.5945 8.46991 11.8751 8.12488 11.8751H6.2499V2.50018C6.2499 1.96643 5.9099 1.48956 5.39869 1.31207L5.21364 1.25015H8.12488C8.46991 1.25015 8.74995 1.53076 8.74995 1.87522V3.7502C8.74995 4.09513 9.02929 4.37516 9.3749 4.37516C9.72051 4.37516 9.99986 4.09513 9.99986 3.7502V1.87522C9.99986 0.841491 9.15861 0.000244141 8.12488 0.000244141H1.40624C1.38243 0.000244141 1.36252 0.010887 1.3394 0.0139769C1.3093 0.0114592 1.28058 0.000244141 1.25003 0.000244141C0.56064 0.000244141 0 0.56077 0 1.25015V12.5C0 13.0338 0.34 13.5107 0.851203 13.6881L4.61249 14.942C4.73998 14.9813 4.86678 15.0001 4.99999 15.0001C5.68937 15.0001 6.2499 14.4394 6.2499 13.7501V13.1251H8.12488C9.15861 13.1251 9.99986 12.2839 9.99986 11.2501V8.75008C9.99986 8.40516 9.72051 8.12512 9.3749 8.12512Z"
                      fill="#D7D8ED"
                    />
                    <path
                      d="M14.8169 5.80823L12.3168 3.30829C12.1382 3.12954 11.8694 3.07575 11.6357 3.17257C11.4026 3.2695 11.25 3.49758 11.25 3.75014V5.62512H8.75007C8.40503 5.62512 8.125 5.90504 8.125 6.25008C8.125 6.59512 8.40503 6.87504 8.75007 6.87504H11.25V8.75002C11.25 9.00258 11.4026 9.23066 11.6357 9.32759C11.8694 9.42441 12.1382 9.37062 12.3168 9.19198L14.8169 6.69193C15.0612 6.4476 15.0612 6.05256 14.8169 5.80823Z"
                      fill="#D7D8ED"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_268_3423">
                      <rect width="15" height="15" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              Account Settings
            </Link>
          </Nav>
        </Navbar>
      </div>
    </section>
  );
}

export default Sidebar;
