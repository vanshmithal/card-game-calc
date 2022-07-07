import React from 'react'
import './Player.css'

function Player({ props, deleteFunc, resetFunc, updateFunc }) {
  return (
    <div id='player'>
      <div>
        <input
          className='text-input'
          type='text'
          value={props.name}
          onChange={(e) => updateFunc(props.id, 'name', e.target.value)}
        />
        <input
          className='text-input'
          type='text'
          value={props.points}
          onChange={(e) => updateFunc(props.id, 'points', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor='hand'>Hand: {props.hand}</label>
        <input
          className='slider'
          type='range'
          name='hand'
          min='0'
          max='15'
          value={props.hand}
          disabled={props.show}
          onChange={(e) => updateFunc(props.id, 'hand', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='value'>Value: {props.value}</label>
        <input
          className='slider'
          type='range'
          name='value'
          list='valueList'
          min='0'
          max='10'
          value={[0, 2, 4, 5, 7, 10, 12, 14, 15, 20, 25].indexOf(props.value)}
          onChange={(e) =>
            updateFunc(
              props.id,
              'value',
              [0, 2, 4, 5, 7, 10, 12, 14, 15, 20, 25][e.target.value]
            )
          }
        />
      </div>
      <div>
        <label htmlFor='show'>Show: </label>
        <input
          className='checkbox'
          type='checkbox'
          name='show'
          checked={props.show}
          onChange={() => updateFunc(props.id, 'show', !props.show)}
        />
      </div>
      <input
        className='deleteBtn'
        type='button'
        value='Delete'
        onClick={() => deleteFunc(props.id)}
      />
      <input type='button' value='Reset' onClick={() => resetFunc(props.id)} />
    </div>
  )
}

export default Player
