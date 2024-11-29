import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Parser from "rss-parser";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import BlogList from "./components/BlogList";
import PostDetail from "./components/PostDetail";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import Pagination from "./components/Pagination";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const parser = new Parser();
        const response = await axios.get(
          "https://<your-blog-name>.blogspot.com/feeds/posts/default?alt=rss"
        );
        const feed = await parser.parseString(response.data);
        const parsedPosts = feed.items.map((item, index) => ({
          id: index.toString(),
          title: item.title,
          contentSnippet: item.contentSnippet,
          content: item.content,
          category: item.categories?.[0] || "Uncategorized",
          link: item.link,
        }));

        setPosts(parsedPosts);
        setCategories([
          "All",
          ...new Set(parsedPosts.map((post) => post.category)),
        ]);
        setFilteredPosts(parsedPosts);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on category and search term
  useEffect(() => {
    const results = posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.contentSnippet.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredPosts(results);
    setCurrentPage(1); // Reset to page 1 after filtering
  }, [selectedCategory, searchTerm, posts]);

  // Paginate posts
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <div className="container mx-auto px-4 py-6">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
                <BlogList posts={currentPosts} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setPage={setCurrentPage}
                />
              </div>
            </>
          }
        />
        <Route path="/post/:id" element={<PostDetail posts={posts} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
