"use client";
import styles from "./Royalty.module.scss";
import Image from "next/image";
import royalty_img from "/public/assets/images/royalty_img.png";
import upload from "/public/assets/images/upload.svg";
import g_1 from "/public/assets/images/g_1.png";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Link from "next/link";

function Royalty() {
  return (
    <section className={styles.royalty}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <h4>Image Royalty</h4>
          </div>
        </div>
        <div className={styles.royalty_outer}>
          <div className="row">
            <div className="col-md-12 col-lg-8 mb-4">
              <div className={styles.Royalty_left}>
                <Image src={royalty_img} alt="" />
                <div className={styles.Royalty_left_cnt}>
                  <h3>Darlene Robertson</h3>
                  <h4>Caption</h4>
                  <p>
                    The image shows Darlene Robertson is standing outdoors in
                    Byron Bay. The background includes palm trees, the sky, and
                    a beach setting.
                  </p>
                  <ul>
                    <li>
                      Flat up-front fee
                      <span>$1</span>
                    </li>
                    <li>
                      Flat up-front fee
                      <span>$1</span>
                    </li>
                    <li>
                      Flat up-front fee
                      <span>$1</span>
                    </li>
                    <li>
                      Flat up-front fee
                      <span>$1</span>
                    </li>
                  </ul>
                  <div className={styles.card_dash_box_r}>
                    <button className={styles.blue_btn}>Download</button>
                    <button className={styles.blue_b_btn}>Copy</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4  mb-4">
              <div className={styles.Royalty_right}>
                <h3>Darlene Robertson</h3>
                <div className={styles.royalty_r_box}>
                  <div className={styles.Royalty_right_decription}>
                    <h6>Description Prompt</h6>
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
                  <div className={styles.Royalty_right_or}>Or</div>
                  <div className={styles.image_upload}>
                    <Image src={upload} alt="" />
                    <h6>What do you want to see?</h6>
                    <button className={styles.blue_b_btn}>Browse Here</button>
                  </div>
                  <div className={styles.card_dash_box_r}>
                    <button className={styles.blue_btn}>Generate Image</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Royalty;
