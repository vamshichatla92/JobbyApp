import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-bar-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="nav-logo"
          alt="website logo"
        />
      </Link>
      <ul>
        <li>
          <Link to="/">
            <h1 className="nav-heading">Home</h1>
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <h1 className="nav-heading">Jobs</h1>
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </Link>
        </li>
      </ul>
    </div>
  )
}
export default withRouter(Header)
