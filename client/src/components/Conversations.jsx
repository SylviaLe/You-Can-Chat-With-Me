import React from 'react'
import { useConversations } from '../contexts/ConversationsProvider'
import { ListGroup } from 'react-bootstrap'

export default function Conversations() {

    const { conversations, selectedConIndex } = useConversations()

    return (
        <ListGroup variant='flush'>
            {conversations.map((con, index) => {
                return (
                    <ListGroup.Item key={index} action active={con.selected} onClick={() => selectedConIndex(index)}>
                        {con.recipients.map(r => r.name).join(', ')}
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}
