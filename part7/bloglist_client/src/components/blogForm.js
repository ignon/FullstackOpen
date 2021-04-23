import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogToggleRef }) => {

  const [author, setAuthor] = useState('')
  const [title,  setTitle] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleCreateBlog = (event) => {
    blogToggleRef.current.toggleVisibility()
    event.preventDefault()

    setAuthor('')
    setTitle('')
    setUrl('')

    dispatch(
      addBlog({ title, author, url })
    )
  }

  return (
    <div>
      <h2>Add a blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title
          <input
            id="titleField"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => {
              setTitle(target.value)
            }}
          />
        </div>
        <div>
          Author
          <input
            id="authorField"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => {
              setAuthor(target.value)
            }}
          />
        </div>
        <div>
          Url
          <input
            id="urlField"
            type="text"
            value={url}
            name="Title"
            onChange={({ target }) => {
              setUrl(target.value)
            }}
          />
        </div>
        <button id="newBlogButton" type="submit">Add blog</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  blogToggleRef: PropTypes.object.isRequired
}


BlogForm.displayName = 'BlogForm'
export default BlogForm