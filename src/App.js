import React, { Fragment } from 'react'
import { BrowserRouter,Redirect } from 'react-router-dom'
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


class App extends React.Component {
    state = {
        isAuthenticated: "None",
        userId : "",
        username : ""
    }
    componentDidMount() {
        if(localStorage.getItem("id"))
        {
            this.setAuthenticationVal("Speaker");
            this.setUserId(localStorage.getItem("id"));
        }
        else
        {
            this.setAuthenticationVal("None");
            this.setUserId(undefined);          
        }
    }
    //Function Set The State For Authentication
    setAuthenticationVal = (val) => {
        this.setState({
            isAuthenticated: val
        })
    }
    setUserId = (id,fullName) =>{
        this.setState({
            userId : id,
            username : fullName
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
                        <AuthenticationApp userId = {this.setUserId} isAuthenticated={this.setAuthenticationVal} />
                        <Footer />
                    </BrowserRouter>
                </Fragment>
            )
        }
        else if (this.state.isAuthenticated == "Speaker") {
            return (
                <Fragment>
                    <BrowserRouter>
                        <SpeakerHeader isAuthenticated={this.setAuthenticationVal} />
                        <SpeakerProfileApp userId = {this.state.userId} />
                        <AuthenticationApp userId = {this.setUserId}  isAuthenticated={this.setAuthenticationVal} />
                        <Footer />
                    </BrowserRouter>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <BrowserRouter>
                        <AuthenticationApp userId = {this.setUserId} isAuthenticated={this.setAuthenticationVal} />
                        <Footer />
                    </BrowserRouter>
                </Fragment>
            )
        }
    }

}
export default App;