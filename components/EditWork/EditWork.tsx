"use client";
import RegisterWorkProvider from "@/providers/RegisterWorkProvider";
import styles from "@/components/RegNewWork/RegNewWork.module.scss";

import React, { useEffect, useRef } from "react";
import {
  AiTraining,
  WorkAssetDetails,
  WorkAssetList,
  WorkAssetPreview,
} from "../RegNewWork/RegNewWork";

import WorkAssetsContextProvider from "@/providers/WorkAssetsProvider";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import StandardBrandGuidelines from "../StandardBrandGuidelines/StandardBrandGuidelines";
import AdvancedBrandGuidelines from "../AdvancedBrandGuidelines/AdvancedBrandGuidelines";
import EnableContractsComponent from "../EnableContracts/EnableContracts";
import ContractDetailsComponent from "../ContractDetails/ContractDetails";
import { Tab } from "react-bootstrap";
import { CreateWork } from "../RegNewWork/RegNewSubComponent/CreateWork";

function EditWork() {
  const { data: session, status } = useSession();
  const params = useParams<{ workId: string }>();
  const workId = params.workId;
  const [state, setState] = React.useState<{
    errors: string | undefined;
    submitType: string | undefined;
  }>({
    errors: undefined,
    submitType: undefined,
  });
  const createWorkSubmitRef = useRef<HTMLButtonElement>(null);
  const acceptAcknowledgementRef = useRef<HTMLInputElement>(null);
  const [workDetails, setWorkDetails] = React.useState({});
  const [assetsGroups, setAssetsGroups] = React.useState<any[]>([]);
  const [workAssets, setWorkAssets] = React.useState<any[]>([]);
  const [submit, setSubmit] = React.useState(false);
  useEffect(() => {
    getWorkDetails(workId);
  }, []);

  const handleSaveWorkFinal = (saveType: string) => {
    if (acceptAcknowledgementRef.current?.checked) {
      if (createWorkSubmitRef.current) {
        setSubmit(true);
        createWorkSubmitRef.current.click();
      }
      setSubmit(true);
      setState({ ...state, errors: undefined, submitType: saveType });
    } else {
      setState({ ...state, errors: "Please accept acknowledgement" });
    }
  };

  const updateAssetGroup = (data: any) => {
    console.log("data123", data);
    if (data?.assetGroupId) {
      const assetGroupIndex = assetsGroups.findIndex(
        (group: any) => group.assetGroupId === data.assetGroupId
      );
      if (assetGroupIndex !== -1) {
        const updatedAssetGroups = [
          ...assetsGroups.slice(0, assetGroupIndex),
          data,
          ...assetsGroups.slice(assetGroupIndex + 1),
        ];
        const {
          authorizedAgent,
          coBrandingRestriction,
          restrictedBrands,
          keywordRestriction,
          restrictedKeywords,
          dataTrainingPreAuth,
          legalClearanceURL,
        } = data;

        const body = JSON.parse(
          JSON.stringify({
            standardBrandGuidelines:
              data?.standardBrandGuidelines &&
              data.standardBrandGuidelines?.map((item: any) =>
                item ? item : null
              ),
            authorizedTrainingTools:
              data?.authorizedTrainingTools &&
              data.authorizedTrainingTools?.map((item: any) =>
                item ? item : null
              ),
            enabledContracts:
              data.enabledContracts &&
              data.enabledContracts?.map((item: any) => (item ? item : null)),
            authorizedAgent,
            coBrandingRestriction,
            restrictedBrands,
            keywordRestriction,
            restrictedKeywords,
            dataTrainingPreAuth,
            legalClearanceURL,
          })
        );
        console.log("bodybody2", body);

        if (status === "authenticated") {
          axios
            .patch(
              `${process.env.NEXT_PUBLIC_API_URL}/works/owned/${workId}/asset-group/${data.assetGroupId}`,
              body,
              {
                headers: {
                  Authorization: `Bearer ${session.user.access}`,
                },
              }
            )
            .then((response) => {
              const result = response.data;
              if (result.success) {
                toast.success("Asset group updated");
              } else {
                toast.error("Failed to update asset group");
              }
            })
            .catch((error) => {
              toast.error("Failed to create asset group");
            });
        }
        setAssetsGroups(updatedAssetGroups);
      }
    }
    setSubmit(false);
  };

  const handleUpdateWorkAssets = (assets: any[]) => {
    setWorkAssets([...workAssets, ...assets]);
  };
  const [selectedTab, setSelectedTab] = React.useState<any>("asset");
  const showSection = () => {
    switch (section) {
      // @ts-ignore
      case "brand-guidelines":
        return (
          <>
            <StandardBrandGuidelines />
            <AdvancedBrandGuidelines />
          </>
        );
      case "edit-work":
        return (
          <>
            {selectedTab === "asset" && (
              <WorkAssetDetails
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            )}
            {selectedTab === "contract" && (
              <EnableContractsComponent
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                setAssetsGroups={setAssetsGroups}
              />
            )}
            {selectedTab === "training" && (
              <AiTraining
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            )}
            {selectedTab === "asset" && <WorkAssetPreview />}
            {selectedTab === "contract" && <ContractDetailsComponent />}
          </>
        );
      default:
        return (
          <>
            {selectedTab === "asset" && (
              <WorkAssetDetails
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            )}
            {selectedTab === "contract" && (
              <EnableContractsComponent
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                setAssetsGroups={setAssetsGroups}
              />
            )}
            {selectedTab === "training" && (
              <AiTraining
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            )}
            {/* {selectedTab === "training" && <AiTrainingOutput />} */}
            {selectedTab !== "training" && <WorkAssetPreview />}
          </>
        );
    }
  };

  const getWorkDetails = async (workId: any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/works/owned/work-details/${workId}`
      );
      setWorkDetails(response.data.data.ownedWork);
      setAssetsGroups(response.data.data.assetGroups);
      // setWorkAssets(response.data.data.workAssets);
    } catch (error) {}
  };
  const section = "edit-work";
  return (
    <div className={`${styles.regNewWork_contain} regNewWork_contain`}>
      <h1>Edit Work</h1>
      <RegisterWorkProvider>
        <CreateWork
          createSubmitReference={createWorkSubmitRef}
          section={section}
          workDetails={workDetails}
        />
        <div className={`${styles.card} ${styles.card_center}`}>
          <h2>Work Assets</h2>
          <div className="row">
            <WorkAssetsContextProvider>
              <WorkAssetList
                assetGroups={assetsGroups}
                workAssets={workAssets}
                section={section}
                updateAssetGroup={updateAssetGroup}
                submit={submit}
                createSubmitReference={createWorkSubmitRef}
                updateWorkAssets={handleUpdateWorkAssets}
              />
              {showSection()}
            </WorkAssetsContextProvider>
          </div>
        </div>
        <div className={`${styles.card} ${styles.card_btm}`}>
          <div>
            <h2>Acknowledgement</h2>
            <div>
              <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
                <input type="checkbox" ref={acceptAcknowledgementRef} />
                <div className={styles.checkbox__checkmark}></div>
                <div className={styles.checkbox__body}>
                  I confirm that I own all the intellectual property rights to
                  these assets.
                </div>
                {state.errors && (
                  <span style={{ color: "red" }}>{state.errors}</span>
                )}
              </label>
            </div>
          </div>
          <div className={styles.card_dash_box_r}>
            <button
              className={styles.red_b_btn}
              type="button"
              onClick={() => handleSaveWorkFinal("save")}
            >
              Save Work
            </button>
          </div>
        </div>
      </RegisterWorkProvider>
    </div>
  );
}

export default EditWork;
