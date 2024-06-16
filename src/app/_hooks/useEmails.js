import { useState, useEffect } from "react";

const useEmails = (accessToken, rangeValue) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return { emails, loading, setEmails, setLoading };
};

export default useEmails;
