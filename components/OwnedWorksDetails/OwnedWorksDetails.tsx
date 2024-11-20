"use client";

import styles from "./ownedworksdetails.module.scss";
import Image from "next/image";
import workDetail01 from "/public/assets/images/work_detail_01.png";
import copyIcon from "/public/assets/images/copy_icon.svg";

interface OwnedWorks {
  name: string;
  description?: string; 
  likeType: string;
  sourceType: string;
  dataURL: string;
  image: string;
  uid: string;
  restrictions: [string];
}

interface OwnedWorksDetailsProps {
  ownedWork: OwnedWorks;
}

const OwnedWorksDetails: React.FC<OwnedWorksDetailsProps> = ({ ownedWork }) => {
  return (
    <section className={styles.owned_details_wrapper}>
      <div className="row">
        <div className="col-md-6">
          <div className={`${styles.card} ${styles.card_top}`}>
            <div className={styles.card_img}>
              <Image
                src={ownedWork?.image ?? workDetail01}
                alt="work-image"
                width={500}
                height={500}
              />
            </div>
            <div className={styles.card_details}>
              <span>Name</span>
              <h1>{ownedWork?.name}</h1>
              <h4>Description</h4>
              <ul>
                <li>{ownedWork?.description}</li>
                {/* <li>Adventures of Kevin McCallister, an eight-year-old boy</li>
                <li>written by John Hughes and directed by Chris Columbus</li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className={styles.card}>
            <h2>Universal ID</h2>
            <div className={styles.copy_contain}>
              <p>{ownedWork?.uid ?? "3jkfh587io36u23iutnfjklq"}</p>
              <span>
                <Image src={copyIcon} alt="" />
              </span>
            </div>
          </div>
          <div className={styles.box_contain}>
            <div className={styles.card}>
              <h2>Likeness Type</h2>
              <div className={styles.sm_pink_btn}>
                {ownedWork?.likeType ?? "Film"}
              </div>
            </div>
            <div className={styles.card}>
              <h2>Source Data Type</h2>
              <div className={styles.sm_pink_btn}>
                {ownedWork?.sourceType ?? "Video"}
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <h2>Data Location URL</h2>
            <div className={styles.copy_contain}>
              <p>{ownedWork?.dataURL ?? "filmstudioABC.s3.aws"}</p>
              <span>
                <Image src={copyIcon} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className={`${styles.card} ${styles.card_bottom}`}>
            <h2>Restriction on Use</h2>
            {ownedWork?.restrictions.map((item, index) => (
              <label
                key={index}
                className={`${styles.checkbox} ${styles.checkbox_field}`}
              >
                <input type="checkbox" />
                <div className={styles.checkbox__checkmark}></div>
                <div className={styles.checkbox__body}>
                  {item ??
                    "No immoral use (nudity, extreme violence, alcohol, drugs,cigarettes, etc.)"}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footer_btn}>
        <button className={styles.delete_btn}>Delete</button>
        <button className={styles.secondary_btn}>Edit</button>
        <button className={styles.primary_btn}>Index</button>
      </div>
    </section>
  );
};

export default OwnedWorksDetails;
