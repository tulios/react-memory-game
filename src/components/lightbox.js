import React from 'react'

export default React.createClass({
  render () {
    return (
      <div className='lightbox'>
        <div className='container'>{this.props.children}</div>
        <div className='overlay' />
      </div>
    )
  }
})
