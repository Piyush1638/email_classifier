import React from "react";
import Link from "next/link";

const Emails = ({ id, from, subject, message, category }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case "Important":
        return "text-green-500";
      case "Promotions":
        return "text-blue-500";
      case "Social":
        return "text-yellow-500";
      case "Marketing":
        return "text-yellow-800";
      case "Spam":
        return "text-red-500";
      case "General":
        return "text-gray-500";
      default:
        return "text-white";
    }
  };

  return (
    <li className="border border-gray-500 my-10 p-4 rounded-md relative">
      <Link
        href={`https://mail.google.com/mail/u/0/#inbox/${id}`}
        target="_blank"
        className=""
      >
        <p className="text-purple-500 text-sm md:text-base my-3">From: {from}</p>
        <p>
          Subject: <span className="text-gray-400">{subject}</span>
        </p>
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold">Message:</p>{" "}
          <p className="text-gray-300">{message}</p>
        </div>
        <p
          className={`${getCategoryColor(
            category
          )} absolute -top-3 bg-black right-0 md:right-10 px-2 py-1 border rounded-md text-xs md:text-base w-[7rem] text-center ${category ? "inline-block" : "hidden"}`}
        >
          {category}
        </p>
      </Link>
    </li>
  );
};

export default Emails;
