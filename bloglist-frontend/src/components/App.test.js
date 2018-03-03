import React from 'react'
import { mount } from 'enzyme'
import App from '../App'
import Blog from './Blog'
jest.mock('../services/blogs')

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeAll(() => {
      app = mount(<App />)
    })  

    it('at start the form is not displayed', () => {
      const div = app.find('.loginForm')
      expect(div.getElement().props.style).toEqual({ display: 'none' })
    })
  
    it('after clickin the button, the form is shown', () => {
      const button = app.find('button')
  
      button.at(0).simulate('click')
      const div = app.find('.loginForm')
      expect(div.getElement().props.style).toEqual({ display: '' })
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'mluukkai',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI1YTkxNGQ4NThlMTM0MTJmYTQ0ZWVjYWIiLCJpYXQiOjE1MjAwMTUwODB9.FABvsrwe4Z8nUQB5fJDldoQGQw8N2NkpJF0ZHPIjyVU',
        name: 'Matti Luukkainen'
      }
      
      localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      
//      console.log('localStorage: ' + localStorage.getItem('loggedBlogappUser'))

      app = mount(<App />)
    })

    it('blogs are rendered', () => {
      const user = {
        username: 'mluukkai',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI1YTkxNGQ4NThlMTM0MTJmYTQ0ZWVjYWIiLCJpYXQiOjE1MjAwMTUwODB9.FABvsrwe4Z8nUQB5fJDldoQGQw8N2NkpJF0ZHPIjyVU',
        name: 'Matti Luukkainen'
      }
      app.update()
      const div = app.find('.blogStyle')
      expect(div.length).toBe(6)
    })

/*    it('login button is not visible', () => {
      app.update()
      const div = app.find('.loginButton')
      expect(div.getElement()).toEqual({undefined})
    })*/
    
  })
})