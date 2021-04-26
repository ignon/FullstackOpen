import React from 'react'
import BlogList from './BlogList'

const User = ({ user }) => {

  if (!user) return null
  if (!user.blogs) user.blogs = []

  return (
    <div>
      <h2>User: {user.name}</h2>
      <h3>{(user.blogs.length === 0) ? 'User has no blogs' : 'Added blogs'}</h3>
      <BlogList blogs={user.blogs} />
    </div>
  )
}


export default User