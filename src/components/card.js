import React from 'react'

export default React.createClass({
  propTypes: {
    image: React.PropTypes.string,
    background: React.PropTypes.string,
    label: React.PropTypes.string,
    revealed: React.PropTypes.bool,
  },

  render () {
    const rotateClass = this.props.revealed ? '' : 'rotate'
    return (
      <div className={`card ${rotateClass}`}>
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
