import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery';
import '../layout/speakerProfile/speakerHeader.css';

class SpeakerHeader extends React.Component {
    state = {
        username: ""
    }
    componentDidMount() {
        this.setState({
            username: localStorage.getItem("name")
        })
    }
    onLogout = (e) => {
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("img");
    }
    render() {
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
                    <li class="nav-item active" id="logoutList" >
                        <a class="nav-link" id="logout" href="/login" onClick={this.onLogout}>Logout</a>
                    </li>
                    <li class="nav-item active">
                        <button class="btn btn-outline-success my-2 my-sm-0" id="userHeaderName">{this.state.username}</button>
                    </li>
                    <li>
                        <img id="userImage" src={"images/"+localStorage.getItem("img")} />
                    </li>
                </ul>
            </nav>
        )
    }
}
export default SpeakerHeader;