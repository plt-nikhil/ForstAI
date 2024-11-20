import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
interface FileType {
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  lastModified: number;
  lastModifiedDate: Date;
}
interface DragAndDropProps {
  children?: React.ReactNode;
  onChange?: (...event: any[]) => void;
  register?: UseFormRegister<any>;
  name?: string;
  reference?: React.RefObject<HTMLInputElement>;
  useInput?: boolean;
  isActive?:boolean;
}
function DragAndDrop({
  children,
  onChange,
  name,
  register,
  reference,
  useInput = true,
  isActive = true,
}: DragAndDropProps) {
  const [files, setFiles] = useState<FileType[] | File[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isActive) {
      const newFiles = [...e.dataTransfer.files];
      setFiles(newFiles);
      if (onChange) onChange(newFiles);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      //   style={{
      //     border: "2px dashed #ccc",
      //     height: "200px",
      //     textAlign: "center",
      //   }}
    >
      {children}
      {useInput && register && name && (
        <input
          type="file"
          {...register(name)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files ? Array.from(e.target.files) : [];
            setFiles(files);
            if (onChange) {
              onChange(files);
            }
          }}
          ref={reference}
          style={{ display: "none" }}
          placeholder="fileInput"
        />
      )}
    </div>
  );
}

export default DragAndDrop;
