import { ChangeEvent, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Table from "react-bootstrap/Table";
import PurchaseAssetContext from "@/context/PurchaseAssetContext";
import styles from "./Table.module.scss";

function SearchTable({ searchData }: any) {
  const purchaseAssetContext = useContext(PurchaseAssetContext);
  const router = useRouter();

  const handleAssetSelect = (e: ChangeEvent<HTMLInputElement>, item: any) => {
    if (e.target.checked) {
      purchaseAssetContext?.updateAssetListState([
        ...purchaseAssetContext.assetList,
        item,
      ]);
    } else {
      const index =
        purchaseAssetContext?.assetList.findIndex(
          (asset) => asset.assetId === item.assetId
        ) ?? -1;
      let assetList = purchaseAssetContext?.assetList ?? [];
      if (assetList.length && index !== -1) {
        assetList.splice(index, 1);
        purchaseAssetContext?.updateAssetListState(assetList);
      }
    }
  };

  const seeWorkDetails = (assetId: string) => {
    router.push(`/work-details/${assetId}`);
  };

  // return (
  //   <section className={styles.table_wrapper}>
  //     <div className={styles.table_head}>
  //       {searchData.searchResults ? (
  //         searchData.totalResults !== 0 ? (
  //           <h2>{searchData.totalResults} Search Results – Select One for Details, Many for Purchase</h2>
  //         ) : (
  //           <h2>No Results Found</h2>
  //         )
  //       ) : null}
  //     </div>
  //     {searchData.searchResults && searchData.searchResults?.length !== 0 ?
  //       <div className={`${styles.search_custom} custome_table`}>
  //         <Table responsive striped bordered hover className={`${styles.custom_tbl} custome_table`}>
  //           <thead className={styles.table_thead}>
  //             <tr>
  //               <th></th>
  //               <th>Type</th>
  //               <th>Qty</th>
  //               <th>Owner</th>
  //               <th>Likeness</th>
  //               <th className={styles.tbl_des}>Description</th>
  //               <th>Licenses Available</th>
  //               <th>Pricing</th>
  //               <th>Unit</th>
  //             </tr>
  //           </thead>
  //         </Table>
  //         <div className={styles.custom_tbl_body}>
  //           <Table responsive striped bordered hover className={`${styles.custom_tbl} custome_table`}>
  //             <tbody>
  //               {searchData.searchResults?.map((item: any, index: number) => (
  //                 <tr key={index} onClick={() => seeWorkDetails(item.assetId)}>
  //                   <td className="table_check_inner">
  //                     <label
  //                       className={`${styles.checkbox} ${styles.checkbox_field}`}
  //                       onClick={(e) => {
  //                         e.stopPropagation();
  //                       }}
  //                     >
  //                       <input type="checkbox" onChange={(e) => handleAssetSelect(e, item)} />
  //                       <div className={styles.checkbox__checkmark}></div>
  //                     </label>
  //                   </td>
  //                   <td>{item.type ?? 'Image'}</td>
  //                   <td>{item.type === 'image' ? item.quantity ?? 1 : item.quantity ?? '1m'}</td>
  //                   <td>{item.owner ?? 'ScarJo'}</td>
  //                   <td>{item.likeType ?? 'Celebrity'}</td>
  //                   <td className={styles.tbl_des}>{item.description ?? 'Face-Face of Celebrity'}</td>
  //                   <td>
  //                     {item.enabledContracts === ''
  //                       ? 'No contracts'
  //                       : item.enabledContracts.trim().endsWith(',')
  //                         ? item.enabledContracts.slice(0, -2)
  //                         : item.enabledContracts}
  //                   </td>
  //                   <td>$ {item.pricing ?? 1}</td>
  //                   <td>{item.unit ?? 'Per Generate'}</td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </Table>
  //         </div>
  //       </div>
  //       : null
  //     }
  //     {purchaseAssetContext?.assetList && purchaseAssetContext.assetList?.length !== 0 ?
  //       <Link href={"/purchase-licenses"}>
  //         <button className={`${styles.primary_btn} ${styles.cart_btn}`}>Add to Cart</button>
  //       </Link>
  //       : null}
  //   </section>
  // );
  
  const sampleNames = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Ethan",
    "Fiona",
    "George",
    "Hannah",
    "Ian",
    "Jenna",
    "Kyle",
    "Lily",
  ];
  const getRandomName = () =>
    sampleNames[Math.floor(Math.random() * sampleNames.length)];
  return (
    <section className={styles.table_wrapper}>
      <div className={styles.table_head}>
        {searchData.searchResults ? (
          searchData.totalResults !== 0 ? (
            <h2>
              {searchData.totalResults} Search Results – Select One for Details,
              Many for Purchase
            </h2>
          ) : (
            <h2>No Results Found</h2>
          )
        ) : null}
      </div>
      {searchData.searchResults && searchData.searchResults?.length !== 0 ? (
        <div className={`${styles.search_custom} custome_table`}>
          <Table
            responsive
            striped
            bordered
            hover
            className={`${styles.custom_tbl} custome_table`}
          >
            <thead className={styles.table_thead}>
              <tr>
                <th></th>
                <th>Work Title</th>
                <th>Work Asset Group Name</th>
                <th>Likeness</th>
                <th>Asset Type</th>
                {/* <th className={styles.tbl_des}>Indexed or Not</th> */}
                <th>Indexed or Not</th>
                <th>Trained or Not</th>
                <th>Owner</th>
                <th>License Available</th>
                <th>Qty</th>
                <th>Pricing</th>
              </tr>
            </thead>
          </Table>
          <div className={styles.custom_tbl_body}>
            <Table
              responsive
              striped
              bordered
              hover
              className={`${styles.custom_tbl} custome_table`}
            >
              <tbody>
                {searchData.searchResults?.map((item: any, index: number) => (
                  <tr key={index} onClick={() => seeWorkDetails(item.assetId)}>
                    <td className="table_check_inner">
                      <label
                        className={`${styles.checkbox} ${styles.checkbox_field}`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <input
                          type="checkbox"
                          onChange={(e) => handleAssetSelect(e, item)}
                        />
                        <div className={styles.checkbox__checkmark}></div>
                      </label>
                    </td>
                    <td>{item.workTitle}</td>
                    <td>{item.workAssetGroupName}</td>

                    <td>{item.likeType ? item.likeType : "-"}</td>
                    <td>{item.type}</td>
                    <td>{item.type !== "video" ? "-" : item.isIndexed == "true" ? "Yes" : "No"}</td>
                    <td>{item.type === "video" ? "-" : item.isTrained == "true" ? "Yes" : "No"}</td>
                    {/* <td>{getRandomName()}</td> */}
                    <td>{item.owner}</td>
                    <td>
                    {item.enabledContracts.length < 1
                  ? 'No contracts'
                  : "-"}
                    </td>
                    <td>{item.quantity || item.type === "image" ? 1 : "1m"}</td>
                    {/* <td>
                      {item.type === "image"
                        ? item.quantity ?? 1
                        : item.quantity ?? "1m"}
                    </td>
                    <td>{item.owner ?? "ScarJo"}</td>
                    <td>{item.likeType ?? "Celebrity"}</td>
                    <td className={styles.tbl_des}>
                      {item.description ?? "Face-Face of Celebrity"}
                    </td> */}
                    {/* <td>
                      {item.enabledContracts === ""
                        ? "No contracts"
                        : item.enabledContracts.trim().endsWith(",")
                        ? item.enabledContracts.slice(0, -2)
                        : item.enabledContracts}
                    </td> */}
                    {/* <td>$ {item.pricing ?? 1}</td> */}
                    <td>$ {item.price}</td>
                    {/* <td>{item.unit ?? "Per Generate"}</td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      ) : null}
      {purchaseAssetContext?.assetList &&
      purchaseAssetContext.assetList?.length !== 0 ? (
        <Link href={"/purchase-licenses"}>
          <button className={`${styles.primary_btn} ${styles.cart_btn}`}>
            Add to Cart
          </button>
        </Link>
      ) : null}
    </section>
  );
}

export default SearchTable;
