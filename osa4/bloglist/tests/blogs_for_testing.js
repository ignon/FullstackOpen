const oneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]


const threeBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '4jk1h23jkl4132h4k3jlh2jkl3',
    title: 'Viikingit söivät kärpässieniä saavuttaakseen raivoisan taistelutahdon',
    author: 'Edsger W. Dijkstra',
    url: 'http://sieni.us/',
    likes: 2,
    __v: 0
  },
  {
    _id: '5jk2l34h1jklh234jkl321jh423',
    title: 'Based Cooking',
    author: 'Luke Smith',
    url: 'https://based.cooking/',
    likes: 3,
    __v: 0
  }
]

const threeBlogsButInReverse = [...threeBlogs].reverse()

const someLikeFieldsMissing = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '4jk1h23jkl4132h4k3jlh2jkl3',
    title: 'Viikingit söivät kärpässieniä saavuttaakseen raivoisan taistelutahdon',
    author: 'Edsger W. Dijkstra',
    url: 'http://sieni.us/',
    __v: 0
  },
  {
    _id: '5jk2l34h1jklh234jkl321jh423',
    title: 'Based Cooking',
    author: 'Luke Smith',
    url: 'https://based.cooking/',
    likes: 3,
    __v: 0
  }
]

const invalidLikeFieldType = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '4jk1h23jkl4132h4k3jlh2jkl3',
    title: 'Viikingit söivät kärpässieniä saavuttaakseen raivoisan taistelutahdon',
    author: 'Edsger W. Dijkstra',
    url: 'http://sieni.us/',
    likes: 'infinite likes! :3',
    __v: 0
  }
]

const nullBlogs = [
  null,
  {
    _id: '4jk1h23jkl4132h4k3jlh2jkl3',
    title: 'Viikingit söivät kärpässieniä saavuttaakseen raivoisan taistelutahdon',
    author: 'Edsger W. Dijkstra',
    url: 'http://sieni.us/',
    likes: 'infinite likes! :3',
    __v: 0
  },
  null
]

const likeFieldsMissing = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const noLikeFields = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.ar izona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    __v: 0
  }
]

const blogsWithTwoFavorites = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React Patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statements',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

module.exports = {
  oneBlog,
  threeBlogs,
  someLikeFieldsMissing,
  invalidLikeFieldType,
  nullBlogs,
  likeFieldsMissing,
  noLikeFields,
  threeBlogsButInReverse,
  blogsWithTwoFavorites
}