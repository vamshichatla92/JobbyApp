import {AiFillStar} from 'react-icons/ai'

import {IoLocationSharp} from 'react-icons/io5'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobCard = props => {
  const {similarJobsDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsDetails

  return (
    <div className="similar-job-card">
      <img
        className="company-logo"
        src={companyLogoUrl}
        alt="similar job company logo"
      />
      <p className="title">{title}</p>
      <div className="rating">
        <AiFillStar />
        <p>{rating}</p>
      </div>
      <h1>Description</h1>
      <p className="description">{jobDescription}</p>
      <div className="location">
        <IoLocationSharp />
        <p>{location}</p>
      </div>
      <div className="employment-type">
        <BsFillBriefcaseFill />
        <p>{employmentType}</p>
      </div>
    </div>
  )
}

export default SimilarJobCard
