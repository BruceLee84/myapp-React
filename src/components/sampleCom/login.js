import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "../home";
import swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import './page.css';



function Login(){
     const navigate = useNavigate(); 
     const[userName, userNameData]=useState('');
     const[Password, PasswordData]=useState('');

     const login = async()=>{
        console.log("Name", userName)
        console.log("password", Password)
        const detail = await axios.post('http://192.168.29.174:3030/api/v1/user/login', {userName, Password})
        // console.log("det", detail)
        localStorage.setItem('token', detail.data.result.token)
        localStorage.setItem('uuid', detail.data.result.uuid)
        localStorage.setItem('Name', detail.data.result.userName)
        localStorage.setItem('Email', detail.data.result.Email)
        localStorage.setItem('role', detail.data.result.role)
        localStorage.setItem('Number', detail.data.result.PhoneNumber)
        localStorage.setItem('image', detail.data.result.image)
        // console.log('token', detail.data.result.token)
        console.log("result", detail.data.result)
        // console.log("Nmuber", detail.data.result.PhoneNumber)
        console.log("role", detail.data.result.role)
        // console.log("status", detail.status)
        if(detail.data.result.role == 'admin'){
        swal.fire({
            title: "Admin!",
            text: "welcome",
            icon: "success"
        })
        navigate('/home', {state:detail.data})
        // window.location.href ='/home'; 
    }if(detail.data.result.role == 'user'){
        swal.fire({
            title: "LOGIN SUCCESS!",
            text: "welcome",
            icon: "success"
        })
        navigate('/home', {state:detail.data})
        // window.location.href ='/home'; 
    }
    // else{
    //     alert("userName and password is Wrong!");
    // }
}

    return(
        <>
        <div className="im">
        <div className="bgd">
        <form className="form">
            <div className="container">
                <h3 className="w">Login</h3>
                <div className="box">
                   <input className="in" type="text" placeholder="username" name="name" onChange={(text)=>userNameData(text.target.value)}></input><br></br><br></br>
                   <input className="in" type="Password" placeholder="password" name="password" onChange={(password)=>PasswordData(password.target.value)}></input><br></br><br></br>
                   <small className="pw" onClick={()=>window.location.href='/forgot'}>forgot password</small><br></br><br></br>
                   <center><button className="btn-btn" type="button" onClick={login}>Login</button><br></br><br></br>
                   <h5>Login With</h5>
                   <div className="row">
                    <div className="column">
                   <img className="pic" src='https://logowik.com/content/uploads/images/985_google_g_icon.jpg' onClick={()=>window.location.href='/google'}/>
                   </div>
                   <div className="column2">
                   <img className="pic" src="https://logowik.com/content/uploads/images/new-facebook-logo-2019.jpg" onClick={()=>window.location.href='/facebook'}/>
                   </div>
                   </div>
                   <h5 className="t">New User?</h5><p className="pa" onClick={()=>window.location.href = '/signUp'}>SignUp</p></center>
                </div>
            </div>
        </form>
        </div>
        </div>
        </>
    )
}

export default Login;