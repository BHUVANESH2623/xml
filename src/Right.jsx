import React, { useState } from 'react'
import './right.scss'

export const Right = ({xPath}) => {
  const [gen,setGen]=useState(false);
  return (
    <div className='rightcontainer'>
      <button className="btn" onClick={()=>{setGen(true)}}>Generate JSON</button>
      {xPath && gen && (
          <div className='content'>
            <h3>XPath</h3>
            <pre>{JSON.stringify(xPath, null,2)}</pre>
          </div>
        )}
    </div>
  )
}

