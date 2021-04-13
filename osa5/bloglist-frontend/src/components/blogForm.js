import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  console.log('blog form')

  const [author, setAuthor] = useState('')
  const [title,  setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <div>
      <h2>Add a blog</h2>
      <form onSubmit={addBlog}>
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
            value={url}
            name="Title"
            onChange={({target}) => {
              setUrl(target.value)
            }}
          />
        </div>
        <button type="submit">Add blog</button>
      </form> 
    </div>
  )
}


export default BlogForm