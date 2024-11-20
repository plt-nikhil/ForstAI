import styles from "./Ownedworksnew.module.scss";
import Image from "next/image";
import Link from "next/link";
import homeImage from "@/public/assets/images/home_img.svg";
import { IFolderData, IWorkListData } from "@/@types/WorkTypes";

function OwnedWorksNew({ folderData }: { folderData: IFolderData }) {
  const { works, folder } = folderData;
  return (
    <section className={styles.licensed_wrapper}>
      <div className={styles.licensed_header}>
        <Link href={"/myownedworks"}>
          <Image src={homeImage} alt="back home" width={20} />
          <h1 className={styles.link_text}>My Owned Works</h1>
        </Link>
        <h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="20"
            height="20"
            x="0"
            y="0"
            viewBox="0 0 6.35 6.35"
          >
            <g>
              <path
                d="M2.258 1.315a.265.265 0 0 0-.174.469L3.703 3.17l-1.62 1.386a.265.265 0 1 0 .345.4L4.28 3.373a.265.265 0 0 0 0-.403L2.428 1.382a.265.265 0 0 0-.17-.067z"
                fill="#ffffff"
                opacity="1"
                data-original="#000000"
              ></path>
            </g>
          </svg>
          {` ${folder.name}`}
        </h1>
      </div>
      <div className="myownout">
        <div className={styles.main_card}>
          <div className={styles.own_ection}>
            <div className={styles.ownection_inner}>
              <div className="col-md-12">
                <div className="row myown_head">
                  <div className="col-md-12">
                    <div className={styles.ownhead_outer}>
                      <div className="row work_box">
                        <div className="col-5 col-sm-5 col-md-5">
                          <div className={styles.ownhead}>
                            <h4>Thumbnail</h4>
                            <h3>Work Name</h3>
                          </div>
                        </div>
                        <div className="col-7 col-sm-7 col-md-7">
                          <div className="row custom-row">
                            <div className="col-4 col-sm-4 col-md-4 ">
                              <h4>Work Details</h4>
                            </div>
                            <div className="col-5 col-sm-5  col-md-5 ">
                              <h4>Contract Details</h4>
                            </div>
                            <div className="col-3 col-sm-3 col-md-3 ">
                              <h4>Licensees</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.inner_box}>
                  {/* box */}
                  {works.length ? (
                    works.map((work) => <Work key={work.worksId} {...work} />)
                  ) : (
                    <>
                      <div>No works Found</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 pt-2">
              <Link href={"/register-new-work"} className={styles.gradian_bt}>
                Register New
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OwnedWorksNew;

function Work(workData: IWorkListData): JSX.Element | null {
  return (
    <div className="row mb-2 work_box">
      <div className="col-5 col-sm-5 col-md-5">
        <Link href={`/work/${workData.worksId}/edit`}>
          <div className={`${styles.own_first} ${styles.own_first_contain}`}>
            <div className={styles.own_first_box}>
              <Image src={workData.image} alt="" height={50} width={50} />
              <div className={styles.own_first_box_cnt}>
                <h3>{workData.name}</h3>
                <div className={styles.own_first_box_btn}>
                  <span className={styles.blue_bg}>{workData.likeType}</span>
                  <span className={styles.ellow_bg}>
                    {workData.copyRightNumber
                      ? workData.copyRightNumber
                      : "No copyright number"}
                  </span>
                  <div className={styles.own_tatus}>
                    {/* <span className={styles.green_bg}>
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.50014 0H1.5376C0.970551 0 0.472656 0.466486 0.472656 1.01865V11.3184C0.472656 11.5032 0.524098 11.6572 0.607005 11.7762C0.706154 11.9185 0.865799 12.0001 1.03699 12C1.19884 12 1.37116 11.928 1.5303 11.792L4.64534 9.14721C4.74154 9.06504 4.87974 9.01795 5.02343 9.01795C5.16706 9.01795 5.30497 9.06504 5.40146 9.14744L8.50608 11.7916C8.66578 11.928 8.82622 12.0001 8.98779 12.0001C9.26102 12.0001 9.52734 11.7893 9.52734 11.3184V1.01865C9.52734 0.466486 9.06719 0 8.50014 0Z" fill="#81EC9F" />
                      <g clip-path="url(#clip0_0_1)">
                        <path d="M7.98436 4.30155C7.94508 4.18006 7.83732 4.09377 7.70983 4.08228L5.97807 3.92503L5.29328 2.32222C5.24279 2.20476 5.1278 2.12872 5.00003 2.12872C4.87227 2.12872 4.75727 2.20476 4.70678 2.3225L4.02199 3.92503L2.28995 4.08228C2.16269 4.09404 2.05521 4.18006 2.0157 4.30155C1.97619 4.42305 2.01268 4.55631 2.10895 4.64031L3.41796 5.78832L3.03196 7.48863C3.00372 7.61365 3.05224 7.74288 3.15597 7.81786C3.21173 7.85815 3.27696 7.87866 3.34275 7.87866C3.39946 7.87866 3.45573 7.86337 3.50622 7.83315L5.00003 6.94035L6.49329 7.83315C6.60256 7.89889 6.74031 7.89289 6.84381 7.81786C6.94759 7.74265 6.99607 7.61338 6.96782 7.48863L6.58183 5.78832L7.89084 4.64054C7.98711 4.55631 8.02387 4.42328 7.98436 4.30155Z" fill="#347546" />
                      </g>
                      <defs>
                        <clipPath id="clip0_0_1">
                          <rect width="6" height="6" fill="white" transform="translate(2 2)" />
                        </clipPath>
                      </defs>
                    </svg>
                    Indexed
                  </span> */}
                    <span className={styles.red_bg}>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.50014 0H1.5376C0.970551 0 0.472656 0.466486 0.472656 1.01865V11.3184C0.472656 11.5032 0.524098 11.6572 0.607005 11.7762C0.706154 11.9185 0.865799 12.0001 1.03699 12C1.19884 12 1.37116 11.928 1.5303 11.792L4.64534 9.14721C4.74154 9.06504 4.87974 9.01795 5.02343 9.01795C5.16706 9.01795 5.30497 9.06504 5.40146 9.14744L8.50608 11.7916C8.66578 11.928 8.82622 12.0001 8.98779 12.0001C9.26102 12.0001 9.52734 11.7893 9.52734 11.3184V1.01865C9.52734 0.466486 9.06719 0 8.50014 0Z"
                          fill="#FF8787"
                        />
                        <g clip-path="url(#clip0_0_1)">
                          <path
                            d="M7.98436 4.30158C7.94508 4.18009 7.83732 4.0938 7.70983 4.08231L5.97807 3.92506L5.29328 2.32226C5.24279 2.20479 5.1278 2.12875 5.00003 2.12875C4.87227 2.12875 4.75727 2.20479 4.70678 2.32253L4.02199 3.92506L2.28995 4.08231C2.16269 4.09408 2.05521 4.18009 2.0157 4.30158C1.97619 4.42308 2.01268 4.55634 2.10895 4.64034L3.41796 5.78835L3.03196 7.48866C3.00372 7.61368 3.05224 7.74291 3.15597 7.81789C3.21173 7.85818 3.27696 7.87869 3.34275 7.87869C3.39946 7.87869 3.45573 7.8634 3.50622 7.83318L5.00003 6.94039L6.49329 7.83318C6.60256 7.89892 6.74031 7.89292 6.84381 7.81789C6.94759 7.74268 6.99607 7.61341 6.96782 7.48866L6.58183 5.78835L7.89084 4.64057C7.98711 4.55634 8.02387 4.42331 7.98436 4.30158Z"
                            fill="#DF4444"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_0_1">
                            <rect
                              width="6"
                              height="6"
                              fill="white"
                              transform="translate(2 2)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      {workData.isIndexed ? "Indexed" : "Not Indexed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.btn_container}>
              {/* <Link
              href={`/work/${workData.worksId}/edit`}
              className={styles.gradian_bt}
            >
              Edit work
            </Link> */}
              {/* <Link
              href={`/register-new-work?section=brand-guidelines&work=${workData.worksId}`}
              className={styles.gradian_bt}
            >
              Brand Guidelines
            </Link> */}
              {/* <Link
              href={`/register-new-work?section=contract-offers&work=${workData.worksId}`}
              className={styles.blue_btn}
            >
              Contract Offers
            </Link> */}
            </div>
          </div>
        </Link>
      </div>
      <div className="col-7 col-sm-7 col-md-7">
        <div className="row  custom-row h-100">
          <div className="col-4 col-sm-4 col-md-4  h-100">
            <div className={styles.own_first_grid}>
              <div className={styles.own_first_grid_box}>
                <p>{`${workData.assetGroups}  Asset Groups`}</p>
              </div>
              <div className={styles.own_first_grid_box}>
                <p>{`${workData.workAssets}  Work Assets`}</p>
              </div>
              <div className={styles.own_first_grid_box}>
                <p>{`${workData.assetTypes}  Work Asset Type`}</p>
              </div>
            </div>
          </div>
          <div className="col-5 col-sm-5 col-md-5 ">
            <div className={styles.own_first_grid}>
              <div className={styles.own_first_grid_box}>
                <p>3 Training Contracts</p>
              </div>
              <div className={styles.own_first_grid_box}>
                <p>0 Generate Contracts</p>
              </div>
              <div className={styles.own_first_grid_box}>
                <p>0 Publish Contracts</p>
              </div>
            </div>
          </div>
          <div className="col-3 col-sm-3 col-md-3 ">
            <div className={styles.own_first_lest}>
              <h4>
                <span>1500</span>Credits Earned
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
