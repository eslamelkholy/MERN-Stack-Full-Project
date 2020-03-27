import React from 'react'
import Axios from 'axios'
import '../layout/authenticationStyle/register.css'
class Register extends React.Component {
    state = {
        fullName: "",
        username: "",
        password: "",
        email: "",
        city: "",
        street: "",
        building: ""
    }
    onFormSubmit = (e) => {
        Axios.post("http://localhost:8080/register", {
            username: this.state.username,
            password: this.state.password
        }).then((res) => {

        })
    }
    render() {
        return (
            <div class="container">
                <h1 align="Center">Speakers Register Page</h1>
                <form class="col-6 offset-3" method="POST" action="/register">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" class="form-control" name="fullName" onChange={(e) => {this.setState({fullName : e.target.value})}} />
                        <span class="bg-danger text-white">Invalid fullName</span>
                    </div>
                    <div class="form-group">
                        <label>UserName</label>
                        <input type="text" class="form-control" name="username" onChange={(e) => {this.setState({username : e.target.value})}} />
                        <span class="bg-danger text-white">Invalid Username</span>
                    </div>
                    <div class="form-group">
                        <label>UserPass</label>
                        <input type="password" class="form-control" name="password" onChange={(e) => {this.setState({password : e.target.value})}} />
                        <span class="bg-danger text-white">Invalid Password</span>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" class="form-control" name="email" onChange={(e) => {this.setState({email : e.target.value})}} />
                        <span class="bg-danger text-white">Invalid Email</span>
                    </div>
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" class="form-control" name="address" onChange = {(e) => {this.setState({city : e.target.value})}} />
                        <span class="bg-danger text-white">Invalid Address</span>
                    </div>
                    <div class="form-group">
                        <label>Street</label>
                        <input type="text" class="form-control" name="address" onChange = {(e) => {this.setState({street : e.target.value})}} />
                        <span class="bg-danger text-white">Invalid Address</span>
                    </div>
                    <div class="form-group">
                        <label>Building</label>
                        <input type="text" class="form-control" name="address" onChange = {(e) => {this.setState({building : e.target.value})}} />
                        <span class="bg-danger text-white">Invalid Address</span>
                    </div>
                    <input type="submit" value="Register" onClick={this.onFormSubmit} class="btn btn-success" />
                </form>
            </div>
        )
    }
}
export default Register;