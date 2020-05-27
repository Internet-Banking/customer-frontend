import React from 'react'
import cx from 'classnames'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import {toggleTodo} from './actions'

const Wrapper = styled.li`
  font-family: monospace;
  cursor: pointer;
  line-height: 1.5;

  .todo-item__text--completed {
    text-decoration: line-through;
    color: lightgray;
  }
`

const Todo = ({todo}) => {
  const dispatch = useDispatch()
  
  return (
    <Wrapper className='todo-item' onClick={() => dispatch(toggleTodo(todo.id))}>
      {todo && todo.completed ? '👌' : '👋'}{' '}
      <span
        className={cx(
          'todo-item__text',
          todo && todo.completed && 'todo-item__text--completed'
        )}
      >
        {todo && todo.content}
      </span>
    </Wrapper>
  )
}

export default Todo
