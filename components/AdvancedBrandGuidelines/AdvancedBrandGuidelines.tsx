"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./AdvancedBrandGuidelines.module.scss";
import WorkAssetsContext from "@/context/CommonContext";
import { IWorkAssetsContextType } from "@/@types/ContextTypes";

const authorizedTrainingTools = [
  'ForstAI (Private Generation)',
  'Adobe / Firefly Marketplace',
  'Runway',
  'OpenAI / Sora',
];

type IAssetGroupDetails = {
  formState: any;
  errors: Record<string, string> | undefined;
};

const AdvancedBrandGuidelines = () => {

  const [state, setState] = useState<IAssetGroupDetails>({
    formState: {
      assetGroupName: undefined,
      assetGroupId: undefined,
      coBrandingRestriction: false,
      restrictedBrands: [],
      keywordRestriction: false,
      restrictedKeywords: [],
      dataTrainingPreAuth: false,
      authorizedTrainingTools: [],
    },
    errors: undefined,
  });

  const workAssetContext = useContext(WorkAssetsContext);
  const { selectedAssetGroup, updateWorkAssetState } = workAssetContext as IWorkAssetsContextType;

  const handleCheckboxChange = (label: string, index?: number) => {
    switch (label) {
      case 'co-brand-restriction':
        setState({
          ...state,
          formState: {
            ...state.formState,
            coBrandingRestriction: !state.formState.coBrandingRestriction,
          },
        });
        const updatedCoBrandingRestriction = { ...selectedAssetGroup, coBrandingRestriction: !state.formState.coBrandingRestriction };
        updateWorkAssetState({ selectedAssetGroup: updatedCoBrandingRestriction });
        break;
      case 'keyword-restriction':
        setState({
          ...state,
          formState: {
            ...state.formState,
            keywordRestriction: !state.formState.keywordRestriction,
          },
        });
        const updatedKeywordRestriction = { ...selectedAssetGroup, keywordRestriction: !state.formState.keywordRestriction };
        updateWorkAssetState({ selectedAssetGroup: updatedKeywordRestriction });
        break;
      case 'data-training':
        setState({
          ...state,
          formState: {
            ...state.formState,
            dataTrainingPreAuth: !state.formState.dataTrainingPreAuth,
          },
        });
        const updatedDataTrainingPreAuth = { ...selectedAssetGroup, dataTrainingPreAuth: !state.formState.dataTrainingPreAuth };
        updateWorkAssetState({ selectedAssetGroup: updatedDataTrainingPreAuth });
        break;
      case 'training-tools':
        if (index?.toString()) {
          const updatedAuthorizedTrainingTools = [...state.formState.authorizedTrainingTools];
          if (updatedAuthorizedTrainingTools[index]) {
            updatedAuthorizedTrainingTools[index].isChecked = !updatedAuthorizedTrainingTools[index].isChecked;
          } else {
            updatedAuthorizedTrainingTools[index] = {
              label: authorizedTrainingTools[index],
              isChecked: true
            }
          }
          setState({
            ...state,
            formState: {
              ...state.formState,
              authorizedTrainingTools: updatedAuthorizedTrainingTools,
            },
          });
          const updatedAuthTrainingTools = { ...selectedAssetGroup, authorizedTrainingTools: updatedAuthorizedTrainingTools };
          updateWorkAssetState({ selectedAssetGroup: updatedAuthTrainingTools });
        }
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e: any, label: string) => {
    setState({
      ...state,
      formState: {
        ...state.formState,
        [label]: e.target.value,
      },
    });
    const updatedAssetGroup = { ...selectedAssetGroup, [label]: e.target.value };
    updateWorkAssetState({ selectedAssetGroup: updatedAssetGroup });
  }

  useEffect(() => {
    if (selectedAssetGroup && state.formState.assetGroupId != selectedAssetGroup.assetGroupId) {
      setState({
        ...state,
        formState: {
          ...state.formState,
          assetGroupName: selectedAssetGroup?.name || "",
          assetGroupId: selectedAssetGroup.assetGroupId || "",
          coBrandingRestriction: selectedAssetGroup.coBrandingRestriction || false,
          restrictedBrands: selectedAssetGroup.restrictedBrands?.join(', ') || [],
          keywordRestriction: selectedAssetGroup.keywordRestriction || false,
          restrictedKeywords: selectedAssetGroup.restrictedKeywords?.join(', ') || [],
          dataTrainingPreAuth: selectedAssetGroup.dataTrainingPreAuth || false,
          authorizedTrainingTools: selectedAssetGroup.authorizedTrainingTools || [],
        },
      });
    }
  }, [selectedAssetGroup]);

  return (
    <div className="col-md-4">
      <div className={styles.work_box}>
        <h3>Advanced Brand Guidelines</h3>
        <div className={styles.inner_box}>
          <div
            className={`${styles.guideline_list} ${styles.guideline_list_one}`}
          >
            <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange('co-brand-restriction')}
                checked={state.formState.coBrandingRestriction}
              />
              <div className={styles.checkbox__checkmark}></div>
              <div className={styles.checkbox__body}>
                Co-branding Restrictions
              </div>
            </label>
          </div>
          <input 
            className={styles.guidelines_title} 
            defaultValue={state.formState.restrictedBrands}
            onChange={(e) => handleInputChange(e, 'restrictedBrands')}
            disabled={!state.formState.coBrandingRestriction}
          />
          <div
            className={`${styles.guideline_list} ${styles.guideline_list_one}`}
          >
            <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange('keyword-restriction')}
                checked={state.formState.keywordRestriction}
              />
              <div className={styles.checkbox__checkmark}></div>
              <div className={styles.checkbox__body}>
                Keyword Restrictions
              </div>
            </label>
          </div>
          <input 
            className={`${styles.guidelines_title} ${styles.guidelines_title_big}`}
            defaultValue={state.formState.restrictedKeywords}
            onChange={(e) => handleInputChange(e, 'restrictedKeywords')}
            disabled={!state.formState.keywordRestriction}
          />
          <div className={styles.guideline_list}>
            <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange('data-training')}
                checked={state.formState.dataTrainingPreAuth}
              />
              <div className={styles.checkbox__checkmark}></div>
              <div className={styles.checkbox__body}>
                Data Training Pre-Authorization
              </div>
            </label>
          </div>
          <div className={styles.guideline_list_sub}>
            {authorizedTrainingTools.map((toolName: string, idx: number) => (
              <div className={styles.guideline_list} key={idx}>
                <label className={`${styles.checkbox} ${styles.checkbox_field}`}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange('training-tools', idx)}
                    checked={state.formState.authorizedTrainingTools[idx]?.label === toolName && state.formState.authorizedTrainingTools[idx]?.isChecked}
                    disabled={!state.formState.dataTrainingPreAuth}
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>
                    {toolName}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedBrandGuidelines;
