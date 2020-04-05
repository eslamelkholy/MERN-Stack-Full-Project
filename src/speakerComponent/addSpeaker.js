import React from 'react'
import Axios from 'axios'

class AddStudent extends React.Component{
    state = {
        _id : "",
        fullName : "",
        username : "",
        password : "",
        city : "",
        street : "",
        building : ""
    }
    //Add New Student
    onFormSubmit = (e)=>{
        Axios.post("http://localhost:8080/speaker/add",{
            fullName : this.state.fullName,
            username : this.state.username,
            password : this.state.password,
            city : this.state.city,
            street : this.state.street,
            building :this.state.building
        }).then(res =>{
            console.log("Addedd");
        })
    }
    render()
    {
        return(
            <div className="container">
                <form action="/listSpeakers" >
                    <div className="form-group">
                        <label>Speaker Name</label>
                        <input type="text" className="form-control" value={this.state.name}  placeholder="Enter Student fullName"
                        onChange={(e) =>{this.setState({fullName : e.target.value})}}  />
                    </div>
                    <div className="form-group">
                        <label >Speaker Username</label>
                        <input id="title" type="text" className="form-control" value={this.state.Department} placeholder="Enter Student Username"
                        onChange={(e) =>{this.setState({username : e.target.value})}} />
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input id="age" type="password" className="form-control" value={this.state.age} placeholder="Enter Password"
                        onChange={(e) =>{this.setState({password : e.target.value})}} />
                    </div>
                    <div className="form-group">
                        <label >Address City </label>
                        <input id="age" type="text" className="form-control" value={this.state.age} placeholder="Enter Password"
                        onChange={(e) =>{this.setState({city : e.target.value})}} />
                    </div>
                    <div className="form-group">
                        <label >Adress Street </label>
                        <input id="age" type="text" className="form-control" value={this.state.age} placeholder="Enter Password"
                        onChange={(e) =>{this.setState({street : e.target.value})}} />
                    </div>
                    <div className="form-group">
                        <label >Address building</label>
                        <input id="age" type="text" className="form-control" value={this.state.age} placeholder="Enter Password"
                        onChange={(e) =>{this.setState({building : e.target.value})}} />
                    </div>
                    <button type="submit" class="btn btn-success" onClick={this.onFormSubmit}>Add Speaker</button>
                </form>
                
            </div>
        )
    }
}
export default AddStudent