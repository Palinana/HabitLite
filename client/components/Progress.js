import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory'
import {levelUp} from '../store'

const getData = percent => {
  return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
}

/**
 * COMPONENT
 */
const Progress = props => {
  let percent = (props.XP - (Math.pow(props.level - 1, 2) * 10)) / ((Math.pow(props.level, 2) * 10) - (Math.pow(props.level - 1, 2) * 10)) * 100
  if (percent >= 100) {
    props.increment(props.userId)
    percent = (props.XP - (Math.pow(props.level - 1, 2) * 10)) / ((Math.pow(props.level, 2) * 10) - (Math.pow(props.level - 1, 2) * 10)) * 100
  }
    return (
      <div >
        <h1 className="total-progress">{props.name}</h1>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={400} height={400}
            data={getData(percent)}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: { fill: (d) => {
                  const color = d.y > 30 ? 'green' : 'red'
                  return d.x === 1 ? color : 'transparent'
                }
              }
            }}
          />
          <VictoryAnimation duration={1000} data={props}>
            {() => {
              return (
                <VictoryLabel
                  textAnchor="middle" verticalAnchor="middle"
                  x={200} y={200}
                  text={`${Math.round(percent)}%`}
                  style={{ fontSize: 45 }}
                />
              )
            }}
          </VictoryAnimation>
        </svg>
      </div>
    )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    XP: state.user.XP,
    level: state.user.level,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    increment(userId) {
      dispatch(levelUp(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Progress)

/**
 * PROP TYPES
 */
Progress.propTypes = {
  XP: PropTypes.number,
  level: PropTypes.number
}
