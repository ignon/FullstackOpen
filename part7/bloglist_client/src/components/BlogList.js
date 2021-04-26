import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => (
  <ul>
    {blogs.map(blog =>
      <li key={blog.id} >
        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
      </li>
    )}
  </ul>
)

export default BlogList