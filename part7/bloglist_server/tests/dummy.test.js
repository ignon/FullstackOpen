const listHelper = require('../utils/list_helper')
const testBlogs = require('./blogs_for_testing')

const dummy = listHelper.dummy

describe('dummy always returns one', () => {

  test('empty bloglist', () => {
    const blogs = []
    const result = dummy(blogs)
    expect(result).toBe(1)
  })

  test('three blogs', () => {
    const result = dummy(testBlogs.listWithThreeBlogs)
    expect(result).toBe(1)
  })

  test('null blogs', () => {
    const result = dummy(testBlogs.nullBlogs)
    expect(result).toBe(1)
  })
})