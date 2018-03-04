import React from 'react';
import store from './index'


class App extends React.Component {

  vote = (id) => () => {
    store.dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  createA = (event) => {
    event.preventDefault()
    console.log('create clicked')
    console.log(event.target)
    const content = event.target.content.value
    store.dispatch({
      type: 'ADD',
      data: content
    })
    event.target.content.value = ''
  }
  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.createA}>
          <div><input name="content" /></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App