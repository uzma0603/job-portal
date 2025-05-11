import React, { Component } from 'react';
import './JobPosting.css';
import { callApi } from './api';
class JobPosting extends Component {
    constructor()
    {
        super();
        this.state={
            id:'',
            title:'',
            company:'',
            location:'',
            jobtype:'',
            salary:'',
            description:''

        };
        this.state={jobList:[]};
        this.readjobsresponse=this.readjobsresponse.bind(this);
        this.updateJobresponse=this.updateJobresponse.bind(this);
        this.saveJobResponse=this.saveJobResponse.bind(this);
    }
    componentDidMount()
    {
        callApi("GET","http://localhost:8087/jobs/readjob","",this.readjobsresponse);
    }
    readjobsresponse(response)
    {
        if(response.includes("401::"))
        {
            alert(response.split("::")[1]);
            return;
        }
        let data=JSON.parse(response);
        this.setState({jobList:data});

    }
    loadInputChange(event)
    {
        this.setState({[event.target.name]:event.target.value});
    }
    saveJobDetails()
    {
        let data=JSON.stringify(this.state);
        if(this.state.id==="")
        {
        callApi("POST","http://localhost:8087/jobs/insert",data,this.saveJobResponse);
        }
        callApi("PUT","http://localhost:8087/jobs/update",data,this.saveJobResponse);
    }
    saveJobResponse(response)
    {
        let data=response.split("::");
        alert(data[1]);
        this.componentDidMount();
    }
    showPopUp()
    {
        jppopup.style.display="block";
    }
    closePopup()
    {
        jppopup.style.display="none";
    }
    updateJob(id)
    {
        callApi("GET","http://localhost:8087/jobs/getjob/"+id,"",this.updateJobresponse);
    }
    updateJobresponse(response)
    {
        if(response.includes("401::"))
            {
                alert(response.split("::")[1]);
                return;
            }
            let data=JSON.parse(response);
            this.setState({
                id:data.id,
                title:data.title,
                company:data.company,
                location:data.location,
                jobtype:data.jobtype,
                salary:data.salary,
                description:data.description
            });
            this.showPopUp();
    }
    deleteJob(id)
    {
        let resp=confirm("Are You sure You want to delete");
        if(resp===false)
        {
            return;
        }
        callApi("DELETE","http://localhost:8087/jobs/delete/"+id,"",this.saveJobResponse);
    }

    render() {
        const {id,title,company,location,jobtype,salary,description}=this.state;
        const  {jobList} =this.state;
        return (
            <div className='JPContainer'>
                <div id='jppopup' className='popup'>
                    <div className='popupwindow'>
                        <div className='popupheader'>
                            <label>New Job added</label>
                            <span onClick={()=>this.closePopup()}>&times;</span>
                        </div>
                        <div className='popupcontent'>
                            <label>Job Title*</label>
                            <input type='text' id="T1" name='title' value={title} onChange={(event)=>this.loadInputChange(event)} />

                            <label>Company Name*</label>
                            <input type='text' id="T2" name='company' value={company} onChange={(event)=>this.loadInputChange(event)} />

                            <label>Location*</label>
                            <input type='text' id="T3" name='location' value={location} onChange={(event)=>this.loadInputChange(event)} />

                            <label>Job Type*</label>
                            <select id='T4' name='jobtype' value={jobtype} onChange={(event)=>this.loadInputChange(event)}>
                                <option value="0"></option>
                                <option value="1">Full-time</option>
                                <option value="2">Part-time</option>
                            </select>

                            <label>Salary*</label>
                            <input type='text' id="T5" name='salary' value={salary} onChange={(event)=>this.loadInputChange(event)} />

                            <label>Job Description*</label>
                            <textarea id='T6' rows="5" name='description' value={description} onChange={(event)=>this.loadInputChange(event)}></textarea>
                            
                            <button onClick={()=>this.saveJobDetails()}>Save</button>
                        </div>
                        <div className='popupfooter'></div>
                    </div>
                </div>
                <div className='header'>
                    <label>All Jobs</label>
                </div>
                <div className='content'>
                    {jobList.map((data)=>(
                        <div className='result'>
                            <div className='div1'>
                                <label>{data.title}</label>
                                <span>{data.salary}</span>
                                <img src='/edit.png' alt='' onClick={()=>this.updateJob(data.id)} />
                                <img src='/delete.png' alt='' onClick={()=>this.deleteJob(data.id)} />
                            </div>
                            <div className='div2'>
                                {data.company}|{data.location}|{data.jobtype==="1"?'Full-Time':'Part-Time'}
                            </div>
                            <div className='div3'>
                                {data.description}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='footer'>
                    <button onClick={()=>this.showPopUp()}>Add Job</button>
                </div>
                
            </div>
        );
    }
}

export default JobPosting;
