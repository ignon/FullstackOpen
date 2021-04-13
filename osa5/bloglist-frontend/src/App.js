/* eslint-disable no-throw-literal */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import LoginForm from './components/loginForm'
import Togglable from './components/togglable'
import BlogForm from './components/blogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [notification, setNotification] = useState({})


  const noteFormRef = useRef()

  // const [loginViewVisible, setLoginViewVisible] = useState(false)

  const sortBlogs = (blogs) => {
     blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      sortBlogs(blogs)
      setBlogs( blogs )
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ', username, password)

    loginService
      .login({username, password})
      .then((response) => {
        const loggedUser = response
        if (!loggedUser)
          throw new Error('unknown login error')

        setUser(loggedUser)
        setUsername('')
        setPassword('')

        window.localStorage.setItem(
          'loggedUser',  JSON.stringify(loggedUser)
        )
        blogService.setToken(loggedUser.token)

        showNotification(`Logged in as ${loggedUser.username}`)
      })
      .catch(response => {
        showNotification(`Invalid username or password`, true)
      })
  }


  const showNotification = (message, isWarning=false) => {
    setNotification({message, isWarning})

    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  
  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          addLikeToBlog={addLikeToBlog}
        />
      )}
    </div>
  )

  const blogView = () => (
    <div>
      <h2>Blogs</h2>
      { blogList() }
    </div>
  )
  
  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={ ({target}) => setUsername(target.value) }
        handlePasswordChange={ ({target}) => setPassword(target.value) }
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  const createBlog = (newBlog) => {
    console.log('sending blog')
  
    noteFormRef.current.toggleVisibility()

    blogService
      .create(newBlog)
      .then(returnedBlog => {

        setBlogs(blogs.concat(returnedBlog))
        showNotification(`a new blog "${returnedBlog.title}" by "${returnedBlog.author} added"`)
      }) 
      .catch(response => {
        const error = response.error
        showNotification(`Sending the blog failed: ${error}`, true)
      })
  }

  const addLikeToBlog = (blogToLike) => {

    console.log(blogToLike)
    blogService
      .update(blogToLike.id, {
        ...blogToLike,
        likes: blogToLike.likes + 1
      })
      .then(updatedBlog => {
        const updatedBlogList = blogs.map(blog =>
          (blog.id === updatedBlog.id)
            ? updatedBlog
            : blog
        )
        sortBlogs(updatedBlogList)
        setBlogs(updatedBlogList)
      })
      .catch(exception => {
        showNotification(`updating likes failed\n${exception.error}`, true)
      })
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="New Blog" ref={noteFormRef}>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
    )
  }

  const logoutButton = () => (
    <div>
      <div>{user.name} logged in</div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )

  return (
    <div>
      <Notification notification={notification} />
      { (user === null) && loginForm() }
      { (user !== null) && logoutButton() }
      { (user !== null) && blogForm() }

      {blogView()}
    </div>
  )
}

export default App