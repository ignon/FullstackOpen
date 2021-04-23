const _ = require('lodash')


const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return _(blogs)
    .filter(blog => (blog))
    .filter(blog => typeof blog.likes === 'number')
    .sumBy(blog => blog.likes)
}

const favoriteBlog = (blogs) => {

  if (!Array.isArray(blogs)) return null
  if (blogs.length <= 0) return null

  let favorite = _.maxBy(blogs, blog => blog.likes)

  if (!favorite)
    favorite = blogs[0]

  if (!favorite.likes)
    favorite.likes = 0

  return {
    title: favorite.title,
    author: favorite.author,
    likes: (favorite.likes || 0)
  }
}

const mostLikes = (blogs) => {

  const authorAndLikes = _(blogs)
    .groupBy(blog => blog.author)
    .map(blogsByAuthor => {                   // lodash: map(val, key) works on objects
      const author = blogsByAuthor[0].author
      const likes = _.sumBy(blogsByAuthor, blog => blog.likes)

      return { author, likes }
    })
    .maxBy(likesForAuthor => likesForAuthor.likes)

  if (!authorAndLikes) return null
  return authorAndLikes
}

const mostBlogs = (blogList) => {

  const authorWithMostBlogs = _(blogList)
    .groupBy(blog => blog.author)
    .map((blogsByAuthor, author) => {     // lodash: map(val, key) works on objects
      return {
        author,
        blogs: blogsByAuthor.length
      }
    })
    .maxBy(pair => pair.blogs)

  return authorWithMostBlogs
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}


/*
const totalLikes = (blogs) => {
  let likes = 0

  blogs.forEach(blog => {
    if (!blog) return
    if (typeof blog.likes !== 'number') return

    likes += blog.likes
  })

  return likes
}favori


const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs)) return null
  if (blogs.length <= 0) return null

  const mostLikedBlog = blogs.reduce((favorite, current) => {
    if (!current) return favorite
    if (!favorite) return current

    if (!current.likes) return favorite
    if (!favorite.likes) return current

    return (current.likes > favorite.likes)
      ? current
      : favorite
  })

  if (!mostLikedBlog) return null

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes || 0
  }const mostBlogs = (blogs) => {
  if (!Array.isArray(blogs)) return
  if (blogs.length === 0) return

  const blogsWrittenBy = {}

  blogs.forEach(blog => {
    if (!blog) return
    if (typeof blog.author !== 'string') return

    blogsWrittenBy[blog.author]
      = (blogsWrittenBy[blog.author] || 0) + 1
  })

  let superwriter = null
  for(const author in blogsWrittenBy) {
    if (!superwriter) {
      superwriter = author
      break
    }

    if (blogsWrittenBy[author] > blogsWrittenBy[superwriter])
      superwriter = author
  }

  const authorWithMostBlogs = {
    author: superwriter,
    blogs: blogsWrittenBy[superwriter]
  }

  return authorWithMostBlogs
}
}

const mostBlogs = (blogs) => {
  if (!Array.isArray(blogs)) return
  if (blogs.length === 0) return

  const blogsWrittenBy = {}

  blogs.forEach(blog => {
    if (!blog) return
    if (typeof blog.author !== 'string') return

    blogsWrittenBy[blog.author]
      = (blogsWrittenBy[blog.author] || 0) + 1
  })

  let superwriter = null
  for(const author in blogsWrittenBy) {
    if (!superwriter) {
      superwriter = author
      break
    }

    if (blogsWrittenBy[author] > blogsWrittenBy[superwriter])
      superwriter = author
  }

  const authorWithMostBlogs = {
    author: superwriter,
    blogs: blogsWrittenBy[superwriter]
  }

  return authorWithMostBlogs
}
*/