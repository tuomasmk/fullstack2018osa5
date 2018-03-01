import React from 'react'
const OpenedBlog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
    <div> {blog.url} </div>
    <div> {blog.likes} </div>
    <div> added by {blog.user.name} </div>
  </div>  
)

export default OpenedBlog