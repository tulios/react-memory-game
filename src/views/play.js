import React from 'react'
import Card from '../components/card'
import CardsList from '../cards'

export default React.createClass({
  render () {
    return (
      <div className='play-view'>
        <div className='cards'>
          {CardsList.map((data) => <Card key={`card-${data.label}`} {...data} />)}
        </div>
        <div className='control'>
        </div>
      </div>
    )
  }
})
