const mostLikes = require('../utils/list_helper').mostLikes
const testBlogs = require('./blogs_for_testing')

describe('three blogs', () => {
  test('one blog', () => {
    const result = mostLikes(testBlogs.threeBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 7
    })
  })

  test('three blogs in reverse', () => {
    const result = mostLikes(testBlogs.threeBlogsButInReverse)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 7
    })
  })

  test('empty list', () => {
    const result = mostLikes([])
    expect(result).toBe(null)
  })

  test('null list', () => {
    const result = mostLikes(null)
    expect(result).toBe(null)
  })

  test('some like fields missing', () => {
    const result = mostLikes(testBlogs.someLikeFieldsMissing)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('no like fields', () => {
    const result = mostLikes(testBlogs.noLikeFields)
    expect(result).toBe(null)
  })
})