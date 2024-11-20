"use client";

import styles from "./contractoffers.module.scss"
import Image from "next/image";
import workDetail01 from "/public/assets/images/work_detail_01.png";
import copyIcon from "/public/assets/images/copy_icon.svg";
import { useState } from "react";
import TagInput from "../TagInput/TagInput";
import axios from "axios";
import { toast } from 'react-hot-toast';


type TemplateTitle = {
  _id: string;
  title: string;
  per_type: string;
  max_type: string;
};
type AuthorizeTitle = {
  _id: string;
  name: string;
};
type ContractOffersType = {
  _id: string;
  templatetitle:  TemplateTitle;
  flatupfrontfee?: number;
  per_ai_training?: number;
  daily_fee?: number;
  max_ai_training? : number;
  max_days? : number;
  authorized_by? : string[];////AuthorizeTitle;
}[];
type WorkdetailsType = {
  name: string;
  likeType: string;
  sourceType: string;
  image: string;
  childof? : string;
  worksId: string;
};
interface ContractOffersProps {
  Offers: ContractOffersType;
  workdetails: WorkdetailsType;
  onSubmit: (worksId :WorkdetailsType["worksId"],formData: ContractOffersType) => void;

}
type DecimalObject = {
  '$numberDecimal': string;
};
const ContractOffers: React.FC<ContractOffersProps> = ({ Offers = [], workdetails, onSubmit  }) => {
  const [formData, setFormData] = useState(Offers);
  const [error, setError]       = useState<string>('');
  const [value, setValue]       = useState('');  
  const [errorFields, setErrorFields] = useState<{ [key: number]: { [key: string]: boolean } }>({});
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (index: number, field: string, value: any) => {
  //  if (/^\d*\.?\d*$/.test(value) || value === '' || value === '-') {
      const updatedOffers = [...formData];
      updatedOffers[index] = {
        ...updatedOffers[index],
        [field]: value,
      };
      setFormData(updatedOffers);
  //  }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();   
    const newErrorFields: { [key: number]: { [key: string]: boolean } } = {};
    let hasError = false;

    formData.forEach((offer, idx) => {
      newErrorFields[idx] = {};
      if (!offer.flatupfrontfee) {
        newErrorFields[idx].flatupfrontfee = true;
        hasError = true;
      }
      if (!offer.per_ai_training) {
        newErrorFields[idx].per_ai_training = true;
        hasError = true;
      }
      if (!offer.max_ai_training) {
        newErrorFields[idx].max_ai_training = true;
        hasError = true;
      }
      if (!offer.daily_fee) {
        newErrorFields[idx].daily_fee = true;
        hasError = true;
      }
      if (!offer.max_days) {
        newErrorFields[idx].max_days = true;
        hasError = true;
      }
    });

    if (hasError) {
      toast.error('Please fill in all fields with valid numbers.');
      setErrorFields(newErrorFields);
      return;
    }

    try {
      setError('');
      console.log(formData)
      await onSubmit(workdetails.worksId,formData);
      toast.success('Offers updated');
    } catch (error) {
      console.error('Error saving offers:', error);
      toast.error('Error saving offers.');
    }
  };

  const handleCancel = () => {
    setFormData(Offers);
    setError('');
    setErrorFields({});
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = event.key;
  
    if (
      ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(charCode) ||
      /^[0-9]$/.test(charCode) ||
      charCode === '.'
    ) {
      return;
    }
  
    event.preventDefault();
  };
  const handleKeyDownNumber = (e: { preventDefault?: any; key?: any; }) => {
    const { key } = e;

    if (key === '-' || key === '.') {
      e.preventDefault();
    }
    if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight') {
      return;
    }
    if (!/[\d.]/.test(key)) {
      e.preventDefault();
    }
  };

  const getFormattedValue =  (value: DecimalObject | undefined): string => {
    return value?.['$numberDecimal'] || '';
  };
  const fetchSuggestions = async (query: string) => {
    if (query.length >= 0) {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/authorizers?q=${query}`);
        const fetchedSuggestions = response.data.data.map((authorizer: any) => authorizer.name);
        setSuggestions(fetchedSuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };
  const handleActivate = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <section className={styles.owned_details_wrapper}>      
      <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className={`${styles.card} ${styles.card_top}`}>
            <div className={styles.card_img}>
              <Image src={workdetails?.image ?? workDetail01} 
                alt=""               
                width={500}
                height={500}
              /> 
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className={styles.card_details}>
                  <span>Name</span>
                  <h1>{workdetails?.name}</h1>
                </div>  
              </div>
              <div className="col-md-6">
                <div className={styles.card_details}>
                  <span>Sub Folder</span>
                  <h1>{workdetails?.childof}</h1>
                </div>  
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className={styles.box_contain}>
            <div className={styles.card}>
              <h2>Likeness Type</h2>
              <div className={styles.sm_pink_btn}>{workdetails?.likeType ?? "Film"}</div>
            </div>
            <div className={styles.card}>
              <h2>Source Data Type</h2>
              <div className={styles.sm_pink_btn}>{workdetails?.sourceType ?? "Video"}</div>
            </div>
          </div>
        </div>
      </div>  
      <div className="row">
        <div className="col-md-12">
          <div className={`${styles.card} ${styles.card_bottom}`}>
            <h2>Smart Contracts</h2>
            <div className="row">
              {formData.map((offer, idx) => (
                <div className="col-md-4" key={offer.templatetitle?._id}>
                  <div className={styles.card_bottom_inner}>
                    <div className={styles.normal_form}>
                      <label>Template</label>
                      <input className={styles.inputfld} type="text" name="Template" value={offer.templatetitle?.title} readOnly/>
                    </div>
                    <div className={`${styles.normal_form} ${styles.numInputfld}`}>
                      <label>Flat Up-Front Fee</label>
                      <input className={`${styles.inputfld} ${errorFields[idx]?.flatupfrontfee ? styles.error : ''}`}
                        type="text" name="flatupfrontfee" value={offer?.flatupfrontfee}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => handleChange(idx, 'flatupfrontfee', e.target.value)}/>
                    </div>
                    <div className={`${styles.normal_form} ${styles.numInputfld}`}>
                      <label>{offer.templatetitle?.per_type}</label>
                      <input className={`${styles.inputfld} ${errorFields[idx]?.per_ai_training ? styles.error : ''}`}
                       type="text" name="per_ai_training" value={offer?.per_ai_training}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => handleChange(idx, 'per_ai_training', e.target.value)}/>
                    </div>
                    <div className={`${styles.normal_form} ${styles.numInputfld}`}>
                      <label>Daily Fee</label>
                      <input className={`${styles.inputfld} ${errorFields[idx]?.daily_fee ? styles.error : ''}`}
                       type="text" name="daily_fee" value={offer?.daily_fee}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => handleChange(idx, 'daily_fee', e.target.value)}/>
                    </div>
                    <div className={styles.normal_form}>
                      <label>{offer.templatetitle?.max_type}</label>
                      <input className={`${styles.inputfld} ${errorFields[idx]?.max_ai_training ? styles.error : ''}`}
                       type="text" name="max_ai_training" value={offer?.max_ai_training}
                      onKeyDown={handleKeyDownNumber}
                      onChange={(e) => handleChange(idx, 'max_ai_training', e.target.value)}/>
                    </div>
                    <div className={styles.normal_form}>
                      <label>Max Days</label>
                      <input className={`${styles.inputfld} ${errorFields[idx]?.max_days ? styles.error : ''}`}
                       type="text" name="max_days" value={offer?.max_days}
                      min="1"
                      onKeyDown={handleKeyDownNumber}
                      onChange={(e) => handleChange(idx, 'max_days', e.target.value)}/>
                    </div>
                    <div className={styles.normal_form}>
                      <label>Authorized</label>
                      <TagInput
                        value={offer?.authorized_by}
                        showInput={true}
                        styleName={styles.inputfld}
                        className={`${styles.inputfld} ${errorFields[idx]?.authorized_by ? styles.error : ''}`} 
                        suggestions={suggestions}
                        onFetchSuggestions={fetchSuggestions}                       
                        isActive={activeIndex === idx}
                        onActivate={() => handleActivate(idx)}
                        onChange={(e) => handleChange(idx, 'authorized_by', e)}
                      />
                    </div>
                  </div>
                </div>
               ))}
            </div>
          </div>
      </div>
      </div>
      <div className={styles.footer_btn}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className={styles.secondary_btn} onClick={handleCancel}>Cancel</button>
        <button type="submit" className={styles.primary_btn} >Save</button>
      </div>
      </form>
    </section>
  );
}
export default ContractOffers;
