// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import Typography from 'typography'
import { Provider } from 'react-redux'

import store from '../src/store'
import Router from '../src/router'
import '../src/styles/index.css'

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.666,
  headerFontFamily: [
    'Poppins',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  bodyFontFamily: ['Segoe UI', 'sans-serif'],
})

typography.injectStyles()

let data = document.querySelector('#current-user')
data = data.getAttribute('data')
data = JSON.parse(data)

const App = () => (
  <Provider store={store}>
    <Router user={data.user} />
  </Provider>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
