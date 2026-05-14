import React from "react";
import Navbar from "./Navbar";
import "../styles/News.css";

function News() {
  const videos = [
    {
      title: "IPL Highlights",
      videoId: "zj6m42ucthc"   // change anytime
    },
    {
      title: "India vs Australia Highlights",
      videoId: "Kwu1yIC-ssg"
    },
    {
      title: "Virat Kohli Interview",
      videoId: "OlbKEMJS2ds"
    },
    {
      title: "IPL Highlights",
      videoId: "nA9ALV2YzD8"   // change anytime
    },
    {
      title: "RCB Podcast",
      videoId: "Jqo1BM0TfBY"
    },
    {
      title: "Inside the den ft. Preity G Zinta ",
      videoId: "nsj3N1zG0ro"
    }
    
  ];

  return (
    <>
      <Navbar />

      <div className="news-container">
        <h1>📰 Cricket News & Videos</h1>

        <div className="video-grid">
          {videos.map((v, i) => (
            <div
              key={i}
              className="video-card"
              onClick={() =>
                window.open(`https://www.youtube.com/watch?v=${v.videoId}`, "_blank")
              }
            >
              <img
                src={`https://img.youtube.com/vi/${v.videoId}/0.jpg`}
                alt={v.title}
              />
              <p>{v.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default News;