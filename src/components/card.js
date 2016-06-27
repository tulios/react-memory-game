import React from 'react'

export default React.createClass({
  propTypes: {
    image: React.PropTypes.string,
    background: React.PropTypes.string,
    label: React.PropTypes.string
  },

  render () {
    return (
      <div className='card'>
        <a href='#'>
          <div className='card-icon'
            style={{backgroundColor: this.props.backgroundColor}}
            dangerouslySetInnerHTML={{__html: this.props.svg}}>
          </div>
          <h2>{this.props.label}</h2>
        </a>
      </div>
    )
  }
})
