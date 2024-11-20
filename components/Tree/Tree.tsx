import React, { ReactNode, useContext, useEffect, useState } from "react";
import AssetListModal from "@/components/AssetListModal/AssetListModal";
import styles from "./../RegNewWork/RegNewWork.module.scss";
import arrowDown from "/public/assets/images/acco_dwn.svg";
import imgIcon from "/public/assets/images/img_icon.svg";
import videoIcon from "/public/assets/images/video_icon.svg";
import audioIcon from "/public/assets/images/audio_icon.svg";
import fileIcon from "/public/assets/images/file_icon.svg";
import arrowRight from "/public/assets/images/acco_rgt.svg";
import itemSelect from "/public/assets/images/check_square.svg";
import Image from "next/image";
import _ from "lodash";
import "crypto";
import WorkAssetsContext from "@/context/CommonContext";
import { IWorkAssetsContextType } from "@/@types/ContextTypes";
import { IAssetGroupDataType } from "@/@types/WorkTypes";
import IndexModal from "../IndexModal/IndexModal";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

// type Props = { title: string; fileType: string, section: string | null };
type Props = {
  assetGroup: IAssetGroupDataType;
  workAssets?: any;
  files?: any[];
  section?: string | null;
  updateAssetIndexTracker?: (assetId: string, assetGroupId: string) => void;
  showAdd?: boolean;
  children?: ReactNode;
  type?: string;
};

