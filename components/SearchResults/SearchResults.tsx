"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./SearchResults.module.scss";
import SearchResultsTable from "@/components/Table/SearchResultsTable";
import { IWorkStandardIndex, Response } from "@/@types/CommonTypes";

type IStandardIndexResponse = Response<
  { searchResults: IWorkStandardIndex[] } & { totalResults: number }
>;

function SearchResults() {
  const [state, setState] = useState<{
    page: number;
    data: IWorkStandardIndex[] | null;
    totalResults: number;
    selectedIndex: string | null;
    selectedIndexName: string | null;
    // selectedIndexDetails: IWorkIndexDetails | null;
  }>({
    page: 1,
    data: null,
    totalResults: 0,
    selectedIndex: null,
    selectedIndexName: null,
    // selectedIndexDetails: null,
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
        // selectedIndexDetails: null,
      });
    } else if (isChecked) {
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
        `${process.env.NEXT_PUBLIC_API_URL}/works/search?page=${
          state.page - 1
        }&limit=10`
      )
      .then((response) => {
        const result: IStandardIndexResponse = response.data;
        if (result.success) {
          const { searchResults, totalResults } = result.data;
          setState({
            ...state,
            data: searchResults,
            totalResults: totalResults,
          });
        }
      });
  }, [state.page]);

  return (
    <section className={styles.owned_details_wrapper}>
      <div className="row">
        <div className="col-md-12">
          <h1>Search Results</h1>
          <div className={`${styles.card} ${styles.card_indexing_table}`}>
            <div className={styles.indexing_table_head}>
              <h2>{`Standard Indexing: ${state.totalResults} Shots`}</h2>
            </div>
            <div className={styles.indexing_table}>
              <SearchResultsTable
                data={state.data}
                handlePagination={handlePagination}
                noRecords={10}
                totalRecords={state.totalResults}
                handleTableEvent={handleTableEvent}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchResults;
