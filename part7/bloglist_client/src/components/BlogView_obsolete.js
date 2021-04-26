import React from 'react'
import BlogAdditionalInfo from './BlogAdditionalInfo'

const BlogView = ({ blog }) => {

  if (!blog) return null
  // const user = useSelector(state => state.user)

  return (
    <div>
      <h1>{blog.title}</h1>
      <BlogAdditionalInfo blog={blog}/>
    </div>
  )
}


export default BlogView