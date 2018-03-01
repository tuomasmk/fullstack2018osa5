import React from 'react'
const CreateNewBlog = ({ handleSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input 
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateNewBlog