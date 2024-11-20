"use client";

import { IWorkIndex, Response, IWorkIndexDetails } from "@/@types/CommonTypes";
import styles from "./WorksIndexing.module.scss";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CustomTable from "@/components/Table/Table";
import TagInput from "../TagInput/TagInput";

type IWorkIndexResponse = Response<
  { workIndexes: IWorkIndex[] } & { totalIndexes: number }
>;
type IWorkIndexDetailResponse = Response<IWorkIndexDetails>;
function WorksIndex() {
  const params = useParams<{ workId: string }>();
  const [state, setState] = useState<{
    page: number;
    data: IWorkIndex[] | null;
    totalIndexes: number;
    selectedIndex: string | null;
    selectedIndexName: string | null;
    selectedIndexDetails: IWorkIndexDetails | null;
  }>({
    page: 1,
    data: null,
    totalIndexes: 0,
    selectedIndex: null,
    selectedIndexName: null,
    selectedIndexDetails: null,
  });
  const handlePagination = (page: number) => {
    setState({ ...state, page: page });
  };
  const handleTableEvent = (data: {
    universalId: string;
    name: string;
    isChecked: boolean;
  }) => {
    const { isChecked, universalId, name } = data;
    if (!isChecked && state.selectedIndex === universalId) {
      setState({
        ...state,
        selectedIndex: null,
        selectedIndexName: null,
        selectedIndexDetails: null,
      });
    } else if(isChecked) {
      setState({
        ...state,
        selectedIndex: universalId,
        selectedIndexName: name,
      });
    }
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/works/owned/${params.workId}/index?page=${
          state.page - 1
        }&limit=10`
      )
      .then((response) => {
        const result: IWorkIndexResponse = response.data;
        if (result.success) {
          const { workIndexes, totalIndexes } = result.data;
          setState({ ...state, data: workIndexes, totalIndexes: totalIndexes });
        }
      });
  }, [state.page]);
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/works/owned/${params.workId}/index/${state.selectedIndex}`
      )
      .then((response) => {
        const result: IWorkIndexDetailResponse = response.data;
        if (result.success) {
          const data = result.data;
          setState({ ...state, selectedIndexDetails: data });
        }
      });
  }, [state.selectedIndex]);
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className={`${styles.card} ${styles.card_indexing_table}`}>
            <div className={styles.indexing_table_head}>
              <h2>{`Standard Indexing: ${state.totalIndexes} Shots`}</h2>
            </div>
            <div className={styles.indexing_table}>
              <CustomTable
                data={state.data}
                handlePagination={handlePagination}
                noRecords={10}
                totalRecords={state.totalIndexes}
                handleTableEvent={handleTableEvent}
              />
            </div>
          </div>
        </div>
      </div>
      {state.selectedIndex && state.selectedIndexDetails && (
        <div className="row">
          <div className="col-md-12">
            <div className={`${styles.card} ${styles.card_bottom}`}>
              <div className={styles.box_header}>
                <h2>Detailed Indexing: {state.selectedIndexName}</h2>
                <button className={styles.primary_btn}>Index it More</button>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className={styles.normal_form}>
                    <label>Name</label>
                    <input
                      className={styles.inputfld}
                      type="text"
                      name=""
                      value={state.selectedIndexDetails.name}
                    />
                  </div>
                  <div className={styles.normal_form}>
                    <label>Action</label>
                    <TagInput
                      value={state.selectedIndexDetails?.action}
                      showInput={false}
                      styleName={styles.inputfld}
                    />
                  </div>
                  <div className={styles.normal_form}>
                    <label>Brands</label>
                    <TagInput
                      value={state.selectedIndexDetails?.brands}
                      showInput={false}
                      styleName={styles.inputfld}
                    />
                  </div>
                  <div className={styles.normal_form}>
                    <label>Objects</label>
                    <TagInput
                      value={state.selectedIndexDetails?.objects}
                      showInput={false}
                      styleName={styles.inputfld}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={styles.normal_form}>
                    <label>People</label>
                    <TagInput
                      value={state.selectedIndexDetails?.people}
                      showInput={false}
                      styleName={styles.inputfld}
                    />
                  </div>
                  <div className={styles.normal_form}>
                    <label>Language</label>
                    <TagInput
                      value={state.selectedIndexDetails?.language}
                      showInput={false}
                      styleName={styles.inputfld}
                    />
                  </div>
                  <div className={styles.normal_form}>
                    <label>Sentiment</label>
                    <TagInput
                      value={state.selectedIndexDetails?.sentiment}
                      showInput={false}
                      styleName={styles.inputfld}
                    />
                  </div>
                  <div className={styles.normal_form}>
                    <label>Lighting</label>
                    <TagInput
                      value={state.selectedIndexDetails?.lighting}
                      showInput={false}
                      styleName={styles.inputfld}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={styles.normal_form}>
                    <label>Emotion</label>
                    <TagInput
                      value={state.selectedIndexDetails?.emotion}
                      showInput={false}
                      styleName={styles.inputfld}
                    />
                  </div>
                  <div className={styles.normal_form}>
                    <label>Clothing</label>
                    <TagInput
                      value={state.selectedIndexDetails?.clothing}
                      showInput={false}
                      styleName={styles.inputfld}
                    />
                  </div>
                  <div className={styles.normal_form}>
                    <label>Celebrities</label>
                    <TagInput
                      value={state.selectedIndexDetails?.celebrities}
                      showInput={false}
                      styleName={styles.inputfld}
                    />
                  </div>
                  <div className={styles.normal_form}>
                    <label>Cam Action</label>
                    <TagInput
                      value={state.selectedIndexDetails?.camAction}
                      showInput={false}
                      styleName={styles.inputfld}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WorksIndex;
