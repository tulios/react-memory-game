import React from 'react'
import Header from '../components/header'
import Copyright from '../components/copyright'

export default React.createClass({
  render () {
    return (
      <div className='layout'>
        <Header />
        <main>
          {this.props.children}
        </main>
        <footer>
          <Copyright />
        </footer>
      </div>
    )
  }
})
