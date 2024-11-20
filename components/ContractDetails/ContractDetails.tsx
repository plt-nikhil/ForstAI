"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./ContractDetails.module.scss";
import WorkAssetsContext from "@/context/CommonContext";
import { IWorkAssetsContextType } from "@/@types/ContextTypes";

type IAssetGroupDetails = {
  formState: any;
  errors: Record<string, string> | undefined;
};

interface Contract {
  contractName: string;
  upFrontFee: number;
  usageFee: number;
  nonIndexedTrainingFee: number;
  indexedTrainingFee: number;
  dailyFee: number;
  maxDays: number;
  maxUsageCount: number;
  isChecked: boolean;
}

function ContractDetailsComponent() {
  const [shouldRefocus, setShouldRefocus] = useState<string | null>(null);
  const upFrontFeeRef = useRef<HTMLInputElement>(null);
  const usageFeeRef = useRef<HTMLInputElement>(null);
  const dailyFeeRef = useRef<HTMLInputElement>(null);
  const maxDaysRef = useRef<HTMLInputElement>(null);
  const maxUsageCountRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<IAssetGroupDetails>({
    formState: {
      assetGroupId: null,
      enabledContracts: [],
      contractOffer: undefined,
    },
    errors: undefined,
  });

  const workAssetContext = useContext(WorkAssetsContext);
  const { selectedAssetGroup, selectedContractOffer, updateWorkAssetState } =
    workAssetContext as IWorkAssetsContextType;
  console.log("selectedContractOffer", selectedContractOffer);

  const updateContractDetail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    console.log("THIS IS CALLED", selectedAssetGroup.enabledContracts);

    setShouldRefocus(name);
    const contractIndex = selectedAssetGroup.enabledContracts?.findIndex(
      (contract: Contract | undefined) => {
        return contract && contract.contractName === selectedContractOffer;
      }
    );
    console.log("contractIndex", contractIndex);

    if (contractIndex !== -1) {
      const updatedContracts = [...selectedAssetGroup.enabledContracts];
      updatedContracts[contractIndex] = {
        ...updatedContracts[contractIndex],
        [event.target.name]: parseFloat(event.target.value),
      };
      setState({
        ...state,
        formState: {
          ...state.formState,
          contractOffer: {
            ...state.formState.contractOffer,
            [event.target.name]: parseFloat(event.target.value),
          },
          enabledContracts: updatedContracts,
        },
      });
      const updatedAssetGroup = {
        ...selectedAssetGroup,
        enabledContracts: updatedContracts,
      };
      console.log("updatedAssetGroup", updatedAssetGroup);
      updateWorkAssetState({ selectedAssetGroup: updatedAssetGroup });
    }
  };

  useEffect(() => {
    console.log("selectedAssetGroup", selectedAssetGroup);

    if (
      selectedAssetGroup &&
      state.formState.assetGroupId != selectedAssetGroup.assetGroupId
    ) {
      setState({
        ...state,
        formState: {
          ...state.formState,
          assetGroupId: selectedAssetGroup.assetGroupId || "",
          enabledContracts: selectedAssetGroup.enabledContracts || [],
        },
      });
    }
  }, [selectedAssetGroup]);

  useEffect(() => {
    setShouldRefocus(null);
    if (
      selectedContractOffer &&
      state.formState.contractOffer != selectedContractOffer
    ) {
      const contractOffer = selectedAssetGroup?.enabledContracts?.find(
        (contract: Contract) => contract?.contractName === selectedContractOffer
      );
      setState({
        ...state,
        formState: {
          ...state.formState,
          contractOffer: contractOffer || undefined,
        },
      });
    }
  }, [selectedContractOffer]);

  // useEffect(() => {
  //   if (shouldRefocus && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [state.formState.contractOffer?.upFrontFee])

  useEffect(() => {
    if (shouldRefocus) {
      switch (shouldRefocus) {
        case "upFrontFee":
          upFrontFeeRef.current?.focus();
          break;
        case "usageFee":
          usageFeeRef.current?.focus();
          break;
        case "nonIndexedTrainingFee":
          usageFeeRef.current?.focus();
          break;
        case "dailyFee":
          dailyFeeRef.current?.focus();
          break;
        case "maxDays":
          maxDaysRef.current?.focus();
          break;
        case "maxUsageCount":
          maxUsageCountRef.current?.focus();
          break;
        default:
          break;
      }
    }
  }, [
    shouldRefocus,
    state.formState.contractOffer?.upFrontFee,
    // state.formState.contractOffer?.usageFee,
    state.formState.contractOffer?.nonIndexedTrainingFee,
    state.formState.contractOffer?.dailyFee,
    state.formState.contractOffer?.maxDays,
    state.formState.contractOffer?.maxUsageCount,
  ]);

  return (
    <div className="col-md-4">
      <div className={styles.work_box}>
        <h3>Contract Details</h3>
        <div className={styles.inner_box}>
          <div className={styles.guidelines_title}>
            {selectedContractOffer ?? "No Contract Offer Selected"}
          </div>
          {selectedContractOffer ? (
            <>
              <div className={styles.contract_detail_list}>
                <div className={styles.list_box}>
                  <div className={styles.num_box}>
                    <span className={styles.symbol}>$</span>
                    <input
                      key={state.formState.contractOffer?.upFrontFee}
                      className={styles.numb}
                      name={"upFrontFee"}
                      ref={upFrontFeeRef}
                      defaultValue={
                        state.formState.contractOffer?.upFrontFee || "0"
                      }
                      onChange={updateContractDetail}
                      disabled={!selectedContractOffer}
                    />
                  </div>
                  <div className={styles.list_content}>Base Fee</div>
                </div>
                <div className={styles.list_box}>
                  <div className={styles.num_box}>
                    <span className={styles.symbol}>$</span>
                    <input
                      key={state.formState.contractOffer?.nonIndexedTrainingFee}
                      className={styles.numb}
                      name={"nonIndexedTrainingFee"}
                      ref={usageFeeRef}
                      defaultValue={
                        state.formState.contractOffer?.nonIndexedTrainingFee ||
                        "0"
                      }
                      onChange={updateContractDetail}
                      disabled={!selectedContractOffer}
                    />
                  </div>
                  <div className={styles.list_content}>
                    {selectedContractOffer === "AI data training"
                      ? "Non-Indexed Per Min Price"
                      : "Daily Access Fee"}
                  </div>
                </div>
                <div className={styles.list_box}>
                  <div className={styles.num_box}>
                    <span className={styles.symbol}>$</span>
                    <input
                      key={state.formState.contractOffer?.dailyFee}
                      className={styles.numb}
                      name={"dailyFee"}
                      ref={dailyFeeRef}
                      defaultValue={
                        state.formState.contractOffer?.dailyFee || "0"
                      }
                      onChange={updateContractDetail}
                      disabled={!selectedContractOffer}
                    />
                  </div>
                  <div className={styles.list_content}>
                    {selectedContractOffer === "AI data training"
                      ? "Indexed Per Min Price"
                      : "Per Generation Fee"}
                  </div>
                </div>
                <div className={styles.list_box}>
                  <div className={`${styles.num_box} ${styles.num_box_center}`}>
                    {selectedContractOffer === "AI data training" && (
                      <span className={styles.symbol}>$</span>
                    )}
                    <input
                      key={state.formState.contractOffer?.maxDays}
                      className={styles.numb}
                      name={"maxDays"}
                      ref={maxDaysRef}
                      defaultValue={
                        state.formState.contractOffer?.maxDays || "0"
                      }
                      onChange={updateContractDetail}
                      disabled={!selectedContractOffer}
                    />
                  </div>
                  <div className={styles.list_content}>
                    {selectedContractOffer === "AI data training"
                      ? "Delivery Fee Per GB"
                      : "Max Generations Per Contract"}
                  </div>
                </div>
                <div className={styles.list_box}>
                  <div className={`${styles.num_box} ${styles.num_box_center}`}>
                    <input
                      key={state.formState.contractOffer?.maxUsageCount}
                      className={styles.numb}
                      name={"maxUsageCount"}
                      ref={maxUsageCountRef}
                      defaultValue={
                        state.formState.contractOffer?.maxUsageCount || "0"
                      }
                      onChange={updateContractDetail}
                      disabled={!selectedContractOffer}
                    />
                  </div>
                  <div className={styles.list_content}>Max Contract Length</div>
                </div>
              </div>
              <div className={styles.list_box_content}>
                {" "}
                The Generate contract enables licensees to generate content
                based on fine-tuning of the core data provided in this Work
                Asset.{" "}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ContractDetailsComponent;
