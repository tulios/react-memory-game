import React from 'react'

export default React.createClass({
  propTypes: {
    timeInSeconds: React.PropTypes.number,
    onTimeExpired: React.PropTypes.func,
    stop: React.PropTypes.bool
  },

  getInitialState () {
    return { timeInSeconds: this.props.timeInSeconds || 0 }
  },

  render () {
    return (
      <span className='count-down'>
        {this.formattedTime()}
      </span>
    )
  },

  componentDidMount () {
    this.interval = setInterval(this.tick, 1000)
  },

  componentWillUnmount () {
    clearInterval(this.interval)
  },

  tick () {
    if (this.props.stop) {
      clearInterval(this.interval)
      return
    }

    this.setState({ timeInSeconds: this.state.timeInSeconds - 1 })
    if (this.state.timeInSeconds <= 0) {
      clearInterval(this.interval)
      this.props.onTimeExpired &&
        this.props.onTimeExpired()
    }
  },

  formattedTime () {
    let minutes = Math.floor(this.state.timeInSeconds / 60)
    if (String(minutes).length < 2) minutes = `0${minutes}`
    let seconds = this.state.timeInSeconds % 60
    if (String(seconds).length < 2) seconds = `0${seconds}`
    return `${minutes}:${seconds}`
  }
})
