import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'

export default function NewContactModal({ closeModal }) {

    const idRef = useRef()
    const nameRef = useRef()
    const { createContact } = useContacts()
    
    function handleSubmit(e){
        e.preventDefault()

        console.log('info stored')
        //create the contact function
        createContact(idRef.current.value, nameRef.current.value)
        closeModal()
    }


    return (
        <>
            <Modal.Header closeButton>
                <h5>Create Contact</h5>
            </Modal.Header> 
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Id</Form.Label>
                        <Form.Control  type='text' ref={idRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control  type='text' ref={nameRef} required></Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">Create contact</Button>
                </Modal.Footer>
            </Form>
        </>
    )
}
