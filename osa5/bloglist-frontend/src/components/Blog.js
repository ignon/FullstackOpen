import React from 'react'
const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author} {blog.likes} <a href="{blog.url}">Link</a>
  </div>  
)

export default Blog