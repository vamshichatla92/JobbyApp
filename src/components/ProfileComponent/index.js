import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProfileComponent = props => {
  const renderSuccessProfile = () => {
    const {profileDetailsData} = props
    const {name, profileImageUrl, shortBio} = profileDetailsData
    return (
      <div>
        <img src={profileImageUrl} alt="profile" />
        <p>{name}</p>
        <p>{shortBio}</p>
      </div>
    )
  }

  const renderFailureViewProfile = () => {
    const {getProfileDetails} = props
    return (
      <div className="profile-failure-container">
        <button
          className="retry-button"
          type="button"
          onClick={getProfileDetails}
        >
          Retry
        </button>
      </div>
    )
  }

  const renderLoadingProfileView = () => (
    <div className="loader-container-profile" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const {profileApiStatus} = props
  switch (profileApiStatus) {
    case apiStatusConstants.success:
      return renderSuccessProfile()
    case apiStatusConstants.failure:
      return renderFailureViewProfile()
    case apiStatusConstants.inProgress:
      return renderLoadingProfileView()
    default:
      return null
  }
}

export default ProfileComponent
