import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import {Container} from 'react-bootstrap'
import notebook from '../notebook.pdf'


export default class Notebook extends Component {

  
 
  render() {

 
    return (
      <Container>
        
      <iframe style={{ left: '120px', width: '100%',height: '2000px' }} src={notebook} />
      
      </Container>
      
    );
  }

}