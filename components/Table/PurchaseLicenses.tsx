import { ChangeEvent, useContext, useMemo } from "react";
import PurchaseAssetContext from "@/context/PurchaseAssetContext";
import Table from 'react-bootstrap/Table';
import styles from "./Table.module.scss"

function PurchaseTable() {
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
  
  const handleAssetSelect = (e: ChangeEvent<HTMLInputElement>, item: any) => {
    if (e.target.checked) {
      purchaseAssetContext?.updateAssetListState([
        ...purchaseAssetContext.assetList, item
      ])
    } else {
      const index = purchaseAssetContext?.assetList.findIndex(asset => asset.assetId === item.assetId) ?? -1;
      let assetList = purchaseAssetContext?.assetList ?? [];
      if (assetList.length && index !== -1) {
        assetList.splice(index, 1);
        purchaseAssetContext?.updateAssetListState(assetList);
      }
    }
  }

  return (
    <section className={`${styles.table_wrapper} ${styles.purchase_table}`}>
      <div className={styles.table_head}>
        <h2>
          {purchaseAssetContext?.assetList.length ? (
            <>
              {purchaseAssetContext.assetList.length} Item{purchaseAssetContext.assetList.length > 1 ? 's' : ''} Selected -
              <span>&nbsp;${totalPrice.toFixed(2)} Total</span>
            </>
          ) : 'No Selected Items '}
        </h2>
      </div>
      <Table responsive striped bordered hover className="custome_table">
        <thead className={styles.table_thead}>
          <tr>
            <th></th>
            <th>Type</th>
            <th>Qty</th>
            <th>Owner</th>
            <th>Likeness</th>
            <th>Description</th>
            <th>Licenses Available</th>
            <th>Pricing</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {purchaseAssetContext?.assetList?.map((item: any, index: number) => (
            <tr key={index}>
              <td className="table_check_inner">
                <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
                  <input type="checkbox" onChange={(e) => handleAssetSelect(e, item)} defaultChecked />
                  <div className={styles.checkbox__checkmark}></div>
                </label>
              </td>
              <td>{item.type ?? 'Image'}</td>
              <td>{item.quantity ?? '1'}</td>
              <td>{item.owner ?? 'ScarJo'}</td>
              <td>{item.likeType ?? 'Celebrity'}</td>
              <td>{item.description ?? 'Face-Face of Celebrity'}</td>
              <td>
                {item.enabledContracts.length < 1
                  ? 'No contracts'
                  : "-"}</td>
              <td>$ {item.price ?? 1}</td>
              <td>{item.unit ?? 'Per Minute'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </section>
  );
}

export default PurchaseTable;
