import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AgencyList = () => {
  const [papers, setPapers] = useState([]); // All newspapers
  const navigate = useNavigate();

  useEffect(() => {
    fetchPapers();
  }, []);

  // Fetch list of newspapers directly using the full API URL
  const fetchPapers = async () => {
    try {
      const response = await axios.get("https://localhost:7235/api/agency");  // Full URL for the API
      setPapers(response.data.result || []);
    } catch (error) {
      console.error("Error fetching newspapers", error);
    }
  };

  // Handle newspaper selection
  const handleNewspaperSelection = (id) => {
    // Navigate to the NewsFeedPage with the selected newspaper ID
    navigate(`/NewsFeed/${id}`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <h3>Newspapers</h3>
        {papers.length > 0 &&
          papers.map((paper) => (
            <div className="col-md-3" key={paper.agencyId}>
              <div
                className="card text-center"
                onClick={() => handleNewspaperSelection(paper.agencyId)}
              >
                {/* Logo above the name */}
                <img
                  src={paper.agencyLogopath} // Using the path from the public directory
                  className="card-img-top"
                  alt={paper.agencyName}
                />
                <div className="card-body">
                  <h5 className="card-title">{paper.agencyName}</h5>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AgencyList;
