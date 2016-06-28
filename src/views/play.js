import React from 'react'
import shuffle from 'lodash/shuffle'

import Cards from '../cards'
import Card from '../components/card'
import CountDown from '../components/count-down'
import Spinner from '../components/double-bounce-spinner'
import Lightbox from '../components/lightbox'
import GameOver from '../components/game-over'
import Victory from '../components/victory'

const NOOP = function () {}
const REVEAL_PERIOD = 850 // ms
const GAME_DURATION = 90
const NUM_OF_PAIRS = 9 // max: Cards.length (12)

function merge (...args) {
  return [{}, ...args].reduce(Object.assign)
}

export default React.createClass({
  getInitialState () {
    return {
      cardsList: this.generateGame(),
      gameOver: false,
      victory: false,
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
        {this.state.gameOver && <Lightbox><GameOver /></Lightbox>}
        {this.state.victory && <Lightbox><Victory /></Lightbox>}
        <div className='control'>
          <Spinner />
          <span className='timer'>
            <CountDown
              stop={this.state.victory}
              timeInSeconds={GAME_DURATION}
              onTimeExpired={this.timeExpired} />
          </span>
        </div>
        <div className='cards'>
          {this.renderCardsList()}
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

  timeExpired () {
    this.setState({ gameOver: true })
  },

  cardClicked (currentCard) {
    if (this.isCardClickDisabled) return
    this.disableCardClick()

    const cardsList = this.updateCurrentCard(this.state.cardsList, currentCard)
    const match = this.updateRevealedCard(currentCard)

    if (this.isVictory(match)) {
      clearTimeout(this.timeout)
      this.setState({ cardsList, match, victory: true })
    } else {
      this.setState({ cardsList, match }, () => {
        this.timeout = setTimeout(() => this.cleanBoard(currentCard), REVEAL_PERIOD)
      })
    }
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

  isVictory (match) {
    return Object
      .keys(match)
      .map((key) => match[key])
      .reduce((n, total) => n + total, 0) === (2 * NUM_OF_PAIRS)
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
    const cardsList = shuffle([].concat(Cards)).slice(0, NUM_OF_PAIRS)
    return shuffle(cardsList.concat(cardsList))
  },

  enableCardClick () {
    this.isCardClickDisabled = false
  },

  disableCardClick () {
    this.isCardClickDisabled = true
  }
})
