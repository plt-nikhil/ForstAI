import ContractOffers from "@/components/ContractOffers/ContractOffers";
import axios from 'axios';

const getWorkdetails = async (workId: any) => {
  try {
    const response = await axios.get(
                      `${process.env.NEXT_PUBLIC_API_URL}/works/owned/${workId}`
                    );  
    //console.log('response work',response.data.data.ownedWork);
    
    return response.data.data.ownedWork;
  } catch (error) {
    console.log('getWorkdetails',error);
  }
};
const getContractOffers = async (worksId: any) => {
  try {
    const response = await axios.get(
                      `${process.env.NEXT_PUBLIC_API_URL}/contractsoffer/contracts/${worksId}`
                    );  
    //console.log('response contract offers',response.data.data.contractoffers);
    
    return response.data.data.contractoffers;
  } catch (error) {
     console.log('contractoffer error',error);
  }
};
export default async function ContractOffersPage({
  params,
}: {
  params: { workId: string };
}) {
  
const saveoffers = async (worksId:string ,formData: any) => {
  'use server';
  try {
    const response = await axios.post(
                      `${process.env.NEXT_PUBLIC_API_URL}/contractsoffer/update-contracts`
                      , { worksId:worksId,formData });  
    console.log('response contract offers----',response);
    
     return response.data.data.contractoffers;
  } catch (error) {
     //console.log('contractoffer update error',error);
     return error;
  }
};
  const workdetails = await getWorkdetails(params.workId);
  const Offers = await getContractOffers(workdetails?.worksId);
  return (
    <div>
      <ContractOffers  Offers={Offers}  workdetails={workdetails}  onSubmit={saveoffers}/>
    </div>
  );
}
