import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import logo from './logo.svg';
//import './App.css';
import foodimg from './food-header.png'
export default class App extends Component {
 

  render() {
    return (
      <div className="App">
        <div>
          <img src={`${foodimg}`} style= {
            {
              width : "100%",
            }
          }/>
          <p align='center'> Welcome to Yelp Data Analysis CS410/CS510</p>


        </div>
        <div style={{backgroundImage: `url(${foodimg})`}}>
            
        </div>

      
      </div>
    );
  }
}


