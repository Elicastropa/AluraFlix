import React, { useState, useEffect } from "react";
import "./Video.css";
import Card from "../Card/Card";
import EditCardModal from "../Modal/EditCardModal";
import NewVideoModal  from "../Video/NewVideo";

const Video = ({ equipoNombre, color }) => {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showNewVideoModal, setShowNewVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/videos")
      .then((response) => response.json())
      .then((data) =>
        setVideos(data.filter((video) => video.equipo === equipoNombre))
      )
      .catch((error) => console.error("Error fetching videos:", error));
  }, [equipoNombre]);

  const handleEdit = (video) => {
    setCurrentVideo(video);
    setShowModal(true);
  };

  const handleSaveModal = (formData) => {
    const updatedVideos = videos.map((video) =>
      video.id === formData.id
        ? {
            ...video,
            ...formData,
            nombre: formData.nombre,
            equipo: formData.equipo,
            enlace: formData.enlace,
          }
        : video
    );
    setVideos(updatedVideos);
    setShowModal(false);
  };

  const handleUpdateVideo = (updatedVideo) => {
    const updatedVideos = videos.map((video) =>
      video.id === updatedVideo.id ? updatedVideo : video
    );
    setVideos(updatedVideos);
  };

  const handleSaveNewVideo = (formData) => {
    const newVideo = {
      ...formData,
      nombre: formData.nombre,
      equipo: formData.equipo,
      enlace: formData.enlace,
    };

    fetch("http://localhost:3000/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedVideos = [...videos, data];
        setVideos(updatedVideos);
      })
      .catch((error) => console.error("Error adding video:", error));

    setShowNewVideoModal(false);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/videos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedVideos = videos.filter((video) => video.id !== id);
        setVideos(updatedVideos);
      })
      .catch((error) => console.error("Error deleting video:", error));
  };

  return (
    <div className="videos-list" style={{ borderColor: color }}>
      {videos.map((video) => (
        <Card
          key={video.id}
          video={video}
          onDelete={() => handleDelete(video.id)}
          onUpdate={handleUpdateVideo}
        />
      ))}
      {currentVideo && (
        <EditCardModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSaveModal}
          video={currentVideo}
        />
      )}

      <NewVideoModal
        show={showNewVideoModal}
        handleClose={() => setShowNewVideoModal(false)}
        handleSave={handleSaveNewVideo}
      />
    </div>
  );
};

export default Video;
