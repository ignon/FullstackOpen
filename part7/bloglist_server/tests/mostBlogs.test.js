const mostBlogs = require('../utils/list_helper').mostBlogs
const testBlogs = require('./blogs_for_testing')

describe('most blogs', () => {
  test('one blog', () => {
    const author = mostBlogs(testBlogs.oneBlog)
    expect(author).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('three blogs in reverse', () => {
    const author = mostBlogs(testBlogs.threeBlogsButInReverse)
    expect(author).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })
})
