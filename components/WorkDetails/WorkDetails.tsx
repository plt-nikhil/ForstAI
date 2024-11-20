"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./WorkDetails.module.scss";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Form } from "react-bootstrap";
import arrowDown from "/public/assets/images/acco_dwn.svg";
import { Controller, useForm } from "react-hook-form";
import DisplayTree from "../DisplayTree/DisplayTree";
import WorkAssetsContextProvider from "@/providers/WorkAssetsProvider";
import { IAssetGroupDataType } from "@/@types/WorkTypes";
import TagInput from "../TagInput/TagInput";
import RegisterWorkProvider from "@/providers/RegisterWorkProvider";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Response } from "@/@types/CommonTypes";
import RegisterWorkContext from "@/context/WorkContext";
import WorkAssetsContext from "@/context/CommonContext";
import {
  IRegisterWorkContextType,
  IWorkAssetsContextType,
} from "@/@types/ContextTypes";
import toast from "react-hot-toast";
import _ from "lodash";

function WorkDetailsComponent() {
  const { data: session, status } = useSession();
  const { workId } = useParams();
  const createWorkSubmitRef = useRef<HTMLButtonElement>(null);
  const [workDetails, setWorkDetails] = React.useState({});
  const [assetsGroups, setAssetsGroups] = React.useState<any[]>([]);
  const [workAssets, setWorkAssets] = React.useState<any[]>([]);

  const getWorkDetails = async (workId: any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/works/get-asset-work/${workId}`
      );
      setWorkDetails(response.data.data.workDetails);
      setAssetsGroups(response.data.data.assetGroups);
      setWorkAssets(response.data.data.workAssets);
    } catch (error) {}
  };

  const handleUpdateWorkAssets = (assets: any[]) => {
    setWorkAssets([...workAssets, ...assets]);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getWorkDetails(workId);
    }
  }, []);

  return (
    <div className={`${styles.regNewWork_contain} regNewWork_contain`}>
      <h1>Work Details</h1>
      <RegisterWorkProvider>
        <CreateWork
          createSubmitReference={createWorkSubmitRef}
          workDetails={workDetails}
        />
        <div className={`${styles.card} ${styles.card_center}`}>
          <h2>Work Assets</h2>
          <div className="row">
            <WorkAssetsContextProvider>
              <WorkAssetList
                assetGroups={assetsGroups}
                workAssets={workAssets}
                createSubmitReference={createWorkSubmitRef}
                updateWorkAssets={handleUpdateWorkAssets}
              />
              <WorkAssetDetails />
              <WorkAssetPreview />
            </WorkAssetsContextProvider>
          </div>
        </div>
      </RegisterWorkProvider>
    </div>
  );
}

export default WorkDetailsComponent;

// WORK DETAILS
type IWorkCreateProps = {
  createSubmitReference: React.RefObject<HTMLButtonElement>;
  workDetails: any | null;
};

type ICreateWorkState = {
  canShowFolderBrowser: boolean;
  formData?: object;
  likenessTypes: string[];
};

function CreateWork({ workDetails }: IWorkCreateProps) {
  const [state, setState] = useState<ICreateWorkState>({
    canShowFolderBrowser: false,
    formData: undefined,
    likenessTypes: [],
  });
  const workContext = useContext(RegisterWorkContext);
  const workContextData = workContext as IRegisterWorkContextType;
  const { control } = useForm();

  useEffect(() => {
    if (workDetails && workDetails.worksId) {
      workContextData.workId = workDetails.worksId;
    } else {
      workContextData.workId = undefined;
    }
  }, [workDetails]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/works/likenessType`)
      .then((response) => {
        const result: Response<{ likenessType: string[] }> = response.data;
        if (result.success) {
          const { data } = result;
          setState((prev) => ({ ...prev, likenessTypes: data.likenessType }));
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <form>
        <div className={styles.card}>
          <h2>Work Details</h2>
          <div className="row">
            <div className="col-md-3 col-lg-2">
              <div className={styles.upload_contain}>
                <div className={styles.image_upload}>
                  <div className={styles.image_upload_inner}>
                    {workDetails.image ? (
                      <button
                        className={styles.upload_preview_img}
                        type="button"
                      >
                        <Image
                          src={workDetails.image}
                          alt=""
                          width={500}
                          height={500}
                        />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-5">
              <div className={styles.form_flex}>
                <div className={styles.normal_form}>
                  <input
                    className={styles.inputfld}
                    type="text"
                    placeholder="Enter Work Name"
                    defaultValue={workDetails?.name ?? null}
                    disabled
                  />
                </div>
                <div className={styles.normal_form} id={styles.advance_box}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Select
                      aria-label="Tattoo style"
                      className=""
                      id={styles.form_control}
                      disabled
                    >
                      <option
                        className={styles.disbled}
                        value=""
                        disabled
                        selected
                      >
                        Likeness Type
                      </option>
                      {state.likenessTypes.map((likeType, index) => (
                        <option
                          key={index}
                          value={likeType.toLowerCase()}
                          selected={
                            likeType.toLowerCase() ===
                            workDetails.likeType?.toLowerCase()
                          }
                        >
                          {likeType}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
              <div className={styles.textareafld_contain}>
                <textarea
                  className={styles.textareafld}
                  placeholder="Enter Work Description"
                  defaultValue={workDetails.description ?? null}
                  disabled
                ></textarea>
              </div>
            </div>
            <div className="col-md-5 col-lg-5">
              <div className={styles.reg_right_box}>
                <div className={styles.new_flex}>
                  <div className={styles.new_flex_tex}>
                    <div className={styles.normal_form}>
                      <input
                        className={styles.inputfld}
                        type="text"
                        placeholder="Copyright registration number"
                        defaultValue={workDetails.copyRightNumber}
                        disabled
                      />
                    </div>
                  </div>
                  <div className={styles.new_flex_btn}></div>
                </div>
                <div className={styles.new_flex}>
                  <div className={styles.new_flex_tex}>
                    <div className={styles.normal_form}>
                      <div className={styles.inputfld}>Legal Certificate</div>
                    </div>
                  </div>
                  <div className={styles.new_flex_btn}></div>
                </div>
              </div>
              <div
                className={`${styles.Keywords} ${styles.textareafld_contain}`}
              >
                <Controller
                  control={control}
                  name="workKeywords"
                  render={() => (
                    <TagInput
                      showInput={true}
                      className={styles.textareafld}
                      styleName=""
                      value={workDetails?.keywords}
                      disabled
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

// WORK ASSET DETAILS
type IAssetDetails = {
  formState: any;
  assetId: string | undefined;
  errors: Record<string, string> | undefined;
};

const WorkAssetDetails = () => {
  const [state, setState] = useState<IAssetDetails>({
    formState: {
      assetName: undefined,
      assetFileName: undefined,
      assetDescription: undefined,
    },
    assetId: undefined,
    errors: undefined,
  });

  const workAssetContext = useContext(WorkAssetsContext);
  const { selectedAssetDetails } = workAssetContext as IWorkAssetsContextType;

  useEffect(() => {
    if (selectedAssetDetails && state.assetId != selectedAssetDetails.assetId) {
      setState({
        ...state,
        formState: {
          ...state.formState,
          assetName: selectedAssetDetails.assetName || "",
          assetFileName: selectedAssetDetails.fileName,
          assetDescription: selectedAssetDetails.assetDescription || "",
        },
        assetId: selectedAssetDetails.assetId,
      });
    }
  }, [selectedAssetDetails]);

  const { formState } = state;

  return (
    <div className="col-md-4">
      <div className={styles.work_box}>
        <h3>Work Asset Details</h3>
        <div className={styles.normal_form}>
          <input
            className={styles.inputfld}
            type="text"
            placeholder="Enter Work Asset Name"
            value={formState.assetName}
            disabled
          />
        </div>
        <div className={styles.normal_form}>
          <input
            className={styles.inputfld}
            type="text"
            placeholder="Enter Work Asset File Name"
            value={formState.assetFileName}
            disabled
          />
        </div>
        <div className={styles.textarea_btm}>
          <textarea
            className={styles.textareafld}
            placeholder="Enter Work Asset Description"
            value={formState.assetDescription}
            disabled
          ></textarea>
        </div>
        <div className={styles.card_dash_box_r}></div>
      </div>
    </div>
  );
};

// WORK ASSET LIST TREE
type IWorkAssetListProps = {
  assetGroups: any;
  workAssets: any;
  createSubmitReference: React.RefObject<HTMLButtonElement>;
  updateWorkAssets: (assets: any[]) => void;
};

type IWorkAssetIndexPollResponse = {
  assetGroups: IAssetGroupDataType[];
  workAssets: any[];
};

function WorkAssetList({ assetGroups, workAssets }: IWorkAssetListProps) {
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
  const { data: session, status } = useSession();

  const hasIndexAssetCallBackHandler = (
    assetId: string,
    assetGroupId: string
  ) => {
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
      }
    });
  };

  const getWorkAsset = (asset: any[], assetGroupId: string) => {
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

  return (
    <div className="col-md-4">
      <div className={styles.work_box}>
        <h3>Work Asset List</h3>
        {!state.assetsGroups.length && (
          <>
            <div className={styles.no_data}>No Work Assets Defined</div>
          </>
        )}
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
              <DisplayTree
                key={idx}
                assetGroup={assetGroup}
                workAssets={getWorkAsset(workAssets, assetGroup.assetGroupId)}
                updateAssetIndexTracker={hasIndexAssetCallBackHandler}
              ></DisplayTree>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// WORK ASSET PREVIEW
const WorkAssetPreview = () => {
  const workAssetContext = useContext(WorkAssetsContext);
  const { selectedAssetDetails } = workAssetContext as IWorkAssetsContextType;

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
    }
  };
  return (
    <div className="col-md-4">
      <div className={styles.work_box}>
        <h3>Work Asset Preview</h3>
        <div className={styles.thum_preview}>
          {selectedAssetDetails && selectedAssetDetails.url ? (
            getWorkAssetPreview()
          ) : (
            <div>Image or Video thumbnail</div>
          )}
        </div>
      </div>
    </div>
  );
};
