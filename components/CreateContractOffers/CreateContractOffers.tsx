"use client";
import React from "react";
import styles from "./CreateContractOffers.module.scss";
import Image from "next/image";
import { Form } from "react-bootstrap";
import uploadImg from "/public/assets/images/upload_plus.svg";
import accoDwn from "/public/assets/images/acco_dwn.svg";
import imgIcon from "/public/assets/images/img_icon.svg";
import accoRgt from "/public/assets/images/acco_rgt.svg";

function CreateContractOffers() {
  return (
    <div className={`${styles.regNewWork_contain} regNewWork_contain`}>
      <h1>Define Brand Guidelines</h1>
      <div className={styles.card}>
        <h2>Work Details</h2>
        <div className="row">
          <div className={styles.upload_contain}>
            <div className={styles.image_upload}>
              <button>
                <Image src={uploadImg} alt="" />
              </button>
              <span>Thumbnail</span>
            </div>
          </div>
          <div className="col">
            <div className={styles.form_flex}>
              <div className={styles.normal_form}>
                <input
                  className={styles.inputfld}
                  type="text"
                  placeholder="Enter Work Name"
                  name=""
                />
              </div>
              <div className={styles.normal_form} id={styles.advance_box}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Select
                    aria-label="Tattoo style"
                    className=""
                    id={styles.form_control}
                  >
                    <option
                      className={styles.disbled}
                      value=""
                      disabled
                      selected
                    >
                      Likness Type
                    </option>
                    <option value="">Film</option>
                    <option value="minimalist">Minimalist</option>
                    <option value="watercolor">Watercolor</option>
                    <option value="traditional">Traditional</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <div>
              <textarea
                className={styles.textareafld}
                placeholder="Enter Work Description"
              ></textarea>
            </div>
          </div>
          <div className="col">
            <div className={styles.Keywords}>
              <textarea
                className={styles.textareafld}
                placeholder="Enter Work Description"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.card} ${styles.card_center}`}>
        <h2>Work Assets</h2>
        <div className="row">
          <div className="col-md-4">
            <div className={styles.work_box}>
              <h3>Work Asset List</h3>
              <div className={styles.no_data}>No Work Assets Defined</div>
              <button className={styles.primary_btn}>Create Asset Group</button>
              <div className={styles.acco_box}>
                <div className={styles.main_hd}>
                  <span>
                    <Image src={accoDwn} alt="" />
                  </span>
                  ScarJo
                </div>
                <div className={styles.acco_box_inner}>
                  <div className={styles.expand_box}>
                    <div className={styles.expand_box_inner}>
                      <div className={styles.main_hd}>
                        <span>
                          <Image src={accoDwn} alt="" />
                        </span>
                        Face Images
                      </div>
                      <ul className={styles.add_assets}>
                        <li>
                          <span>
                            <Image src={imgIcon} alt="" />
                          </span>{" "}
                          ScarJo_image_01.jpg
                        </li>
                        <li>
                          <span>
                            <Image src={imgIcon} alt="" />
                          </span>{" "}
                          ScarJo_image_02.jpg
                        </li>
                        <li>
                          <span>
                            <Image src={imgIcon} alt="" />
                          </span>{" "}
                          ScarJo_image_03.jpg
                        </li>
                      </ul>
                      <button className={styles.add_btn}>Add</button>
                    </div>
                  </div>
                  <div className={styles.collapse_box}>
                    <div className={styles.main_hd}>
                      <span>
                        <Image src={accoRgt} alt="" />
                      </span>
                      Body Images
                    </div>
                  </div>
                  <div className={styles.collapse_box}>
                    <div className={styles.main_hd}>
                      <span>
                        <Image src={accoRgt} alt="" />
                      </span>
                      Voice Audio
                    </div>
                  </div>
                  <button
                    className={`${styles.primary_btn} ${styles.add_group}`}
                  >
                    Add Asset Group
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles.work_box}>
              <h3>Enable Contracts</h3>
              <div className="mb-4">
                <div
                  className={`${styles.normal_form} ${styles.guidelines_input}`}
                >
                  <input
                    className={styles.inputfld}
                    type="text"
                    placeholder="URL of Legal Clearance"
                    name=""
                  />
                </div>
                <div className={styles.card_dash_box_r}>
                  <button className={styles.red_b_btn}>
                    Upload Legal Clearance
                  </button>
                </div>
              </div>
              <div className={styles.guidelines_title}>Face Images</div>
              <div className={styles.guideline_list}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" checked />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>
                    Explicit consent to Train AI on Likeness
                  </div>
                </label>
              </div>
              <div className={styles.guideline_list}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>AI data training</div>
                </label>
              </div>
              <div className={styles.guideline_list}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" checked />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Generate</div>
                </label>
              </div>
              <div className={styles.guideline_list}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" checked />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Publishing</div>
                </label>
              </div>
              <div className={styles.guideline_list}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" checked />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>
                    Distribution of AI Rights
                  </div>
                </label>
              </div>
              {/* <div className={`${styles.normal_form} ${styles.guidelines_input}`}>
                <input className={styles.inputfld} type="text" placeholder="URL of Legal Clearance" name=""/>
              </div>
              <div className={styles.card_dash_box_r}>
                <button className={styles.red_b_btn}>Upload Legal Clearance</button>
              </div> */}
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles.work_box}>
              <h3>Contract Details</h3>
              <div className={styles.guidelines_title}>Generate</div>
              <div className={styles.contract_detail_list}>
                <div className={styles.list_box}>
                  <div className={styles.num_box}>
                    <span className={styles.symbol}>$</span>
                    <span className={styles.numb}>500</span>
                  </div>
                  <div className={styles.list_content}>
                    Flat Fee for Fine-Tuned Generation
                  </div>
                </div>
                <div className={styles.list_box}>
                  <div className={styles.num_box}>
                    <span className={styles.symbol}>$</span>
                    <span className={styles.numb}>25</span>
                  </div>
                  <div className={styles.list_content}>Per Generation Fee</div>
                </div>
                <div className={styles.list_box}>
                  <div className={styles.num_box}>
                    <span className={styles.symbol}>$</span>
                    <span className={styles.numb}>500</span>
                  </div>
                  <div className={styles.list_content}>Daily Access Fee</div>
                </div>
                <div className={styles.list_box}>
                  <div className={`${styles.num_box} ${styles.num_box_center}`}>
                    <span className={styles.numb}>5</span>
                  </div>
                  <div className={styles.list_content}>
                    Max # of Days of Access
                  </div>
                </div>
                <div className={styles.list_box}>
                  <div className={`${styles.num_box} ${styles.num_box_center}`}>
                    <span className={styles.numb}>100</span>
                  </div>
                  <div className={styles.list_content}>Max Generations</div>
                </div>
              </div>
              <div className={styles.list_box_content}>
                {" "}
                The Generate contract enables licensees to generate content
                based on fine-tuning of the core data provided in this Work
                Asset.{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <h2>Acknowledgement</h2>
        <div className={styles.bottom_flex}>
          <div>
            <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
              <input type="checkbox" />
              <div className={styles.checkbox__checkmark}></div>
              <div className={styles.checkbox__body}>
                I confirm that I own all the intellectual property rights to
                these assets.
              </div>
            </label>
          </div>
          <div className={styles.card_dash_box_r}>
            <button className={styles.blue_b_btn}>Save & Rights</button>
            <button className={styles.red_b_btn}>Save Work</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateContractOffers;
