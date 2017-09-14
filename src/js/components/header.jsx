import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.PureComponent {
  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <Link to="/" className="navbar-brand">作业系统</Link>
        <ul className="nav navbar-nav pull-right">
          <li className="nav-item"><Link to="/achieveWorkList" className="nav-link">主页</Link></li>
          <li className="nav-item"><Link to="/doWorkList" className="nav-link">作业清单</Link></li>
        </ul>
      </nav>
    )
  }
}

export default Header