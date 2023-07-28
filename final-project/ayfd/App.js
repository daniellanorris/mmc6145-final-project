import React from "react";

import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages"

import '../public/styles/global.css'

function App() {
  return (
    <div className="myRoot">
      <div className="bg">
      <Header />
          <Home />
      <Footer />
    </div>
  </div>
  );
}

export default App;