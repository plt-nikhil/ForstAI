import OwnedWorksDetails from "@/components/OwnedWorksDetails/OwnedWorksDetails";
import axios from 'axios';

const getOwnedWork = async (workId: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/works/owned/${workId}`
    );    
    return response.data.data.ownedWork;
  } catch (error) {
  }
};

export default async function OwnedWorksDetailsPage({
  params,
}: {
  params: { workId: string };
}) {
  const ownedWork = await getOwnedWork(params.workId);
  
  return (
    <div>
      <OwnedWorksDetails ownedWork={ownedWork}/>
    </div>
  );
}
