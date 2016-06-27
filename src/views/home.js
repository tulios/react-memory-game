import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render () {
    return (
      <div className='home-view'>
        <ul>
          <li><Link to='/play'>Play</Link></li>
          <li><Link to='/scores'>Scores</Link></li>
          <li><Link to='/about'>About</Link></li>
        </ul>
      </div>
    )
  }
})
