import React, { Component,Fragment }  from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom';
import SpeakerProfile from './speakerProfile';
import UpComingEvents from './upComingEvents';

class SpeakerProfileApp extends React.Component
{
    state = {
        speakersData : [],
        mySpeaker : "",
        eventData : [],
    }
    componentDidMount()
    {
        this.getSpeakersData();
        this.getEventsData();
    }
    getSpeakersData = ()=>{
        axios("http://localhost:8080/speaker/list")
        .then((speakers) =>{
            this.setState({
                speakersData : speakers.data
            });
        });
    }
    //Get Events Data From Backend Api's
    getEventsData = ()=>{
        axios("http://localhost:8080/event/list")
        .then((events) =>{
            this.setState({
                eventData : events.data
            });
        })
    }
    //Rendre Data to App
    render()
    {
        return(
            <Fragment>
                <Route exact path="/speakerProfile" component = { (props) => <SpeakerProfile id = {this.props.userId} /> }  />
                <Route exact path="/upcomingEvents" component = { () => <UpComingEvents events = {this.state.eventData} /> }    />
            </Fragment>
        );
    }
}
export default SpeakerProfileApp;