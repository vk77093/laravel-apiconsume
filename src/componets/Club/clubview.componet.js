import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function ClubData(){
    const [clubs,setClubs]=useState([])
    useEffect(()=>{
fetchClubs();
    },[])
    const fetchClubs=async() =>{
await axios.get('http://attendenceapp.test/api/club').then(({data})=>{
    setClubs(data)
})
    }

    // Deleting The Products
    const deleteClub = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`http://attendenceapp.test/api/club/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchClubs()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }
    return (
        <div className="container">
            <div className="row">
            <Link className="btn btn-primary mb-2 float-end" to={"/club/create"}>
                    Create Club 
                </Link>
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table table-responsive">
                    <table className="table table-bordered mb-0 text-center">
                    <thead>
                                <tr>
                                    <th>Club Name</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>{
                            clubs.length > 0 && (
                                        clubs.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.club_name}</td>
                                                <td>{row.short_descrption}</td>
                                                <td>
                                                    <img width="50px" src={`http://attendenceapp.test/storage/clubsImages/${row.club_image}`} />
                                                </td>
                                                <td>
                                                    <Link to={`/club/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteClub(row.id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}