import React from 'react'

export default React.createClass({
  render () {
    return (
      <div className='layout'>
        {this.props.children}
      </div>
    )
  }
})
