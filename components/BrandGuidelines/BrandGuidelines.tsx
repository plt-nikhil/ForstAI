"use client";
import React from "react";
import styles from "./BrandGuidelines.module.scss";
import Image from "next/image";
import Form from "react-bootstrap/Form";
import uploadImg from "/public/assets/images/upload_plus.svg";
import accoDwn from "/public/assets/images/acco_dwn.svg";
import imgIcon from "/public/assets/images/img_icon.svg";
import accoRgt from "/public/assets/images/acco_rgt.svg";

function BrandGuidelines() {
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
              <h3>Standard Brand Guidelines</h3>
              <div className={styles.guidelines_title}>Face Images</div>
              <div className={styles.guideline_list}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" checked />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>
                    No Immoral Use (Nudity, Sex, Depravity)
                  </div>
                </label>
              </div>
              <div className={styles.guideline_list}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" checked />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>
                    No Vices (Drinking, Smoking, Violence)
                  </div>
                </label>
              </div>
              <div className={styles.guideline_list}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" checked />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>
                    Approval Required for Data Training
                  </div>
                </label>
              </div>
              <div className={styles.guideline_list}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" checked />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>
                    Approval Required for Generating
                  </div>
                </label>
              </div>
              <div className={styles.guideline_list}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" checked />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>
                    Approval Required for Publishing
                  </div>
                </label>
              </div>
              <div
                className={`${styles.normal_form} ${styles.guidelines_input}`}
              >
                <input
                  className={styles.inputfld}
                  type="text"
                  placeholder="Email"
                  name=""
                />
              </div>
              <div className={styles.card_dash_box_r}>
                <button className={styles.red_b_btn}>Authorize Agent</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles.work_box}>
              <h3>Advanced Brand Guidelines</h3>
              <div
                className={`${styles.guideline_list} ${styles.guideline_list_one}`}
              >
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" checked />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>
                    Co-branding Restrictions
                  </div>
                </label>
              </div>
              <div className={styles.guidelines_title}>
                DC, Adidas, Dior, Ford, Toyota, Honda, …
              </div>
              {/* <div className={`${styles.guideline_list} ${styles.guideline_list_one}`}  >
                <label className={`${styles.checkbox} ${styles.checkbox_field}`} >
                  <input type="checkbox" />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Require confirmation before contract</div>
                </label>
              </div> */}
              <h5 className={styles.sbhead}>Additional Restricted Keywords</h5>
              <div className={styles.guidelines_title}>
                Gun, Puppies, Kittens
              </div>
              <div className={styles.guideline_list}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" checked />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>
                    Data Training Pre-Authorization
                  </div>
                </label>
              </div>
              <div className={styles.guideline_list_sub}>
                <div className={styles.guideline_list}>
                  <label
                    className={`${styles.checkbox} ${styles.checkbox_field}`}
                  >
                    <input type="checkbox" checked />
                    <div className={styles.checkbox__checkmark}></div>
                    <div className={styles.checkbox__body}>
                      ForstAI (Private Generation)
                    </div>
                  </label>
                </div>
                <div className={styles.guideline_list}>
                  <label
                    className={`${styles.checkbox} ${styles.checkbox_field}`}
                  >
                    <input type="checkbox" checked />
                    <div className={styles.checkbox__checkmark}></div>
                    <div className={styles.checkbox__body}>
                      Adobe / Firefly Marketplace
                    </div>
                  </label>
                </div>
                <div className={styles.guideline_list}>
                  <label
                    className={`${styles.checkbox} ${styles.checkbox_field}`}
                  >
                    <input type="checkbox" />
                    <div className={styles.checkbox__checkmark}></div>
                    <div className={styles.checkbox__body}>Runway</div>
                  </label>
                </div>
                <div className={styles.guideline_list}>
                  <label
                    className={`${styles.checkbox} ${styles.checkbox_field}`}
                  >
                    <input type="checkbox" />
                    <div className={styles.checkbox__checkmark}></div>
                    <div className={styles.checkbox__body}>OpenAI / Sora</div>
                  </label>
                </div>
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

export default BrandGuidelines;
