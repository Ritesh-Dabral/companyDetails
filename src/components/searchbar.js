import React,{useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

function Searchbar() {
    const History = useHistory();
    const [search,setSearch] = useState('');
    const [err,setErr] = useState('');

    const submitForm = (e)=>{
        e.preventDefault();
        const obj = {
            recData : search.toString()
        };
        axios.post('http://localhost:8085',obj)
        .then((res)=>{
            setSearch('');
            setErr('');
            History.push('/result');
        })
        .catch((error)=>{
            setSearch('');
            setErr(error.message);
        });       
    }

    return (
        <form className="ui form" onSubmit={submitForm}>
            <div className="field">
                <label style={{"textAlign":"center", "fontSize":"2rem", "margin":"1rem 0"}}>Company Name</label>
                <div id="srchCmpny">
                    <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} name="companyName" required/>
                    <button className="ui button" type="submit"><i className="search icon"></i></button>
                </div>
                <div style={{"color":"red"}}>{err}</div>
            </div>
        </form>
    )
}

export default Searchbar;
