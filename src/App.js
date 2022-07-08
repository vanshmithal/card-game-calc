import { useState } from 'react'
import Player from './components/Player'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [data, setData] = useState([])
  const [checkState, setCheckState] = useState(true)

  useEffect(() => {
    let arr = localStorage.getItem('animated-cassata-8b85af')

    if (arr) {
      let temp = JSON.parse(arr)
      let temp2 = temp.filter((t) => t.show === true)
      if (temp2.length > 0) {
        setCheckState(false)
      }
      setData(temp)
    }
  }, [])

  const addPlayer = () => {
    let player = {
      id: Date.now(),
      name: 'Player X',
      points: 0,
      hand: 0,
      value: 0,
      show: false,
    }
    let temp = [...data]
    temp.push(player)
    localStorage.setItem('animated-cassata-8b85af', JSON.stringify(temp))
    setData(temp)
  }

  const deletePlayer = (id) => {
    let temp = data.filter((d) => d.id !== id)
    localStorage.setItem('animated-cassata-8b85af', JSON.stringify(temp))
    setData(temp)
  }

  const resetPlayer = (id) => {
    let temp = [...data]
    let index = temp.findIndex((d) => d.id === id)
    temp[index].name = 'Player X'
    temp[index].points = 0
    temp[index].hand = 0
    temp[index].value = 0
    temp[index].show = false
    localStorage.setItem('animated-cassata-8b85af', JSON.stringify(temp))
    setData(temp)
  }

  const updateData = (id, field, value) => {
    let temp = [...data]
    if (field === 'show') {
      temp.forEach((t) => {
        if (t.id === id) {
          setCheckState(!value)
          t.show = value
          t.hand = 0
        } else {
          t.show = false
        }
      })
    } else {
      let index = temp.findIndex((d) => d.id === id)
      temp[index][field] = value
    }
    localStorage.setItem('animated-cassata-8b85af', JSON.stringify(temp))
    setData(temp)
  }

  const calculateScore = () => {
    let newData = [...data]
    let shower = null,
      totalHand = 0
    for (var i = 0; i < newData.length; i++) {
      if (!newData[i].show) {
        totalHand += parseInt(newData[i].hand)
      } else {
        shower = i
      }
    }

    newData[shower].points += totalHand
    for (i = 0; i < newData.length; i++) {
      let tempValue = newData[i].value
      newData[i].points += tempValue * (newData.length - 1)
      for (var j = 0; j < newData.length; j++) {
        if (j !== i) {
          newData[j].points -= tempValue
        }
      }
    }
    for (i = 0; i < newData.length; i++) {
      newData[i].points -= newData[i].hand
    }
    for (i = 0; i < newData.length; i++) {
      newData[i].hand = 0
      newData[i].value = 0
      newData[i].show = false
    }
    setCheckState(true)
    localStorage.setItem('animated-cassata-8b85af', JSON.stringify(newData))
    setData(newData)
  }

  return (
    <div className='App'>
      <header className='App-header' style={{ height: window.innerHeight }}>
        <h1>Cardgame Points Calculator</h1>
        <div>
          <input
            className='calculateBtn'
            type='button'
            value='Calculate'
            onClick={calculateScore}
            disabled={checkState}
          />
          <input
            className='calculateBtn'
            type='button'
            value='Add'
            onClick={addPlayer}
          />
        </div>
        <div className='cont'>
          {data.map((d) => {
            return (
              <Player
                key={d.id}
                props={d}
                deleteFunc={deletePlayer}
                resetFunc={resetPlayer}
                updateFunc={updateData}
              />
            )
          })}
        </div>
      </header>
    </div>
  )
}

export default App
