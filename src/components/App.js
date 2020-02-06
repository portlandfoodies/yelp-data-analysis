import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import logo from './logo.svg';
//import './App.css';
import foodimg from './food-header.png'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import {Container} from 'react-bootstrap'
import 'leaflet/dist/leaflet.css'
import L, { popup } from 'leaflet'
import Portlanddata from '../data/portland.json'
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
    this.state = {
      markers: [],
    }
    
  }
  
  componentDidMount(){
    const {markers , titles} = this.state;

    const businesses = Portlanddata['businesses']
    var lat, long =0
    for (var x=0 ; x < 50; x++){

      lat = businesses[x]['coordinates']['latitude']
      long = businesses[x]['coordinates']['longitude']
      markers.push({pos : [lat, long], titl: businesses[x]['name']})
    }
    console.log(this.state.markers)
    
    this.setState({markers, titles})
    
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
        
        <div align='left'>
          <Map preferCanvas = {true} style={{ width: '70%',height: '500px' }} center={position} zoom={13} preferCanvas={true}>
            {this.state.markers.map((m, idx) =>
              

              <Marker key={idx} position={m.pos} >
                <Popup>{m.titl}</Popup>
              </Marker>
            )}
           
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


