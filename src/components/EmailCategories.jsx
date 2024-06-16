import React from "react";

const EmailCategories = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ["All", "Important", "Promotions", "Social", "Marketing", "Spam", "General"];

  return (
    <div className="grid md:grid-cols-7 grid-cols-3 gap-4 my-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === category
              ? "bg-purple-500 text-white"
              : "bg-transparent border rounded-md"
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default EmailCategories;
