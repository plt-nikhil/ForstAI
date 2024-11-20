"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { IMessageResponse, Response } from "@/@types/CommonTypes";
import styles from "./MyGeneratedWorks.module.scss";
import Image from "next/image";
import loader from "/public/assets/images/infLoader.svg";
import ownimg from "/public/assets/images/mygen.png";
import ownimg0 from "/public/assets/images/mygen0.png";
import { IGeneratedImageDataType } from "@/@types/WorkTypes";
import toast from "react-hot-toast";
import Link from "next/link";

type IDataType = {
  name: string;
  type: string;
  isCopyrighted: boolean;
  generatedThumbnail?: string;
  generatedWorkId: string;
  findworks: any;
};

type IDataResponse = Response<IDataType[]>;

function MyGeneratedWorks() {
  const { data: session, status } = useSession();
  const [state, setState] = useState<{
    generatedWorks: IGeneratedImageDataType[];
    isLoading: boolean;
  }>({
    generatedWorks: [],
    isLoading: true,
  });

  // const getMyGeneratedWorks = () => {
  //   const response = axios
  //     .get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/works/generated?page=0&limit=0`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${session?.user.access}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       const result: IDataResponse | IMessageResponse = response.data;
  //       if (result.success) {
  //         setState({
  //           ...state,
  //           generatedWorks: result.data as IDataType[],
  //           isLoading: false,
  //         });
  //       } else {
  //         toast.error("Failed to load data");
  //         setState({ ...state, isLoading: false });
  //       }
  //     });
  // };

  const getMyGenratedWorkList = () => {
    const response = axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/generate/my-genrated-works`, {
        headers: {
          Authorization: `Bearer ${session?.user.access}`,
        },
      })
      .then((response) => {
        const result: IDataResponse | IMessageResponse = response.data;
        console.log("my genrated work images ", result);
        if (result.success) {
          setState({
            ...state,
            //@ts-ignore
            generatedWorks: result?.data?.findworks?.works as any,
            isLoading: false,
          });
        } else {
          toast.error("Failed to load data");
          setState({ ...state, isLoading: false });
        }
      });
  };

  useEffect(() => {
    setState({ ...state, isLoading: true });
    if (status === "authenticated") {
      // getMyGeneratedWorks();
      getMyGenratedWorkList();
    }
  }, []);

  console.log("state.generatedWorks", state.generatedWorks);

  return (
    <section className={styles.licensed_wrapper}>
      <div className={styles.licensed_header}>
        <h1>My Generated Works</h1>
      </div>
      {/* <div className="myownout">
        <div className={styles.main_card}>
          <div className={styles.own_ection}>
            <div className={styles.ownection_inner}>
              {state.isLoading ? (
                <div>
                  <Image src={loader} alt="loader" />
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="row myown_head">
                    <div className="col-md-12">
                      <div className={styles.ownhead_outer}>
                        <div className="row">
                          <div className="col-md-4 ">
                            <div className={styles.ownhead}>
                              <h4>Thumbnail</h4>
                              <h3>Work Name</h3>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="row">
                              <div className="col-md-4 ">
                                <h4>Work Details</h4>
                              </div>
                              <div className="col-md-4 ">
                                <h4>Contract Details</h4>
                              </div>
                              <div className="col-md-4">
                                <h4>Licensees</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {state.generatedWorks.length ? (
                    state.generatedWorks.map((work, idx) => (
                      <Work key={idx} workIndex={idx} workData={work} />
                    ))
                  ) : (
                    <>
                      <div>No works Found</div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <Link href={"/generate-image"} className={styles.gradian_bt}>
                Generate New
              </Link>
            </div>
          </div>
        </div>
      </div> */}
      <div className="myownout">
        <div className={styles.main_card}>
          <div className={styles.own_ection}>
            <div className={styles.ownection_inner}>
              <div className="col-md-12">
                <div className="row myown_head">
                  <div className="col-md-12">
                    <div className={styles.ownhead_outer}>
                      <div className="row work_box">
                        <div className="col-xs-5 col-sm-5 col-md-5">
                          <div className={styles.ownhead}>
                            <h4>Thumbnail</h4>
                            <h3>Work Name</h3>
                          </div>
                        </div>
                        <div className="col-xs-7 col-sm-7 col-md-7">
                          <div className="row">
                            <div className="col-4 col-sm-4 col-md-4">
                              <h4>Work Details</h4>
                            </div>
                            <div className="col-5 col-sm-5  col-md-5">
                              <h4>Contract Details</h4>
                            </div>
                            <div className="col-3 col-sm-3 col-md-3">
                              <h4>Licensees</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.inner_box}>
                  {state.generatedWorks.length ? (
                    state.generatedWorks.map((work, idx) => {
                      return <Work key={idx} workIndex={idx} workData={work} />;
                    })
                  ) : (
                    <>
                      <div>No works Found</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <Link href={"/generate-image"} className={styles.gradian_bt}>
                Generate New
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyGeneratedWorks;

interface WorkProps {
  workIndex: number;
  workData: IGeneratedImageDataType;
}

// function Work({ workIndex, workData }: WorkProps): JSX.Element | null {
//   return (
//     <div className="row mb-3">
//       <div className="col-md-4">
//         <div className={styles.own_first}>
//           <div className={styles.own_first_box}>
//             <Image
//               src={workData.generatedThumbnail || ownimg}
//               alt=""
//               height={500}
//               width={500}
//             />
//             <div className={styles.own_first_box_cnt}>
//               <h3>{workData.name ?? `Generated Work ${workIndex + 1}`}</h3>
//               <div className={styles.own_first_box_btn}>
//                 <span className={styles.blue_bg}>
//                   {workData.type ?? "Image"}
//                 </span>
//                 <span className={styles.ellow_bg}>
//                   {workData.isCopyrighted ? "Copyrighted" : "Not Copyrighted"}
//                 </span>
//                 <h5>{workData.generatedWorkId}</h5>
//               </div>
//             </div>
//           </div>
//           {/* <div className="row ">
//             <Link
//               href={`/register-new-work?section=brand-guidelines&work=${workData.generatedWorkId}`}
//               className={styles.gradian_bt}
//             >
//               Brand Guidelines
//             </Link>
//             <Link
//               href={`/register-new-work?section=contract-offers&work=${workData.generatedWorkId}`}
//               className={styles.gradian_bt}
//             >
//               Contract Offers
//             </Link>
//           </div> */}
//         </div>
//       </div>
//       <div className="col-md-8">
//         <div className="row h-100">
//           <div className="col-md-4 h-100">
//             <div className={styles.own_first_grid}>
//               <div className={styles.own_first_grid_box}>
//                 {/* <p>{`${workData.assetGroups}  Asset Groups`}</p> */}
//                 <p>0 Asset Groups</p>
//               </div>
//               <div className={styles.own_first_grid_box}>
//                 {/* <p>{`${workData.workAssets}  Work Assets`}</p> */}
//                 <p>0 Work Assets</p>
//               </div>
//               <div className={styles.own_first_grid_box}>
//                 {/* <p>{`${workData.assetTypes}  Work Asset Type`}</p> */}
//                 <p>0 Work Asset Type</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className={styles.own_first_grid}>
//               <div className={styles.own_first_grid_box}>
//                 <p>0 Training Contracts</p>
//               </div>
//               <div className={styles.own_first_grid_box}>
//                 <p>0 Generate Contracts</p>
//               </div>
//               <div className={styles.own_first_grid_box}>
//                 <p>0 Publish Contracts</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4 ">
//             <div className={styles.own_first_lest}>
//               <h4>
//                 <span>0</span>Credits Earned
//               </h4>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function Work(workData: any): JSX.Element | null {
  return (
    <div className="row mb-2 work_box">
      <div className="col-5 col-sm-5 col-md-5">
        <Link href={""}>
          <div className={`${styles.own_first} ${styles.own_first_contain}`}>
            <div className={styles.own_first_box}>
              <Image
                src={workData?.workData.image}
                alt=""
                height={50}
                width={50}
              />
              <div className={styles.own_first_box_cnt}>
                <h3>{workData?.workData.name}</h3>
                <div className={styles.own_first_box_btn}>
                  <span className={styles.blue_bg}>
                    {workData?.workData.likeType}
                  </span>
                  <span className={styles.ellow_bg}>
                    {workData?.workData?.copyRightNumber
                      ? workData.workData?.copyRightNumber
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
                      {workData?.workData?.isIndexed
                        ? "Indexed"
                        : "Not Indexed"}
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
        <div className="row h-100">
          <div className="col-4 col-sm-4 col-md-4 h-100">
            <div className={styles.own_first_grid}>
              <div className={styles.own_first_grid_box}>
                <p>{`${workData?.workData?.assetGroups || 1}  Asset Groups`}</p>
              </div>
              <div className={styles.own_first_grid_box}>
                <p>{`${workData?.workData?.workAssets || 2}  Work Assets`}</p>
              </div>
              <div className={styles.own_first_grid_box}>
                <p>{`${
                  workData?.workData?.assetTypes || 3
                }  Work Asset Type`}</p>
              </div>
            </div>
          </div>
          <div className="col-5 col-sm-5 col-md-5">
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
          <div className="col-md-3 ">
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
