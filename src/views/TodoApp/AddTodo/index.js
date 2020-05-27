import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import {addTodo} from './actions'

const Wrapper = styled.div`
  .add-todo {
    margin-left: 0.5rem;
  }
`

const AddTodo = props => {
  const [input, setInput] = useState(undefined)
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <input onBlur={e => setInput(e.target.value)} />
      <button className='add-todo' onClick={() => dispatch(addTodo(input))}>
        Add Todo
      </button>
    </Wrapper>
  )
}

export default AddTodo
