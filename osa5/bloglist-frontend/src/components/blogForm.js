import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [author, setAuthor] = useState('')
  const [title,  setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <div>
      <h2>Add a blog</h2>
      <form onSubmit={addBlog}>
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
  createBlog: PropTypes.func.isRequired
}


BlogForm.displayName = 'BlogForm'
export default BlogForm