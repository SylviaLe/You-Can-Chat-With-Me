//work the same as useState, but the data will remains when the page reload 
//see this vid: https://www.youtube.com/watch?v=6ThXsUwLWvc&t=1s 


import React, { useEffect, useState } from 'react'

const PREFIX = 'youcanchatwithme'  //since you may have a lot projects that all use localhost:3000, adding prefix prevents the storage of these apps from conflicting

export default function useLocalStorage(key, iniVal) {  
    //key: what you stored in the storage. iniVal: in local storage var exist in key value pair. given a key but not a value, iniVal is the 'default' value of var before it is changed to something else. This can be a state, so its form will be either a var or a function
    
    //get the vals from local storage
    const prefixKey = PREFIX + key
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixKey)  //get the json version of the value
        if (jsonValue != null) return JSON.parse(jsonValue)  //if the json value exist, parse 
        if (typeof iniVal === 'function'){
            return iniVal()
        }
        else{
            return iniVal
        }
    })  //the function version wont be run multiple time every time the page rerender

    //save the value to local storage
    useEffect(() => {
        localStorage.setItem(prefixKey, JSON.stringify(value))
    }, [prefixKey, value])

    return [value, setValue]
}



//NOTE: if you hit this error: A cross-origin error was thrown. React doesn't have access to the actual error object in development. Clear the local storage in the console