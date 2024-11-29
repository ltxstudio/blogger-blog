import React from "react";
import BlogCard from "./BlogCard";

const BlogList = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400">
        No posts found. Try searching or filtering by category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          id={post.id}
          title={post.title}
          contentSnippet={post.contentSnippet}
          category={post.category}
        />
      ))}
    </div>
  );
};

export default BlogList;
