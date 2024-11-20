"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Response } from "@/@types/CommonTypes";
import styles from "./Mylicensedworks.module.scss";
import Image from "next/image";
import ownimg from "/public/assets/images/myli1.png";
import ownimg0 from "/public/assets/images/myli0.png";

function Dashboard() {
  const { data: session } = useSession();

  return (
    <section className={styles.licensed_wrapper}>
      <div className={styles.licensed_header}>
        <h1>My Licensed Works</h1>
      </div>
      <div className="myownout">
        <div className={styles.main_card}>
          <div className={styles.own_ection}>
            <div className={styles.ownection_inner}>
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

                {/* box */}
                <div className="row mb-3">
                  <div className="col-md-4">
                    <div className={styles.own_first}>
                      <div className={styles.own_first_box}>
                        <Image src={ownimg0} alt='' />
                        <div className={styles.own_first_box_cnt}>
                          <h3>The Invitation (2022)</h3>
                          <div className={styles.own_first_box_btn}>
                            <span className={styles.blue_bg}>Movie</span>
                            <span className={styles.ellow_bg}>PAU000123456</span>
                            <h5>VAU000123456</h5>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="col-md-8">
                    <div className="row h-100">
                      <div className="col-md-4 h-100">
                        <div className={styles.own_first_grid}>
                          <div className={styles.own_first_grid_box}>
                            <p>33 Asset Groups</p>
                          </div>
                          <div className={styles.own_first_grid_box}>
                            <p>785 Work Assets</p>
                          </div>
                          <div className={styles.own_first_grid_box}>
                            <p>1 Work Asset Type</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
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
                      <div className="col-md-4 ">
                        <div className={styles.own_first_lest}>

                          <h4><span>1500</span>Credits Earned</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                 {/* box */}
                 <div className="row mb-3">
                  <div className="col-md-4">
                    <div className={styles.own_first}>
                      <div className={styles.own_first_box}>
                        <Image src={ownimg} alt='' />
                        <div className={styles.own_first_box_cnt}>
                          <h3>The Invitation (2022)</h3>
                          <div className={styles.own_first_box_btn}>
                            <span className={styles.blue_bg}>Movie</span>
                            <span className={styles.ellow_bg}>PAU000123456</span>
                            <h5>VAU000123456</h5>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="col-md-8">
                    <div className="row h-100">
                      <div className="col-md-4 h-100">
                        <div className={styles.own_first_grid}>
                          <div className={styles.own_first_grid_box}>
                            <p>33 Asset Groups</p>
                          </div>
                          <div className={styles.own_first_grid_box}>
                            <p>785 Work Assets</p>
                          </div>
                          <div className={styles.own_first_grid_box}>
                            <p>1 Work Asset Type</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
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
                      <div className="col-md-4 ">
                        <div className={styles.own_first_lest}>

                          <h4><span>1500</span>Credits Earned</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                 {/* box */}
                 <div className="row mb-3">
                  <div className="col-md-4">
                    <div className={styles.own_first}>
                      <div className={styles.own_first_box}>
                        <Image src={ownimg} alt='' />
                        <div className={styles.own_first_box_cnt}>
                          <h3>The Invitation (2022)</h3>
                          <div className={styles.own_first_box_btn}>
                            <span className={styles.blue_bg}>Movie</span>
                            <span className={styles.ellow_bg}>PAU000123456</span>
                            <h5>VAU000123456</h5>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="col-md-8">
                    <div className="row h-100">
                      <div className="col-md-4 h-100">
                        <div className={styles.own_first_grid}>
                          <div className={styles.own_first_grid_box}>
                            <p>33 Asset Groups</p>
                          </div>
                          <div className={styles.own_first_grid_box}>
                            <p>785 Work Assets</p>
                          </div>
                          <div className={styles.own_first_grid_box}>
                            <p>1 Work Asset Type</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
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
                      <div className="col-md-4 ">
                        <div className={styles.own_first_lest}>

                          <h4><span>1500</span>Credits Earned</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                 {/* box */}
                 <div className="row mb-3">
                  <div className="col-md-4">
                    <div className={styles.own_first}>
                      <div className={styles.own_first_box}>
                        <Image src={ownimg} alt='' />
                        <div className={styles.own_first_box_cnt}>
                          <h3>The Invitation (2022)</h3>
                          <div className={styles.own_first_box_btn}>
                            <span className={styles.blue_bg}>Movie</span>
                            <span className={styles.ellow_bg}>PAU000123456</span>
                            <h5>VAU000123456</h5>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="col-md-8">
                    <div className="row h-100">
                      <div className="col-md-4 h-100">
                        <div className={styles.own_first_grid}>
                          <div className={styles.own_first_grid_box}>
                            <p>33 Asset Groups</p>
                          </div>
                          <div className={styles.own_first_grid_box}>
                            <p>785 Work Assets</p>
                          </div>
                          <div className={styles.own_first_grid_box}>
                            <p>1 Work Asset Type</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
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
                      <div className="col-md-4 ">
                        <div className={styles.own_first_lest}>

                          <h4><span>1500</span>Credits Earned</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
          <div className="row mt-4">
                  <div className="col-md-12">
                   <button className={styles.gradian_bt}>Search for More</button>
                  </div>
                </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
