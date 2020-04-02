import React from 'react'
import Axios from 'axios'
class EditStudent extends React.Component{
    state = {
        _id : this.props.match.params["id"],
        fullName : "",
        username : "",
        password : "",
        city : "",
    }
    componentDidMount()
    {
        this.getUserData();
    }
    getUserData = ()=>{
        Axios(`http://localhost:8080/speaker/update/${this.props.match.params["id"]}`)
        .then((selectedSpeaker) =>{
            // document.querySelector("input[name='fullName']").value = ;
            this.setState({
                fullName : selectedSpeaker.data.fullName,
                username : selectedSpeaker.data.username,
                password : selectedSpeaker.data.password,
                city : selectedSpeaker.data.address.city
            })
        });
    }
    onFormUpdate = (e)=>{
        e.preventDefault();
        Axios.post("http://localhost:8080/speaker/update",{
            _id : this.state._id,
            fullName : this.state.fullName,
            username : this.state.username,
            password : this.state.password,
            city : this.state.city
        }).then(res =>{
            window.location.href = "http://localhost:3000/listSpeakers";
        })
    }
    render()
    {
      return(
        <div className="container">
            <form>
                <div className="form-group">
                        <label>Student ID</label>
                        <input type="text" className="form-control" value={this.state._id}
                        onChange={(e) =>{this.setState({fullName : e.target.value})}} readOnly />
                    </div>
                <div className="form-group">
                    <label>Student Name</label>
                    <input type="text" className="form-control" value={this.state.fullName}
                    onChange={(e) =>{this.setState({fullName : e.target.value})}} name="fullName"  />
                </div>
                <div className="form-group">
                    <label >Student Username</label>
                    <input id="title" type="text" className="form-control" value={this.state.username} 
                    onChange={(e) =>{this.setState({username : e.target.value})}} name="username" />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input id="age" type="password" className="form-control" value={this.state.password}
                    onChange={(e) =>{this.setState({password : e.target.value})}} name="password" />
                </div>
                <div className="form-group">
                    <label >Address City </label>
                    <input id="age" type="text" className="form-control" value={this.state.city}
                    onChange={(e) =>{this.setState({city : e.target.value})}} name = "city" />
                </div>
                <button type="submit" class="btn btn-success" onClick={this.onFormUpdate}>Edit Speaker</button>
            </form>
        </div>
      )
    }
}
export default EditStudent