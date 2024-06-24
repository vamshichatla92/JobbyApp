import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import JobCard from '../JobCard'

import ProfileComponent from '../ProfileComponent'

import Header from '../Header'

import FiltersGroup from '../FiltersGroup'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    jobApiStatus: apiStatusConstants.initial,
    profileApiStatus: apiStatusConstants.initial,
    profileDetailsData: {},
    searchInput: '',
    employmentTypesChecked: [],
    activeRangeId: '',
  }

  componentDidMount() {
    this.getJobs()
    this.getProfileDetails()
  }

  getJobs = async () => {
    const {searchInput, employmentTypesChecked, activeRangeId} = this.state
    const employTypes = employmentTypesChecked.join(',')
    this.setState({jobApiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employTypes}&minimum_package=${activeRangeId}&employmentTypesCheckedsearch=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        jobApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const profileDetails = fetchedData.profile_details
      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetailsData: updatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length > 0 ? (
          <ul>
            {jobsList.map(eachJob => (
              <JobCard jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsView()
        )}
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view"
        alt="failure view"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={() => this.getJobs()}
      >
        Retry
      </button>
    </div>
  )

  renderALlJobs = () => {
    const {jobApiStatus} = this.state
    switch (jobApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  updateEmploymentTypesChecked = typeId => {
    const {employmentTypesChecked} = this.state
    let updatedList = employmentTypesChecked
    if (employmentTypesChecked.includes(typeId)) {
      updatedList = employmentTypesChecked.filter(
        eachType => eachType !== typeId,
      )
    } else {
      updatedList = [...updatedList, typeId]
    }
    this.setState({employmentTypesChecked: updatedList}, this.getJobs)
  }

  updateSalaryRangeId = activeRangeId => {
    this.setState({activeRangeId}, this.getJobs)
  }

  renderSideBar = () => {
    const {
      profileDetailsData,
      profileApiStatus,
      activeSalaryRangeId,
      employmentTypesChecked,
    } = this.state
    return (
      <div>
        <ProfileComponent
          profileDetailsData={profileDetailsData}
          profileApiStatus={profileApiStatus}
          getProfileDetails={this.getProfileDetails}
        />
        <hr className="separator" />
        <FiltersGroup
          updateSalaryRangeId={this.updateSalaryRangeId}
          activeSalaryRangeId={activeSalaryRangeId}
          employmentTypesChecked={employmentTypesChecked}
          updateEmploymentTypesChecked={this.updateEmploymentTypesChecked}
        />
      </div>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <>
        <div className="search-container">
          <input
            type="search"
            onChange={this.onChangeSearchInput}
            placeholder="Search"
            value={searchInput}
          />
          <button
            className="search-button"
            type="button"
            data-testid="searchButton"
            onClick={() => this.getJobs()}
          >
            search <BsSearch className="search-icon" />
          </button>
        </div>
      </>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="side-a">{this.renderSideBar()}</div>
          <div className="side-b">
            {this.renderSearchBar()}
            {this.renderALlJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
