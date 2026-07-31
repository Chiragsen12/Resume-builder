import { useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import { ResumeProvider } from './Context';
import './App.css';
import Header from './components/Layouts/Header';
import Navbar from './components/Layouts/Navbar';
import Footer from './components/Layouts/Footer';
import Main from './components/Main';
import WebFont from 'webfontloader';
import LayoutPage from './components/NewLayouts/LayoutPage';
import AdminPage from './Adminpage';
import LoginPage from './Loginpage';
import Register from "./Register";

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Pacifico', 'Poppins']
      }
    });
  }, []);

  return (
    <>
      <ResumeProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Register/>} /> 
          <Route path="/Loginpage" element={<LoginPage />} />
          <Route path="builder" element={<Main />} />
          <Route path="about" element={<>About (Resume Builder Project):

This project is a web-based resume builder that helps users create professional resumes quickly and easily. 
It offers multiple layout options, real-time preview, and the ability to download resumes as PDFs. 
The frontend is built using React.js and Chakra UI for a modern and responsive design. 
The backend is powered by Node.js, Express.js, and MongoDB, with JWT-based authentication to securely manage user sessions.
 The project aims to simplify the resume creation process for job seekers and students.</>} />
          <Route path="LayoutPage" element={<LayoutPage />} />
          <Route path="admin" element={<AdminPage />} /> {/* Add route for AdminPage */}
          <Route path="/Header" element={<Header />} />{/* Add route for LoginPage */}
        </Routes>
        <Footer />
      </ResumeProvider>
    </>

  );
}

export default App;
