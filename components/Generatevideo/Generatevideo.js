"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Response } from "@/@types/CommonTypes";
import styles from "./Generatevideo.module.scss";
import Image from "next/image";
import ownimg from "/public/assets/images/mygen.png";
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from "react-hook-form";
import TagInput from "../TagInput/TagInput";
import uploadImg from "/public/assets/images/upload_plus.svg";

function Generatevideo() {
  const { data: session } = useSession();

  return (
    <section className={styles.licensed_wrapper}>
      <div className={styles.licensed_header}>
        <h1>Generate Video</h1>
      </div>
      <div className={`container-fluid ${styles.generatimage}`}>
        <div className="row">
          <div className={`${styles.generat_left_contain} col-md-12 col-lg-8`}>
            <div className="row">
              <div className="col-md-12">
              <div className={`${styles.bg_box} ${styles.bg_box_contain}`}>
                <h5>Prompt</h5>
                  <div className={styles.image_upload_flex}>
                    <div className={styles.image_upload_contain}>
                      <div className={styles.image_upload}>
                        <button type="button">
                          <Image src={uploadImg} alt="" width={500} height={500} />
                        </button>
                        <span>Thumbnail</span>
                      </div>
                    </div>
                    <div className={styles.imageupload_textarea_contain}>
                      <div className={styles.imageupload_type}>
                        <div id={styles.advance_box}>
                          <Form.Group className="h-100" controlId="exampleForm.ControlInput1">
                            <Form.Control as="textarea" rows={5} placeholder="Enter Prompt or Select Prompt Designer, Owned and Licensed Works options to
build your prompt. Then re-arrange elements in order of priority." id={styles.form_control} />
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className={styles.bg_box}>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <div className="row">

                        <h5>Template</h5>
                      </div>
                      <div className="row  gen_video">
                        <div className="col-md-6 col-lg-3">
                          <div className={styles.generate_vidio_upload}>
                            <div className={styles.image_upload}>
                              <button type="button">
                                <Image src={uploadImg} alt="" />
                              </button>
                              <span>Base Image</span>
                            </div>
                            <h3>Wearing Product</h3>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className={styles.generate_vidio_upload}>
                            <div className={styles.image_upload}>
                              <button type="button">
                                <Image src={uploadImg} alt="" />
                              </button>
                              <span>Base Image</span>
                            </div>
                            <h3>Holding
                            Product</h3>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className={styles.generate_vidio_upload}>
                            <div className={styles.image_upload}>
                              <button type="button">
                                <Image src={uploadImg} alt="" />
                              </button>
                              <span>Base Image</span>
                            </div>
                            <h3>Product
                            Close-up</h3>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className={styles.generate_vidio_upload}>
                            <div className={styles.image_upload}>
                              <button type="button">
                                <Image src={uploadImg} alt="" />
                              </button>
                              <span>Base Image</span>
                            </div>
                            <h3>QR Code
                            Overlay</h3>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className={styles.generate_vidio_upload}>
                            <div className={styles.image_upload}>
                              <button type="button">
                                <Image src={uploadImg} alt="" />
                              </button>
                              <span>Base Image</span>
                            </div>
                            <h3>Printed Mailer</h3>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                          <div className={styles.generate_vidio_upload}>
                            <div className={styles.image_upload}>
                              <button type="button">
                                <Image src={uploadImg} alt="" />
                              </button>
                              <span>Base Image</span>
                            </div>
                            <h3>Magazine
                            Pictorial</h3>
                          </div>
                        </div>
                    
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-12">
                            <button className={styles.gradian_bt}>Design Prompt</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.generat_right_contain} col-md-12 col-lg-4`}>
            <div className="row h-100">
              <div className="col-md-12">
                <div className={styles.bg_box}>
                  <h6>Owned Works</h6>
                  <div className={styles.tag_outer}>
                    <ul>
                      <li>Nike Shoe
                        SKU345</li>
                      <li>Nike Shoe
                        SKU762</li>
                      <li>AI Male - John</li>
                      <li>AI Female - Amy</li>
                      <li>Nike Jacket SKU123</li>
                      <li>Nike LL
                        Overlay</li>
                      <li>Nike UL
                        Overlay</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-12  ">
                <div className={styles.bg_box}>
                  <h6>Licensed Works</h6>
                  <div className={styles.tag_outer}>
                    <ul>
                      <li>Michael Jordan</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`col-md-12 ${styles.ml_8} ${styles.mt_5}`}>
            <button className={styles.gradian_bt}>Generate</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Generatevideo;
