import React, { Fragment } from 'react'
import './../layout/eventStyle/adminProfile.css'

class AdminProfile extends React.Component {
    render() {
        console.log(this.props.canceledEvents);
        let CanceledEvents = this.props.canceledEvents.map((event,index) =>{
            return(
                <p class="notiParagraph">{event.eventId.title} Has Been Canceled By {event.speakerId ? event.speakerId.fullName : "Deleted Speaker"}</p>
            )
        });
        return (
            <div class="container">
                <h1 className="HeaderTitle">Welcome Eslam Elkholy</h1><br />
                <div class="jumbotron">
                    <h3>Mansoura Branch OS Track Node.js Project</h3>
                    <p class="blockquote-footer">Copy Rights &copy; Reserved to Eslam Elkholy !</p>
                </div>
                <h3>Your Personal Information</h3>
                <div class="row">
                    <form class="col-6" method="POST" action="#">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" class="form-control" readOnly name="fullName"  value="Eslam Elkholy" />
                        </div>
                        <div class="form-group">
                            <label>UserName</label>
                            <input type="text" class="form-control" name="username" readOnly value="eslam" />
                        </div>
                        <div class="form-group">
                            <label>UserPass</label>
                            <input type="password" class="form-control" name="password" readOnly value="*********" />
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <input type="text" class="form-control" name="address" value="Egypt,Mansoura" readOnly />
                        </div>
                        <input type="button" value="Update" class="btn btn-primary" disabled />
                    </form>
                    <div class="alert alert-primary col-6 noti" role="alert">
                        <p class="notiTitle">Most Recent Notifications </p>
                        {CanceledEvents}
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminProfile;