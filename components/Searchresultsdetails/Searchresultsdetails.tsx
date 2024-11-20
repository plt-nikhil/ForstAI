"use client";

import styles from "./Searchresultsdetails.module.scss";
import Image from "next/image";
import workDetail01 from "/public/assets/images/work_detail_01.png";
import Form from "react-bootstrap/Form";

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

interface SearchresultsdetailsProps {
  // ownedWork: OwnedWorks;
}

const Searchresultsdetails: React.FC<SearchresultsdetailsProps> = ({
  // ownedWork,
}) => {
  return (
    <section className={styles.owned_details_wrapper}>
      <div className="row mb-4">
        <div className="col-md-12">
          <h3>Selected Result</h3>
        </div>
        <div className="col-md-6">
          <div className={`${styles.card} ${styles.card_top}`}>
            <div className={styles.card_img}>
              <Image
                src={workDetail01}
                alt="work-image"
                width={500}
                height={500}
              />
            </div>
            <div className={styles.card_details}>
              <span>Name</span>
              <h4>Home Alone Movie-01</h4>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className={styles.result_details}>
            <div className={styles.result_details_box}>
              <div className={styles.result_details_box_inr}>
                <h4>Likeness Type</h4>
                <button className={styles.result_details_box_bt}>Film</button>
              </div>
              <div className={styles.result_details_box_inr}>
                <h4>Source Data Type</h4>
                <button className={styles.result_details_box_bt}>Video</button>
              </div>
            </div>
            <div className={styles.result_details_box}>
              <div className={styles.result_details_box_inr}>
                <h4>Length</h4>
                <p>0:00:04.05</p>
              </div>
              <div className={styles.result_details_box_inr}>
                <h4>Description</h4>
                <p>Man walking to front door Man walking to front door</p>
              </div>
            </div>
            <div className={styles.result_details_box}>
              <div className={styles.result_details_box_inr} id={styles.w_100}>
                <h4>Available License Type</h4>
                <p className="mb-3">AI Training – Detailed Indexing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row  mb-4">
        <div className="col--md-12">
          <div className={styles.search_details_form}>
            <div className="row">
              <div className="col-md-12">
                <h4>Detailed Indexing: Home Alone-03</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className={styles.normal_form}>
                  <label>Name</label>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Home Alone Movie"
                      id={styles.form_control}
                    />
                  </Form.Group>
                </div>
                <div className={styles.normal_form}>
                  <label>Action</label>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Walking to front door of house"
                      id={styles.form_control}
                    />
                  </Form.Group>
                </div>
                <div className={styles.normal_form}>
                  <label>Brands</label>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      placeholder="UUID"
                      id={styles.form_control}
                    />
                  </Form.Group>
                </div>
                <div className={styles.normal_form}>
                  <label>Objects</label>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      placeholder="What do you want to see?"
                      id={styles.form_control}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="col-md-4">
                <div className={styles.normal_form}>
                  <label>People</label>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Man"
                      id={styles.form_control}
                    />
                  </Form.Group>
                </div>
                <div className={styles.normal_form}>
                  <label>Language</label>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Man"
                      id={styles.form_control}
                    />
                  </Form.Group>
                </div>
                <div className={styles.normal_form}>
                  <label>Sentiment</label>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Casual"
                      id={styles.form_control}
                    />
                  </Form.Group>
                </div>
                <div className={styles.normal_form}>
                  <label>Lighting</label>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Lighting"
                      id={styles.form_control}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="col-md-4">
                <div className={styles.normal_form}>
                  <label>Emotion</label>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      placeholder="N/A"
                      id={styles.form_control}
                    />
                  </Form.Group>
                </div>
                <div className={styles.normal_form}>
                  <label>Clothing</label>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Suit"
                      id={styles.form_control}
                    />
                  </Form.Group>
                </div>
                <div className={styles.normal_form}>
                  <label>Celebrities</label>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Suit"
                      id={styles.form_control}
                    />
                  </Form.Group>
                </div>
                <div className={styles.normal_form}>
                  <label>Cam Action</label>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Cam Action"
                      id={styles.form_control}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row ">
        <div className="col-md-12">
          <div className={`${styles.card} ${styles.card_bottom}`}>
            <h2>Restriction on Use</h2>
            <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
              <input type="checkbox" />
              <div className={styles.checkbox__checkmark}></div>
              <div className={styles.checkbox__body}>
                No immoral use (nudity, extreme violence, alcohol, drugs,
                cigarettes, etc.)
              </div>
            </label>
            <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
              <input type="checkbox" />
              <div className={styles.checkbox__checkmark}></div>
              <div className={styles.checkbox__body}>
                No alteration of likeness
              </div>
            </label>
            <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
              <input type="checkbox" />
              <div className={styles.checkbox__checkmark}></div>
              <div className={styles.checkbox__body}>
                No concurrent use with any branded content
              </div>
            </label>
            <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
              <input type="checkbox" />
              <div className={styles.checkbox__checkmark}></div>
              <div className={styles.checkbox__body}>
                No concurrent use with other branded content
              </div>
            </label>
            <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
              <input type="checkbox" />
              <div className={styles.checkbox__checkmark}></div>
              <div className={styles.checkbox__body}>
                Require confirmation before contract
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-12">
          <div className={styles.footer_btn}>
            <button className={styles.secondary_btn}>Cancel</button>
            <button className={styles.primary_btn}>Add to Cart</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Searchresultsdetails;
