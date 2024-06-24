import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import SimilarJobCard from '../SimilarJobCard'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  succes: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormatedData = fetchedData => {
    const jobDetails = fetchedData.job_details
    const updatedDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      title: jobDetails.title,
      skills: jobDetails.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      })),
      lifeAtCompany: {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      },
    }

    const similarJobs = fetchedData.similar_jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    return {updatedDetails, similarJobs}
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const {updatedDetails, similarJobs} = this.getFormatedData(fetchedData)
      this.setState({
        jobDetails: updatedDetails,
        similarJobs,
        apiStatus: apiStatusConstants.succes,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderApiFailureView = () => (
    <div className="jobs-api-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-api-failure-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobDetails} // Ensure to call the correct method on retry button click
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
    } = jobDetails
    // Check if skills is defined and is an array before mapping over it
    const skillsList =
      jobDetails.skills && Array.isArray(jobDetails.skills)
        ? jobDetails.skills
        : []
    if (!jobDetails || Object.keys(jobDetails).length === 0) {
      return null // Return null if jobDetails is not available
    }
    return (
      <div className="job-details-container">
        <div className="title-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo-image"
          />
          <p className="title">{title}</p>
          <div className="rating">
            <AiFillStar />
            <p>{rating}</p>
          </div>
          <div className="location">
            <IoLocationSharp />
            <p>{location}</p>
          </div>
          <div className="package">
            <p>{packagePerAnnum}</p>
          </div>
          <div className="employment">
            <BsFillBriefcaseFill />
            <p>{employmentType}</p>
          </div>
          <h1>Description</h1>
          <a href={companyWebsiteUrl} className="company-website">
            Visit
            <FiExternalLink />
          </a>
          <p className="description">{jobDescription}</p>
          <h1>Skills</h1>
          <ul className="skills-list">
            {skillsList.map(eachSkill => (
              <li key={eachSkill.name}>
                <img src={eachSkill.imageUrl} alt={eachSkill.name} />
                <p>{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div className="life-at-company">
            <p>{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        {similarJobs.map(eachSimilarJob => (
          <SimilarJobCard
            similarJobsDetails={eachSimilarJob}
            key={eachSimilarJob.id}
          />
        ))}
      </div>
    )
  }

  renderJobDetailsPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.succes:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderApiFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {similarJobs} = this.state
    console.log(similarJobs)
    return (
      <>
        <Header />
        {this.renderJobDetails()}
      </>
    )
  }
}

export default JobItemDetails
