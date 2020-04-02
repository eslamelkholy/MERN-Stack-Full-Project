import React from 'react'
import Axios from 'axios'
import Moment from 'react-moment'
import moment from 'moment';
class EditEvent extends React.Component
{
    state = {
        _id : this.props.match.params["id"],
        title : "",
        date : "",
        mainSpeaker : "",
        otherSpeaker : [],
        speakersArray : [],
        moment : ""
    }
    componentDidMount()
    {
        this.getEventData();
    }
    getEventData = ()=>{
        Axios(`http://localhost:8080/event/update/${this.props.match.params["id"]}`)
        .then((mydata) =>{
            let fullName = "";
            if(mydata.data.event.mainSpeaker)
                fullName = mydata.data.event.mainSpeaker.fullName;
                
            else
                fullName = "";
            this.setState({
                title : mydata.data.event.title,
                date : mydata.data.event.date,
                mainSpeaker : fullName ,
                otherSpeaker : mydata.data.event.otherSpeaker,
                speakersArray : mydata.data.speakers,
                moment : mydata.data.moment
            })
        });
    }
    onFormSubmit = (e)=>{
        e.preventDefault();
        Axios.post("http://localhost:8080/event/update",{
            _id : this.state._id,
            title : this.state.title,
            date : this.state.date,
            mainSpeaker : this.state.mainSpeaker,
            otherSpeaker : this.state.otherSpeaker
        }).then(res => window.location.href = "http://localhost:3000/listEvents");
    }
    render(){
        let mainSpeakers = this.state.speakersArray.map((speaker,index) =>{
            if(speaker.fullName == this.state.mainSpeaker)
            {
                return(
                    <option selected value={`${speaker._id}`}>{speaker.fullName}</option>
                );    
            }
            else
            {
                return(
                    <option value={`${speaker._id}`}>{speaker.fullName}</option>
                );
            }
        });
        let otherSpeakers = this.state.speakersArray.map((speaker,index) =>{
            if (this.state.otherSpeaker.find((myOtherspeaker) => myOtherspeaker.fullName == speaker.fullName ))
            {
                return(
                    <option selected value={`${speaker._id}`}>{speaker.fullName}</option>
                )
            }
            else{
                return(
                    <option value={`${speaker._id}`}>{speaker.fullName}</option>
                )
            }
        })
        return(
            <div className="container">
                <h1 align="Center">Edit Event</h1>
                <form className="col-6 offset-3">
                <div class="form-group">
                        <label>Event ID</label>
                        <input type="text" class="form-control" name="_id" readOnly value={this.state._id}/>
                    </div>
                    <div class="form-group">
                        <label>Event Name</label>
                        <input type="text" class="form-control" value={this.state.title} name="title" onChange={(e) => {this.setState({title : e.target.value})}} />
                    </div>
                    <div class="form-group">
                        <label>Event Date</label>
                        <input type="date" class="form-control" value={moment(this.state.date).utc().format('YYYY-MM-DD')} name="date" onChange = {(e) => {this.setState({date : e.target.value})}} />
                    </div>
                    <select className="form-control" id="mainSpeaker"  name="mainSpeaker" onChange = {(e) =>{this.setState({mainSpeaker : e.target.value})}}>
                        {mainSpeakers}
                    </select>
                    <select className="form-control" id="otherSpeaker" multiple name="otherSpeaker" onChange = {(e) => {this.setState({otherSpeaker : [...e.target.selectedOptions].map(opt => opt.value)})}}>
                        {otherSpeakers}
                    </select>
                    <button class="btn btn-success" onClick={this.onFormSubmit}>Edit Event</button>
                </form>
            </div>
        )   
    }
}
export default EditEvent;