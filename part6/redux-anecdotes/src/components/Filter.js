import React from 'react'
import { connect } from "react-redux"
import { setFilterString } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    const filter = event.target.value
    props.setFilterString(filter)
  }

  return (
    <div>
      Filter
      <input onChange={handleChange} />
      <br />
      <br />
    </div>
  )
}

const mapStateToProps = ({ filter }) => ({ filter })
const mapDispatchToProps = { setFilterString }

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter