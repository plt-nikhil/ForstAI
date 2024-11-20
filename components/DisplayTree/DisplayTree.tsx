import React, { ReactNode, useContext, useEffect, useState } from "react";
import styles from "../WorkDetails/WorkDetails.module.scss"
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
};

const DisplayTree = ({
  assetGroup,
  workAssets,
  files,
  children,
}: Props) => {
  const workAssetContext = useContext(WorkAssetsContext);
  const { selectedAssetDetails } = workAssetContext as IWorkAssetsContextType;

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
    }
  }, [selectedAssetDetails]);

  useEffect(() => {
    if (files && files.length && !state.files.length) {
      setState({ ...state, files: [...files] });
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
      setState({ ...state, files: [...state.files, ...assetGroup.files as []] })
    }
  }, [assetGroup])

  useEffect(() => {
    if (Array.isArray(workAssets) && !isSubset(state.files, workAssets)) {
      setState({ ...state, files: [...state.files, ...workAssets] });
    }
  }, [workAssets]);

  const [state, setState] = useState<ITreeState>({
    isExpanded: false,
    files: [],
    selectedItem: null,
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
      selectedAssetDetails: file,
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
      }
    }
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
          {`${assetGroup?.name} ${assetGroup?.type ? `(${assetGroup?.type})` : ""
            }`}
        </div>
        {state.isExpanded && (
          <>
            <ul className={styles.add_assets}>
              {state.files.length
                ? state.files.map((file, idx) => {
                  return (
                    <li className={styles.asset_listed} key={idx} onClick={() => handleSelect(file)}>
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
                        </span>
                      </div>
                    </li>
                  );
                })
                : null}
            </ul>
            {assetGroup?.children &&
              assetGroup.children.map((item, idx) => (
                <DisplayTree
                  assetGroup={item}
                  files={item.files}
                  key={idx}
                  showAdd={false}
                />
              ))}
            {children}
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayTree;
