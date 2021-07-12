import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'

export default function NewConversationModal({ closeModal }) {

    const { contacts } = useContacts()
    const { createConversation } = useConversations()
    const [selectedContacts, setSelectedContacts] = useState([])

    function updateCheckbox(id){
        setSelectedContacts(prevSelectedContacts => {
            if (prevSelectedContacts.includes(id)){   //if the target contact is already selected, remove the selection (by remove it from the list)
                return prevSelectedContacts.filter(prevId => {
                    return id !== prevId
                })
            }
            else{
                return [...prevSelectedContacts, id] //othewise, add it to the list
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()

        createConversation(selectedContacts)
        closeModal()
    }

    return (
        <>
            <Modal.Header closeButton>
                <h5>Create Conversation</h5>
            </Modal.Header> 
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check type='checkbox' value={selectedContacts.includes(contact.id)} label={contact.name} onChange={() => updateCheckbox(contact.id)}/>
                            {/* value of a particular checkbox will be either true or false, base on if the currently selected contacts contain that contact or not */}
                        </Form.Group>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">Create</Button>
                </Modal.Footer>
            </Form>
        </>
    )
}
