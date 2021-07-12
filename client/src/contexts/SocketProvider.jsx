import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'  //a function we can call to get an individual socket

const SocketContext = React.createContext()

export function useSocket(){
    return useContext(SocketContext)
}


export function SocketProvider({ children, id }) {

    const [socket, setSocket] = useState()

    useEffect(() => {
        const newSocket = io('http://localhost:5000', { query: {id} })  //declare a socket, this will connect us to the server
        setSocket(newSocket)

        return () => newSocket.close()
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            
        </SocketContext.Provider>
    )
}
