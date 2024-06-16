"use client"
import React, { useState, useEffect } from "react";
import { BiSolidUpArrowCircle } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

const ApiKeyInput = ({ apiKey, setApiKey, classifyEmails }) => {
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  }, [setApiKey]);

  return (
    <div className="md:w-3/5 w-full">
      {!showInput && (
        <div className="w-full text-end">
          <button
            onClick={() => setShowInput(true)}
            className="text-sm font-semibold text-white border border-slate-400 px-4 py-2 rounded-md hover:bg-slate-800 transform ease-in duration-500"
          >
            Classify Emails
          </button>
        </div>
      )}
      {showInput && (
        <div className="w-full px-4 py-2 border border-slate-500 rounded-md flex items-center gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              classifyEmails();
            }}
            className="flex items-center gap-3 w-full"
          >
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="bg-transparent text-white outline-none w-full text-sm"
            />
            <button type="submit">
              <BiSolidUpArrowCircle className="text-3xl" />
            </button>
            <button type="button" onClick={() => setShowInput(false)}>
              <IoMdClose className="text-3xl" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;
