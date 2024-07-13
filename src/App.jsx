import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import Banner from './Components/Banner/Banner';
import Categorias from './Components/Categorias/Categorias';
import NewVideoModal from './Components/Video/NewVideo';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState('home');
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleHomeClick = () => setView('home');

   return (
    <Router>
      <Navbar onNewVideoClick={handleShow} onHomeClick={handleHomeClick} />
      {view === 'home' && (
        <>
          <Banner />
          <Categorias />
        </>
      )}
      <Footer />
      <NewVideoModal show={showModal} handleClose={handleClose} />
    </Router>
  );
}

export default App;
