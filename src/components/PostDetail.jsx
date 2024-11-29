import React from "react";
import { useParams, Link } from "react-router-dom";

const PostDetail = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) return <p>Post not found</p>;

  const relatedPosts = posts.filter((p) => p.id !== id).slice(0, 3);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose dark:prose-dark"></div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Related Posts</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {relatedPosts.map((relatedPost) => (
            <li key={relatedPost.id}>
              <Link to={`/post/${relatedPost.id}`} className="block p-4 bg-gray-100 rounded-lg shadow">
                {relatedPost.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostDetail;
