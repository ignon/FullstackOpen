import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/togglable'
import BlogForm from './components/blogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { silentLogin } from './reducers/loginReducer'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import { getUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'
import { Switch, Route, useRouteMatch } from 'react-router-dom'


const App = () => {
  const blogToggleRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(silentLogin())
    dispatch(initializeBlogs())
    dispatch(getUsers())
  }, [])


  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogToggleRef}>
      <BlogForm blogToggleRef={blogToggleRef}/>
    </Togglable>
  )

  const userMatch = useRouteMatch('/user/:id')
  const userToLook = (userMatch)
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blog/:id')
  const blogToLook = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  return (
    <div>
      <Menu />
      <h1>Bloglist</h1>
      <Notification />

      <Switch>
        <Route path='/login'>
          <LoginForm />
        </Route>

        <Route path='/users'>
          <Users />
        </Route>

        <Route path='/user'>
          <User user={userToLook} />
        </Route>

        <Route path='/blog'>
          <Blog blog={blogToLook} />
        </Route>

        <Route path='/'>
          <h2>Blogs</h2>
          { (user !== null) && blogForm() }

          <BlogList blogs={blogs} />
        </Route>

      </Switch>
    </div>
  )
}

export default App