import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import TogglableBlog from './components/Togglable';
import CreateNewBlog from './components/CreateNewBlog';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      loginVisible: false,
      error: null,
      success: null,
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    console.log('getting user from localStorage: ' + window.localStorage.getItem('loggedBlogappUser'))
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      console.log('before setToken, user is: ' + user)
      blogService.setToken(user.token)
    }
  }

  deleteBlog = (id) => {
    return async () => {
      console.log('deleting Blog ' + id)
      const blog = this.state.blogs.find(b => b._id === id)
      if (window.confirm('Delete \'' + blog.title + '\' by ' + blog.author)) {
        try {
          

          const deletedBlog = await blogService.deleteBlog(id)
          this.setState({
            blogs: this.state.blogs.filter( blog => blog._id !== id)
          })
        } catch (exception) {
          this.setState({
            error: 'error' + exception.message
          })
        } setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      }
    }
  }

  update = (id) => {
    return async () => {
      console.log('updating Blog' + id)
      try {
        const blog = this.state.blogs.find(b => b._id === id)
        const changedBlog = { ...blog, likes: blog.likes + 1 }
        
        await blogService.update(id, changedBlog)
        this.setState({
          blogs: this.state.blogs.map( blog => blog._id !== id ? blog : changedBlog )
        })
      } catch (exception) {
        this.setState({
          error: 'error' + exception.message
        })
      } setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  
  newBlog = async (event) => {
    event.preventDefault()
    console.log('new Blog', this.state.title, this.state.author, this.state.url)
    try {
      const blog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      
    this.setState({ 
      blogs: this.state.blogs.concat(blog),
      success: 'a new blog "' + this.state.title + '" by ' + this.state.author + ' added', 
      title: '',
      author: '',
      url: '' })
      setTimeout(() => {
        this.setState({ success: null })
      }, 5000)
    } catch (exception) {
      this.setState({ error: 'blogin lisäys ei onnistunut' })
    } setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  login = async (event) => {
    event.preventDefault()
    console.log('login in with', this.state.username, this.state.password)
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'wrong username or password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    console.log('login out with', this.state.username, this.state.password)
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ user: null })
  }

  handleLoginFieldChange = (event) => {
    console.log('handleLoginFieldChange called')
    this.setState({ [event.target.name]: event.target.value })
  }  

  handleNewBlogFieldChange = (event) => {
    console.log('handleNewBlogFieldChange called')
    this.setState({ [event.target.name]: event.target.value })
  }  

  render() {
    const loginForm = () => {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ loginVisible: true })} className='loginButton'>log in</button>
          </div>
          <div style={showWhenVisible} className='loginForm'>
            <LoginForm
              visible={this.state.visible}
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
            <button onClick={e => this.setState({ loginVisible: false })}>cancel</button>
          </div>
        </div>
      )
    }

    const createNewBlog = () => (
      <CreateNewBlog
        title={this.state.title}
        author={this.state.author}
        url={this.state.url}
        handleChange={this.handleNewBlogFieldChange}
        handleSubmit={this.newBlog}
      />
    )

    const toggleBlogs = () => (
      <div>
        {this.state.blogs.sort((a, b) => b.likes - a.likes).map(blog => 
        <TogglableBlog 
          key={blog._id} 
          blog={blog} 
          user={this.state.user}
          updateBlog={this.update} 
          deleteBlog={this.deleteBlog}
        />
        )}
      </div>
    )

    return (
      <div>
        {this.state.error !== null && <Notification.Error message={this.state.error} />}

        {this.state.success !== null && <Notification.Success message={this.state.success} />}

        {this.state.user === null ?
          loginForm() :
          <div>
          <h2>blogs</h2>
          <p>
            {this.state.user.name} logged in
            <button onClick={this.logout}>logout</button>
          </p>
          {createNewBlog()}
          {toggleBlogs()}
          </div>
        }
      </div>
    );
  }
}

export default App;
