"use client";
import React, { useState } from "react";
import useEmails from "@/app/_hooks/useEmails";
import ApiKeyInput from "./ApiKeyInput";
import EmailCategories from "./EmailCategories";
import Emails from "./Emails";
import Loading from "./Loading";
import { classifyEmails } from "@/app/_helpers/emailHelpers";

const GetAllMails = ({ accessToken }) => {
  const [apiKey, setApiKey] = useState("");
  const [rangeValue, setRangeValue] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [classified, setClassified] = useState(false);

  const { emails, loading, setEmails, setLoading } = useEmails(accessToken, rangeValue);

  const handleClassifyEmails = () => {
    classifyEmails(emails, apiKey, setEmails, setLoading, setClassified);
  };

  if (loading) {
    return <Loading />;
  }

  const filteredEmails =
    selectedCategory === "All"
      ? emails
      : emails.filter((email) => email.category === selectedCategory);

  return (
    <div className="w-full">
      <div className="w-full">
        <input
          type="range"
          id="number"
          value={rangeValue}
          max="15"
          min="1"
          className="w-full h-2 rounded-full outline-none"
          onChange={(e) => setRangeValue(e.target.value)}
        />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-4 w-full">
          <p className="w-full">
            Selected value:{" "}
            <span className="text-purple-500 font-bold">{rangeValue}</span>
          </p>
          <ApiKeyInput
            apiKey={apiKey}
            setApiKey={setApiKey}
            classifyEmails={handleClassifyEmails}
          />
        </div>
        {classified && (
          <EmailCategories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
      </div>
      <ul>
        {filteredEmails.map((email) => (
          <Emails
            key={email.id}
            id={email.id}
            from={
              email.payload.headers.find((header) => header.name === "From").value
            }
            subject={
              email.payload.headers.find((header) => header.name === "Subject").value
            }
            message={email.snippet}
            category={email.category}
          />
        ))}
      </ul>
    </div>
  );
};

export default GetAllMails;
