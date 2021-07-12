import './App.css';
import React, { useState } from 'react';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import useLocalStorage from './hooks/useLocalStorage';
import { ContactsProvider } from './contexts/ContactsProvider'
import { ConversationsProvider } from './contexts/ConversationsProvider'
import { SocketProvider } from './contexts/SocketProvider';

function App() {

  //states
  const [id, setId] = useLocalStorage('id')

  //wrap the dashboard around the contacts provider
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id}/>
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    <div className="App">
      {id ? dashboard : <Login onIdSubmit={setId}/>}
      {/* If an id exist on the local machine, go to dashboard, otherwise go to login */}
    </div>
  );
}

export default App;
