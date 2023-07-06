import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateClub() {
  const navigate = useNavigate();

  const [club_name, setClubName] = useState("")
  const [short_descrption, setShortDescription] = useState("")
  const [club_image, setClubImage] = useState()
  const [validationError,setValidationError] = useState({})

  const changeHandler = (event) => {
    setClubImage(event.target.files[0]);
	};

  const createClub = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('club_name', club_name)
    formData.append('short_descrption', short_descrption)
    formData.append('club_image', club_image)

    await axios.post(`http://attendenceapp.test/api/club`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/clubdata")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create Club</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={createClub}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="club_name">
                            <Form.Label>club_name</Form.Label>
                            <Form.Control type="text" value={club_name} onChange={(event)=>{
                              setClubName(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="short_descrption">
                            <Form.Label>short_descrption</Form.Label>
                            <Form.Control as="textarea" rows={3} value={short_descrption} onChange={(event)=>{
                              setShortDescription(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="club_image" className="mb-3">
                        <Form.Label>club_image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}