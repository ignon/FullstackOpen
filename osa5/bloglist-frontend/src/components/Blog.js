import React, { useState } from 'react'



const Blog = ({blog, addLikeToBlog}) => {
  const [showAll, setShowAll] = useState(false)

  const addLike = (blog) => {
    addLikeToBlog(blog)
  }

  const basicInfo = () => {
    return (
      <div>
        {blog.title}
        <button onClick={() => setShowAll(!showAll)}>{showAll ? 'hide' : 'view'}</button>
      </div>  
    )
  }

  const additionalInfo = () => {
    return (
      <div>
        {blog.author}
        <br />
        {blog.likes}
        <button onClick={() => addLike(blog)}>Like</button>
        <br />
        <a href="{blog.url}">{blog.url}</a>
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
    <div style={blogStyle}>
      {basicInfo()}
      {showAll && additionalInfo()}
    </div>
  )
}

export default Blog