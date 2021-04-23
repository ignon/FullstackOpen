const totalLikes = require('../utils/list_helper').totalLikes
const testBlogs = require('./blogs_for_testing')


describe('total likes', () => {

  test('blog with 5 likes', () => {
    const result = totalLikes(testBlogs.oneBlog)
    expect(result).toBe(5)
  })

  test('three blogs', () => {
    const result = totalLikes(testBlogs.threeBlogs)
    expect(result).toBe(10)
  })

  test('some like fields missing', () => {
    const result = totalLikes(testBlogs.someLikeFieldsMissing)
    expect(result).toBe(8)
  })

  test('no like fields', () => {
    const result = totalLikes(testBlogs.noLikeFields)
    expect(result).toBe(0)
  })

  test('invalid like field type', () => {
    const result = totalLikes(testBlogs.invalidLikeFieldType)
    expect(result).toBe(5)
  })

  test('no blogs', () => {
    const result = totalLikes([])
    expect(result).toBe(0)
  })
})