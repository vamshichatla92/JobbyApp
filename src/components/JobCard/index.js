import {AiFillStar} from 'react-icons/ai'

import {IoLocationSharp} from 'react-icons/io5'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import './index.css' // Import your CSS file

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <>
      <Link to={`/jobs/${id}`}>
        <div className="job-card">
          <img
            src={companyLogoUrl}
            alt="company Logo"
            className="company-logo-image"
          />
          <h1 className="job-title">{title}</h1>
          <div className="rating">
            <AiFillStar className="star" />
            <span className="rating-value">{rating}</span>
          </div>
          <div className="location">
            <IoLocationSharp className="location-icon" />
            <span className="location-text">{location}</span>
          </div>
          <div className="employment">
            <BsFillBriefcaseFill className="briefcase-icon" />
            <span className="employment-type">{employmentType}</span>
            <span className="package-per-annum">{packagePerAnnum}</span>
          </div>
          <hr className="separator" />
          <h1 className="description-title">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </Link>
    </>
  )
}

export default JobCard
