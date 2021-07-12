//https://www.youtube.com/watch?v=5LrDIWkK_Bc
//https://www.youtube.com/watch?v=35lXWvCuM8o

import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext()

export function useConversations(){
    return useContext(ConversationsContext)  //quick shorthand, so you just need to import this
}

export function ConversationsProvider({ id, children }) { //children = react components
    

    //states
    const [conversations, setConversations] = useLocalStorage('conversations', [])   //stored name: contacts; default value: empty
    const [selectedConIndex, setSelectedConIndex] = useState(0) //select the very first conversation by default
    const { contacts } = useContacts()
    const { socket } = useSocket()

    //create a blank conversation
    function createConversation(recipients){  //recipients = list of selected ids
        setConversations(prevConversations => {
            return [...prevConversations, {recipients, message: []}] //add a new conversation to the list, with the info: participants and message list
        })
    }

    
    //a function to be call by both the server (when others send message) and you (when you sen the message)
    const addMessage = useCallback(({ recipients, text, sender }) => {
        setConversations(prevConversations => {
            let madeChange = false //check if there exist a conversation with the recipients match the recipients above
            const newMessage = { sender, text }
            const newConversation = prevConversations.map(con => {
                if (arrayEqual(con.recipients, recipients)){   //if there exist a con
                    madeChange = true
                    return {...con, message: [...con.message, newMessage]}   //need to be message (no s here) since u are retrieving it from storage
                }

                return con  //otherwise just leave it there
            })

            if (madeChange){
                return newConversation   //if exist, add the message to the end
            }

            else{  //no conversation with the specified recipients exist, create new one
                return [...prevConversations, { recipients, messages: [newMessage] }]
            }
        })
    }, [setConversations])

    useEffect(() => {
        if (socket == null) return

        socket.on('receive-message', addMessage)  //when the server response message receieve, add it to the conversation

        return () => socket.off('receive-message')
    }, [socket, addMessage])

    //the sendMessage function, to be called by OpenConversation. sender = your current id, passed as a prop to the provider
    function sendMessage(recipients, text){
        //console.log('hello')
        socket.emit('send-message', { recipients, text })   //send an event to the server, pass to it any info you want. On the server side, listen to this event
        addMessage({ recipients, text, sender: id })
    }


    //return an object for each conversation
    const displayConversations = conversations.map((con, index) => { //for each of the conversation. use of index: https://stackoverflow.com/questions/36440835/react-using-map-with-index 
        const recipients = con.recipients.map(r => {  //for each of the recipients in the conversation
            const contact = contacts.find(contact => {  //find in the contact list if there exist a contact with the id similar to that recipient
                return contact.id === r
            })
            const name = (contact && contact.name) || r  //so either just an id, or a contact with a name
            return {id: r, name} //for each recipient, return this chunk
        })


        //determine who send the message
        const messages = con.message.map(m => {  //for each of the message
            const contact = contacts.find(contact => {  //find in the contact list if there exist a contact with the id similar to the sender
                return contact.id === m.sender  //show the contact name
            })
            const name = (contact && contact.name) || m.sender   //fall back case, show the id
            const fromMe = id === m.sender //see if the message sender is you
        
            return { ...m, senderName: name, fromMe }  //for each message return this chunk
        })

        const selected = index === selectedConIndex  //this conversation is currently selected if its index = the selectedConIndex
        return {...con, messages, recipients, selected}   //for each conversation, return this chunk
    })


    //the values to pass to the provider below
    const value = { 
        conversations: displayConversations,
        selectedConversation: displayConversations[selectedConIndex], //info (messages + participants) about the selected con
        sendMessage,
        selectedConIndex: setSelectedConIndex,
        createConversation,
    }

    return(
        <ConversationsContext.Provider value={value}>
            { children } 
            {/* render out the children inside of the provider. all the value up there are passed to the children */}
        </ConversationsContext.Provider>
    )
}



function arrayEqual(a, b) {
    if (a.length !== b.length) return false
    
    a.sort()
    b.sort()

    return a.every((element, index) => {
    return element === b[index]
    })
}