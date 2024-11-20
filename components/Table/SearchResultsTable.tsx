"use client";
import styles from "./Table.module.scss";
import Table from "react-bootstrap/Table";
import { IWorkStandardIndex } from "@/@types/CommonTypes";
import { ChangeEvent, useMemo, useState } from "react";
type paginationHandler = (action: number) => void;
type tableEventHandler = (data: any) => void;

function SearchResultsTable({
  data,
  handlePagination,
  handleTableEvent,
  totalRecords,
  noRecords,
}: {
  data: IWorkStandardIndex[] | null;
  handlePagination: paginationHandler;
  handleTableEvent: tableEventHandler;
  totalRecords: number;
  noRecords: number;
}) {
  const [state, setState] = useState<{
    page: number;
  }>({
    page: 1,
  });
  const noOfPages = useMemo(
    () => Math.ceil(totalRecords / noRecords),
    [totalRecords]
  );

  const pageEventHandler = (action: string) => {
    const { page } = state;
    if (action === "forward" && state.page < noOfPages) {
      setState({ ...state, page: page + 1 });
      handlePagination(page + 1);
    } else if (action === "backward" && page > 1) {
      setState({ ...state, page: page - 1 });
      handlePagination(page - 1);
    }
  };

  return (
    <section className={styles.table_wrapper}>
      <div className={styles.pagination}>
        <div className={styles.count}>
          <div className={styles.count_start}>{state.page}</div>-
          <div className={styles.list_count}>{noOfPages}</div> of{" "}
          <div className={styles.total_count}>{totalRecords}</div>
        </div>
        <div className={styles.pagination_btn}>
          <button
            className={styles.prev_btn}
            onClick={() => pageEventHandler("backward")}
          >
            <svg
              width="8"
              height="16"
              viewBox="0 0 8 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.48808 15.5694C7.17359 15.839 6.70011 15.8026 6.43054 15.4881L0.430545 8.48809C0.189801 8.20723 0.189801 7.79277 0.430545 7.51191L6.43055 0.511908C6.70011 0.197414 7.17359 0.160993 7.48808 0.430559C7.80258 0.700126 7.839 1.1736 7.56943 1.4881L1.9878 8L7.56943 14.5119C7.839 14.8264 7.80257 15.2999 7.48808 15.5694Z"
                fill="#7B7C95"
              />
            </svg>
          </button>
          <button
            className={styles.next_btn}
            onClick={() => pageEventHandler("forward")}
          >
            <svg
              width="8"
              height="16"
              viewBox="0 0 8 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.51192 0.180571C0.826414 -0.0889955 1.29989 -0.0525743 1.56946 0.26192L7.56946 7.26192C7.8102 7.54279 7.8102 7.95724 7.56946 8.23811L1.56946 15.2381C1.29989 15.5526 0.826414 15.589 0.51192 15.3195C0.197426 15.0499 0.161005 14.5764 0.430571 14.2619L6.01221 7.75001L0.430571 1.23811C0.161005 0.923613 0.197426 0.450138 0.51192 0.180571Z"
                fill="#7B7C95"
              />
            </svg>
          </button>
        </div>
      </div>
      <Table responsive striped bordered hover className="custome_table">
        <thead className={styles.table_thead}>
          <tr>
            <th></th>
            <th>Shot Name</th>
            <th>Description</th>
            <th>Start Frame</th>
            <th>End Frame</th>
            <th>Universal ID</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, idx) => (
            <tr key={idx}>
              <td>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="checkbox"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const { checked } = event.target;
                      if (checked) {
                        handleTableEvent({
                          universalId: item.universalId,
                          title: item.title,
                          isChecked: true,
                        });
                      } else {
                        handleTableEvent({
                          universalId: item.universalId,
                          title: item.title,
                          isChecked: false,
                        });
                      }
                    }}
                  />
                  <div className={styles.checkbox__checkmark}></div>
                </label>
              </td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.startFrame}</td>
              <td>{item.endFrame}</td>
              <td>{item.universalId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}

export default SearchResultsTable;
