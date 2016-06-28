import React from 'react'
import { Link } from 'react-router'
import VictorySVG from './victory-svg'

export default React.createClass({
  render () {
    return (
      <div className='victory'>
        <div className='message'>
          <VictorySVG />
          <span>Congrats!</span>
        </div>
        <p>
          <Link to='/'>Play again</Link>
        </p>
      </div>
    )
  }
})
