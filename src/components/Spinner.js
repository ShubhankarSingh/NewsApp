import React from 'react'
import loading from "../loading.gif"

const Spinner = () => {
    return (
      <div className='container d-flex justify-content-center'>
        <img src={loading} className='my-3' alt="loading" style={{height: '30px',width: '30px'}}/>
      </div>
    )
}

export default Spinner