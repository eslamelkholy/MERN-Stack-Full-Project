import React from 'react'
import { Link } from 'react-router-dom'

class SpeakerHeader extends React.Component {
    onLogout = (e)=>
    {
        console.log(this.props.isAuthenticated("None"));
        localStorage.removeItem("id");
    }
    render()
    {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link class="nav-link" to="/speakerProfile">My Profile</Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/upcomingEvents" >Check All Upcoming Events</Link>
                        </li>
                    </ul>
                </div>
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link class="nav-link bold" to="/login" onClick={this.onLogout}>Logout</Link>
                    </li>
                    <li class="nav-item active">
                        <button class="btn btn-outline-success my-2 my-sm-0">Welcome Static Name</button>
                    </li>
                </ul>
            </nav>
        )
    }
}
export default SpeakerHeader;