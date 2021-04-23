import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog.js'
import { render, fireEvent } from '@testing-library/react'

// CI=true npm test

let testBlog

beforeEach(() => {
  testBlog = {
    title: 'RainbowGoblins',
    author: 'Takanaka',
    url: 'youtube.com',
    user: {
      name: 'Arttu',
      username: 'Arde',
    }
  }
})

test('renders content', () => {
  const component = render(<Blog
    blog={testBlog}
    addLikeToBlog={() => {}}
    handleRemoveBlog={() => {}}
    isRemovable={true}
  />)

  // Method 1: looks from HTML source
  expect(component.container).toHaveTextContent('RainbowGoblins')

  // Method 2: returns the element which has matching test
  const element = component.getByText(/RainbowGoblins/)
  expect(element).toBeDefined()

  // Method 3: CSS selector
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('RainbowGoblins')
})


test('clicking the remove button calls the event handler', () => {
  const removeMockHandler = jest.fn()
  const likeMockHandler = jest.fn()

  const component = render(<Blog
    blog={testBlog}
    addLikeToBlog={likeMockHandler}
    handleRemoveBlog={removeMockHandler}
    isRemovable={true}
  />)

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)

  const removeButton = component.getByText('Remove')
  fireEvent.click(removeButton)

  expect(likeMockHandler.mock.calls).toHaveLength(1)
  expect(removeMockHandler.mock.calls).toHaveLength(1)
  expect(likeMockHandler.mock.calls).toHaveLength(1)
})



test('blog renders title and author by default, but not additional info like and authors', () => {
  const component = render(<Blog
    blog={testBlog}
    addLikeToBlog={() => {}}
    handleRemoveBlog={() => {}}
    isRemovable={true}
  />)

  const basicInfo = component.container.querySelector('.basic_info')
  expect(basicInfo).toHaveTextContent('RainbowGoblins')
  expect(basicInfo).toHaveTextContent('Takanaka')
  expect(basicInfo).toHaveStyle('display: block')


  let additionalInfo = component.container.querySelector('.additional_info')
  expect(additionalInfo).toBe(null)

  additionalInfo = component.container.querySelector('.additional_info')
  expect(additionalInfo).toBe(null)
})


test('blog renders likes and after View-button has been clicked', () => {
  const component = render(<Blog
    blog={testBlog}
    addLikeToBlog={() => {}}
    handleRemoveBlog={() => {}}
    isRemovable={true}
  />)

  const basicInfo = component.container.querySelector('.basic_info')
  expect(basicInfo).toHaveTextContent('RainbowGoblins')
  expect(basicInfo).toHaveTextContent('Takanaka')
  expect(basicInfo).toHaveStyle('display: block')


  let additionalInfo = component.container.querySelector('.additional_info')
  expect(additionalInfo).toBe(null)

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)


  additionalInfo = component.container.querySelector('.additional_info')
  expect(additionalInfo).toBeDefined()
  expect(additionalInfo).toHaveStyle('display: block')

  const link = additionalInfo.querySelector('a')
  expect(link).toHaveTextContent('youtube.com')

  const remove = component.getByText('Remove')
  expect(remove).toBeDefined()
})

test('clicking like button twice calls event handler twice', () => {
  const likeMockHandler = jest.fn()

  const component = render(<Blog
    blog={testBlog}
    addLikeToBlog={likeMockHandler}
    handleRemoveBlog={() => {}}
    isRemovable={true}
  />)

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(likeMockHandler.mock.calls).toHaveLength(2)
})