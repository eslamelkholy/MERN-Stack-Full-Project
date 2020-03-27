import React, { Component, Fragment } from 'react'
import {Route} from 'react-router-dom'
import ListSpeakers from './listSpeakers'
import AddSpeaker from './addSpeaker'
import EditSpeaker from './editSpeaker'
import axios from 'axios'

class StudentApp extends Component
{
    
    state = {
        studentData : []
    }
    //Component Did Mount
    componentDidMount()
    {
        this.getData();
    }
    //Get The Data Fro Backend Api
    getData = ()=>{
        axios("http://localhost:8080/speaker/list")
        .then((res) =>{
            this.setState({
                studentData : res.data
            });
        });
    }
    //Delete Student Function
    deleteStudent = (student_id)=>{
        axios.post("http://localhost:8080/speaker/delete",{
            speakerId: student_id
        }).then(res => this.getData() );
    }
    render(){
        return(
            <Fragment>
                {/* Router Using Path , Component and Send MyData */}
                <Route exact path="/listSpeakers" component = {() => <ListSpeakers studentData = {this.state.studentData}
                        handlerDelete = {this.deleteStudent}
                />} />
                <Route exact path="/AddSpeaker" component= {() => <AddSpeaker/>} />
                <Route exact path="/edit/:id" component = {(props) => <EditSpeaker {...props} studentData = {this.state.studentData}/>  } />
            </Fragment>
        )
    }
}
export default StudentApp