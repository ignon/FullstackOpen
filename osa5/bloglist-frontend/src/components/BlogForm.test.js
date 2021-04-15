import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './blogForm.js'

test('<BlogForm> updates parent state and calls createBlog', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('.titleField')
  const blogForm = component.container.querySelector('form')

  expect(titleInput).toBeDefined()
  expect(blogForm).toBeDefined()

  console.log('TITLE INPUT:')
  prettyDOM(titleInput)
  fireEvent.change(titleInput, {
    target: { value: 'kantakampale' }
  })
  fireEvent.submit(blogForm)
  console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('kantakampale')
})


