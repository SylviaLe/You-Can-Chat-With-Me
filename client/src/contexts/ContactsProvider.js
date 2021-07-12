//https://www.youtube.com/watch?v=5LrDIWkK_Bc
//https://www.youtube.com/watch?v=35lXWvCuM8o

import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts(){
    return useContext(ContactsContext)  //quick shorthand, so you just need to import this
}

export function ContactsProvider({ children }) { //children = react components
    
    const [contacts, setContacts] = useLocalStorage('contacts', [])   //stored name: contacts; default value: empty

    function createContact(id, name){
        setContacts(prevContatcs => {
            return [...prevContatcs, {id, name}]
        })
    }

    return(
        <ContactsContext.Provider value={{ contacts, createContact }}>
            { children } 
            {/* render out the children inside of the provider. all the value up there are passed to the children */}
        </ContactsContext.Provider>
    )
}
