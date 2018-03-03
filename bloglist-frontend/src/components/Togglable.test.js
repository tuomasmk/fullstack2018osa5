import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TogglableBlog from './Togglable'
import Blog from './Blog'

describe('<TogglableBlog />', () => {
  let togglableComponent

  const user = {
    name: 'Matti Luukkainen',
    token: '',
    username: 'mluukkai'
  }

  const blog = {
    title: 'testing simple blog is easy',
    author: 'P. Dummy',
    url: 'dummysownesite',
    likes: 57,
    user: user
  }

  const mockUpdate = jest.fn()
  const mockDelete = jest.fn()

  beforeEach(() => {
    togglableComponent = shallow(
      <TogglableBlog
        blog={blog}
        user={user}
        updateBlog={mockUpdate}
        deleteBlog={mockDelete}>
      </TogglableBlog>
    )
  })

  /*it('renders its children', () => {
    expect(togglableComponent.contains(<div class='testDiv' />)).toEqual(true)
  })*/

  it('at start the children are not displayed', () => {
    const div = togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after clickin the text, details are shown', () => {
    const p = togglableComponent.find('p')

    p.at(0).simulate('click')
    const div = togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: '' })
  })
})