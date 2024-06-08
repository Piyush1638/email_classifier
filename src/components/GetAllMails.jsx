"use client";
import React, { useState, useEffect } from "react";
import { BiSolidUpArrowCircle } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import Emails from "./Emails";
import Loading from "./Loading"

const MODEL_NAME = "gemini-1.0-pro";

const GetAllMails = ({ accessToken }) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [rangeValue, setRangeValue] = useState(10); // Set initial value to 10

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=${rangeValue}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        const emailDetails = await Promise.all(
          data.messages.map(async (message) => {
            const messageResponse = await fetch(
              `https://www.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            const messageData = await messageResponse.json();
            return messageData;
          })
        );

        setEmails(emailDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching emails:", error);
        setLoading(false);
      }
    };

    fetchEmails();
  }, [accessToken, rangeValue]);

  const classifyEmails = async () => {
    try {
      setLoading(true);
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const classifiedEmails = await Promise.all(
        emails.map(async (email) => {
          const prompt = `
          Classify the following email into one of these categories: 
          Important: Emails that are personal or work-related and require immediate attention.
          Promotions: Emails related to sales, discounts, and marketing campaigns.
          Social: Emails from social networks, friends, and family.
          Marketing: Emails related to marketing, newsletters, and notifications.
          Spam: Unwanted or unsolicited emails.
          General: If none of the above are matched, use General

          Email:
          From: ${
            email.payload.headers.find((header) => header.name === "From").value
          }
          Subject: ${
            email.payload.headers.find((header) => header.name === "Subject")
              .value
          }
          Message: ${email.snippet}
          
          Category:`;

          const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          };

          const safetySettings = [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
          ];

          const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          });

          const result = await chat.sendMessage(prompt);
          const response = result.response;
          const category = await response.text();

          return { ...email, category: category.trim() }; // Add category to the email object
        })
      );

      setEmails(classifiedEmails);
      setLoading(false);
    } catch (error) {
      console.error("Error classifying emails:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <input
          type="range"
          id="number"
          value={rangeValue} // Bind value to state variable
          max="100"
          min="1"
          className="w-full"
          onChange={(e) => setRangeValue(e.target.value)} // Update state on change
        />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-4 w-full">
          <p className="w-full">
            Selected value:
            <span className="text-purple-500 font-bold">{rangeValue}</span>
          </p>
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
            <div className="md:w-3/5 w-full px-4 py-2 border border-slate-500 rounded-md flex items-center gap-2">
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
                  className="bg-transparent text-white outline-none w-full text-sm md:text-base"
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
      </div>
      <ul>
        {emails.map((email) => (
          <Emails
            key={email.id}
            id={email.id}
            from={
              email.payload.headers.find((header) => header.name === "From")
                .value
            }
            subject={
              email.payload.headers.find((header) => header.name === "Subject")
                .value
            }
            message={email.snippet}
            category={email.category} // Pass category to the Emails component
          />
        ))}
      </ul>
    </div>
  );
};

export default GetAllMails;
