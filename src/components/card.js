import React from 'react'

export default React.createClass({
  propTypes: {
    index: React.PropTypes.number,
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
    const className = this.props.revealed ? '' : 'rotate'

    return (
      <div className={`card ${className}`} onClick={this.clickHandler}>
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
        index: this.props.index,
        label: this.props.label,
        revealed: !this.props.revealed
      })
  }
})
