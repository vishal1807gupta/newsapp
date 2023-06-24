import "./App.css";

import React, {useState} from "react";
// import PropTypes from 'prop-types'
import NavBar from "./components/NavBar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import News from "./components/News";

const App =()=>{
  // static propTypes = {
  //   prop: PropTypes
  // }

  // c = "Vishal";

  const pageSize = 15;
  const apiKey = process.env.REACT_APP_NEWS_API;

  const[progress,setprogress] = useState(0);

  const setProgress = (progress)=>{
    setprogress(progress);
  }
    return (
      <>
        {/* Hello my first class based component {this.c} */}
        <Router>
          <NavBar />
          <LoadingBar color="#f11946" height={3} progress={progress}/>
          <Routes>
            <Route
              exact
              path="/"
              element={<News setProgress={setProgress} apiKey = {apiKey} key="general" pageSize={pageSize} country="in" category="general" />}
            />
            <Route
              exact
              path="/business"
              element={<News setProgress={setProgress} apiKey = {apiKey} key="business" pageSize={pageSize} country="in" category="business" />}
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News setProgress={setProgress} apiKey = {apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />
              }
            />
            <Route
              exact
              path="/health"
              element={<News setProgress={setProgress} apiKey = {apiKey} key="health" pageSize={pageSize} country="in" category="health" />}
            />
            <Route
              exact
              path="/science"
              element={<News setProgress={setProgress} apiKey = {apiKey} key="/science" pageSize={pageSize} country="in" category="science" />}
            />
            <Route
              exact
              path="/sports"
              element={<News setProgress={setProgress} apiKey = {apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />}
            />
            <Route
              exact
              path="/technology"
              element={<News setProgress={setProgress} apiKey = {apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />}
            />
          </Routes>
        </Router>
      </>
    );
  
}

export default App;
