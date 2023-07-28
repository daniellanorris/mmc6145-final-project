import React from "react";

import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages"

import '../public/styles/global.css'

function App() {
  return (
    <>
      <Header />
          <Home />
      <Footer />
      </>

  );
}

export default App;