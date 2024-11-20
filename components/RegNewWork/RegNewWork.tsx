"use client";
import React, {
  ChangeEvent,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./RegNewWork.module.scss";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "react-bootstrap";
import AssetGroupModal from "@/components/AssetGroupModal/AssetGroupModal";
import GenerateModal from "@/components/Modal/GenerateModal";
import IndexedDataModal from "@/components/IndexModal/IndexDataModal";
import SaveWorkFolderModal from "../Modal/SaveWorkFolderModal";
import uploadImg from "/public/assets/images/upload_plus.svg";
import arrowDown from "/public/assets/images/acco_dwn.svg";
import arrowRight from "/public/assets/images/acco_rgt.svg";
import { Controller, useForm } from "react-hook-form";
import Tree from "../Tree/Tree";
import WorkAssetsContextProvider from "@/providers/WorkAssetsProvider";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IRegisterWorkType,
  IAssetGroupDataType,
  IWorkCreateResult,
} from "@/@types/WorkTypes";
import TagInput from "../TagInput/TagInput";
import { validateObject } from "@/util/basicutilityfunctions";
import RegisterWorkProvider from "@/providers/RegisterWorkProvider";
import axios from "axios";
import { useSession } from "next-auth/react";
import { IMessageResponse, Response } from "@/@types/CommonTypes";
import RegisterWorkContext from "@/context/WorkContext";
import WorkAssetsContext from "@/context/CommonContext";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  IRegisterWorkContextType,
  IWorkAssetsContextType,
} from "@/@types/ContextTypes";
import toast from "react-hot-toast";
import StandardBrandGuidelines from "../StandardBrandGuidelines/StandardBrandGuidelines";
import AdvancedBrandGuidelines from "../AdvancedBrandGuidelines/AdvancedBrandGuidelines";
import EnableContractsComponent from "../EnableContracts/EnableContracts";
import ContractDetailsComponent from "../ContractDetails/ContractDetails";
import JsonFileModal from "../Modal/JsonFileModal";
import _ from "lodash";
import { CreateWork } from "./RegNewSubComponent/CreateWork";

const schema = yup.object().shape({
  workName: yup.string().required("Work name is required"),
  likeType: yup.string().required("Likeness type is required"),
  workDescription: yup.string().required("Work description is required"),
  workKeywords: yup.array(),
  // .of(yup.string().required("Each keyword must be a string"))
  // .min(1, "At least one keyword is required")
  // .required("work keywords are required"),
  thumbnailImage: yup
    .mixed()
    .test("is-array", "Please choose image", (value) => {
      if (typeof value === "string" || Array.isArray(value)) {
        return true;
      }
      return false;
    })
    .test(
      "type",
      "Only the following formats are accepted: .jpeg, .jpg and .png",
      (value) => {
        if (typeof value === "string") {
          return true;
        }
        return (
          Array.isArray(value) &&
          (value[0].type === "image/jpeg" ||
            value[0].type === "image/jpg" ||
            value[0].type === "image/png")
        );
      }
    )
    .test("fileSize", "The file is too large", (value) => {
      // Skip validation if no file is selected
      if (typeof value === "string") {
        return true;
      }
      return Array.isArray(value) && value[0].size <= 10 * 1024 * 1024; // 10MB
    }),
  copyRightNumber: yup.string().optional(),
  certificate: yup.string().optional(),
});

