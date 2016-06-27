import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render () {
    return (
      <header>
        <h1>
          <Link to='/'>Memory Game</Link>
        </h1>
      </header>
    )
  }
})
