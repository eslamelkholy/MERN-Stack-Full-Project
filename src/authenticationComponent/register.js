import React, { Fragment } from 'react'
import Axios from 'axios'
import $ from 'jquery'
import '../layout/authenticationStyle/register.css'
import ImageUploader from 'react-images-upload';

class Register extends React.Component {
    state = {
        fullName: "",
        fullNameError: "",
        username: "",
        usernameError: "",
        password: "",
        passwordError: "",
        email: "",
        emailError: "",
        city: "",
        cityError: "",
        street: "",
        building: "",
        file: null,
        formIsValid: true
    }
    componentDidMount() {
        $("#msgSuccessful").hide();
    }
    onDrop = (pictureFiles, pictureDataURLs) => {
        if (pictureFiles.length > 0)
            this.setState({ file: pictureFiles[pictureFiles.length - 1] });
        else
        {
            this.setState({imgExtensionError : "Please Enter a Valid Extension"});
            this.state.formIsValid = false;
        }
    }
    handleValidation = () => {
        this.setState({ usernameError: "", passwordError: "", emailError: "", cityError: ""});
        if (this.state.username.length == 0)
        {
            this.setState({ usernameError: "Username Can't Be Empty"});
            this.state.formIsValid = false;
        }
        if (this.state.password.length < 5)
        {
            this.setState({ passwordError: "Your Password too Weak" });
            this.state.formIsValid = false;
        }   
        if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
        {
            this.setState({ emailError: "Please Enter a Valid Email"});
            this.state.formIsValid = false;
        }
        if (this.state.city.length < 2)
        {
            this.setState({ cityError: "Please Fill This Field"});
            this.state.formIsValid = false;
        }
        return this.state.formIsValid;
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.handleValidation()) 
        {
            $("#msgSuccessful").show();
            const formData = new FormData();
            formData.append('file', this.state.file);
            formData.append('username', this.state.username);
            formData.append('fullName', this.state.fullName);
            formData.append('password', this.state.password);
            formData.append('email', this.state.email);
            formData.append('city', this.state.city);
            formData.append('street', this.state.street);
            formData.append('building', this.state.building);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            Axios.post("http://localhost:8080/register", formData, config)
                .then((res) => {
                    console.log(res);
                    setTimeout(function(){window.location.href="http://localhost:3000/login"},3000);
                })
                .catch((err) => console.log(err))
        }
    }
    render() {
        return (
            <div class="container">
                <a className="btn btn-info" href="/login">Back To Login Page >> </a>
                <h1 align="Center">Speakers Register Page</h1>
                <form class="col-6 offset-3" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" class="form-control" name="fullName" onChange={(e) => { this.setState({ fullName: e.target.value }) }} />
                        <span class="bg-danger text-white">{this.state.fullNameError}</span>
                    </div>
                    <div class="form-group">
                        <label>UserName</label>
                        <input type="text" class="form-control" name="username" onChange={(e) => { this.setState({ username: e.target.value }) }} />
                        <span class="bg-danger text-white">{this.state.usernameError}</span>
                    </div>
                    <div class="form-group">
                        <label>UserPass</label>
                        <input type="password" class="form-control" name="password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                        <span class="bg-danger text-white">{this.state.passwordError}</span>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" class="form-control" name="email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                        <span class="bg-danger text-white">{this.state.emailError}</span>
                    </div>
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" class="form-control" name="city" onChange={(e) => { this.setState({ city: e.target.value }) }} />
                        <span class="bg-danger text-white">{this.state.cityError}</span>
                    </div>
                    <div class="form-group">
                        <label>Street</label>
                        <input type="text" class="form-control" name="street" onChange={(e) => { this.setState({ street: e.target.value }) }} />
                        <span class="bg-danger text-white">{this.state.streetError}</span>
                    </div>
                    <div class="form-group">
                        <label>Building</label>
                        <input type="text" class="form-control" name="building" onChange={(e) => { this.setState({ building: e.target.value }) }} />
                        <span class="bg-danger text-white">{this.state.buildingError}</span>
                    </div>
                    <ImageUploader
                        fileTypeError=" is not supported file extension"
                        withIcon={true}
                        accept="accept=image/*"
                        label="Max file size: 5mb And Accapt Only jpg , gif , png ,"
                        buttonText="Choose images"
                        onChange={(this.onDrop)}
                        imgExtension={[".jpg", ".gif", ".png"]}
                        maxFileSize={5242880}
                    />
                    <input type="submit" id="registerBtn" value="Register" onClick={this.onFormSubmit} class="btn btn-success" />
                    <div class="p-3 mb-2 bg-info text-white" id="msgSuccessful">
                        Registeration Completed Successfully You Will be Redirect Now ...
                    </div>
                </form>
            </div>
        )
    }
}
export default Register;