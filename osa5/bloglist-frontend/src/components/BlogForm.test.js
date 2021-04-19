import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './blogForm.js'

test('<BlogForm> updates parent state and calls createBlog with correct values', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleField = component.container.querySelector('#titleField')
  const authorField = component.container.querySelector('#authorField')
  const urlField = component.container.querySelector('#urlField')

  const blogForm = component.container.querySelector('form')

  expect(titleField).toBeDefined()
  expect(blogForm).toBeDefined()

  fireEvent.change(titleField, { target: { value: 'Lotr' } })
  fireEvent.change(authorField, { target: { value: 'Tolkien' } })
  fireEvent.change(urlField, { target: { value: 'tolkien.gov.org' } })
  fireEvent.submit(blogForm)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Lotr',
    author: 'Tolkien',
    url: 'tolkien.gov.org'
  })
})
