/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [author, setAuthor] = useState('')
  const [title,  setTitle] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    setNotification({
      message: 'Jaa lol xD'
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

    try {
      const loggedUser = await loginService.login({
        username, password
      })
      
      if (!loggedUser) throw {
        error: 'user not returned'
      }
      
      console.log(loggedUser)

      setUser(loggedUser)
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'loggedUser',  JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)

      showNotification(`Logged in as ${loggedUser.username}`)
    }
    catch(exception) {
      alert(exception)
      showNotification('Invalid username or password', true)
    }
  }

  const handleSubmitBlog = async (event) => {
    console.log('sending blog')
    event.preventDefault()
  
    const newBlog = {
      title,
      author,
      url: blogUrl
    }

    blogService
      .create(newBlog)
      .then((response) => {
        const returnedBlog = response.body

        setBlogs(blogs.concat(returnedBlog))
        setAuthor('')
        setTitle('')
        setBlogUrl('')

        showNotification(`Added blog "${returnedBlog.title}" by "${returnedBlog.author}"`)
      }) 
      .catch(exception => {
        console.log(exception.toJSON())
        showNotification(`Sending the blog failed: ${exception.message}`, true)
      })
    }

    const showNotification = (message, isWarning=false) => {
      setNotification({message, isWarning})

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

    const loginForm = () =>  (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({target}) =>
              setUsername(target.value)
            }
          />
        </div>
        <div>
          Password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({target}) =>
              setPassword(target.value)
            }
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <form onSubmit={handleSubmitBlog}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({target}) => {
              setTitle(target.value)
            }}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({target}) => {
              setAuthor(target.value)
            }}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={blogUrl}
            name="Title"
            onChange={({target}) => {
              setBlogUrl(target.value)
            }}
          />
        </div>
        <button type="submit">Send</button>
      </form> 
    </div>
   )
  
  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const blogView = () => (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={() => logout()}>Logout</button>
      </p>
      { blogForm() }
      { blogList() }
    </div>
  )
  
  return (
    <div>
        <Notification notification={notification}/>

        {user === null
          ? loginForm()
          : blogView()
        }
    </div>
  )
}

export default App