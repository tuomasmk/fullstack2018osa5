import React from 'react'

class TogglableBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  
  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  addDeleteButton = () => {
    console.log('delete button is working')
    if(this.props.user !== undefined) {
      if(this.props.blog.user === undefined || this.props.blog.user.username === this.props.user.username) {
        return (<button onClick={this.props.deleteBlog(this.props.blog._id)}>delete</button>)
      }
    }
    return null
  }

  addBlogAdder = () => {
    return this.props.blog.user === undefined ?
      'unknown' :
      this.props.blog.user.name
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : ''}
    const showWhenVisible = { display: this.state.visible ? '' : 'none'}

    const blogStyle = {
      paddingLeft: 5,
      border: 'solid',
      borderWidth: 1,
      marginLeft: 5,
      marginBottom: 5
    }

    return (
      <div>
        <div style={hideWhenVisible}>
          <p className='blogStyle' onClick={this.toggleVisibility}>{this.props.blog.title} {this.props.blog.author}</p>
        </div>
        <div style={showWhenVisible} className='togglableContent'>
        <p onClick={this.toggleVisibility}>{this.props.blog.title} {this.props.blog.author}</p>
          <div style={blogStyle}>
            <div> {this.props.blog.url} </div>
            <div> 
              likes {this.props.blog.likes} 
              <button onClick={this.props.updateBlog(this.props.blog._id)}>like</button>
            </div>
            <div> added by {this.addBlogAdder()} </div>
            {this.addDeleteButton()}
          </div>  
        </div>
      </div>
    )
  }
}

export default TogglableBlog