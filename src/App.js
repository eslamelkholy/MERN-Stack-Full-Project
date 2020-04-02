import React, { Fragment } from 'react'
import { BrowserRouter, Redirect } from 'react-router-dom'
import Header from './layout/Header'
import Footer from './layout/footer'
// Bootstrap in Index it will be seen in Whole Project component
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import SpeakerApp from './speakerComponent/speakerApp'
import EventApp from './eventComponent/eventApp'
import AuthenticationApp from './authenticationComponent/authenticationApp'
import SpeakerHeader from './speakerProfileComponent/speakerHeader'
import SpeakerProfileApp from './speakerProfileComponent/speakerProfileApp'
import Axios from 'axios'

class App extends React.Component {
    state = {
        token: localStorage.getItem('token'),
        isAuthenticated: "None",
        userId: "",
        fullName: "",
        image : ""
    }
    componentDidMount() {
        const token = localStorage.getItem('token');
        const config = {
            headers : {
                "Content-type" : "application/json"
            }
        }
        if(token)
        {
            config.headers['x-auth-token'] = token;
            this.getUserData(config);
            this.setState({token : token});
        }
    }
    //Function Set The State For Authentication
    setAuthenticationVal = (val) => {
        this.setState({
            isAuthenticated: val
        })
    }
    setUserId = (id, fullName) => {
        this.setState({
            userId: id,
            fullName: fullName
        })
    }
    getUserData = (config)=>{
        Axios.post("http://localhost:8080/validateUser", {check : "check"},config).then((res) => {
                if (res.data.user.role == "admin") {
                    this.setAuthenticationVal("Admin");
                    this.setUserId(res.data.user.id);
                    this.setState({image : "1.jpg", fullName : "Eslam Elkholy"});
                }
                else if (res.data.user.role == "speaker") {
                    this.setAuthenticationVal("Speaker");
                    this.setUserId(res.data.user.id);
                    this.setState({image : res.data.user.image, fullName : res.data.user.fullName});
                }
                else
                    this.setAuthenticationVal("None");
            })
    }
    render() {
        if (this.state.isAuthenticated == "Admin") {
            return (
                <Fragment>
                    <BrowserRouter>
                        <Header isAuthenticated={this.setAuthenticationVal} />
                        <EventApp />
                        <SpeakerApp />
                        <AuthenticationApp userId={this.setUserId} isAuthenticated={this.setAuthenticationVal} />
                        <Footer />
                    </BrowserRouter>
                </Fragment>
            )
        }
        else if (this.state.isAuthenticated == "Speaker") {
            return (
                <Fragment>
                    <BrowserRouter>
                        <SpeakerHeader isAuthenticated={this.setAuthenticationVal} fullName={this.state.fullName} image={this.state.image} />
                        <SpeakerProfileApp userId={this.state.userId} />
                        <AuthenticationApp userId={this.setUserId} isAuthenticated={this.setAuthenticationVal} />
                        <Footer />
                    </BrowserRouter>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <BrowserRouter>
                        <AuthenticationApp userId={this.setUserId} isAuthenticated={this.setAuthenticationVal} />
                        <Footer />
                    </BrowserRouter>
                </Fragment>
            )
        }
    }

}
export default App;