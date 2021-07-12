import React, { useRef } from 'react'
import {v4 as uuidV4 } from 'uuid'
//Python equivalent: from uuid import v4 as uuidV4

export default function Login({ onIdSubmit }) {

    //refs
    const idRef = useRef()

    //functions
    function handleSubmit(e){
        e.preventDefault()

        //call the function that create the ID here. States of those id will be stored in App.js since it need to be global
        onIdSubmit(idRef.current.value) //pass the current value of ref here, then to setId
    }

    function createId(e){
        e.preventDefault()

        //create a new uuid
        onIdSubmit(uuidV4())
    }

    return (
        <div className='container align-items-center d-flex min-vh-100 justify-content-center'>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="idInput" className="mb-2">Enter your ID: </label>
                    <input type="text" className="form-control" id="idInput" ref={idRef} required />
                </div>
                <button className='btn btn-dark my-3' type='submit'>Login</button>
                <p>New here? <a href="" onClick={createId} className="text-muted fst-italic">Create a new ID</a></p>
            </form>
        </div>
    )
}
