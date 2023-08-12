import React from "react";

import styles from '../public/styles/headerfooter.module.css'
import useLogout from '../hooks/useLogout'

export default function Header() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#" style={{ color: "white" }}> </a>
        <div>
          <img href="/" width="100" height="100" src="/LOGO-white.png" className={styles.autoheightimg} alt="logo" style={{padding: "10px"}}/>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/favorites">Favorites </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/login" onClick={useLogout}> Logout </a>
            </li>
          </ul>
          {/* Links for the toggler icon */}
          <ul class="navbar-nav ml-auto">
          </ul>
        </div>
      </nav>
      <div>
      </div>
    </>
  )
}