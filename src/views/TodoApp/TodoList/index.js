import React from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import Todo from '../Todo'
import {getTodos} from './selectors'
import {VISIBILITY_FILTERS} from '../../../constants'

const Wrapper = styled.ul`
  margin-top: 1rem;
  text-align: left;
  list-style: none;
`

const TodoList = () => {
  const visibilityFilter = useSelector(state => state.visibilityFilter)
  const allTodos = useSelector(getTodos)
  const todos =
    visibilityFilter === VISIBILITY_FILTERS.ALL
      ? allTodos
      : visibilityFilter === VISIBILITY_FILTERS.COMPLETED
        ? allTodos.filter(todo => todo.completed)
        : allTodos.filter(todo => !todo.completed)

  return (
    <Wrapper className='todo-list'>
      {todos && todos.length
        ? todos.map((todo, index) => {
          return <Todo key={`todo-${todo.id}`} todo={todo} />
        })
        : 'No todos, yay!'}
    </Wrapper>
  )
}

export default TodoList
