import React from 'react'
import {Link} from 'react-router-dom'
import '../layout/eventStyle/listEvent.css'
import moment from 'moment';
class ListEvents extends React.Component
{
    render(){
        let Events = this.props.events.map((event,index) =>{
            return(
                <tr key={index}>
                    <td>{event._id}</td>
                    <td>{event.title}</td>
                    
                    <td>{moment(event.date).utc().format('YYYY-MM-DD')}</td>
                    <td>{event.mainSpeaker ? event.mainSpeaker.fullName : <p>Sorry Not Exist</p>}</td>
                    <td>
                        <ul>
                            { (event.otherSpeaker.length == 0) ?
                                <li>Other Speakers Doesnt Exist Please add Some</li> :
                                event.otherSpeaker.map((other) => <li>{other.fullName}</li>)
                            }
                        </ul>
                    </td>
                    <td>
                        {/* pathname , state */}
                        <Link className="btn btn-primary" id="editEvent" to={`/editEvent/${event._id}`}>Edit</Link> 
                        <Link className="btn btn-danger editDeleteBtn" id="deleteEvent" to="/listEvents" onClick={()=>this.props.handlerDelete(event._id)}>Delete</Link>
                    </td>
                </tr>
            )
        });
        return(
            <div className="container">
                <h1>Event List</h1>
                <table class="table text-center bg-dark text-light">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Event Date</th>
                            <th>Main Speaker</th>
                            <th>Other Speakers</th>
                            <td>
                                Edit / Delete
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {Events}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ListEvents;