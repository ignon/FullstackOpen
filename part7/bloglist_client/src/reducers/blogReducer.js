// import { dispatch } from 'rxjs/internal/observable/pairs'
// import { dispatch } from 'rxjs/internal/observable/pairs'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const sortByLikes = (blog1, blog2) => blog2.likes - blog1.likes

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS': {
      console.trace('INIT BLOGS')
      const blogs = action.data.sort(sortByLikes)
      return blogs
    }
    case 'CREATE_BLOG': {
      const blog = action.data
      return state
        .concat(blog)
        .sort(sortByLikes)
    }
    case 'REPLACE_BLOG': {
      const blogs = state
      const blogToReplace = action.data

      return blogs.map(blog =>
        (blog.id === blogToReplace.id)
          ? blogToReplace
          : blog
      ).sort(sortByLikes)
    }
    case 'REMOVE_BLOG': {
      const blogToRemove = action.data
      return state.filter(blog => blog.id !== blogToRemove.id)
    }
    default: {
      return state
    }
  }
}

export const initializeBlogs = () => {
  return (dispatch) => {
    blogService
      .getAll()
      .then(blogs => {
        dispatch({
          type: 'INIT_BLOGS',
          data: blogs
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const addBlog = (blog) => {
  return (dispatch) => {
    blogService
      .create(blog)
      .then(returnedBlog => {
        dispatch({
          type: 'CREATE_BLOG',
          data: returnedBlog
        })
        dispatch(
          showNotification(`a new blog "${returnedBlog.title}" by "${returnedBlog.author}" added`)
        )
      })
      .catch(response => {
        const error = response.error
        dispatch(
          showNotification(`Sending the blog failed: ${error}`, true)
        )
      })
  }
}

export const removeBlog = (blog) => {
  return (dispatch) => {
    blogService
      .remove(blog.id)
      .then(() => {
        dispatch({
          type: 'REMOVE_BLOG',
          data: blog
        })
        dispatch(
          showNotification('Blog removed')
        )
      })
      .catch(exception => {
        dispatch(
          showNotification(`Removing blog failed: \n${exception.error}`, true)
        )
      })
  }
}

export const likeBlog = (blog) => {
  return (dispatch) => {
    blogService
      .update(blog.id, {
        ...blog,
        likes: blog.likes + 1
      })
      .then(updatedBlog => {
        // sortBlogs(updatedBlogList)
        // setBlogs(updatedBlogList)
        dispatch({
          type: 'REPLACE_BLOG',
          data: updatedBlog
        })
        dispatch(
          showNotification(`You liked the blog: ${updatedBlog.title}`)
        )
      })
      .catch(exception => {
        dispatch(
          showNotification(`updating likes failed: \n${exception.error}`, true)
        )
      })
  }
}

export default reducer