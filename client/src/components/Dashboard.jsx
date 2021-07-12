import React from 'react'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Dashboard({ id }) {

    const { selectedConversation } = useConversations()

    return (
        <div className='d-flex' style={{ height: '100vh' }}>
            {/* must be height not min height, since you only want the scroll on the messages not the whole page */}
            <Sidebar id={id}/>
            {selectedConversation && <OpenConversation />}
        </div>
    )
}
