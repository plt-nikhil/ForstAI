"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Response } from "@/@types/CommonTypes";
import styles from "./LicensedWorks.module.scss";
import Image from "next/image";
import workImg01 from "/public/assets/images/work_img_01.png";

type ILicensedWork = {
  workTitle: string;
  workLikeType: string;
  workDataType: string;
  workImage: string;
  licenseId: string;
};
type ILicensedWorkResponse = Response<ILicensedWork[]>;

function LicensedWorks() {
  const { data: session, status } = useSession();
  const [state, setState] = useState<{ works: ILicensedWork[] }>({
    works: [],
  });

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/works/licensed?page=0&limit=0`,
          {
            headers: {
              Authorization: `Bearer ${session.user.access}`,
            },
          }
        )
        .then((response) => {
          const result: ILicensedWorkResponse = response.data;
          if (result.success) {
            setState({ ...state, works: result.data });
          }
        });
    }
  }, [status]);

  return (
    <section className={styles.licensed_wrapper}>
      <div className={styles.licensed_header}>
        <h1>Licensed Works</h1>
        <div className={styles.search}>
          <input
            className={styles.inputfld}
            type="text"
            name=""
            placeholder="Advanced Search"
          />
        </div>
      </div>
      <div className={styles.main_card}>
        <h2>All Licensed Works</h2>
        <div className="row">
          {state.works.length ? (
            state.works.map((work, idx) => (
              <LicensedWorkCard key={idx} {...work} />
            ))
          ) : (
            <>
              <div>No licensed works</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default LicensedWorks;

const LicensedWorkCard: React.FC<ILicensedWork> = ({
  workTitle,
  workLikeType,
  workDataType,
  workImage,
  licenseId,
}): JSX.Element | null => {
  return (
    <div className="col-lg-4 col-md-6">
      <div className={styles.work_cards}>
        <div className={styles.card_img}>
          <Image
            src={workImage ?? workImg01}
            alt="image"
            width={500}
            height={500}
            priority={true}
          />
          <div className={styles.info}>
            <div className={styles.info_top}>
              <span className={`${styles.info_card} ${styles.info_blue}`}>
                {workLikeType ?? "Personal"}
              </span>
              <span className={`${styles.info_card} ${styles.info_yellow}`}>
                {workDataType ?? "Images"}
              </span>
            </div>
            <h3>{workTitle ?? "Home Alone"}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
