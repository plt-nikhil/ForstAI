"use client"

import { useContext } from "react";
import Link from "next/link";
import PurchaseAssetContext from "@/context/PurchaseAssetContext";
import PurchaseLicenseTable from "../../Table/PurchaseLicenses";
import PaymentSummary from "../PaymentSummary/PaymentSummary";
import styles from "./PurchaseLicenses.module.scss"

function PurchaseLicenseComponent() {
  const purchaseAssetContext = useContext(PurchaseAssetContext);

  return (
    <div className={`${styles.workslicense_contain}`}>
      <h1>Purchase Licenses</h1>
      <div className={styles.card}>
        <div className={styles.searchtable}>
          <PurchaseLicenseTable />
          <Link href={"/search"}>
            <button className={`${styles.primary_btn} ${styles.cart_btn}`}>Back to Search</button>
          </Link>
        </div>
      </div>
      {purchaseAssetContext?.assetList.length !== 0 ? (
        <div className="row">
          <div className="col-lg-12 col-xl-6">
            <PaymentSummary />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PurchaseLicenseComponent;
