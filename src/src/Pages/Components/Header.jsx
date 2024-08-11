import React from 'react'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const loc = useLocation();

    return (
        <>
            <div>Header</div>
            {loc.pathname === '/events' ? 
            <div>Events</div> :
            <div>Challenges</div>}
        </>

  )
}

export default Header