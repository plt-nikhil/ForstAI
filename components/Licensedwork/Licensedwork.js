"use client";
import styles from "./Licensedwork.module.scss"
import Image from "next/image";
import profile from "/public/assets/images/profile.png";
import dahtow_01 from "/public/assets/images/dahtow_01.svg";
import cardm from "/public/assets/images/master.svg";
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';




function Licensedwork() {

  return (
    <section className={styles.licensedwork}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <h4>Advanced Search</h4>
          </div>
          <div className="col-md-12">
            <div className={styles.advanced_search_outer}>
              <div className="row">
                <div className="col-md-12">
                  <h5>Search Keywords</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-lg-6" id={styles.advance_box}>
                  <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                    <label>Keyword</label>
                    <Form.Control type="email" placeholder="Card Number" id={styles.form_control} />
                  </Form.Group>
                </div>
                <div className="col-md-12 col-lg-3" id={styles.advance_box}>
                  <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                    <label>Likeness Type</label>

                    <Form.Select
                      aria-label="Tattoo style"
                      className="" id={styles.form_control}
                    >
                      <option value="">Film</option>
                      <option value="minimalist">Minimalist</option>
                      <option value="watercolor">Watercolor</option>
                      <option value="traditional">Traditional</option>
                    </Form.Select>

                  </Form.Group>
                </div>
                <div className="col-md-12 col-lg-3" id={styles.advance_box}>
                  <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                    <label>Source Data Type</label>
                    <Form.Select
                      aria-label="Tattoo style"
                      className="" id={styles.form_control}
                    >
                      <option value="">Video Shot</option>
                      <option value="minimalist">Minimalist</option>
                      <option value="watercolor">Watercolor</option>
                      <option value="traditional">Traditional</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label className={styles.radio_head}>Keyword</label>
                </div>
                <div className="col-md-12">
                  <div className="table_checkbox">
                    <div className={styles.row_check_outer}>
                      <div className={styles.row_check}>
                        {['checkbox'].map((type) => (
                          <div key={type} className="">
                            <Form.Check type={type} id={`check-api-${type}`}>
                              <Form.Check.Input type={type} isValid />
                              <Form.Check.Label>{`AI Training`}</Form.Check.Label>
                            </Form.Check>
                          </div>
                        ))}
                      </div>
                      <div className={styles.row_check}>
                        {['checkbox'].map((type) => (
                          <div key={type} className="">
                            <Form.Check type={type} id={`check-api-${type}`}>
                              <Form.Check.Input type={type} isValid />
                              <Form.Check.Label>{`AI Training`}</Form.Check.Label>
                            </Form.Check>
                          </div>
                        ))}
                      </div>
                      <div className={styles.row_check}>
                        {['checkbox'].map((type) => (
                          <div key={type} className="">
                            <Form.Check type={type} id={`check-api-${type}`}>
                              <Form.Check.Input type={type} isValid />
                              <Form.Check.Label>{`AI Training`}</Form.Check.Label>
                            </Form.Check>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6" id={styles.advance_box}>
                  <div className="row">
                    <div className="col-md-12">
                      <label>Flat Up-Front Fee</label>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                        <Form.Control type="email" placeholder="Min" id={styles.form_control} />
                      </Form.Group>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                        <Form.Control type="email" placeholder="Max" id={styles.form_control} />
                      </Form.Group>
                    </div>
                  </div>

                </div>
                <div className="col-md-6" id={styles.advance_box}>
                  <div className="row">
                    <div className="col-md-12">
                      <label>Usage Fee</label>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                        <Form.Control type="email" placeholder="Min" id={styles.form_control} />
                      </Form.Group>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                        <Form.Control type="email" placeholder="Max" id={styles.form_control} />
                      </Form.Group>
                    </div>
                  </div>

                </div>
              </div>

            </div>
            <div className={styles.card_dash_box_r}>
              <button className={styles.blue_b_btn}>Edit</button>
              <button className={styles.red_b_btn}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}

export default Licensedwork;
