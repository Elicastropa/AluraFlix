import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Banner from "./Components/Banner/Banner";
import Categorias from "./Components/Categorias/Categorias";
import NewVideoModal from "./Components/Video/NewVideo";
import Card from "./Components/Card/Card"; 
function App() {
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState("home");
  const [videos, setVideos] = useState([]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleSave = (data) => {
    console.log("Datos guardados:", data);
    const newVideo = {
      ...data,
     
    };
    setVideos([...videos, newVideo]);
  };

  const handleHomeClick = () => setView("home");

  const handleDelete = (id) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  return (
    <Router>
      <Navbar onNewVideoClick={handleShow} onHomeClick={handleHomeClick} />
      {view === "home" && (
        <>
          <Banner />
          <Categorias />
          <div className="video-list">
            {videos.map(video => (
              <Card key={video.id} video={video} onDelete={handleDelete} />
            ))}
          </div>
        </>
      )}
      <Footer />
      <NewVideoModal
        show={showModal}
        handleClose={handleClose}
        handleSave={handleSave}
      />
    </Router>
  );
}

export default App;
