"use client"; // Error components must be Client Components
import errorFolderImg from "@/public/assets/images/placeholders/folderError.svg";
import Image from "next/image";
import { useEffect } from "react";
import styles from "@/components/OwnedWorksFolder/ownedworksfolder.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className={styles.ownedNewWork_contain}>
      <div  className={styles.licensed_header}>
        <h1>Oops!</h1>
      </div>
      <div className={`${styles.card} ${styles.error_card}`}> 
        <Image src={errorFolderImg} alt="folderError" />
        <h1>Something went wrong</h1>
        <p>We are working on fixing the problem. 
        Please try again.</p>
        <button className={styles.primary_btn}
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </section>
  );
}
