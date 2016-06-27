import React from 'react'
import Header from '../components/header'

export default React.createClass({
  render () {
    return (
      <div className='layout'>
        <Header />
        <main>
          {this.props.children}
        </main>
        <footer>
        </footer>
      </div>
    )
  }
})
