import React, { Component } from 'react';
import './DashBoard.css';
import { callApi, getSession, setSession } from './api';
import MenuBar from './MenuBar';
import JobPosting from './JobPosting';
import JobSearch from './JobSearch';
import MyProfile from './MyProfile';
class DashBoard extends Component {
    constructor(props)
    {
        super(props);
        this.state={fullname:'',activeComponents:''};
        this.fullnameResponse=this.fullnameResponse.bind(this);
        this.loadComponents=this.loadComponents.bind(this);
    }
    componentDidMount()
    {
        let crs=getSession("csrid");
        if(crs==="")
        {
            this.logout();
        }
        
        let data=JSON.stringify({csrid:crs});
        callApi("POST","http://localhost:8087/users/getfullname",data,this.fullnameResponse);
    }
    fullnameResponse(response)
    {
        this.setState({fullname:response});
    }
    logout()
    {
        setSession("csrid","",-1);
        window.location.replace("/");
    }
    loadComponents(mid)
    {
        let components={
            "1":<JobPosting/>,
            "2":<JobSearch/>,
            "3":<MyProfile/>
        }
        this.setState({activeComponents:components[mid]});

    }
    render() {
        const {fullname,activeComponents}=this.state;
        return (
            <div className='dashboard'>
                <div className='header'>
                    <img className='logo' src='./logo.png' alt='' />
                    <div className='logoText'>Job <span>Portal</span></div>
                    <img className='logout' onClick={()=>this.logout()}src='./logout.png' alt='' />
                    <label>{fullname}</label>
                </div>
                <div className='menu'>
                    <MenuBar onMenuClick={this.loadComponents} />
                </div>
                <div className='outlet'>{activeComponents}</div>                
            </div>
        );
    }
}

export default DashBoard;
