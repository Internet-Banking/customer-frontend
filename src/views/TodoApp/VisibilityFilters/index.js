import React from 'react'
import cx from 'classnames'
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'
import {setFilter} from './actions'
import {VISIBILITY_FILTERS} from '../../../constants'

const Wrapper = styled.div`
  .filter {
    padding: 0.3rem 0;
    margin: 0 0.3rem;
    cursor: pointer;
  }
  .filter--active {
    border-bottom: 1px solid black;
  }
`

const VisibilityFilters = () => {
  const activeFilter = useSelector(state => state.visibilityFilter)
  const dispatch = useDispatch()
  return (
    <Wrapper className='visibility-filters'>
      {Object.keys(VISIBILITY_FILTERS).map(filterKey => {
        const currentFilter = VISIBILITY_FILTERS[filterKey]
        return (
          <span
            key={`visibility-filter-${currentFilter}`}
            className={cx(
              'filter',
              currentFilter === activeFilter && 'filter--active'
            )}
            onClick={() => {
              console.log('setting', currentFilter)
              dispatch(setFilter(currentFilter))
            }}
          >
            {currentFilter}
          </span>
        )
      })}
    </Wrapper>
  )
}

export default VisibilityFilters
