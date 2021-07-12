import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function OpenConversation() {

    const [text, setText] = useState('')  //state for the input message 
    //auto scroll to the latest message
    const lastMessageRef = useRef()  
    const setRef = useCallback(node => {
        if (node){
            node.scrollIntoView({ smooth: true })
        }
    }, [])
    const { sendMessage, selectedConversation } = useConversations()  //sendMessage will be created in the provider

    function handleSubmit(e){
        e.preventDefault()

        sendMessage(selectedConversation.recipients.map(r => r.id), text)  //send mess to the selected recipient, with the text typed in
        setText('') //clear the input box after the message has been sent
    }

    return (
        <div className='d-flex flex-column flex-grow-1'>
            <div className="flex-grow-1 overflow-auto">
                {/* all messages wrapper */}
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {/* one message wrapper, include the text and the sender */}
                    {/* by default: all the messages stay on the left and bottom first, then work their way up */}
                    {selectedConversation.messages.map((m, index) => {  //messages (with s) is because u are getting data from the displayCon array, from the provider
                        const lastMessage = selectedConversation.messages.length - 1 === index
                        return (
                            <div key={index} ref={lastMessage ? setRef : null} className={`my-1 d-flex flex-column ${m.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}>
                                {/* the message bubble and the sender name div */}
                                <div className={`rounded px-2 py-1 ${m.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {m.text}
                                </div>
                                <div className={`text-muted small ${m.fromMe ? 'text-right' : ''}`}>{m.fromMe ? 'You' : m.senderName}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* the send message form */}
            <Form  onSubmit={handleSubmit}> 
                <Form.Group> 
                    <InputGroup>
                        <Form.Control as="textarea" required value={text} onChange={e => setText(e.target.value)} style = {{height: '75px', resize: 'none'}}/>
                        <InputGroup.Append>
                            <Button type='submit' style = {{height: '75px', resize: 'none'}}>Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
