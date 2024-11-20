import OwnedWorksFolder from "@/components/OwnedWorksFolder/OwnedWorksFolder";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import axios from "axios";
export default async function MyWorkFolderPage() {
  const session = await getServerSession(authOptions);
  const fetchDataFolders = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/works/folder/view/root`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.access}`,
          },
        }
      );
      const result = response.data;
      if (result.success) {
        const { data } = result;
        return data;
      }
    } catch (error) {}
  };
  const folderData = await fetchDataFolders();
  return (
    <div>
      <OwnedWorksFolder folders={folderData?.folders} count={folderData?.count} />
    </div>
  );
}
