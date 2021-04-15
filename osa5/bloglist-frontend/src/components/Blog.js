import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  addLikeToBlog,
  handleRemoveBlog,
  isRemovable
}) => {
  const [showAll, setShowAll] = useState(false)

  // console.log('isRemovable: ', isRemovable)
  const addLike = (blog) => {
    addLikeToBlog(blog)
  }

  const basicInfo = () => {
    return (
      <div className="basic_info">
        {blog.title} by {blog.author}
        <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Hide' : 'View'}</button>
      </div>
    )
  }

  const additionalInfo = () => {
    return (
      <div className="additional_info">
        Author: {blog.author}
        <br />
        Likes: {blog.likes}
        <button onClick={() => addLike(blog)}>Like</button>
        <br />
        <a href="{blog.url}">{blog.url}</a>
        <br />
        User: {(blog.user) ? blog.user.name : 'unknown'}
        {(isRemovable) && <button onClick={() => handleRemoveBlog(blog)}>Remove</button>}
      </div>
    )
  }

  const blogStyle = {
    borderLeft: '2px solid black',
    borderBottom: '2px solid lightgray',
    paddingLeft: '10px',
    margin: '9px'
  }

  return (
    <div className='blog' style={blogStyle}>
      {basicInfo()}
      {showAll && additionalInfo()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLikeToBlog: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
  isRemovable: PropTypes.bool.isRequired
}

Blog.displayName = 'Blog'

export default Blog