import React from "react";

const Hero = () => {
  return (
    <section className="bg-blue-500 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MyBlog</h1>
        <p className="text-lg mb-6">
          Explore the latest articles, news, and insights in one place.
        </p>
        <a
          href="#posts"
          className="bg-white text-blue-500 px-6 py-2 rounded-full shadow-lg hover:bg-gray-100"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
