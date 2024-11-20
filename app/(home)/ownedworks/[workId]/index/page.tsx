import WorksIndexing from "@/components/WorksIndexing/WorksIndexing";
import styles from "@/components/WorksIndexing/WorksIndexing.module.scss";
import { Response } from "@/@types/CommonTypes";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

type IWorkInfo = {
  name: string;
  likeType: string;
  sourceType: string;
  image: string;
};
type IWorkInfoResponse = Response<IWorkInfo>;

const getData = async (workId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/works/info/${workId}`
  );
  const result: IWorkInfoResponse = response.data;
  if (result.success) {
    return result.data;
  }
};
export default async function WorksIndexingPage({params}:any) {
  const apiData = await getData(params.workId);
  return (
    <div>
      <section className={styles.owned_details_wrapper}>
        <div className="row">
          <div className="col-md-6">
            <div className={`${styles.card} ${styles.card_top}`}>
              <div className={styles.card_img}>
                <Image
                  src={apiData?.image || ""}
                  height="500"
                  width="500"
                  alt=""
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className={styles.card_details}>
                    <span>Name</span>
                    <h1>{apiData?.name}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.box_contain}>
              <div className={styles.card}>
                <h2>Likeness Type</h2>
                <div className={styles.sm_pink_btn}>{apiData?.likeType}</div>
              </div>
              <div className={styles.card}>
                <h2>Source Data Type</h2>
                <div className={styles.sm_pink_btn}>{apiData?.sourceType}</div>
              </div>
            </div>
          </div>
        </div>
        <WorksIndexing />
      </section>
    </div>
  );
}
