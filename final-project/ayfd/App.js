import React from "react";

import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages"

import './index.css'

function App() {
  return (
    <div className="myRoot">
      <Header />
          <Home />
      <Footer />
    </div>
  );
}

export default App;