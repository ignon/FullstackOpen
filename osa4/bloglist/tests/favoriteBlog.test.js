const favoriteBlog = require('../utils/list_helper').favoriteBlog
const testBlogs = require('./blogs_for_testing')

describe('favorite blog', () => {

  test('one blog', () => {
    const favorite = favoriteBlog(testBlogs.oneBlog)
    expect(favorite).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('no blogs', () => {
    const favorite = favoriteBlog([])
    expect(favorite).toBe(null)
  })

  test('some like fields missing', () => {
    const favorite = favoriteBlog(testBlogs.likeFieldsMissing)
    expect(favorite).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('noLikeFields', () => {
    const favorite = favoriteBlog(testBlogs.noLikeFields)
    expect(favorite).toEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 0
    })
  })

  test('two favorites in tie', () => {
    const favorite = favoriteBlog(testBlogs.blogsWithTwoFavorites)
    expect(favorite).toEqual({
      title: 'React Patterns',
      author: 'Michael Chan',
      likes: 5
    })
  })
  
})