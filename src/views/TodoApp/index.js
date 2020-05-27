import React from 'react'
import styled from 'styled-components'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import VisibilityFilters from './VisibilityFilters'
import './styles.css'

const Wrapper = styled.div`
  font-family: sans-serif;
`

export default function TodoApp() {
  return (
    <Wrapper className='todo-app'>
      <h1>Todo List</h1>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </Wrapper>
  )
}
