"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./StandardBrandGuidelines.module.scss";
import * as yup from "yup";
import WorkAssetsContext from "@/context/CommonContext";
import { IWorkAssetsContextType } from "@/@types/ContextTypes";

const standardBrandGuidelines = [
  "No Immoral Use (Nudity, Sex, Depravity)",
  "No Vices (Drinking, Smoking, Violence)",
  "Approval Required for Data Training",
  "Approval Required for Generating",
  "Approval Required for Publishing"
];

type IAssetGroupDetails = {
  formState: any;
  errors: Record<string, string> | undefined;
};

const StandardBrandGuidelines = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shouldRefocus, setShouldRefocus] = useState(false);
  const schema = yup.object().shape({
    authorizedAgent: yup.string().email("Invalid agent email").required("Agent is required"),
  });

  const [state, setState] = useState<IAssetGroupDetails>({
    formState: {
      assetGroupName: undefined,
      assetGroupId: undefined,
      standardBrandGuidelines: [],
      authorizedAgent: undefined,
    },
    errors: undefined,
  });

  const workAssetContext = useContext(WorkAssetsContext);
  const { selectedAssetGroup, updateWorkAssetState } = workAssetContext as IWorkAssetsContextType;

  const handleCheckboxChange = (index: number) => {
    const updatedGuidelines = [...state.formState.standardBrandGuidelines];
    if (index.toString()) {
      if (updatedGuidelines[index]) {
        updatedGuidelines[index].isChecked = !updatedGuidelines[index].isChecked;
      } else {
        updatedGuidelines[index] = {
          label: standardBrandGuidelines[index],
          isChecked: true
        };
      }
      setState({
        ...state,
        formState: {
          ...state.formState,
          standardBrandGuidelines: updatedGuidelines,
        },
      });
      const updatedAssetGroup = { ...selectedAssetGroup, standardBrandGuidelines: updatedGuidelines };
      updateWorkAssetState({ selectedAssetGroup: updatedAssetGroup });
    }
  };

  const handleAuthorizedAgent = (e: any) => {
    setShouldRefocus(true);
    setState({
      ...state,
      formState: {
        ...state.formState,
        authorizedAgent: e.target.value,
      },
    });
    const updatedAssetGroup = { ...selectedAssetGroup, authorizedAgent: e.target.value };
    updateWorkAssetState({ selectedAssetGroup: updatedAssetGroup });
  }

  useEffect(() => {
    if (selectedAssetGroup && state.formState.assetGroupId != selectedAssetGroup.assetGroupId) {
      setShouldRefocus(false);
      setState({
        ...state,
        formState: {
          ...state.formState,
          assetGroupName: selectedAssetGroup?.name || "",
          assetGroupId: selectedAssetGroup.assetGroupId || "",
          standardBrandGuidelines: selectedAssetGroup.standardBrandGuidelines || [],
          authorizedAgent: selectedAssetGroup.authorizedAgent || "",
        },
      });
    }
  }, [selectedAssetGroup]);


  // TO FIX AN ISSUE WHERE THE AUTHORIZED AGENT INPUT LOSES FOCUS ON CHANGE
  useEffect(() => {    
    if (shouldRefocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.formState.authorizedAgent]);

  return (
    <div className="col-md-4">
      <div className={styles.work_box}>
        <h3>Standard Brand Guidelines</h3>
        <div className={styles.inner_box}>
          <div className={styles.guidelines_title}>
            {selectedAssetGroup?.name ?? 'No Asset Group Selected'}
          </div>
          {standardBrandGuidelines.map((guideline: string, idx: number) => (
            <div className={styles.guideline_list} key={idx}>
              <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(idx)}
                  checked={state.formState.standardBrandGuidelines[idx]?.label === guideline && state.formState.standardBrandGuidelines[idx]?.isChecked}
                />
                <div className={styles.checkbox__checkmark}></div>
              </label>
              <div className={styles.checkbox__body}>
                {guideline}
              </div>
            </div>
          ))}
          <div className={`${styles.normal_form} ${styles.guidelines_input}`}>
            <input
              className={styles.inputfld}
              key={state.formState.authorizedAgent}
              ref={inputRef}
              type="text"
              defaultValue={state.formState.authorizedAgent}
              onChange={handleAuthorizedAgent}
            />
          </div>
          <div className={styles.card_dash_box_r}>
            <button className={styles.red_b_btn}>Authorize Agent</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardBrandGuidelines;
