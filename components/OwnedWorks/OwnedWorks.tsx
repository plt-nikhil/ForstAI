"use client";

import styles from "./ownedworks.module.scss";
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import workImg01 from "/public/assets/images/work_img_01.png";
import axios from "axios";
import { IMessage, IMessageResponse, Response } from "@/@types/CommonTypes";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
type IDataType = {
  name: string;
  likeType: string;
  sourceType: string;
  image: string;
  worksId: string;
};
type IWorkResponse = Response<IDataType[]>;
function OwnedWorks() {
  const [state, setState] = useState<{ works: IDataType[] }>({ works: [] });
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/works?page=0&limit=0`, {
          headers: {
            Authorization: `Bearer ${session.user.access}`,
          },
        })
        .then((response) => {
          const result: IWorkResponse | IMessageResponse = response.data;
          if (result.success) {
            setState({ ...state, works: result.data as IDataType[] });
          } else {
            const data = result as unknown as IMessage;
            toast.error(data.message);
          }
        });
    }
  }, []);
  return (
    <section className={styles.owned_wrapper}>
      <h1>Owned Works</h1>
      <div className={styles.main_card}>
        <h2>All Works</h2>
        <div className="row">
          {state.works.length ? (
            state.works.map((work, idx) => <WorkCard key={idx} {...work} />)
          ) : (
            <>
              <div>No works Found</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default OwnedWorks;

const WorkCard: React.FC<IDataType> = ({
  name,
  likeType,
  sourceType,
  image,
  worksId,
}): JSX.Element | null => {
  return (
    <div className="col-md-4">
      <Link href={`/ownedworks/${worksId}`}>
        <div className={styles.work_cards}>
          <div className={styles.card_img}>
            <Image
              src={image}
              alt="image"
              width={500}
              height={500}
              priority={true}
            />
            <div className={styles.info}>
              <div className={styles.info_top}>
                <span className={`${styles.info_card} ${styles.info_blue}`}>
                  {likeType}
                </span>
                <span className={`${styles.info_card} ${styles.info_yellow}`}>
                  {sourceType}
                </span>
              </div>
              <h3>{name}</h3>
              <div className={styles.card_button_bottom}>
                <Link
                  className={styles.primary_btn}
                  href={`/register-new-work?section=brand-guidelines&work=${worksId}`}
                >
                  Brand Guidelines
                </Link>
                <Link
                  className={styles.primary_btn}
                  href={`/register-new-work?section=contract-offers&work=${worksId}`}
                >
                  Contract Offers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
