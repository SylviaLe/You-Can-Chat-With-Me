import React from 'react'
import { useContacts } from '../contexts/ContactsProvider'
import { ListGroup } from 'react-bootstrap'

export default function Contacts() {

    const { contacts } = useContacts()  //essentially the same as useContext, but we shorthand it in the context.js

    return (
        <ListGroup variant='flush'>
            {contacts.map(contact => {
                return (
                    <ListGroup.Item key={contact.id}>
                        {contact.name}
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}
