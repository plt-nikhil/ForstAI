import { Response } from "@/@types/CommonTypes";
import { IFolderData } from "@/@types/WorkTypes";
import OwnedWorksNew from "@/components/OwnedWorksnew/OwnedWorksnew";
import { authOptions } from "@/lib/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";

export default async function FolderWorkView({
  params,
}: {
  params: { folderId: string };
}) {
  const session = await getServerSession(authOptions);
  const fetchWorks = async (folderId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/works?folder=${folderId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.access}`,
          },
        }
      );
      const result = response.data;
      if (result.success) {
        const { data } = result as Response<IFolderData>;
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const folderContents = await fetchWorks(params.folderId);
  return <OwnedWorksNew folderData={folderContents as IFolderData} />;
}
