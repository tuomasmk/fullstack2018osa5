import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
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

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
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
    this.setState({ [event.target.name]: event.target.value })
  }  

  handleNewBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }  

  render() {
    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>
      
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form> 
      </div>
    )

    const blogForm = () => (
      <div>
        <h3>create new</h3>
        <form onSubmit={this.newBlog}>
          <div>
            title
            <input 
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleNewBlogFieldChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleNewBlogFieldChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleNewBlogFieldChange}
            />
          </div>
          <button type="submit">Create</button>
        </form>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
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
          {blogForm()}
          </div>
        }
      </div>
    );
  }
}

export default App;
