import 'semantic-ui-css/semantic.min.css'

import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/blogForm'
import BlogList from './components/BlogList'
import Togglable from './components/togglable'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Users from './components/Users'
import Menu from './components/Menu'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { silentLogin } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'

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

  const containerStyle = { marginLeft: '20px', marginRight: '20px' }
  return (
    <div>
      <Menu />

      <div style={ containerStyle }>
        <Notification />
        <h1>Bloglist</h1>

        <Switch>
          <Route path='/login' component={LoginForm} />
          <Route path='/users' component={Users} />

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
    </div>
  )
}

export default App