"use client";
import styles from "./Head.module.scss";
import Image from "next/image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import user from "/public/assets/images/user.png";
import { signOut, useSession } from "next-auth/react";

function Head() {
  const { data: session } = useSession();
  return (
    <section>
      <div className="col-md-12">
        <div className={styles.header}>
          {/* <div className={styles.had_left}>
            <input placeholder="Search here ...." className={styles.search} />
          </div> */}
          <div className={styles.had_right}>
            {/* NOTIFICATION */}
            {/* <div className={`${styles.notification} notification`}>
              <div className={styles.notidic_count}>52</div>
              <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M23.4364 12.137V11.2562C23.4364 6.42029 19.6593 2.5 15 2.5C10.3407 2.5 6.56359 6.42029 6.56359 11.2562V12.137C6.56359 13.1939 6.26215 14.2273 5.69725 15.1068L4.31295 17.2619C3.04853 19.2304 4.01381 21.9062 6.21295 22.5287C11.9659 24.1571 18.0341 24.1571 23.787 22.5287C25.9862 21.9062 26.9515 19.2304 25.6871 17.2619L24.3028 15.1068C23.7379 14.2273 23.4364 13.1939 23.4364 12.137Z"
                        stroke="#D7D8ED"
                        stroke-width="1.5"
                      />
                      <path
                        d="M9.375 23.75C10.1938 25.9347 12.4031 27.5 15 27.5C17.5969 27.5 19.8062 25.9347 20.625 23.75"
                        stroke="#D7D8ED"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M15 7.5V12.5"
                        stroke="#D7D8ED"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div> */}

            {/* USER IMAGE */}
            {/* <div className={styles.select_btn}>
              <div className={`${styles.Toggle_button} ${styles.b2}`} id="button-13">
                <input type="checkbox" className={styles.checkbox} />
                <div className={styles.knobs}>
                  <span></span>
                </div>
                <div className={styles.layer}></div>
              </div>
            </div> */}
            <div className="user">
              <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  <Image
                    src={session?.user?.image || user}
                    height={500}
                    width={500}
                    alt=""
                  />
                  <div className={styles.user_name}>
                    <h5>{session?.user?.name}</h5>
                    <p>CEO</p>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.profile_drpdwn}>
                  <Dropdown.Item
                    onClick={() =>
                      signOut({ callbackUrl: "/auth/signin", redirect: true })
                    }
                  >
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Head;
