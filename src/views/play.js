import React from 'react'
import shuffle from 'lodash/shuffle'

import Card from '../components/card'
import Cards from '../cards'

export default React.createClass({
  getInitialState () {
    return { cardsList: shuffle([].concat(Cards)) }
  },

  render () {
    return (
      <div className='play-view'>
        <div className='cards'>
          {this.renderCardsList()}
        </div>
        <div className='control'>
        </div>
      </div>
    )
  },

  renderCardsList () {
    return this.state.cardsList.map((data) =>
      <Card key={`card-${data.label}`} onClick={this.cardClicked} {...data} />)
  },

  cardClicked (currentCard) {
    const newArray = [].concat(this.state.cardsList.map((item) => {
      if (item.label === currentCard.label) {
        return [{}, item, currentCard].reduce(Object.assign)
      }

      return item
    }))

    this.setState({ cardsList: newArray })
  }
})
