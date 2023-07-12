import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)
  
  const setLoadingBar = (progress) => {
    setProgress(progress);
  };

    return (
      <div>
      <Router>
        <LoadingBar
          height={1}
          color='#f11946'
          progress={progress}
        />
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News setProgress={setLoadingBar} apiKey={apiKey} key="general" pageSize={9} country="in" category="general" />} />
          <Route exact path="/entertainment" element={<News setProgress={setLoadingBar} apiKey={apiKey} key="entertainment" pageSize={9} country="in" category="entertainment" />} />
          <Route exact path="/business" element={<News setProgress={setLoadingBar} apiKey={apiKey} key="business" pageSize={20} country="in" category="business" />} />
          <Route exact path="/general" element={<News setProgress={setLoadingBar} apiKey={apiKey} key="general" pageSize={9} country="in" category="general" />} />
          <Route exact path="/health" element={<News setProgress={setLoadingBar} apiKey={apiKey} key="health" pageSize={9} country="in" category="health" />} />
          <Route exact path="/science" element={<News setProgress={setLoadingBar} apiKey={apiKey} key="science" pageSize={9} country="in" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setLoadingBar} apiKey={apiKey} key="sports" pageSize={9} country="in" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setLoadingBar} apiKey={apiKey} key="technology" pageSize={9} country="in" category="technology" />} />
          </Routes>
      </Router>
      </div>
    )
}

export default App