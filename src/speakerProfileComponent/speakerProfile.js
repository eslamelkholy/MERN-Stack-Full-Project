import React, { Fragment } from 'react'
import Axios from 'axios'
import moment from 'moment';
import $ from 'jquery'
import '../layout/speakerProfile/speakerProfile.css';
class SpeakerProfile extends React.Component {
    state = {
        id: "",
        fullName: "",
        username: "",
        password: "",
        city: "",
        myEvents: []
    }
    componentDidMount() {
        this.getSpeakerProfileData();
    }
    getSpeakerProfileData = () => {
        Axios.post("http://localhost:8080/speaker/profile", { userId: this.props.id })
            .then((speaker) => {
                this.setState({
                    id: speaker.data.speakerData._id,
                    fullName: speaker.data.speakerData.fullName,
                    username: speaker.data.speakerData.username,
                    password: speaker.data.speakerData.password,
                    city: speaker.data.speakerData.address.city,
                    myEvents: speaker.data.currentEvent
                });
            })
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:8080/speaker/update", {
            _id: this.state.id,
            fullName: this.state.fullName,
            username: this.state.username,
            password: this.state.password,
            city: this.state.city
        }).then(res => {
            let myMessage = '<p class="updateMessage">Congratulation Your Profile Data Has been Updated Successfully</p>';
            $("#messageSuccess").html(myMessage);
            console.log($("#messageSuccess"));
        })
    }
    cancelEvent = (speakerId, eventId, isMainSpeaker) => {
        Axios.post("http://localhost:8080/event/cancel", {
            isMainSpeaker: isMainSpeaker,
            eventId: eventId,
            speakerId: speakerId,
        }).then(res => this.getSpeakerProfileData());
    }
    render() {
        let myEvents = this.state.myEvents.map((event, index) => {
            return (
                <tr key={index}>
                    <td>{event.title}</td>
                    <td>{moment(event.date).utc().format('YYYY-MM-DD')}</td>
                    {this.state.id == event.mainSpeaker ?
                        <Fragment>
                            <td>As Main Speaker</td>
                            <td>
                                <a className="btn btn-danger" onClick={this.cancelEvent.bind(this,this.state.id,event._id,true)}>Cancel</a>
                            </td>
                        </Fragment>
                        :
                        <Fragment>
                            <td>As Other Speaker</td>
                            <td>
                                <a className="btn btn-danger" onClick={this.cancelEvent.bind(this,this.state.id,event._id,false)}>Cancel</a>
                            </td>
                        </Fragment>
                    }
                </tr>
            )
        })
        return (
            <div class="container">
                <h1>Welcome {this.state.fullName} </h1><br />
                <h4>Your Personal Information</h4>
                <div class="row">
                    <form class="col-5">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" class="form-control" name="fullName" value={this.state.fullName} onChange={(e) => { this.setState({ fullName: e.target.value }) }} />
                        </div>
                        <div class="form-group">
                            <label>UserName</label>
                            <input type="text" class="form-control" name="username" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} />
                        </div>
                        <div class="form-group">
                            <label>UserPass</label>
                            <input type="password" class="form-control" name="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                        </div>
                        <div class="form-group">
                            <label>Address City</label>
                            <input type="text" class="form-control" name="city" value={this.state.city} onChange={(e) => { this.setState({ city: e.target.value }) }} />
                        </div>
                        <button type="submit" onClick={this.onFormSubmit} class="btn btn-success" > Update </button>
                        <div id="messageSuccess">

                        </div>
                    </form>
                    <div class="col-7">
                        <table class="table text-center bg-dark text-light table-rounded" >
                            <thead>
                                <tr>
                                    <th>Event Title</th>
                                    <th>Event Date</th>
                                    <th>You Role</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myEvents}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default SpeakerProfile;