function RegNewWork() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const section = searchParams.get("section");
  const workId = searchParams.get("work");
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
  const [saveRedirect, setSaveRedirect] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState<any>("asset");

  const handleSaveWorkFinal = (saveType: string) => {
    // CONSOLE
    if (acceptAcknowledgementRef.current?.checked) {
      if (createWorkSubmitRef.current && !section) {
        setSubmit(true);
        createWorkSubmitRef.current.click();
      }
      // if (section === "brand-guidelines" || section === "contract-offers") {
      //   console.log("aaaa 5555");
      //   if (saveType === "rights") setSaveRedirect(true);
      //   // setSubmit(true);
      // }
      setSubmit(true);
      setState({ ...state, errors: undefined, submitType: saveType });
    } else {
      setState({ ...state, errors: "Please accept acknowledgement" });
    }
  };

  const updateAssetGroup = (data: any) => {
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
        setAssetsGroups(updatedAssetGroups);
      }
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
            data.standardBrandGuidelines &&
            data.standardBrandGuidelines.map((item: any) =>
              item ? item : null
            ),
          authorizedAgent,
          coBrandingRestriction,
          restrictedBrands,
          keywordRestriction,
          restrictedKeywords,
          dataTrainingPreAuth,
          authorizedTrainingTools:
            data.authorizedTrainingTools &&
            data.authorizedTrainingTools?.map((item: any) =>
              item ? item : null
            ),
          enabledContracts:
            data.enabledContracts &&
            data.enabledContracts?.map((item: any) => (item ? item : null)),
          legalClearanceURL,
        })
      );
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
            console.log("checking & testing", result);
            if (result.success) {
              toast.success("Asset group updated");
              if (saveRedirect)
                router.push(
                  `/register-new-work?section=contract-offers&work=${workId}`
                );
            } else {
              toast.error("Failed to update asset group");
            }
          })
          .catch((error) => {
            toast.error("Failed to create asset group");
          });
      }
    }
    setSubmit(false);
  };

  // const onClickWorkAssetDetails = () => {
  //   setActiveTab(false);
  // };

  // const onClickEnableContracts = () => {
  //   setActiveTab(true);
  // };

  const showSection = () => {
    switch (section) {
      case "brand-guidelines":
        return (
          <>
            <StandardBrandGuidelines />
            <AdvancedBrandGuidelines />
          </>
        );
      case "contract-offers":
        return (
          <>
            {/* <Tabs defaultIndex={1}>
              <TabList>
                <Tab
                  // onClick={onClickWorkAssetDetails}
                  className={"font-bold bg-red-400"}
                >
                  Work Asset Details
                </Tab>
                <Tab
                  // onClick={onClickEnableContracts}
                  className={"font-bold bg-red-400"}
                >
                  Enable Contracts
                </Tab>
              </TabList>

              <TabPanel>
                {/* {activeTab ? ( */}
            {/* <WorkAssetDetails /> */}
            {/* ) : ( */}

            {/* )} */}
            {/* </TabPanel>
            </Tabs> */}

            {selectedTab === "asset" && (
              <WorkAssetDetails
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            )}
            {/* {selectedTab === "contract" && (
              <EnableContractsComponent
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                setAssetsGroups={setAssetsGroups}
              />
            )} */}
            {selectedTab === "training" && (
              <AiTraining
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            )}
            {/* {(selectedTab === "contract" || selectedTab === "training") && (
              <ContractDetailsComponent />
            )} */}

            {selectedTab === "asset" && <WorkAssetPreview />}
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
            {selectedTab === "guidelines" && (
              <>
                <StandardBrandGuidelines />
                <AdvancedBrandGuidelines />
              </>
            )}
            {selectedTab !== "training" && <WorkAssetPreview />}
          </>
        );
    }
  };

  const showSections = () => {
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
        {selectedTab === "guidelines" && (
          <>
            <StandardBrandGuidelines />
            <AdvancedBrandGuidelines />
          </>
        )}
      </>
    );
  };

  const getWorkDetails = async (workId: any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/works/owned/work-details/${workId}`
      );

      setWorkDetails(response.data.data.ownedWork);
      setAssetsGroups(response.data.data.assetGroups);
      setWorkAssets(response.data.data.workAssets);
    } catch (error) {}
  };

  const handleUpdateWorkAssets = (assets: any[]) => {
    setWorkAssets([...workAssets, ...assets]);
  };
  useEffect(() => {
    if (
      status === "authenticated"
      // &&
      // (section === "brand-guidelines" || section === "contract-offers")
    ) {
      getWorkDetails(workId);
    }
  }, []);

  return (
    <div className={`${styles.regNewWork_contain} regNewWork_contain`}>
      {section === "brand-guidelines" ? (
        <h1>Define Brand Guidelines</h1>
      ) : section === "contract-offers" ? (
        <h1>Create Contract Offers</h1>
      ) : (
        <h1>Register New Work</h1>
      )}
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
              {showSections()}
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
            {section !== "contract-offers" && (
              <button
                className={styles.blue_b_btn}
                type="button"
                onClick={() => handleSaveWorkFinal("rights")}
              >
                Save & Rights
              </button>
            )}
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

export default RegNewWork;

/** work details */
type IAssetDetails = {
  formState: any;
  assetId: string | undefined;
  errors: Record<string, string> | undefined;
};

type WorkAssetDetailsProps = {
  selectedTab?: any;
  setSelectedTab?: any;
  // setSelectedTab?: (value: boolean) => void;
};

export const WorkAssetDetails = ({
  selectedTab,
  setSelectedTab,
}: WorkAssetDetailsProps) => {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const workId = searchParams.get("work");
  const schema = yup.object().shape({
    assetName: yup.string().required("Asset name is required"),
    // assetFileName: yup.string().required("Asset file name is required"),
    assetDescription: yup.string().required("Asset description is required"),
  });

  const [state, setState] = useState<IAssetDetails>({
    formState: {
      assetName: undefined,
      // assetFileName: undefined,
      assetDescription: undefined,
    },
    assetId: undefined,
    errors: undefined,
  });

  const workAssetContext = useContext(WorkAssetsContext);
  const workContext = useContext(RegisterWorkContext);
  const { selectedAssetDetails } = workAssetContext as IWorkAssetsContextType;

  useEffect(() => {
    if (selectedAssetDetails && state.assetId != selectedAssetDetails.assetId) {
      const getAssetDetails = async () => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/works/get-asset-work/${selectedAssetDetails.assetId}`,
          {
            headers: {
              //@ts-ignore
              Authorization: `Bearer ${session.user.access}`,
            },
          }
        );
        let assetGroupArray = response?.data?.data?.assetDetails;
        if (assetGroupArray) {
          setState({
            ...state,
            formState: {
              ...state.formState,
              assetName: assetGroupArray.name || "",
              // assetFileName: selectedAssetDetails.fileName,
              assetDescription: assetGroupArray.description || "",
            },
            assetId: selectedAssetDetails.assetId,
          });
        }
      };
      getAssetDetails();
    }
  }, [selectedAssetDetails]);

  const { errors, formState } = state;

  const handleFormValueUpdate = (value: object) => {
    setState({
      ...state,
      formState: { ...state.formState, ...value },
    });
  };

  const handleFormSubmission = async () => {
    if (!selectedAssetDetails || !selectedAssetDetails.assetId) {
      toast.error("Please select asset to index");
      return;
    }
    const validationStatus = await validateObject(schema, state.formState);
    const { assetName, assetDescription, copyrightRegNumber } = state.formState;
    const bodyData = { assetName, assetDescription, copyrightRegNumber };
    if (validationStatus.isError) {
      setState({ ...state, errors: validationStatus.errors });
    } else {
      if (status === "authenticated") {
        const toastId = toast.loading("Please wait");
        axios
          .patch(
            `${process.env.NEXT_PUBLIC_API_URL}/works/owned/${
              workContext?.workId || workId
            }/asset/${state.assetId}`,
            bodyData,
            {
              headers: {
                Authorization: `Bearer ${session.user.access}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("response.data", response.data);

            const result = response.data;
            if (result.success) {
              const { data } = result as IMessageResponse;
              setState({ ...state, errors: undefined });
              workAssetContext?.updateWorkAssetState({
                selectedAssetDetails: {
                  ...workAssetContext.selectedAssetDetails,
                  assetName,
                  assetDescription,
                  copyrightRegNumber,
                },
              });
              toast.success(data.message, { id: toastId });
            } else {
              const { data } = result as IMessageResponse;
              toast.error(data.message, { id: toastId });
            }
          })
          .catch((error) => {
            toast.error("Indexing failed", { id: toastId });
            console.log(error.response);
          });
      }
    }
  };

  const onClickWorkAssetDetails = () => {
    // if (setSelectedTab) {
    setSelectedTab(false);
    // }
  };

  const onClickEnableContracts = () => {
    // if (setSelectedTab) {
    setSelectedTab(true);
    // }
  };

  const onClickToChangeTab = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="col-md-4 position-relative">
      <div
        className="border-0 border-gray-300 mb-2 md:mb-0 w-fit gap-1 h-fit rounded-md flex bg-transparent relative md:absolute md:top-[-36px] md:left-[7px]"
        style={{ zIndex: "1" }}
      >
        <span
          onClick={() => onClickToChangeTab("asset")}
          className={`cursor-pointer text-center text-[12px]  lg:text-sm px-2 xl:px-3 py-1  md:whitespace-nowrap ${
            selectedTab === "asset"
              ? "bg-[#b747d0] !border-[#b747d0] text-white"
              : "bg-transparent !border-[#464963] text-[#D7D8ED]"
          } rounded-md`}
        >
          Work Asset Details
        </span>
        <span
          onClick={() => onClickToChangeTab("contract")}
          className={`cursor-pointer text-center text-sm px-2 xl:px-3 py-1 border border-1  md:whitespace-nowrap ${
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
        <h3>Work Asset Details</h3>
        <div className={styles.normal_form}>
          <input
            className={styles.inputfld}
            type="text"
            placeholder="Enter Work Asset Group Name"
            value={formState.assetName}
            onChange={(e) =>
              handleFormValueUpdate({ assetName: e.target.value })
            }
            disabled={!selectedAssetDetails}
          />
          {errors && errors.assetName && (
            <span style={{ color: "red" }}>{errors.assetName}</span>
          )}
        </div>
        {/* <div className={styles.normal_form}>
          <input
            className={styles.inputfld}
            type="text"
            placeholder="Enter Work Asset File Name"
            value={formState.assetFileName}
            disabled
            onChange={(e) =>
              handleFormValueUpdate({ assetFileName: e.target.value })
            }
          />
          {errors && errors.assetFileName && (
            <span style={{ color: "red" }}>{errors.assetFileName}</span>
          )}
        </div> */}
        <div className={styles.textarea_btm}>
          <textarea
            className={styles.textareafld}
            placeholder="Enter Work Asset Description"
            value={formState.assetDescription}
            onChange={(e) =>
              handleFormValueUpdate({ assetDescription: e.target.value })
            }
            disabled={!selectedAssetDetails}
          ></textarea>
          {errors && errors.assetDescription && (
            <span style={{ color: "red" }}>{errors.assetDescription}</span>
          )}
        </div>
        <div className={styles.card_dash_box_r}>
          <button
            type="button"
            onClick={handleFormSubmission}
            className={styles.red_b_btn}
          >
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
};

/** work asset list */

type IWorkAssetListProps = {
  assetGroups: any;
  workAssets: any;
  section: string | null;
  updateAssetGroup: any;
  submit: boolean;
  createSubmitReference: React.RefObject<HTMLButtonElement>;
  updateWorkAssets: (assets: any[]) => void;
};
type IWorkAssetIndexPollResponse = {
  assetGroups: IAssetGroupDataType[];
  workAssets: any[];
};

export function WorkAssetList({
  assetGroups,
  workAssets,
  section,
  updateAssetGroup,
  submit,
  createSubmitReference,
  updateWorkAssets,
}: IWorkAssetListProps) {
  const toastIdRef = useRef<string | null>(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [state, setState] = useState<{
    assetsGroups: IAssetGroupDataType[];
    isWaitForSubmit: boolean;
    assetIndexTracker: { assetId: string; assetGroupId: string }[];
  }>({
    assetsGroups: [],
    isWaitForSubmit: false,
    assetIndexTracker: [],
  });

  const workContext = useContext(RegisterWorkContext);
  const workData = workContext as IRegisterWorkContextType;
  const workAssetContext = useContext(WorkAssetsContext);
  const { selectedAssetGroup } = workAssetContext as IWorkAssetsContextType;
  const { data: session, status } = useSession();
  const handleAssetGroupAdd = (data: IAssetGroupDataType) => {
    setState({ ...state, assetsGroups: [...state.assetsGroups, data] });
  };

  const handleAddAssetGroupClick = () => {
    if (!workData.workId) {
      if (createSubmitReference.current) {
        setState({ ...state, isWaitForSubmit: true });
        createSubmitReference.current.click();
      }
    } else {
      setModalShow(true);
    }
  };

  const hasIndexAssetCallBackHandler = (
    assetId: string,
    assetGroupId: string
  ) => {
    toastIdRef.current = toast.loading("Indexing...");
    setState({
      ...state,
      assetIndexTracker: [
        ...state.assetIndexTracker,
        { assetId, assetGroupId },
      ],
    });
  };

  const getAssetIndex = async (
    assetId: string
  ): Promise<IWorkAssetIndexPollResponse | undefined> => {
    if (status === "authenticated") {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/works/owned/${workContext?.workId}/asset/${assetId}/index`,
          {
            headers: {
              Authorization: `Bearer ${session.user.access}`,
            },
          }
        );

        const result = response.data;
        if (result.success) {
          const { data } = result as Response<IWorkAssetIndexPollResponse>;
          return data;
        } else {
          console.error("API request unsuccessful:", result);
          return undefined;
        }
      } catch (error) {
        toast.error("Failed to fetch asset group index:");
        return undefined;
      }
    } else {
      console.error("User not authenticated");
      return undefined;
    }
  };

  const pollIndexData = () => {
    const trackers = state.assetIndexTracker;
    trackers.forEach(async (track) => {
      const resultData = await getAssetIndex(track.assetId);
      const { assetGroups: assetGroup, workAssets } =
        resultData as IWorkAssetIndexPollResponse;
      if (assetGroup) {
        state.assetIndexTracker = _.filter(
          state.assetIndexTracker,
          (obj) => obj.assetId !== track.assetId
        );
        const capturedIndexGroup = _.find(
          state.assetsGroups,
          (ast) => ast.assetGroupId === track.assetGroupId
        );
        if (capturedIndexGroup) capturedIndexGroup.children = assetGroup;
        setState({
          ...state,
          assetsGroups: [...state.assetsGroups],
        });
        // updateWorkAssets(workAssets);
        if (toastIdRef.current) {
          toast.success("Indexing completed", {
            id: toastIdRef.current,
          });
          toastIdRef.current = null;
        }
      }
    });
  };

  const getWorkAsset = (asset: any[], assetGroupId: string) => {
    if (section) return asset;
    const assetList = _.filter(asset, (ast) => ast.assetGroup === assetGroupId);
    return assetList;
  };

  useEffect(() => {
    const { assetIndexTracker } = state;
    let intervalId: number;
    if (assetIndexTracker.length) {
      intervalId = window.setInterval(() => {
        pollIndexData();
      }, 5000);
    }
    return () => window.clearInterval(intervalId);
  }, [state.assetIndexTracker]);

  useEffect(() => {
    if (state.isWaitForSubmit) {
      setModalShow(true);
      setState({ ...state, isWaitForSubmit: false });
    }
  }, [workData.workId]);

  useEffect(() => {
    if (assetGroups) {
      setState({ ...state, assetsGroups: [...assetGroups] });
    }
  }, [assetGroups]);

  useEffect(() => {
    if (submit) {
      updateAssetGroup(selectedAssetGroup);
    }
  }, [submit]);

  console.log("wwwwwwwwwwwww", state);
  console.log("wwwwwwwwwwwww workAssets", workAssets);

  return (
    <div className="col-md-4">
      <div className={styles.work_box}>
        <h3>Work Asset List</h3>
        {!state.assetsGroups.length && (
          <>
            <div className={styles.no_data}>No Work Assets Defined</div>
            {!section && (
              <button
                className={styles.primary_btn}
                type="button"
                onClick={handleAddAssetGroupClick}
              >
                Create Asset Group
              </button>
            )}
          </>
        )}
        <AssetGroupModal
          showModal={modalShow}
          handleHide={() => setModalShow(false)}
          onSuccess={handleAssetGroupAdd}
        />
        <div className={styles.acco_box}>
          {state.assetsGroups.length > 0 && (
            <div className={styles.main_hd}>
              <span>
                <Image src={arrowDown} alt="" />
              </span>
              {workContext?.workName}
            </div>
          )}
          <div className={styles.acco_box_inner}>
            {state.assetsGroups.map((assetGroup, idx) => (
              <Tree
                key={idx}
                assetGroup={assetGroup}
                workAssets={getWorkAsset(workAssets, assetGroup.assetGroupId)}
                section={section}
                updateAssetIndexTracker={hasIndexAssetCallBackHandler}
                showAdd={assetGroup.type ? true : false}
              ></Tree>
            ))}
            {!section && state.assetsGroups.length > 0 && (
              <button
                className={`${styles.primary_btn} ${styles.add_group}`}
                onClick={() => setModalShow(true)}
                type="button"
              >
                Add Asset Group
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const WorkAssetPreview = () => {
  const workAssetContext = useContext(WorkAssetsContext);
  const { selectedAssetDetails } = workAssetContext as IWorkAssetsContextType;
  const [jsonData, setJsonData] = useState<any>();
  const [fullScreenJson, setFullScreenJson] = useState<boolean>(false);

  useEffect(() => {
    if (selectedAssetDetails && selectedAssetDetails?.type === "json") {
      const fetchJsonData = async () => {
        setJsonData("");
        const response = await axios.get(selectedAssetDetails.url);
        const jsondata = response.data;
        setJsonData(jsondata);
      };
      fetchJsonData();
    }
  }, [selectedAssetDetails]);

  const getWorkAssetPreview = () => {
    switch (selectedAssetDetails.type) {
      case "image":
        return (
          <Image
            src={selectedAssetDetails.url}
            height={800}
            width={800}
            alt="imagePreview"
          />
        );
      case "video":
        return (
          <video id="myVideo" controls>
            <source src={selectedAssetDetails.url} type="video/mp4" />
          </video>
        );
      case "audio":
        return (
          <audio controls>
            <source src={selectedAssetDetails.url} type="audio/mp3" />
          </audio>
        );
      case "json":
        try {
          return (
            <div className="h-full  w-full p-3">
              <button
                type="button"
                className="text-left"
                onClick={() => setFullScreenJson(true)}
              >
                Full screen
              </button>
              <pre className="h-full text-left text-sm ">
                {JSON.stringify(jsonData, null, 2)}
              </pre>
            </div>
          );
        } catch (error) {
          console.error("Error fetching JSON data:", error);
          return <p>Error fetching JSON content</p>;
        }
    }
  };

  return (
    <>
      <div className="col-md-4">
        <div className={styles.work_box}>
          <h3>Work Asset Preview</h3>
          <div className={styles.thum_preview} style={{ height: "320px" }}>
            {selectedAssetDetails &&
            (selectedAssetDetails.url ||
              selectedAssetDetails.type === "text") ? (
              getWorkAssetPreview()
            ) : (
              <div>Image or Video thumbnail</div>
            )}
          </div>
        </div>
      </div>
      <JsonFileModal
        showModal={fullScreenJson}
        handleHide={() => setFullScreenJson(false)}
        jsonData={jsonData}
      />
    </>
  );
};

export const AiTraining = ({
  selectedTab,
  setSelectedTab,
}: WorkAssetDetailsProps) => {
  const schema = yup.object().shape({
    model: yup.string().required("Model is required"),
    shortUUD: yup.string().required("Short UUD is required"),
    steps: yup.string().required("Steps are required"),
  });
  const { data: session, status } = useSession();

  type IAssetDetailsAi = {
    formState: any;
    errors: Record<string, string> | undefined;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      model: "LoRa",
      shortUUD: "",
      steps: "",
    },
  });
  const workAssetContext = useContext(WorkAssetsContext);
  const workContext = useContext(RegisterWorkContext);
  const { selectedAssetDetails, files, selectedAssetGroup, isTraningStarted } =
    workAssetContext as IWorkAssetsContextType;

  const onClickToChangeTab = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const getFiles = () => {
    if (files && files.length > 0) {
      return files.map((f: any) => f.url);
    }
    return [];
  };

  const onSubmit = (data: any) => {
    if (status === "authenticated") {
      let bodyData = {
        images_data_url: getFiles(),
        steps: Number(data?.steps),
        // triggerWord: data?.shortUUD,
        // model: "fal-ai/flux-lora-fast-training",
        assetGroupId: selectedAssetGroup?.assetGroupId,
      };
      if (data?.shortUUD) {
        //@ts-ignore
        bodyData.triggerWord = data?.shortUUD;
      }
      workAssetContext?.updateWorkAssetState({
        isTraningStarted: true as any,
      });
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/generate/genrate-lora-model`,
          bodyData,
          {
            headers: {
              Authorization: `Bearer ${session.user.access}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const result = response.data;
          if (result.success) {
            workAssetContext?.updateWorkAssetState({
              isTraningStarted: false as any,
            });
            // setValue("certificate", data.uploadUrl);
            toast.success("LoRa Model updated succesfully.");
          } else {
            workAssetContext?.updateWorkAssetState({
              isTraningStarted: false as any,
            });
          }
        })
        .catch((error) => {
          toast.error("Upload failed");
          workAssetContext?.updateWorkAssetState({
            isTraningStarted: false as any,
          });
        });
    }
  };

  return (
    <div className="col-md-6 col-xl-4 position-relative">
      <div
        className="border-0 border-gray-300 mb-2 md:mb-0 w-fit gap-1 h-fit rounded-md flex bg-transparent relative md:absolute md:top-[-36px] md:left-[7px]"
        style={{ zIndex: "1" }}
      >
        <span
          onClick={() => onClickToChangeTab("asset")}
          className={`cursor-pointer text-center text-sm px-2 xl:px-3 py-1 border border-1  md:whitespace-nowrap ${
            selectedTab === "asset"
              ? "bg-[#b747d0] !border-[#b747d0] text-white"
              : "bg-transparent !border-[#464963] text-[#D7D8ED]"
          } rounded-md`}
        >
          Work Asset Details
        </span>
        <span
          onClick={() => onClickToChangeTab("contract")}
          className={`cursor-pointer text-center text-sm px-2 xl:px-3 py-1 border border-1  md:whitespace-nowrap ${
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
          className={`cursor-pointer text-center text-sm px-2 xl:px-3 py-1 border border-1  md:whitespace-nowrap ${
            selectedTab === "training"
              ? "bg-[#b747d0] !border-[#b747d0] text-white"
              : "bg-transparent !border-[#464963] text-[#D7D8ED]"
          } rounded-md`}
        >
          AI Training
        </span>
      </div>
      <div className={styles.work_box}>
        <h3>Create Training Data (Person and Product Likeness)</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap">
            <div className={styles.normal_form_ai}>
              <label
                style={{
                  minWidth: "100px",
                  maxWidth: "100px",
                  marginLeft: "0px",
                  marginRight: "0px",
                }}
              >
                Model
              </label>
              <input
                style={{ width: "100%" }}
                className={styles.inputfld}
                type="text"
                placeholder="Model"
                {...register("model")}

                // onChange={(e) =>
                //   handleFormValueUpdate({ model: e.target.value })
                // }
                // disabled={!selectedAssetDetails}
              />
              {errors && errors.model && (
                //@ts-ignore
                <span style={{ color: "red" }}>{errors?.model?.message}</span>
              )}
            </div>
            <div className={styles.normal_form_ai_t}>
              <label
                style={{
                  minWidth: "100px",
                  maxWidth: "100px",
                  marginLeft: "0px",
                  marginRight: "0px",
                }}
              >
                Short UUD <br />
                (Trigger Works)
              </label>
              <div>
                <input
                  style={{ width: "100%" }}
                  className={styles.inputfld}
                  type="text"
                  placeholder="UUD"
                  {...register("shortUUD")}
                  // disabled={!selectedAssetDetails}
                />
                {errors && errors.shortUUD && (
                  //@ts-ignore
                  <span style={{ color: "red" }}>
                    {errors.shortUUD?.message}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.normal_form_ai}>
              <label
                style={{
                  minWidth: "100px",
                  maxWidth: "100px",
                  marginLeft: "0px",
                  marginRight: "0px",
                }}
              >
                Steps
              </label>
              <div>
                <input
                  style={{ width: "100%" }}
                  className={styles.inputfld}
                  type="text"
                  placeholder="Steps"
                  {...register("steps")}
                />
                {errors && errors.steps && (
                  //@ts-ignore
                  <span style={{ color: "red" }}>{errors?.steps?.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.card_dash_box_r}>
            <button
              type="submit"
              className={`${styles.red_b_btn} bg-indigo-500`}
              style={{ marginTop: "60%" }}
              disabled={isTraningStarted}
            >
              {isTraningStarted ? (
                <>
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 animate-spin text-white fill-blue-500 mr-1"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>{" "}
                  <span>Train...</span>
                </>
              ) : (
                "Train"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
