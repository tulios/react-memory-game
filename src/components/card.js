import React from 'react'

export default React.createClass({
  propTypes: {
    image: React.PropTypes.string,
    background: React.PropTypes.string,
    label: React.PropTypes.string,
    revealed: React.PropTypes.bool,
    onClick: React.PropTypes.func
  },

  getDefaultProps () {
    return { revealed: false }
  },

  render () {
    const rotateClass = this.props.revealed ? '' : 'rotate'
    return (
      <div className={`card ${rotateClass}`} onClick={this.clickHandler}>
        <a href='#'>
          <div className='card-icon'
            style={{backgroundColor: this.props.backgroundColor}}
            dangerouslySetInnerHTML={{__html: this.props.svg}}>
          </div>
          <h2>{this.props.label}</h2>
        </a>
      </div>
    )
  },

  clickHandler (e) {
    e.preventDefault()
    this.props.onClick &&
      this.props.onClick({
        label: this.props.label,
        revealed: !this.props.revealed
      })
  }
})
