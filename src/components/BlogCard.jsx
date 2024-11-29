import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ id, title, contentSnippet, category }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
        {contentSnippet}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-blue-500">{category || "Uncategorized"}</span>
        <Link
          to={`/post/${id}`}
          className="text-blue-500 dark:text-blue-300 font-semibold hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
