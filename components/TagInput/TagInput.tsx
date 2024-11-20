"use client";
import React, {
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
type OnChange = (value: string[]) => void;
type onFetchSuggestions = (query: string) => void;
const TagInput = ({
  value,
  onChange,
  styleName,
  showInput,
  className,
  suggestions = [],
  onFetchSuggestions,
  isActive,
  onActivate,
  disabled,
}: {
  value?: string[];
  onChange?: OnChange;
  styleName: string;
  showInput: boolean;
  className?: string | null;
  suggestions?: string[];
  onFetchSuggestions?: onFetchSuggestions;
  isActive?: boolean;
  onActivate?: () => void;
  disabled?: boolean;
}) => {
  const finalClassName = className || "";
  const [tags, setTags] = useState<string[]>([]);
  const textRef = useRef<HTMLInputElement>(null);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const addTags = (event: KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (event.key === "Enter" || event.key === ",") {
      if (textRef.current) {
        let value = textRef.current.value;
        if ((event.key = ",")) {
          value = value.replaceAll(",", "");
        }
        value = value.trim();
        if (value !== "") {
          let currentValue = [...tags];
          currentValue = [...currentValue, value];
          setTags(currentValue);
          if (onChange) {
            onChange(currentValue);
          }
          textRef.current.value = "";
        }
      }
    }
    return false;
  };
  // Filter suggestions to exclude already selected tags
  const getFilteredSuggestions = (
    suggestions: string[],
    selectedTags: string[]
  ) => {
    return suggestions.filter(
      (suggestion) => !selectedTags.includes(suggestion)
    );
  };
  const handleInputChange = () => {
    if (textRef.current && onFetchSuggestions && isActive) {
      const query = textRef.current.value.trim();
      onFetchSuggestions(query);
    }
  };
  const removeTags = (index: number) => {
    const tagSet = [...tags.filter((tag) => tags.indexOf(tag) !== index)];
    setTags(tagSet);
    if (onChange) {
      onChange(tagSet);
    }
  };
  useEffect(() => {
    if (value) {
      setTags([...value]);
    } else {
      setTags([])
    }
  }, [value]);
  useEffect(() => {
    if (suggestions) {
      setFilteredSuggestions(getFilteredSuggestions(suggestions, tags));
    }
  }, [tags]);
  return (
    <div className={styleName}>

      {showInput && (
        <div style={{ position: "relative" }}>
          <textarea
            type="text"
            // @ts-ignore
            ref={textRef} id="textareafld_tag"
            // highlight-next-line

            onKeyUp={(event: any) => addTags(event)}
            onChange={handleInputChange}
            placeholder={disabled ? "" : "Enter Work Keywords"}
            onFocus={onActivate}
            disabled={disabled}
          ></textarea>
          <ul className=" tag_box_outer">
            {tags.map((tag, index) => (
              <li
                key={index}
              // style={{
              //   overflow: "hidden",
              //   whiteSpace: "nowrap",
              //   borderRadius: "15px",
              //   backgroundColor: "#9d9c9c",
              //   fontSize: "85%",
              //   padding: "5px 8px 5px 10px",
              //   boxSizing: "border-box",
              //   color: "white",
              //   margin: "3px",
              //   cursor: "default",
              // }}
              >
                <span> {tag}</span>
                {!disabled &&
                  <span
                    // style={{
                    //   marginLeft: "8px",
                    //   marginRight: "5px",
                    //   height: "20px",
                    //   padding: "3px",
                    //   fontWeight: "bold",
                    //   width: "10px",
                    //   cursor: "pointer",
                    //   borderRadius: "50%",
                    //   backgroundColor: "#767676",
                    // }}
                    onClick={() => removeTags(index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path d="M12.3594 11.3598C12.2324 11.4867 12.0661 11.5502 11.8998 11.5502C11.7335 11.5502 11.5672 11.4867 11.4402 11.3598L7.99981 7.91933L4.55938 11.3598C4.43242 11.4867 4.26612 11.5502 4.09981 11.5502C3.9335 11.5502 3.76719 11.4867 3.64024 11.3598C3.38633 11.1059 3.38633 10.6945 3.64024 10.4406L7.08067 7.00019L3.64024 3.55976C3.38633 3.30586 3.38633 2.89453 3.64024 2.64062C3.89383 2.38672 4.30579 2.38672 4.55938 2.64062L7.99981 6.08105L11.4402 2.64062C11.6938 2.38672 12.1058 2.38672 12.3594 2.64062C12.6133 2.89453 12.6133 3.30586 12.3594 3.55976L8.91895 7.00019L12.3594 10.4406C12.6133 10.6945 12.6133 11.1059 12.3594 11.3598Z" fill="white" />
                    </svg>
                  </span>
                }
              </li>
            ))}
          </ul>
          {isActive && filteredSuggestions.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%",
                zIndex: 1000,
              }}
            >
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  style={{
                    padding: "5px",
                    cursor: "pointer",
                    color: "black",
                  }}
                  onClick={() => {
                    setTags([...tags, suggestion]);
                    if (onChange) {
                      onChange([...tags, suggestion]);
                    }
                    textRef.current!.value = "";
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
export default TagInput;
