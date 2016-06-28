import React from 'react'
import { Link } from 'react-router'
import GameOverSVG from './game-over-svg'

export default React.createClass({
  render () {
    return (
      <div className='game-over'>
        <div className='message'>
          <GameOverSVG />
          <span>Game Over</span>
        </div>
        <p>
          <Link to='/'>Try again</Link>
        </p>
      </div>
    )
  }
})
