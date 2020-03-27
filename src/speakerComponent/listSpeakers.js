import React from 'react'
import { Link } from 'react-router-dom';
import '../layout/speakerStyle/speaker.css'

class ListStudent extends React.Component{
    render(){
        let Students = this.props.studentData.map((item,index) =>{
            return (
                <tr key={index}>
                    <td>{item._id}</td>
                    <td>{item.fullName}</td>
                    <td>{item.address.city}</td>
                    <td>{item.address.street}</td>
                    <td>{item.address.building}</td>
                    <td>
                        {/* pathname , state */}
                        <Link className="btn btn-primary" to={`/edit/${item._id}`}>Edit</Link> 
                        <Link className="btn btn-danger editDeleteBtn" to="/listSpeakers" onClick={()=>this.props.handlerDelete(item._id)}>Delete</Link>
                    </td>
                </tr>
            )
        })
        return(
            <div className="container">
                <br/><br/>
                <table className="table text-center bg-dark text-light">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Street</th>
                        <th>Building</th>
                        <th>Delete / Edit</th>
                    </tr>
                    <tbody>
                        {Students}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ListStudent