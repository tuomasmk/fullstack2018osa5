import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders title and header', () => {
    const blog = {
      title: 'testing simple blog is easy',
      author: 'P. Dummy',
      url: 'dummysownesite',
      likes: 57,
      user: null
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog 
        blog={blog}
        onClick={mockHandler}
      />)

    const headerDiv = blogComponent.find('.header')
    const detailsDiv = blogComponent.find('.details')
    const button = blogComponent.find('button')
    
    expect(headerDiv.text()).toContain(blog.title)
    expect(headerDiv.text()).toContain(blog.author)
    expect(detailsDiv.text()).toContain('blog has ' + blog.likes + ' likes')

    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)

  })

  it('calls changeListener when the button is pressed', () => {
    const blog = {
      title: 'testing simple blog is easy',
      author: 'P. Dummy',
      url: 'dummysownesite',
      likes: 57,
      user: null
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog 
        blog={blog}
        onClick={mockHandler}
      />)

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)

  })
})