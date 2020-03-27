import React from 'react';

class UpComingEvents extends React.Component
{
    render(){
        let Events = this.props.events.map((event,index) =>{
            return(
                <tr key={index}>
                    <td>{event._id}</td>
                    <td>{event.title}</td>
                    <td>{event.date}</td>
                    <td>{event.mainSpeaker ? event.mainSpeaker.fullName : <p>Sorry Main Speaker Not Exist</p>}</td>
                    <td>
                        <ul>
                            { (event.otherSpeaker.length == 0) ?
                                <li>Other Speakers Doesnt Exist</li> :
                                event.otherSpeaker.map((other) => <li>{other.fullName}</li>)
                            }
                        </ul>
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
export default UpComingEvents;