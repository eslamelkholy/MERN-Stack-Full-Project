import React from 'react'
import Axios from 'axios'
import '../layout/eventStyle/addEvent.css';
class AddEvent extends React.Component
{
    state = {
        title : "",
        date : "",
        mainSpeaker : "",
        otherSpeaker : []
    }
    onFormSubmit = (e)=>{
        Axios.post("http://localhost:8080/event/add",{
            title : this.state.title,
            date : this.state.date,
            mainSpeaker : this.state.mainSpeaker,
            otherSpeaker : this.state.otherSpeaker
        }).then(res => console.log(res));
    }
    render(){
        let speakers = this.props.speakers.map((speaker,index) =>{
            if(index == 0)
            {
                this.state.mainSpeaker = speaker._id
                this.state.otherSpeaker = speaker._id
                return(
                    <option selected value={`${speaker._id}`}>{speaker.fullName}</option>
                );
            }
            return(
                <option value={`${speaker._id}`}>{speaker.fullName}</option>
            );
        });
        return(
            <div className="container">
                <h1 align="Center">Add Event</h1>
                <form action="/listEvents" className="col-6 offset-3">
                    <div class="form-group">
                        <label>Event Name</label>
                        <input type="text" class="form-control" name="title" onChange={(e) => {this.setState({title : e.target.value})}} />
                    </div>
                    <div class="form-group">
                        <label>Event Date</label>
                        <input type="date" class="form-control" name="date" onChange = {(e) => {this.setState({date : e.target.value})}} />
                    </div>
                    <select className="form-control" id="mainSpeaker" name="mainSpeaker" onChange = {(e) =>{this.setState({mainSpeaker : e.target.value})}}>
                        {speakers}
                    </select>
                    <select className="form-control" id="otherSpeaker" multiple name="otherSpeaker" onChange = {(e) => {this.setState({otherSpeaker : [...e.target.selectedOptions].map(opt => opt.value)})}}>
                        {speakers}
                    </select>
                    <button type="submit" class="btn btn-success" onClick={this.onFormSubmit}>Add New Event</button>
                </form>
            </div>
        )   
    }
}
export default AddEvent;