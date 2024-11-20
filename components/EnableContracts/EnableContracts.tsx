"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./EnableContracts.module.scss";
import WorkAssetsContext from "@/context/CommonContext";
import { IWorkAssetsContextType } from "@/@types/ContextTypes";
import toast from "react-hot-toast";

const contractOffers = [
  "Explicit consent to Train AI on Likeness",
  "AI data training",
  "Generate",
  "Publishing",
  "Distribution of AI Rights",
];

const excludedOffers = [
  "Explicit consent to Train AI on Likeness",
  "Publishing",
  "Distribution of AI Rights",
];

type IAssetGroupDetails = {
  formState: any;
  errors: Record<string, string> | undefined;
};

type EnableContractsProps = {
  selectedTab: any;
  // setSelectedTab: any;
  setSelectedTab?: (value: boolean) => void;
  setAssetsGroups?: any;
};

function EnableContractsComponent({
  setSelectedTab,
  selectedTab,
  setAssetsGroups,
}: EnableContractsProps) {
  const [activeTab, setActiveTab] = useState("contracts");
  // const [selectedTab, setSelectedTab] = React.useState(false);
  const [state, setState] = useState<IAssetGroupDetails>({
    formState: {
      assetGroupName: undefined,
      assetGroupId: undefined,
      enabledContracts: [],
      legalClearanceURL: undefined,
    },
    errors: undefined,
  });

  const workAssetContext = useContext(WorkAssetsContext);
  const { selectedAssetGroup, updateWorkAssetState } =
    workAssetContext as IWorkAssetsContextType;
  const handleCheckboxChange = (index: number) => {
    if (selectedAssetGroup) {
      if (index.toString()) {
        const updatedContracts = [...selectedAssetGroup.enabledContracts];

        const findIndex = updatedContracts.findIndex((item) => {
          return item?.contractName === contractOffers[index];
        });
        console.log(
          "contractOffers[index]",
          contractOffers[index],
          findIndex,
          selectedAssetGroup
        );
        if (findIndex !== -1) {
          // if (updatedContracts[index]) {
          updatedContracts[findIndex].isChecked =
            !updatedContracts[findIndex].isChecked;
        } else {
          updatedContracts.push({
            contractName: contractOffers[index],
            isChecked: true,
          });
        }
        setState({
          ...state,
          formState: {
            ...state.formState,
            enabledContracts: updatedContracts,
          },
        });
        const updatedAssetGroup = {
          ...selectedAssetGroup,
          enabledContracts: updatedContracts,
        };
        console.log("updatedContracts123", updatedContracts);

        updateWorkAssetState({ selectedAssetGroup: updatedAssetGroup });
      }
      const selectedContractOffer = contractOffers[index];
      updateWorkAssetState({ selectedContractOffer });
    } else {
      toast.error("Please select an asset group first");
    }
  };

  const handleLegalURL = (e: any) => {
    setState({
      ...state,
      formState: {
        ...state.formState,
        legalClearanceURL: e.target.value,
      },
    });
    const updatedAssetGroup = {
      ...selectedAssetGroup,
      legalClearanceURL: e.target.value,
    };
    updateWorkAssetState({ selectedAssetGroup: updatedAssetGroup });
  };

  const handleContractOfferClick = (index: number) => {
    if (selectedAssetGroup) {
      const selectedContractOffer = contractOffers[index];
      updateWorkAssetState({ selectedContractOffer });
    } else {
      toast.error("Please select an asset group first");
    }
  };

  useEffect(() => {
    if (
      selectedAssetGroup &&
      state.formState.assetGroupId != selectedAssetGroup.assetGroupId
    ) {
      setState({
        ...state,
        formState: {
          ...state.formState,
          assetGroupName: selectedAssetGroup?.name || "",
          assetGroupId: selectedAssetGroup.assetGroupId || "",
          enabledContracts: selectedAssetGroup.enabledContracts || [],
          legalClearanceURL: selectedAssetGroup.legalClearanceURL || "",
        },
      });
      // if (!selectedAssetGroup.enabledContracts) {
      //   setAssetsGroups({ ...selectedAssetGroup, enabledContracts: [] });
      // }
    }
  }, [selectedAssetGroup]);

  // const onClickWorkAssetDetails = () => {
  //   setSelectedTab(false);
  // };

  // const onClickEnableContracts = () => {
  //   setSelectedTab(true);
  // };

  const onClickWorkAssetDetails = () => {
    if (setSelectedTab) {
      setSelectedTab(false);
    }
  };

  const onClickEnableContracts = () => {
    if (setSelectedTab) {
      setSelectedTab(true);
    }
  };
  const onClickToChangeTab = (tabName: any) => {
    if (setSelectedTab) {
      setSelectedTab(tabName);
    }
  };

  const isChecked = (offer: any): boolean => {
    if (selectedAssetGroup?.enabledContracts) {
      const updatedContracts = [...selectedAssetGroup.enabledContracts];

      const findIndex = updatedContracts.findIndex((item) => {
        return item?.contractName === offer;
      });

      if (findIndex === -1) return false;
      return updatedContracts[findIndex].isChecked;
    }
    return false;
  };
  return (
    <>
      <div className="col-md-4 position-relative">
        <div
          className="border-0 border-gray-300 mb-2 md:mb-0 w-fit gap-1 h-fit rounded-md flex bg-transparent relative md:absolute md:top-[-36px] md:left-[7px]"
          style={{ zIndex: "1" }}
        >
          <span
            onClick={() => onClickToChangeTab("asset")}
            className={`cursor-pointer text-center text-[12px]  lg:text-sm px-2 xl:px-3 py-1  border border-1  md:whitespace-nowrap ${
              selectedTab === "asset"
                ? "bg-[#b747d0] !border-[#b747d0] text-white"
                : "bg-transparent !border-[#464963] text-[#D7D8ED]"
            } rounded-md`}
          >
            Work Asset Details
          </span>
          <span
            onClick={() => onClickToChangeTab("contract")}
            className={`cursor-pointer text-center text-[12px]  lg:text-sm px-2 xl:px-3 py-1  border border-1  md:whitespace-nowrap ${
              selectedTab === "contract"
                ? "bg-[#b747d0] !border-[#b747d0] text-white"
                : "bg-transparent !border-[#464963] text-[#D7D8ED]"
            } rounded-md`}
          >
            Enable Contracts
          </span>
          <span
            // onClick={() => onClickToChangeTab("guidelines")}
            className={`cursor-pointer text-center text-[12px]  lg:text-sm px-2 xl:px-3 py-1  border border-1  md:whitespace-nowrap ${
              selectedTab === "guidelines"
                ? "bg-[#b747d0] !border-[#b747d0] text-white"
                : "bg-transparent !border-[#464963] text-[#D7D8ED]"
            } rounded-md`}
          >
            Brand Guideline
          </span>
          <span
            onClick={() => onClickToChangeTab("training")}
            className={`cursor-pointer text-center text-[12px]  lg:text-sm px-2 xl:px-3 py-1  border border-1  md:whitespace-nowrap ${
              selectedTab === "training"
                ? "bg-[#b747d0] !border-[#b747d0] text-white"
                : "bg-transparent !border-[#464963] text-[#D7D8ED]"
            } rounded-md`}
          >
            Ai Training
          </span>
        </div>

        <div className={styles.work_box}>
          <h3>Enable Contracts</h3>
          <div className={styles.inner_box}>
            <div className={styles.guidelines_title}>
              {selectedAssetGroup?.name ?? "No Asset Group Selected"}
            </div>
            {contractOffers.map((offer: string, idx: number) => {
              if (excludedOffers.includes(offer)) {
                return (
                  <div
                    className={`${styles.guideline_list} ${styles.checkbox_fadeout}`}
                    key={idx}
                  >
                    <label
                      className={`${styles.checkbox} ${styles.checkbox_field}`}
                    >
                      <input type="checkbox" disabled />
                      <div className={styles.checkbox__checkmark}></div>
                    </label>
                    <div className={styles.checkbox__body}>{offer}</div>
                  </div>
                );
              } else {
                return (
                  <div className={styles.guideline_list} key={idx}>
                    <label
                      className={`${styles.checkbox} ${styles.checkbox_field}`}
                    >
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(idx)}
                        checked={isChecked(offer)}
                        // state.formState.enabledContracts[idx]
                        //   ?.contractName === offer &&
                        //   state.formState.enabledContracts[idx]?.isChecked
                        // }
                      />
                      <div className={styles.checkbox__checkmark}></div>
                    </label>
                    <div
                      className={styles.checkbox__body}
                      onClick={() => handleContractOfferClick(idx)}
                    >
                      {offer}
                    </div>
                  </div>
                );
              }
            })}

            <div className={`${styles.normal_form} ${styles.guidelines_input}`}>
              <input
                className={styles.inputfld}
                type="text"
                // placeholder="URL of Legal Clearance"
                placeholder="Default License Agreement"
                defaultValue={state.formState.legalClearanceURL}
                onChange={handleLegalURL}
              />
            </div>
            <div className={`${styles.card_dash_box_r} ${styles.lgl_btn}`}>
              {/* <button className={styles.red_b_btn}> */}
              <button className={styles.legal_btn}>
                <span className="text-white">Upload Legal Clearance</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnableContractsComponent;
