import {Link} from 'react-router-dom'

import './index.css'

import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="home-heading-text">Find The Job That Fits Your Life</h1>
      <br />
      <img
        src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
        className="home-image"
        alt="home"
      />
      <p className="home-description-text">
        Millions of people are searching for jobs
      </p>
      <Link to="/jobs">
        <button className="find-jobs-button" type="button">
          Find Jobs dsds
        </button>
      </Link>
    </div>
  </>
)

export default Home
