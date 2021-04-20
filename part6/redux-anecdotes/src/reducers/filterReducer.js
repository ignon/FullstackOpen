const initialState = {
  filterString: ''
}

const reducer = (state = initialState, action) => {
  // console.log('filter state now: ', state)
  // console.log('action data', action.data)
  // console.log('action type', action.type)

  switch(action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filterString: action.data.filterString
      }
    default:
      return state
  }
}

export const setFilterString = (filterString) => ({
  type: 'SET_FILTER',
  data: { filterString }
})

export default reducer