import React from "react";

const FileDownload = () => {
  const downloadFile = async () => {
    try {
      const response = await fetch("https://localhost:7235/api/FileDownload", {
        method: "POST",
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "export.csv";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Error downloading file");
      }
    } catch (error) {
      alert("Error downloading file");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <p>Download File:</p>
      <button onClick={downloadFile}>Download CSV</button>
    </div>
  );
};

export default FileDownload;
