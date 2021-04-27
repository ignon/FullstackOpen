import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { Button, Form } from 'semantic-ui-react'

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
      <Form onSubmit={handleCreateBlog}>
        <Form.Field>
          <label>Title</label>
          <input
            id="titleField"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => {
              setTitle(target.value)
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input
            id="authorField"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => {
              setAuthor(target.value)
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Url</label>
          <input
            id="urlField"
            type="text"
            value={url}
            name="Title"
            onChange={({ target }) => {
              setUrl(target.value)
            }}
          />
        </Form.Field>
        <Button primary id="newBlogButton" type="submit">Add blog</Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  blogToggleRef: PropTypes.object.isRequired
}


BlogForm.displayName = 'BlogForm'
export default BlogForm