type ITreeState = {
  isExpanded: boolean;
  files: any[];
  selectedItem: string | null;
  showIndexPopup: boolean;
};
type IUploadResponseValue = {
  assetId: string;
  fileName: string;
  url: string;
  type: string;
};
type IStoreProps = {
  show: boolean;
  itemIndex?: string;
};
// const Tree = ({ title, fileType, section }: Props) => {
const Tree = ({
  assetGroup,
  workAssets,
  section,
  updateAssetIndexTracker,
  files,
  showAdd = true,
  children,
  type = "normal",
}: Props) => {
  const workAssetContext = useContext(WorkAssetsContext);
  const { selectedAssetDetails } = workAssetContext as IWorkAssetsContextType;
  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      selectedAssetDetails &&
      selectedAssetDetails.assetId === state.selectedItem
    ) {
      const { files } = state;
      const updatedFile = _.find(
        files,
        (obj) => obj.assetId === state.selectedItem
      );
      updatedFile.assetName = selectedAssetDetails.assetName;
      updatedFile.assetDescription = selectedAssetDetails.assetDescription;
      updatedFile.copyrightRegNumber = selectedAssetDetails.copyrightRegNumber;
      setState({ ...state, files: [...files] });
      workAssetContext?.updateWorkAssetState({
        files: [...files] as any,
      });
    }
  }, [selectedAssetDetails]);

  useEffect(() => {
    if (files && files.length && !state.files.length) {
      setState({ ...state, files: [...files] });
      workAssetContext?.updateWorkAssetState({
        files: [...files] as any,
      });
    }
  }, [files]);

  const isSubset = (baseArray: any[], checkArray: any[]) => {
    const isSubsetArray = _.every(checkArray, (item) =>
      _.includes(baseArray, item)
    );
    return isSubsetArray;
  };
  useEffect(() => {
    if (!state.files.length && assetGroup.files) {
      setState({
        ...state,
        files: [...state.files, ...(assetGroup.files as [])],
      });
      workAssetContext?.updateWorkAssetState({
        files: [...state.files, ...(assetGroup.files as [])] as any,
      });
    }
  }, [assetGroup]);

  useEffect(() => {
    if (Array.isArray(workAssets) && !isSubset(state.files, workAssets)) {
      setState({ ...state, files: [...state.files, ...workAssets] });
      workAssetContext?.updateWorkAssetState({
        files: [...state.files, ...workAssets] as any,
      });
    }
  }, [workAssets]);

  const [state, setState] = useState<ITreeState>({
    isExpanded: false,
    files: [],
    selectedItem: null,
    showIndexPopup: false,
  });
  const [store, setStore] = useState<IStoreProps>({
    show: false,
    itemIndex: undefined,
  });
  const [assetUploadModalState, setAssetUploadModalState] = React.useState({
    show: false,
  });

  const HandleExpandOnClick = () => {
    setState({ ...state, isExpanded: !state.isExpanded });
    workAssetContext?.updateWorkAssetState({
      selectedAssetGroup: assetGroup as any,
    });
  };

  const handleSelect = (file: any) => {
    setState({ ...state, selectedItem: file.assetId });
    workAssetContext?.updateWorkAssetState({
      selectedItem: file.assetId,
      selectedAssetDetails: {
        ...file,
        type: assetGroup?.type
          ? assetGroup?.type.toLocaleLowerCase()
          : file.type,
      },
    });
  };

  const getFileTypeImage = (file?: any) => {
    if (file) {
      switch (file?.type) {
        case "image":
          return imgIcon;
        case "video":
          return videoIcon;
        case "audio":
          return audioIcon;
        case "text":
          return fileIcon;
      }
    } else {
      switch (assetGroup?.type) {
        case "Image":
          return imgIcon;
        case "Video":
          return videoIcon;
        case "Audio":
          return audioIcon;
        case "text":
          return fileIcon;
      }
    }
  };

  const handleFileUploadSuccess = (value: IUploadResponseValue) => {
    setState({ ...state, files: [...state.files, value] });
    workAssetContext?.updateWorkAssetState({
      files: [...state.files, value] as any,
    });
    // if (value.type === "video" && updateAssetIndexTracker) {
    //   updateAssetIndexTracker(value.assetId);
    // }
  };

  const handleAddWorkAsset = () => {
    setAssetUploadModalState((prev) => ({ ...prev, show: true }));
    workAssetContext?.updateWorkAssetState({
      selectedAssetGroup: assetGroup as any,
    });
  };

  const handleIndexComponentHide = () => {
    setStore({ ...store, show: false, itemIndex: undefined });
  };
  const handleIndexAction = (
    action: string,
    data: { assetId: string },
    assetId: any
  ) => {
    if (action === "storeNotIndex") {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/works/copy/asset/${data.assetId}?index=1`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${session?.user.access}`,
          },
        })
        .then((response) => {
          const result = response.data;
          if (result.success) {
            const { data: resultData } = result;
            toast.success(resultData.message);
            const { files } = state;
            let assetFound = files.find(
              (file) => file.assetId === data.assetId
            );
            console.log(files, assetFound, data);
            assetFound.isDownloading = true;
            setState({ ...state });
          }
        });
    } else if (action === "storeIndex") {
      // const url = `${process.env.NEXT_PUBLIC_API_URL}/works/copy/asset/${data.assetId}?index=2`;
      // axios
      //   .get(url, {
      //     headers: {
      //       Authorization: `Bearer ${session?.user.access}`,
      //     },
      //   })
      //   .then((response) => {
      if (updateAssetIndexTracker) {
        updateAssetIndexTracker(data.assetId, assetGroup?.assetGroupId);
      }

      //   const result = response.data;
      //   if (result.success) {
      //     const { data: resultData } = result;
      //     toast.success(resultData.message);
      //     const { files } = state;
      //     let assetFound = files.find(
      //       (file) => file.assetId === data.assetId
      //     );
      //     console.log(files, assetFound, data);
      //     assetFound.isDownloading = true;
      //     setState({ ...state });
      //   }
      // });
    }
  };

  const AddToIndexing = (assetId: any, file: any) => {
    if (file.isDownloaded) {
      console.log("asset is downloaded");
      // if (updateAssetIndexTracker) {
      //   updateAssetIndexTracker(file.assetId, assetGroup?.assetGroupId);
      // }
    } else {
      setStore({ ...store, show: true, itemIndex: file.assetId });
    }
    // if (updateAssetIndexTracker) {
    //   updateAssetIndexTracker(assetId, assetGroup?.assetGroupId);
    // }
  };

  // const AddToIndexing = (assetId: any) => {
  //   if (updateAssetIndexTracker) {
  //     updateAssetIndexTracker(assetId, assetGroup?.assetGroupId);
  //   }
  // };
  const isDisableIndexButton = (file: any) => {
    if (!file.isDownloaded && file.isDownloading) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.expand_box}>
      <div className={state.isExpanded ? styles.expand_box_inner : undefined}>
        <div className={styles.main_hd} onClick={HandleExpandOnClick}>
          <span>
            {state.isExpanded ? (
              <Image src={arrowDown} alt="" />
            ) : (
              <Image src={arrowRight} alt="" />
            )}
          </span>
          {`${assetGroup?.name} ${
            assetGroup?.type ? `(${assetGroup?.type})` : ""
          }`}
        </div>
        {state.isExpanded && (
          <>
            <ul className={styles.add_assets}>
              {state.files.length
                ? state.files.map((file, idx) => {
                    return (
                      <li
                        className={styles.asset_listed}
                        key={idx}
                        onClick={() => handleSelect(file)}
                      >
                        <div className={styles.asset_listed_img}>
                          <span>
                            <Image src={getFileTypeImage(file)} alt="" />
                          </span>{" "}
                          {file.fileName}
                        </div>
                        <div className={styles.asset_listed_checkbox}>
                          <span>
                            {workAssetContext?.selectedItem ===
                              file.assetId && (
                              <Image src={itemSelect} alt="selected" />
                            )}
                            {/* <input type="radio" value="test" name="vest" /> */}
                          </span>
                        </div>
                        {assetGroup?.type === "Video" && (
                          <button
                            type="button"
                            // onClick={() => AddToIndexing(file.assetId)}
                            onClick={() => AddToIndexing(file.assetId, file)}
                            className={styles.add_btn}
                            // disabled={isDisableIndexButton(file)}
                          >
                            Index
                          </button>
                        )}
                      </li>
                    );
                  })
                : null}
            </ul>
            {assetGroup?.children &&
              assetGroup.children.map((item, idx) => (
                <Tree
                  assetGroup={item}
                  files={item.files}
                  key={idx}
                  showAdd={false}
                />
              ))}
            {children}

            {showAdd && (
              <div className={styles.tree_button_outer}>
                <div>
                  <button
                    className={styles.add_btn}
                    onClick={handleAddWorkAsset}
                  >
                    Add
                  </button>
                </div>
                <div className={styles.tree_bt_right}>
                  {/* {assetGroup?.type === "Image" && (
                    <button type="button" className={styles.blue_b_btn}>
                      Train
                    </button>
                  )} */}
                  {/* <button type="button" className={styles.blue_b_btn}>
                    Index
                  </button> */}
                </div>
              </div>
            )}
            <AssetListModal
              showModal={assetUploadModalState.show}
              handleHide={() =>
                setAssetUploadModalState((prev) => ({ ...prev, show: false }))
              }
              onSuccess={handleFileUploadSuccess}
              fileType={assetGroup?.type}
            />
            <IndexModal
              showModal={store.show}
              handleHide={handleIndexComponentHide}
              indexItem={store.itemIndex}
              onSuccess={handleIndexAction}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Tree;
