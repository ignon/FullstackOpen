import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/togglable'
import BlogForm from './components/blogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import Login from './components/Login'

// import { login, logout, silentLogin } from './reducers/loginReducer'

const App = () => {
  const blogToggleRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const handleLike = (blogToLike) => {
    dispatch( likeBlog(blogToLike) )
  }

  const handleRemoveBlog = (blogToRemove) => {
    if (!window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`))
      return
    dispatch( removeBlog(blogToRemove) )
  }

  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          addLikeToBlog={handleLike}
          handleRemoveBlog={handleRemoveBlog}
          isRemovable={(user && blog.user && user.id === blog.user.id) ? true : false} // idk why the ternary is required to avoid null!?
        />
      )}
    </div>
  )

  const blogForm = () => {
    return (
      <Togglable buttonLabel="New Blog" ref={blogToggleRef}>
        <BlogForm blogToggleRef={blogToggleRef}/>
      </Togglable>
    )
  }

  return (
    <div>
      <Notification />
      <h1>Bloglist</h1>
      <Login />
      <h2>Blogs</h2>
      { (user !== null) && blogForm() }

      {blogList()}
    </div>
  )
}

export default App