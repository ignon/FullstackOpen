import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }
  const getFields = () => ({
    type,
    value,
    onChange
  })

  const getValue = () => {
    return value
  }

  return {
    reset,
    getFields,
    getValue
  }
}