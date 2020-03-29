import React from 'react'
import { Link } from 'react-router-dom'


class Header extends React.Component {
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
                <Link to="/admin/profile" class="navbar-brand" href="#">Administration</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link to="/listSpeakers" class="nav-link">Speakers List</Link>
                        </li>
                        <li class="nav-item active">
                            <Link to="/addSpeaker" class="nav-link">Add Speaker</Link>
                        </li>
                        <li class="nav-item active">
                            <Link to="/addEvent" class="nav-link">Add Event</Link>
                        </li>
                        <li class="nav-item active">
                            <Link to="/listEvents" class="nav-link">Events</Link>
                        </li>
                    </ul>
                </div>
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active" id="logoutList" >
                        <a class="nav-link" id="logout" href="/login" onClick={this.onLogout}>Logout</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Header;