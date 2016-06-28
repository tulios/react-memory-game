import React from 'react'
import shuffle from 'lodash/shuffle'

import Card from '../components/card'
import Cards from '../cards'

const NOOP = function () {}
const REVEAL_PERIOD = 850 // ms

function merge (...args) {
  return [{}, ...args].reduce(Object.assign)
}

export default React.createClass({
  getInitialState () {
    return {
      cardsList: this.generateGame(),
      match: {}
    }
  },

  componentWillMount () {
    clearTimeout(this.timeout)
  },

  componentDidMount () {
    this.enableCardClick()
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

  componentWillUnmount () {
    clearTimeout(this.timeout)
  },

  renderCardsList () {
    return this.state.cardsList.map((data, i) => {
      return (
        <Card
          key={`card-${data.label}-${i}`}
          index={i}
          onClick={!data.revealed ? this.cardClicked : NOOP}
          {...data} />
      )
    })
  },

  cardClicked (currentCard) {
    if (this.isCardClickDisabled) return
    this.disableCardClick()

    const cardsList = this.updateCurrentCard(this.state.cardsList, currentCard)
    const match = this.updateRevealedCard(currentCard)

    this.setState({ cardsList, match }, () => {
      this.timeout = setTimeout(() => this.cleanBoard(currentCard), REVEAL_PERIOD)
    })
  },

  updateCurrentCard (list, current) {
    return [].concat(list.map((item, i) => i === current.index ? merge(item, current) : item))
  },

  updateRevealedCard (current) {
    let match = Object.assign({}, this.state.match)
    match[current.label] = match[current.label] || 0

    if (current.revealed) match[current.label]++
    return match
  },

  cleanBoard (currentCard) {
    const match = this.updateUnmatchedCards(currentCard)
    const cardsList = this.updateBoard(currentCard, match)

    this.setState({ cardsList, match }, function () {
      this.enableCardClick()
    })
  },

  updateUnmatchedCards (current) {
    let match = Object.assign({}, this.state.match)
    Object
      .keys(match)
      .forEach((key) => match[key] < 2 && (match[key] = 0))

    // If the current reveal is not a match, keep the last one
    if (match[current.label] < 2) match[current.label] = 1
    return match
  },

  updateBoard (currentCard, match) {
    return [].concat(this.state.cardsList.map((item, i) => {
      const otherCard = (i !== currentCard.index)
      const completelyRevelead = (match[item.label] >= 2)
      return otherCard && !completelyRevelead ? merge(item, { revealed: false }) : item
    }))
  },

  generateGame () {
    const LEVEL = 8
    const cardsList = shuffle([].concat(Cards)).slice(0, LEVEL)
    return shuffle(cardsList.concat(cardsList))
  },

  enableCardClick () {
    this.isCardClickDisabled = false
  },

  disableCardClick () {
    this.isCardClickDisabled = true
  }
})
