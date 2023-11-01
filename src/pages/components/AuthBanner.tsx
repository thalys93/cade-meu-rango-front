import React from 'react'
import { Badge } from 'react-bootstrap'

function AuthBanner() {   
    

    const customStyle: React.CSSProperties = {
        position: 'absolute',        
        transform: 'rotate(-45deg)',
        width: '10.8680rem',
        borderRadius: '0',
    };

  return (
    <Badge bg="warning" style={customStyle as React.CSSProperties} className='my-5 top-10 text-dark'>
        <h2> Autenticado </h2>
    </Badge>
  )
}

export default AuthBanner