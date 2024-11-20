import { useContext, useMemo, useState } from "react";
import PurchaseAssetContext from "@/context/PurchaseAssetContext";
import styles from "./PaymentSummary.module.scss"
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

function PaymentSummary() {
  const { data: session, status } = useSession();
  const [infLight, setInflight] = useState(false)
  const purchaseAssetContext = useContext(PurchaseAssetContext);
  const { assetList } = purchaseAssetContext ?? { assetList: [] };

  const calculateAssetPrice = (item: any) => {
    let price = 0;
    if (item.type === 'image') {
      price = (item.price ?? 1);
    } else {
      price = (item.price ?? 1) * (item.quantity ?? 1);
    }
    return price;
  };

  const totalPrice = useMemo(() => {
    return assetList.reduce((total: number, item: any) => {
      return total + calculateAssetPrice(item);
    }, 0);
  }, [purchaseAssetContext]);

  const handlePurchasing = () =>{
    const payload = {
      "work-assets": assetList,
      "Grand-total": totalPrice
  }
  setInflight(true)
    axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/purchase-work/purchase`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${session?.user.access}`,
        },
      }
    )
    .then((response) => {
      const result = response.data;
      if (response.status === 201) {
       toast.success("Work assets puchased successfully")
      } else {
      }
      setInflight(false)
    })
    .catch((error) => {
      setInflight(false)
      toast.error("Failed to create asset group");
    });
  }

  return (
    <div className={`${styles.card} ${styles.payments_summary}`}>
      <h2>Payments Summary</h2>
      <div className={styles.payments_summary_inner}>
        {purchaseAssetContext?.assetList.map((item: any, index: number) => (
          <div key={index} className={styles.summary_details}>
            <div className={styles.summary_text}>
              {item.owner} : {item.quantity ?? 1}
              {item.type === 'image' ?
                ` image @ $${item.price ?? 1} as base fee` :
                `m of ${item.type} + metadata index @ $${item.price ?? 1} per minute, indexing included`}
            </div>
            <div className={styles.summary_amount}>
              ${calculateAssetPrice(item).toFixed(2)}
            </div>
          </div>
        ))}
        <div className={styles.total_box}>
          <div className={styles.total_text}>Total Due</div>
          <div className={styles.total_amount}>${totalPrice.toFixed(2)}</div>
        </div>
      </div>
      <button disabled={infLight} className={`${styles.primary_btn} ${styles.cart_btn}`} onClick={handlePurchasing}>Purchase</button>
    </div>
  );
}

export default PaymentSummary;