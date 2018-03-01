import React from 'react'
import '../index.css'

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
        <div style={showWhenVisible}>
        <p onClick={this.toggleVisibility}>{this.props.blog.title} {this.props.blog.author}</p>
          <div style={blogStyle}>
            <div> {this.props.blog.url} </div>
            <div> 
              likes {this.props.blog.likes} 
              <button onClick={this.props.updateBlog(this.props.blog._id)}>like</button>
            </div>
            <div> added by {this.props.blog.user.name} </div>
            <button onClick={this.props.deleteBlog(this.props.blog._id)}>delete</button>
          </div>  
        </div>
      </div>
    )
  }
}

export default TogglableBlog