import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import logo from './logo.svg';
//import './App.css';
import foodimg from './food-header.png'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import {Container} from 'react-bootstrap'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
//copied from google to solve marker bug in leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


export default class App extends Component {
  constructor(){
    super()
    this.position = [45.52309, -122.64164]
 
    
  }
  
  componentDidMount(){
    
    
  }

  render() {
    const position = this.position
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
        
        <div>
          <Map style={{ theme: 'dark',height: '800px' }} center={position} zoom={13}>
            <Marker position={position}>
              <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            
          </Map>
        </div>
        
  
      
      </div>
    );
  }
}


