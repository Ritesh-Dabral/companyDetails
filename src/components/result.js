import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Table from './table';


function Result() {
    const [res,setRes] = useState([]);
    const [err,setErr] = useState('');
    const [toggle,setToggle] = useState(true);

    useEffect(()=>{
        axios.get('http://localhost:8085/')
        .then(received=>{
            setRes(received.data);
            setErr('');
        })
        .catch(error=>{setErr(error.message)});
    },[]);

    const loadAgain = (e)=>{
        e.preventDefault();
        axios.get('http://localhost:8085/')
        .then(received=>{
            setRes(received.data);
        })
        .catch(error=>{setErr(error.message)});
    }

    
    return (
        <div className="result">
            <div style={{"color":"red"}} className="resErr">{err}</div>
            <div className="sideRes">
                <button class="ui button"><Link to="/">Back to Search</Link></button>
                <button class="ui button" onClick={loadAgain}><i class="redo icon"></i></button>
            </div>
            <h1>Result Page</h1>
            <div className="resTable">
                <table>
                    <thead>
                        <tr>
                            <th><strong>CIN</strong></th>
                            <th><strong>Company Name</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            res.map((allRes,index)=>(
                                <Table key={index} allRes={allRes}/>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default React.memo(Result);
