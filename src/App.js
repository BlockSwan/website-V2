import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import Ideas from "./pages/Ideas/Ideas";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import Privacy from "./pages/Privacy/Privacy";
import Terms from "./pages/Terms/Terms";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Crypto from "./pages/Crypto/Crypto";
import Asset from "./pages/Crypto/Asset/Asset";
import Admin from "./pages/Admin/Admin";
import Learn from "./pages/Learn/Learn";
import Login from "./pages/Login/Login";
import Post from "./pages/Ideas/Post/Post";
import ViewValue from "./pages/Ideas/Value/ValueStep/ViewValue/ViewValue";
import Metrics from "./pages/Metrics/Metrics";
import { useState } from "react";

function App() {
  const [isWhite, setIsWhite] = useState(false);
  const handleTheme = () => setIsWhite(!isWhite);
  return (
    <BrowserRouter>
      <div>
        <Header onToggle={handleTheme} />
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/metrics" element={<Metrics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:user" element={<Profile />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/ideas/:valueIdeaId" element={<ViewValue />} />

          <Route path="/ideas/post" element={<Post type={1} />} />
          <Route path="/ideas/post/helpful-hints" element={<Post type={1} />} />
          <Route
            path="/ideas/post/helpful-hints/my-idea"
            element={<Post type={1} />}
          />
          <Route path="/ideas/aidrops" element={<Ideas />} />
          <Route path="/ideas/trades" element={<Ideas />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/crypto" element={<Crypto />} />
          <Route path="/crypto/:asset" element={<Asset />}>
            <Route path="/crypto/:asset/chart" element={<Asset />} />
            <Route path="/crypto/:asset/market" element={<Asset />} />
            <Route path="/crypto/:asset/token" element={<Asset />} />
            <Route path="/crypto/:asset/links" element={<Asset />} />
          </Route>
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:term" element={<Learn />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
