import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../utils/utils'
import { comment } from '../reducers/blogReducer'
import { Form, Input } from 'semantic-ui-react'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const text = useField('text')

  const handleComment = (event) => {
    event.preventDefault()
    text.reset()
    dispatch(comment(blog, text.value))
  }

  return (
    <div>
      <h2>Comments</h2>
      <Form onSubmit={handleComment}>
        <Input action='Comment'
          { ...text.getFields() }
        />
      </Form>
      <ul>
        {blog.comments.map((comment, i) =>
          <li key={comment.id}>{comment.text}</li>
        ).reverse()}
      </ul>
    </div>
  )
}

export default Comments