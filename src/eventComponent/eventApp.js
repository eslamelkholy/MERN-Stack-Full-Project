import React, { Component, Fragment } from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import axios from 'axios'
import AddEvent from './addEvent'
import ListEvents from './listEvent'
import EditEvent from './editEvent'
import AdminProfile from './adminProfile'

class EventApp extends Component{
    state = {
        eventData : [],
        speakerData : [],
        canceledEvents : []
    }
    //First Thing After The Page Loaded
    componentDidMount()
    {
        this.getEventsData();
        this.getSpeakersData();
        this.getCanceledEventsData();
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
    //Get Speakers Data From Backend Api's
    getSpeakersData = ()=>{
        axios("http://localhost:8080/speaker/list")
        .then((speakers) =>{
            this.setState({
                speakerData : speakers.data
            });
        });
    }
    getCanceledEventsData = ()=>{
        axios("http://localhost:8080/admin/profile")
        .then((canceledEvents) =>{
            this.setState({
                canceledEvents : canceledEvents.data
            });
        });
    }
    //Delete Event section
    deleteEvent = (eventId)=>{
        axios.post("http://localhost:8080/event/delete",{
            speakerId: eventId
        }).then(res => this.getEventsData())
    }
    //Rendre My Events Routes
    render()
    {
        return(
            <Fragment>
                <Route exact path="/listEvents" component = {()=> <ListEvents events = {this.state.eventData} handlerDelete = {this.deleteEvent} />  } />
                <Route exact path="/addEvent" component = {() => <AddEvent speakers = {this.state.speakerData} /> } />
                <Route exact path="/editEvent/:id" component = {(props)=> <EditEvent {...props} /> } />
                <Route exact path="/adminProfile" component ={()=> <AdminProfile canceledEvents = {this.state.canceledEvents} /> } />
            </Fragment>
        );
    }
}
export default EventApp;