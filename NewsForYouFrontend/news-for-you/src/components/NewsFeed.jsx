import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NewsFeed = () => {
  const { newspaperId } = useParams(); // Get newspaper ID from the URL params
  const [categories, setCategories] = useState([]); // Categories for the selected newspaper
  const [selectedCategories, setSelectedCategories] = useState([]); // Categories selected by the user
  const [newsData, setNewsData] = useState([]); // News articles based on selected categories

  useEffect(() => {
    // Fetch categories for the selected newspaper
    if (newspaperId) {
      fetchCategories(newspaperId);
    }

    // Load selected categories from localStorage and fetch news immediately
    const savedCategories = JSON.parse(localStorage.getItem("selectedCategories"));
    if (savedCategories) {
      setSelectedCategories(savedCategories);
    }
  }, [newspaperId]);

  useEffect(() => {
    // Fetch news whenever selectedCategories changes (including on initial load)
    fetchNews();
  }, [selectedCategories]); // Dependency is selectedCategories

  // Fetch categories for the selected newspaper
  const fetchCategories = async (newspaperId) => {
    try {
      const response = await axios.get("https://localhost:7235/api/GetCategoriesFromAgencyId", {
        params: { id: newspaperId },
      });
      setCategories(response.data.category || []);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  // Fetch news based on selected categories directly using the full API URL
  const fetchNews = async () => {
    if (selectedCategories.length === 0) {
      // If no categories are selected, fetch all news using the "news" endpoint
      try {
        const response = await axios.get("https://localhost:7235/api/news", {
          params: { id: newspaperId }, // Make sure to pass the newspaperId here
        });
        setNewsData(response.data.allnews || []);
      } catch (error) {
        console.error("Error fetching all news", error);
      }
    } else {
      // If categories are selected, fetch news based on selected categories
      try {
        const response = await axios.post("https://localhost:7235/api/getnewsbycategories", {
          categories: selectedCategories,
          id: newspaperId,
        });
        setNewsData(response.data.allnews || []);
      } catch (error) {
        console.error("Error fetching news", error);
      }
    }
  };

  // Handle category click and fetch news immediately
  const handleCategoryClick = (categoryId) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedCategories);

    // Save the selected categories to localStorage
    localStorage.setItem("selectedCategories", JSON.stringify(updatedCategories));
  };

  useEffect(() => {
    // Set interval to fetch news every minute (60000ms) only if categories are selected
    const newsInterval = setInterval(() => {
      fetchNews(); // Fetch news for the selected categories every minute
    }, 60000);

    // Cleanup the interval on component unmount
    return () => clearInterval(newsInterval);
  }, [selectedCategories]); // Only re-run the effect when selectedCategories changes

  return (
    <div className="container mt-3">
      <div className="row">
        {/* Sidebar for Categories */}
        <div className="col-md-3">
          <h5>Select Categories</h5>
          <div className="list-group">
            {categories.length > 0 &&
              categories.map((category) => (
                <div
                  key={category.id}
                  className={`list-group-item clickable-category ${selectedCategories.includes(category.id.toString()) ? "selected" : ""
                    }`}
                  onClick={() => handleCategoryClick(category.id.toString())}
                >
                  <span className="category-title">{category.title}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Main Content for News Articles */}
        <div className="col-md-9">
          {newsData.length > 0 ? (
            newsData.map((news) => (
              <div className="col-md-12 mb-4" key={news.newsId}>
                <div className="card clickable-card">
                  <div className="card-body">
                    {/* Title */}
                    <h6 className="title">{news.newsTitle}</h6>

                    <div className="row">
                      {/* News Description */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: news.newsDescription,
                        }}
                      />

                      {/* Publish Date */}
                      <small className="text-end text-muted">
                        Publish Date: {new Date(news.newsPublishDateTime).toLocaleString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false, // 24-hour format
                        })}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No news available for the selected categories.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
