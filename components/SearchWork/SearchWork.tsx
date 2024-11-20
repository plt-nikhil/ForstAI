"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import { ISearchResults, Response } from "@/@types/CommonTypes";
import SearchTable from "../Table/SearchTable";
import styles from "./SearchWork.module.scss";
import EclipseLoader from "/public/assets/images/EclipseLoader.svg";

type ISearchResponse = Response<
  { searchResults: ISearchResults[] } & { totalResults: number }
>;

type ISearchData = {
  searchResults: ISearchResults[] | undefined;
  totalResults: number;
};

function SearchWork() {
  const { data: session, status } = useSession();
  const [isSearching, setIsSearching] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [searchResultData, setSearchResultData] = useState<ISearchData>({
    searchResults: undefined,
    totalResults: 0,
  });

  const searchWorks = async () => {
    try {
      if (status === "authenticated" && session.user.access) {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/works/search-asset?`;
        setIsSearching(true);
        if (searchKey) {
          url = url + `keyword=${searchKey}&`;
        }
        if (queryParams.trim()) {
          url = url + `${queryParams}`;
        }
        const result = await axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${session.user.access}`,
            },
          })
          .then((response) => {
            setIsSearching(false);
            const result: ISearchResponse = response.data;
            if (result.success) {
              result.data?.searchResults.map((elem) => {
                elem.price = Math.floor(Math.random() * 10 + 1);
              });
              setSearchResultData({
                searchResults: result.data?.searchResults ?? [],
                totalResults: result.data?.totalResults ?? 0,
              });
            }
          });
      }
    } catch (error) {
      setIsSearching(false);
      // console.log(error);
    }
  };

  const handleFilterChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const params = new URLSearchParams(queryParams);
    if (checked) {
      if (!params.has(name)) {
        params.append(name, "true");
      }
    } else {
      if (params.has(name)) {
        params.delete(name);
      }
    }
    setQueryParams(params.toString());
  };

  return (
    <div className={`${styles.workslicense_contain}`}>
      <h1>Search for Works to License</h1>
      <div className={styles.card}>
        <div className={styles.card_inner}>
          {/* SEARCH INPUT */}
          <div className={`${styles.normal_form} ${styles.search}`}>
            <input
              className={`${styles.inputfld}`}
              type="text"
              placeholder="Search..."
              name=""
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>

          {/* FILTER BOXES */}
          <div className={styles.filter_contain}>
            <div className="row">
              {/* RIGHTS DESIRED */}
              <div className="col-md-3">
                <div
                  className={`${styles.light_card} ${styles.light_card_side}`}
                >
                  <h2>Rights Desired</h2>
                  <div className={styles.filter_list}>
                    <label
                      className={`${styles.checkbox} ${styles.checkbox_field}`}
                    >
                      <input
                        type="checkbox"
                        name="training"
                        onChange={handleFilterChange}
                      />
                      <div className={styles.checkbox__checkmark}></div>
                      <div className={styles.checkbox__body}>
                        {" "}
                        AI data training{" "}
                      </div>
                    </label>
                  </div>
                  <div className={styles.filter_list}>
                    <label
                      className={`${styles.checkbox} ${styles.checkbox_field}`}
                    >
                      <input
                        type="checkbox"
                        name="generate"
                        onChange={handleFilterChange}
                      />
                      <div className={styles.checkbox__checkmark}></div>
                      <div className={styles.checkbox__body}> Generate </div>
                    </label>
                  </div>
                  <div className={styles.filter_list}>
                    <label
                      className={`${styles.checkbox} ${styles.checkbox_field}`}
                    >
                      <input type="checkbox" name="publish" disabled />
                      <div className={styles.checkbox__checkmark}></div>
                      <div className={styles.checkbox__body}> Publishing </div>
                    </label>
                  </div>
                  <div className={styles.filter_list}>
                    <label
                      className={`${styles.checkbox} ${styles.checkbox_field}`}
                    >
                      <input
                        type="checkbox"
                        name="copyright"
                        onChange={handleFilterChange}
                      />
                      <div className={styles.checkbox__checkmark}></div>
                      <div className={styles.checkbox__body}>
                        {" "}
                        {/* Copyright registered{" "} */}
                        Copyright Number Provided{" "}
                      </div>
                    </label>
                  </div>
                  <div className={styles.filter_list}>
                    <label
                      className={`${styles.checkbox} ${styles.checkbox_field}`}
                    >
                      <input
                        type="checkbox"
                        name="legal"
                        onChange={handleFilterChange}
                      />
                      <div className={styles.checkbox__checkmark}></div>
                      <div className={styles.checkbox__body}>
                        {" "}
                        {/* Uploaded legal clearance{" "} */}
                        Chain of Title{" "}
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className={`${styles.remove_px} col-md-6`}>
                {/* WORK ASSET TYPE */}
                <div className={`${styles.light_card} ${styles.assets_type}`}>
                  <h2>Work Asset Type</h2>
                  <div className={styles.filter_list_flex}>
                    <div className={styles.filter_list}>
                      <label
                        className={`${styles.checkbox} ${styles.checkbox_field}`}
                      >
                        <input
                          type="checkbox"
                          name="image"
                          onChange={handleFilterChange}
                        />
                        <div className={styles.checkbox__checkmark}></div>
                        <div className={styles.checkbox__body}> Images </div>
                      </label>
                    </div>
                    <div className={styles.filter_list}>
                      <label
                        className={`${styles.checkbox} ${styles.checkbox_field}`}
                      >
                        <input
                          type="checkbox"
                          name="video"
                          onChange={handleFilterChange}
                        />
                        <div className={styles.checkbox__checkmark}></div>
                        <div className={styles.checkbox__body}> Videos </div>
                      </label>
                    </div>
                    <div className={styles.filter_list}>
                      <label
                        className={`${styles.checkbox} ${styles.checkbox_field}`}
                      >
                        <input type="checkbox" disabled />
                        <div className={styles.checkbox__checkmark}></div>
                        <div className={styles.checkbox__body}> 3D Models </div>
                      </label>
                    </div>
                    <div className={styles.filter_list}>
                      <label
                        className={`${styles.checkbox} ${styles.checkbox_field}`}
                      >
                        <input type="checkbox" disabled />
                        <div className={styles.checkbox__checkmark}></div>
                        <div className={styles.checkbox__body}> Choreo </div>
                      </label>
                    </div>

                    <div className={styles.filter_list}>
                      <label
                        className={`${styles.checkbox} ${styles.checkbox_field}`}
                      >
                        <input type="checkbox" disabled />
                        <div className={styles.checkbox__checkmark}></div>
                        <div className={styles.checkbox__body}> Audio </div>
                      </label>
                    </div>

                    <div className={styles.filter_list}>
                      <label
                        className={`${styles.checkbox} ${styles.checkbox_field}`}
                      >
                        <input type="checkbox" disabled />
                        <div className={styles.checkbox__checkmark}></div>
                        <div className={styles.checkbox__body}> Documents </div>
                      </label>
                    </div>
                    <div className={styles.filter_list}>
                      <label
                        className={`${styles.checkbox} ${styles.checkbox_field}`}
                      >
                        <input type="checkbox" disabled />
                        <div className={styles.checkbox__checkmark}></div>
                        <div className={styles.checkbox__body}> 2D Models </div>
                      </label>
                    </div>
                    <div className={styles.filter_list}>
                      <label
                        className={`${styles.checkbox} ${styles.checkbox_field}`}
                      >
                        <input type="checkbox" disabled />
                        <div className={styles.checkbox__checkmark}></div>
                        <div className={styles.checkbox__body}>
                          {" "}
                          Music Score{" "}
                        </div>
                      </label>
                    </div>
                    <div className={styles.filter_list}>
                      <label
                        className={`${styles.checkbox} ${styles.checkbox_field}`}
                      >
                        <input
                          type="checkbox"
                          name="genAiModel"
                          onChange={handleFilterChange}
                        />
                        <div className={styles.checkbox__checkmark}></div>
                        <div className={styles.checkbox__body}>
                          {" "}
                          Fine-Tuned AI Model{" "}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* CONTRACT PARAMETERS */}
                {/* <div
                  className={`${styles.light_card} ${styles.parameters_list}`}
                >
                  <h2>Contract Parameters</h2>
                  <div className={styles.filter_list_flex}>
                    <div className={styles.filter_list}>
                      <label
                        className={`${styles.checkbox} ${styles.checkbox_field}`}
                      >
                        <input type="checkbox" name="flat-fee" disabled />
                        <div className={styles.checkbox__checkmark}></div>
                        <div className={styles.checkbox__body}> Flat fees </div>
                      </label>
                    </div>
                    <div className={styles.filter_list}>
                      <label
                        className={`${styles.checkbox} ${styles.checkbox_field}`}
                      >
                        <input type="checkbox" name="unit-fee" disabled />
                        <div className={styles.checkbox__checkmark}></div>
                        <div className={styles.checkbox__body}>
                          {" "}
                          Per unit fees{" "}
                        </div>
                      </label>
                    </div>
                    <div className={styles.filter_list}>
                      <label
                        className={`${styles.checkbox} ${styles.checkbox_field}`}
                      >
                        <input type="checkbox" name="daily-fee" disabled />
                        <div className={styles.checkbox__checkmark}></div>
                        <div className={styles.checkbox__body}>
                          {" "}
                          Daily access fees{" "}
                        </div>
                      </label>
                    </div>
                    <div className={styles.filter_list}>
                      <label
                        className={`${styles.checkbox} ${styles.checkbox_field}`}
                      >
                        <input type="checkbox" name="min-days" disabled />
                        <div className={styles.checkbox__checkmark}></div>
                        <div className={styles.checkbox__body}>
                          {" "}
                          Min Days Use{" "}
                        </div>
                      </label>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* AI DATA */}
              <div className="col-md-3">
                <div
                  className={`${styles.light_card} ${styles.light_card_side}`}
                >
                  <h2>AI Data</h2>
                  <div className={styles.filter_list}>
                    <label
                      className={`${styles.checkbox} ${styles.checkbox_field}`}
                    >
                      <input type="checkbox" disabled />
                      <div className={styles.checkbox__checkmark}></div>
                      <div className={styles.checkbox__body}>
                        {" "}
                        Full length only{" "}
                      </div>
                    </label>
                  </div>
                  <div className={styles.filter_list}>
                    <label
                      className={`${styles.checkbox} ${styles.checkbox_field}`}
                    >
                      <input type="checkbox" disabled />
                      <div className={styles.checkbox__checkmark}></div>
                      <div className={styles.checkbox__body}>
                        {" "}
                        Owner indexed{" "}
                      </div>
                    </label>
                  </div>
                  {/* <div className={styles.filter_list}>
                    <label
                      className={`${styles.checkbox} ${styles.checkbox_field}`}
                    >
                      <input type="checkbox" disabled />
                      <div className={styles.checkbox__checkmark}></div>
                      <div className={styles.checkbox__body}>
                        {" "}
                        Basic machine indexing{" "}
                      </div>
                    </label>
                  </div> */}
                  <div className={styles.filter_list}>
                    <label
                      className={`${styles.checkbox} ${styles.checkbox_field}`}
                    >
                      <input type="checkbox" disabled />
                      <div className={styles.checkbox__checkmark}></div>
                      <div className={styles.checkbox__body}>
                        {" "}
                        {/* Enhanced machine indexing{" "} */}
                        Fully indexed{" "}
                      </div>
                    </label>
                  </div>
                  <div className={styles.filter_list}>
                    <label
                      className={`${styles.checkbox} ${styles.checkbox_field}`}
                    >
                      <input type="checkbox" disabled />
                      <div className={styles.checkbox__checkmark}></div>
                      <div className={styles.checkbox__body}>
                        {" "}
                        Customized indexing{" "}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button className={styles.primary_btn} onClick={searchWorks}>
              {isSearching ? (
                <Image
                  src={EclipseLoader}
                  alt="loader"
                  height={30}
                  width={30}
                />
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
        <div className={styles.searchtable}>
          <SearchTable searchData={searchResultData} />
        </div>
      </div>
    </div>
  );
}

export default SearchWork;
