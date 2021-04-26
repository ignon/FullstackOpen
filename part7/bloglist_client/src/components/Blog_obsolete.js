// import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import BlogAdditionalInfo from './BlogAdditionalInfo'

// const Blog = ({ blog }) => {
//   const [showAll, setShowAll] = useState(false)

//   const basicInfo = () => {
//     return (
//       <div className="basic_info">
//         <div className='blogTitle'>{blog.title}</div> by {blog.author}
//         <button className='viewButton' onClick={() => setShowAll(!showAll)}>{showAll ? 'Hide' : 'View'}</button>
//       </div>
//     )
//   }

//   const blogStyle = {
//     borderLeft: '2px solid black',
//     borderBottom: '2px solid lightgray',
//     paddingLeft: '10px',
//     margin: '9px'
//   }

//   return (
//     <div className='blog' style={blogStyle}>
//       {basicInfo()}
//       {showAll &&
//         <BlogAdditionalInfo blog={blog} />
//       }
//     </div>
//   )
// }

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired
// }

// Blog.displayName = 'Blog'

// export default Blog