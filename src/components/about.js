import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import {Container, Row, Col} from 'react-bootstrap'
export default class About extends Component {
  constructor(){
    super()
    this.state ={
      markdown : ''
    }
  }
  componentDidMount(){
    const readmefile = "https://raw.githubusercontent.com/portlandfoodies/portlandfoodies.github.io/master/README.md"
    fetch(readmefile).then(response => {
      return response.text()
    }).then(text => {
      this.setState({
        markdown : text
      }
      )
    })
  }

  render(){
    const {markdown} = this.state
    return(
    
      
      <div>
        <br />
        <br />
        <p align='center'><a href="https://github.com/portlandfoodies/portlandfoodies.github.io">Project Github Repo</a></p>
        <p align='center'><a href="https://github.com/portlandfoodies/yelp-data-analysis">Project Webpage Repo</a></p>
        <Container>
          <p align='center'><ReactMarkdown source={markdown}/></p>
        </Container>
      </div>
      
    )
  }
}