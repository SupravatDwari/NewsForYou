import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [logoPath, setLogoPath] = useState("");
  const [feedCategory, setFeedCategory] = useState("");
  const [feedAgency, setFeedAgency] = useState("");
  const [feedUrl, setFeedUrl] = useState("");

  const isAdmin = () => {
    const cookies = document.cookie.split(";");
    const adminCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("isAdmin=")
    );
    return adminCookie && adminCookie.split("=")[1] === "true";
  };

  useEffect(() => {
    if (!isAdmin()) {
      window.location.href = "/login";
    }

    // Fetch categories and agencies
    axios
      .get("https://localhost:7235/api/category")
      .then((response) => setCategories(response.data.result))
      .catch(() => alert("Error while fetching categories."));

    axios
      .get("https://localhost:7235/api/agency")
      .then((response) => setAgencies(response.data.result))
      .catch(() => alert("Error while fetching agencies."));
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      alert("Enter all value to proceed");
      return;
    }

    axios
      .post("https://localhost:7235/api/category", { title: categoryName.trim() })
      .then(() => alert("Category added"))
      .catch(() => alert("Error while adding category."));
  };

  const handleAddAgency = (e) => {
    e.preventDefault();
    if (!agencyName.trim() || !logoPath.trim()) {
      alert("Enter all value to proceed");
      return;
    }

    axios
      .post("https://localhost:7235//api/agency", {
        name: agencyName.trim(),
        logopath: logoPath.trim(),
      })
      .then(() => alert("Agency added"))
      .catch(() => alert("Error while adding agency."));
  };

  const handleAddAgencyFeed = (e) => {
    e.preventDefault();
    if (!feedCategory.trim()) {
      alert("Enter all value to proceed");
      return;
    }

    const payload = {
      agencyId: parseInt(feedAgency),
      categoryId: parseInt(feedCategory),
      agencyFeedUrl: feedUrl.trim(),
    };

    axios
      .post("https://localhost:7235/api/addagencyfeed", payload)
      .then(() => alert("Feed link added"))
      .catch(() => alert("Error while adding feed link."));
  };

  const handleDeleteAll = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete all data?")) {
      axios
        .delete("/api/news")
        .then(() => alert("Done"))
        .catch(() => alert("Error while deleting data."));
    }
  };

  return (
    <div className="container" style={{ marginTop: "10px" }}>
      <div className="accordion" id="accordionExample">
        {/* Add Category */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne">
              Add Category
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show">
            <div className="accordion-body">
              <form onSubmit={handleAddCategory}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <button type="submit" className="btn btn-primary mt-2">
                  Add Category
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Add Agency */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo">
              Add Agency
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse">
            <div className="accordion-body">
              <form onSubmit={handleAddAgency}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Agency"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="LogoPath"
                  value={logoPath}
                  onChange={(e) => setLogoPath(e.target.value)}
                />
                <button type="submit" className="btn btn-primary mt-2">
                  Add Agency
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Add Agency Feed */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree">
              Add Agency to Rss Feed
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse">
            <div className="accordion-body">
              <form onSubmit={handleAddAgencyFeed}>
                <select
                  className="form-select"
                  value={feedCategory}
                  onChange={(e) => setFeedCategory(e.target.value)}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select"
                  value={feedAgency}
                  onChange={(e) => setFeedAgency(e.target.value)}>
                  {agencies.map((agency) => (
                    <option key={agency.id} value={agency.id}>
                      {agency.agencyName}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Url"
                  value={feedUrl}
                  onChange={(e) => setFeedUrl(e.target.value)}
                />
                <button type="submit" className="btn btn-primary mt-2">
                  Add Rss Feed
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Delete All Data */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour">
              Delete All Data
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse">
            <div className="accordion-body">
              <form onSubmit={handleDeleteAll}>
                <button type="submit" className="btn btn-danger">
                  Delete All News
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
