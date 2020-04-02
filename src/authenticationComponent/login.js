import React, { Fragment } from 'react'
import Axios from 'axios'
import '../layout/authenticationStyle/login.css'
import $ from 'jquery'
class Login extends React.Component {
    state = {
        username: "",
        password: "",
        warrningMsg: ""
    }
    componentDidMount() {
        localStorage.removeItem('token');
        $("#msgWarning").hide();
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:8080/login", {
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
            if (res.data === "None") {
                this.props.isAuthenticated("None");
                $("#msgWarning").show();
            }
            else {
                if (res.data.user.role == "admin") {
                    this.props.userId(0, "Eslam Elkholy");
                    this.props.isAuthenticated("Admin");
                    window.location.href = "http://localhost:3000/adminProfile";
                    localStorage.setItem("token", res.data.token);
                }
                else if (res.data.user.role == "speaker") {
                    this.props.userId(res.data.user.id, res.data.user.fullName);
                    this.props.isAuthenticated("Speaker");
                    window.location.href = "http://localhost:3000/speakerProfile";
                    localStorage.setItem("token", res.data.token);
                }
            }
        })
    }
    render() {
        return (
            <Fragment>
                <h1>Events Management Project</h1>
                <div class="row">
                    <div class="col-4 form">
                        <form >
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Username</label>
                                <div class="col-sm-10">
                                    <input type="username" class="form-control" id="inputEmail3" name="username" onChange={(e) => { this.setState({ username: e.target.value }) }} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                                <div class="col-sm-10">
                                    <input type="password" class="form-control" id="inputPassword3" name="password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                    <span class="bg-danger text-white warrningMsg" id="msgWarning">Username or Password is Invalid !</span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-10 loginButtons">
                                    <button type="submit" onClick={this.onFormSubmit} class="btn btn-primary signBtn">Sign in</button>
                                    <a href="/register" class="btn btn-primary signBtn">Sign up</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-6 mySlider">
                        <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                                <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                                <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                            </ol>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="/images/2.jpg" class="d-block w-100" alt="..." />
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>First slide </h5>
                                        <p>Hello To Nodejs Events Management Project</p>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <img src="/images/1(2).jpg" class="d-block w-100" alt="..." />
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Second slide </h5>
                                        <p>Hello To Nodejs Events Management Project</p>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <img src="/images/2.jpg" class="d-block w-100" alt="..." />
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Third slide </h5>
                                        <p>Hello To Nodejs Events Management Project</p>
                                    </div>
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Login;