import { likeBlog, removeBlog } from '../reducers/blogReducer'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Comments from './Comments'
import { Button, Icon, Label } from 'semantic-ui-react'


const Blog = ({ blog }) => {
  if (!blog) return (
    <h2>{'Blog doesn\'t exist'}</h2>
  )

  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const isRemovable= Boolean(user && blog.user && user.id === blog.user.id)


  const handleLike = (blogToLike) => {
    dispatch( likeBlog(blogToLike) )
  }

  const handleRemoveBlog = (blogToRemove) => {
    if (!window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`))
      return
    dispatch(removeBlog(blogToRemove))
      .then(() => history.push('/'))
  }

  return (
    <div>
      <div className='additional_info'>
        <h1>{blog.title}</h1>
        Author: {blog.author}
        <br />
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        User: <Link to={`/user/${blog.user.id}`}>{blog.user.name}</Link>
        <br />
        <Button as='div' labelPosition='right'>
          <Button icon className='likeButton' onClick={() => handleLike(blog)}>
            <Icon name='heart' />
            Like
          </Button>
          <Label basic pointing='left' className='likes'>
            {blog.likes}
          </Label>
        </Button>
        {(isRemovable) &&
          <Button animated='vertical' className='removeButton' onClick={() => handleRemoveBlog(blog)}>
            <Button.Content visible>
              <Icon name='trash' />
            </Button.Content>
            <Button.Content hidden>
              Delete
            </Button.Content>
          </Button>
        }
      </div>
      <div>
        <Comments blog={ blog }/>
      </div>
    </div>
  )
}

export default Blog