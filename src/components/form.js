import React from 'react'

function Form({username, setUsername, password, setPassword, label, onSubmit}) {
  return (
    <div className='auth-container'>
            <form onSubmit= {onSubmit}>
                <h2> {label}</h2>
                <div className='form-group'>
                    <label for="username"> Username: </label>
                    <input type='text' id="username" value= {username} onChange={(event) => setUsername(event.target.value)} />
                </div>

                <div className='form-group'>
                    <label for="password"> Password: </label>
                    <input type='password' id="password" value= {password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type='submit'>{label}</button>
            </form>
        </div>
  )
}

export default Form