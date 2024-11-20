import React, { ChangeEvent, useEffect, useRef, useState } from "react";

function FileInput({
  onChange,
  isReset,
  fileReset,
  dataCapture,
}: {
  onChange: (...event: any[]) => void;
  isReset?: boolean;
  fileReset?: boolean;
  dataCapture?: (...value: any[]) => void;
}) {
  const [files, setFiles] = useState<File[] | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (isReset) {
      setFiles(null);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  }, [isReset, fileReset]);
  useEffect(() => {
    if (fileRef.current && dataCapture) {
      dataCapture(fileRef.current);
    }
  }, [fileRef.current]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const filesArray = Array.from(e.target.files);
      setFiles([...filesArray]);
      onChange(e.target.files);
    }
  };
  return (
    <>
      <input
        className="file-input"
        type="file"
        onChange={handleChange}
        ref={fileRef}
      />
      {files &&
        files.map((file, idx) => (
          <span key={idx} className="pt-2">
            {file.name}
          </span>
        ))}
    </>
  );
}

export default FileInput;
