import React from 'react'

export default React.createClass({
  render () {
    return (
      <div className='layout'>
        <h1>Memory Game</h1>
        {this.props.children}
      </div>
    )
  }
})
