import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewsFeed = () => {
  const [papers, setPapers] = useState([]);
  const [newsData, setNewsData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch navbar content dynamically (if needed)
    loadNavbar();

    // Fetch data from the 'agency' endpoint
    makeGetRequest("agency", null, populatePaper, handleError);

    // Fetch categories based on newsId if session storage contains it
    const newsId = sessionStorage.getItem("newsId");
    if (!newsId) {
      navigate("/NewsFeed"); // Redirect if no newsId in session
    }
    const payload = { id: parseInt(newsId) };
    fetchAllData(payload);
    makeGetRequest(
      "GetCategoriesFromAgencyId",
      payload,
      populateSidebar,
      handleError
    );
  }, []);

  const loadNavbar = () => {
    const navbarElement = document.getElementById("navbar");
    if (navbarElement) {
      navbarElement.innerHTML = `
        <nav>
          <!-- Include Navbar content here or use React routing -->
          Navbar Placeholder
        </nav>
      `;
    }
  };

  const makeGetRequest = async (url, params, onSuccess, onError) => {
    try {
      const response = await axios.get(url, { params });
      onSuccess(response.data);
    } catch (error) {
      onError(error);
    }
  };

  const makePostRequest = async (url, data, onSuccess, onError) => {
    try {
      const response = await axios.post(url, data);
      onSuccess(response.data);
    } catch (error) {
      onError(error);
    }
  };

  const populatePaper = (data) => {
    setPapers(data.result || []);
  };

  const handleError = (error) => {
    console.error("Error while making the AJAX call.", error);
  };

  const setId = (id) => {
    sessionStorage.setItem("newsId", parseInt(id));
    window.location.pathname = "/Index.html";
  };

  const fetchAllData = (payload) => {
    makeGetRequest(
      "news",
      { id: parseInt(sessionStorage.getItem("newsId")) },
      displayAllNews,
      handleError
    );
  };

  const displayAllNews = (data) => {
    setNewsData(data.allnews || []);
  };

  const populateSidebar = (data) => {
    const checkboxes = data.category.map((item) => (
      <div className="left-panel" key={item.id}>
        <input
          type="checkbox"
          className="form-check-input checkbox mt-0"
          id={item.id}
          value={item.title}
          onClick={handleCheckboxClick}
        />
        <label className="checkbox-label" htmlFor={item.title}>
          {item.title}
        </label>
      </div>
    ));

    const sidebarElement = document.getElementById("multiselect");
    if (sidebarElement) {
      sidebarElement.innerHTML = "";
      sidebarElement.append(...checkboxes);
    }
  };

  const handleCheckboxClick = () => {
    const checkboxArray = [];
    document.querySelectorAll(".checkbox").forEach((checkbox) => {
      if (checkbox.checked) {
        checkboxArray.push(parseInt(checkbox.id));
      }
    });
    const payload = {
      categories: checkboxArray,
      id: sessionStorage.getItem("newsId"),
    };
    if (checkboxArray.length === 0) {
      fetchAllData();
    } else {
      makePostRequest(
        "getnewsbycategories",
        payload,
        displayAllNews,
        handleError
      );
    }
  };

  const getUrl = (url) => {
    if (!url) return null;
    const tempElement = document.createElement("div");
    tempElement.innerHTML = url;
    let src = null;
    try {
      src = tempElement?.firstChild?.getAttribute("src");
    } catch (err) {}
    return src;
  };

  const readIt = (e, link) => {
    makeGetRequest(
      "incrementnewsclickcount",
      { id: parseInt(e.id) },
      null,
      handleError
    );
    window.location.href = link;
  };

  return (
    <>
      <div id="navbar"></div>
      <div className="mt-5" id="allPaper">
        {papers.length > 0 &&
          papers.map((element, index) => {
            if (index % 3 === 0) {
              const rowItems = papers.slice(index, index + 3);
              return (
                <div className="row row-eq-height" key={index}>
                  {rowItems.map((item) => (
                    <div className="col-md-4 mb-3 d-flex" key={item.id}>
                      <div className="card flex-fill" style={{ width: "30%" }}>
                        <img
                          src={item.logopath}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body d-flex flex-column">
                          <button
                            id={item.id}
                            onClick={() => setId(item.id)}
                            className="btn btn-primary mt-auto">
                            {item.name}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })}
      </div>

      <div id="news">
        {newsData.length > 0 &&
          newsData.map((element) => (
            <div className="row" key={element.newsId}>
              <div className="col-md-4 mb-3 d-flex">
                <div className="card flex-fill">
                  {getUrl(element.newsDescription) && (
                    <img
                      src={getUrl(element.newsDescription)}
                      className="card-img-top"
                      alt="..."
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{element.newsTitle}</h5>
                    <p className="card-text">
                      {new Date(element.newsPublishDateTime)
                        .toISOString()
                        .slice(0, 10)}
                    </p>
                    <button
                      id={element.newsId}
                      onClick={(e) => readIt(e, element.newsLink)}
                      className="btn btn-primary mt-auto">
                      Read it
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default NewsFeed;
