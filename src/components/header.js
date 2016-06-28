import React from 'react'
import { Link } from 'react-router'
import LogoSVG from './logo-svg'

export default React.createClass({
  render () {
    return (
      <header>
        <h1>
          <Link to='/'>
            <LogoSVG /><span>Memory Game</span>
          </Link>
        </h1>
      </header>
    )
  }
})
