import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";

const saveApiKeyToLocalStorage = (key) => {
  localStorage.setItem("apiKey", key);
};

const classifyEmails = async (emails, apiKey, setEmails, setLoading, setClassified) => {
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

        return { ...email, category: category.trim() };
      })
    );

    setEmails(classifiedEmails);
    setClassified(true);
    setLoading(false);
    saveApiKeyToLocalStorage(apiKey);
  } catch (error) {
    console.error("Error classifying emails:", error);
    setLoading(false);

    if (error.message.includes("[429]")) {
      alert("API quota exhausted. Please try again later.");
    }
  }
};

export { classifyEmails, saveApiKeyToLocalStorage };
