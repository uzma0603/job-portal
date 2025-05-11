import React, { Component } from 'react';
import './App.css';
import { callApi, setSession } from './api';

class App extends Component {
    constructor()
    {
        super();
        this.userRegistrtaion=this.userRegistrtaion.bind(this);
        this.forgetpassword=this.forgetpassword.bind(this);
        this.signin=this.signin.bind(this);
    }
    showSignin()
    {
        let popup=document.getElementById("popup");
        popup.style.display="block";
        let signin=document.getElementById("signin");
        let signup=document.getElementById("signup");
        let popupheader=document.getElementById("popupHeader");
        popupheader.innerHTML="LogIn";
        signin.style.display="block";
        signup.style.display="none";
        username.value="";
        password.value="";
    }
    showSignup()
    {
        let popup=document.getElementById("popup");
        popup.style.display="block";
        let signin=document.getElementById("signin");
        let signup=document.getElementById("signup");
        let popupheader=document.getElementById("popupHeader");
        popupheader.innerHTML="Create new Account";
        signin.style.display="none";
        signup.style.display="block";
        let fullname=document.getElementById("firstname");
        let email=document.getElementById("email");
        let role=document.getElementById("role");
        let signuppassowrd=document.getElementById("signuppassword");
        let confirmpassword=document.getElementById("confirmpassword");
        fullname.value="";
        email.value="";
        role.value="";
        signuppassowrd.value="";
        confirmpassword.value="";
    }
    closeSignin(event)
    {        if(event.target.id==="popup")
        {
            let popup=document.getElementById("popup");
            popup.style.display="none";  
        }

    }
    userRegistrtaion()
    {
        let fullname=document.getElementById("firstname");
        let email=document.getElementById("email");
        let role=document.getElementById("role");
        let signuppassowrd=document.getElementById("signuppassword");
        let confirmpassword=document.getElementById("confirmpassword");
        fullname.style.border="";
        email.style.border="";
        role.style.border="";
        signuppassowrd.style.border="";
        confirmpassword.style.border="";
        if(fullname.value==="")
        {
            fullname.style.border="1px solid red";
            fullname.focus();
            return;
        }
        if(email.value==="")
        {
            email.style.border="1px solid blue";
            email.focus();
            return;
        }
        if(role.value==="")
        {
            role.style.border="1px solid yellow";
            role.focus();
            return;
        }
        if(signuppassowrd.value==="")
        {
            signuppassowrd.style.border="1px solid red";
            signuppassowrd.focus();
            return;
        }
        if(signuppassowrd.value!=confirmpassword.value)
        {
            signuppassowrd.style.border="1px solid purple";
            signuppassowrd.focus();
            return;
        }
        var data=JSON.stringify({
            fullname:fullname.value,
            email:email.value,
            role:role.value,
            password:signuppassowrd.value

        });
        callApi("POST","http://localhost:8087/users/signup",data,this.getResponse);

    }
    getResponse(res)
    {
        let resp=res.split('::');
        alert(resp[1]);
        if(resp[0]==="200")
        {
            let signin=document.getElementById("signin");
            let signup=document.getElementById("signup");
            signin.style.display="block";
            signup.style.display="none";
        }        
    }  
    forgetpassword()
    {
        username.style.border="";
        if(username.value==="")
        {
            username.style.border="1px solid red";
            username.focus();
            return;
        }
        let url="http://localhost:8087/users/forgetpassword/"+username.value;
        callApi("GET",url,"",this.forgetpasswordResponse);
    }
    forgetpasswordResponse(res)
    {
        let data=res.split('::');
        if(data[0]==="200")
        {
            responseDiv1.innerHTML=`<br/><br/><br/><label style='color:green'>${data[1]}</label>`;
        }
        else
        {
            responseDiv1.innerHTML=`<br/><label style='color:red'>${data[1]}</label>`;
        }     
    } 
    signin()
    {
        username.style.border="";
        password.style.border="";
        responseDiv1.innerHTML="";
        if(username.value==="")
        {
            username.style.border="1px solid red";
            username.focus();
            return;
        }
        if(password.value==="")
        {
            password.style.border="1px solid red";
            password.focus();
            return;
        }
        let data=JSON.stringify({
            email:username.value,
            password:password.value
        });
        callApi("POST","http://localhost:8087/users/signin",data,this.signinResponse);
    }
    signinResponse(res)
    {
        let rdata=res.split("::");
        if(rdata[0]==="200")
        {
            setSession("csrid",rdata[1],1);
            window.location.replace("/dashboard");
        }
        else
        {
            responseDiv1.innerHTML=`<br/><br/><label style='color:red'>${rdata[1]}</label>`;
        }
    }
      
    
    render() {
        
        return (
            <div id='container'>
                <div id='popup' onClick={this.closeSignin}>
                    <div id='popupWindow'>
                        <div id='popupHeader'>Login</div>
                        <div id='signin'>
                            <label className='usernameLabel'>User Name</label>
                            <input type='text' id='username' />
                            <label className='passwordLabel'>Password</label>
                            <input type='password' id='password' />
                            <div className='forgetpassword'>Forget <label onClick={this.forgetpassword}>Password?</label></div>
                            <button className='siginButton' onClick={this.signin}>SIGN IN</button>
                            <div className='div1' id='responseDiv1'></div>
                            <div className='div2'>
                                Don't have an Account?
                                <label onClick={this.showSignup}> SIGN UP NOW</label>
                            </div>
                        </div>
                        <div id='signup'>
                            <label className='firstName'>FullName:</label>
                            <input type='text' id='firstname' />
                            <label className='email'>Email:</label>
                            <input type='text' id='email' />
                            <label>Select Role</label>
                            <select id='role'>
                                <option value=''></option>
                                <option value='1'>Admin</option>
                                <option value='2'>Employeer</option>
                                <option value='3'>JobSeeker</option>
                            </select>
                            <label className='password'>Password:</label>
                            <input type='password' id='signuppassword' />
                            <label className='confirmpassword'>Confirm Password</label>
                            <input type='password' id='confirmpassword' />
                            <button onClick={this.userRegistrtaion}>Register</button>
                            <div>Already You have an account?<span onClick={this.showSignin}>signIn</span></div>
                            
                        </div>

                    </div>

                </div>
                <div id='header'>
                   <img className='logo' src='logo.png' alt='' />
                   <div className='logoText'><span>Job</span> portal</div>
                   <img className='signinIcon' src='user.png' alt='' onClick={this.showSignin} />
                   <label className='signinText' onClick={this.showSignin}>signIn</label>
                </div>
                <div id='content'>
                    <div className='text1'>welcome come to FSAD</div>
                    <div className='text2'>Your job search ends here</div>
                    <div className='text3'>discover carriuer opportunities</div>
                    <div className='searchBar'>
                        <input type='text' className='searchjobText' placeholder='job search by "skill"' />
                        <input type='text' className='jobloactionText' placeholder='job location'/>
                        <button className='searchjob'>searchJob</button>
                    </div>
                </div>
                <div id='footer'>
                    <label className='copyrightText'>copyright @ 2024 All rights are reserved</label>
                    <img className='socialmediaIcon' src='facebook.png' alt='' />
                    <img className='socialmediaIcon' src='linkedin.png' alt='' />
                    <img className='socialmediaIcon' src='twitter.png' alt='' />
                </div>
            </div>
        );
    }
}

export default App;
