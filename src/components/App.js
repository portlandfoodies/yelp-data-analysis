import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import logo from './logo.svg';
//import './App.css';
import foodimg from '../images/food-header.png'
import fivestar from '../images/yelpstar_regular/regular_5@2x.png'
import fourhalfstar from '../images/yelpstar_regular/regular_4_half@2x.png'
import fourstar from '../images/yelpstar_regular/regular_4@2x.png'
import threehalfstar from '../images/yelpstar_regular/regular_3_half@2x.png'

import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, { popup } from 'leaflet'
import Portlanddata from '../data/portland.json'
import { Container } from 'react-bootstrap';
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
  
  mapplot(star){
    const markers = []
    const titles = []
    const businesses = Portlanddata['businesses']
    var lat, long =0
    for (var x=0 ; x < 1000; x++){

      //lat = businesses[x]['coordinates']['latitude']
      //long = businesses[x]['coordinates']['longitude']
      //markers.push({pos : [lat, long], titl: businesses[x]['name'], r_count:businesses[x]['review_count'] })
      if(businesses[x].rating == star){
        markers.push(businesses[x])
      }
    }
    console.log(this.state.markers)
    this.setState({markers, titles})
  }

  componentDidMount(){
    this.mapplot(5) 
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
        
        <br />
        <br />
        <br />
        <br />
        <br />

        <div align='Center' alt='most catagroies in porltand area'>
          <img src={require('../images/Categories.png')} style={{
              width : '70%',
             
            }
          }/>

          <br />
          <br />

          <Container>
            <h1>Insights</h1>
            <br />
            <p>
              Based on this chart, we can see that top category for restaurants in Portland is Breakfast and Bruch 
            </p>
          </Container>
          

        </div>
          
        <br />
        <br />
        <br />
        <br />
        <br />

        <div class='container-fluid'>
          <div class='row no-gutters' >
            <div class='col-md-8 col-centered'>
              <Map preferCanvas = {true} style={{ left: '130px', width: '95%',height: '500px' }} center={position} zoom={13} touchZoom={false} scrollWheelZoom={false}>
                {this.state.markers.map((m, idx) => 
                  <Marker key={idx} position={[m['coordinates']['latitude'], m['coordinates']['longitude']]} >
                    <Popup>{m.name} <br /> Reviews: {m.review_count} <br /> Rating: {m.rating} </Popup>
                  </Marker>
                )}


              
              
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
              </Map>
            </div>

            <div class='col-md-4 col-centered' style={{left:'130px'}}>
              <img src={fivestar} onClick={this.mapplot.bind(this, 5)}/>
              <br />
              <br /> 
              <img src={fourhalfstar} onClick={this.mapplot.bind(this, 4.5)}/>
              <br /> 
              <br />

              <img src={fourstar} onClick={this.mapplot.bind(this, 4)}/>
              <br />
              <br />
              
              <img src={threehalfstar} onClick={this.mapplot.bind(this, 3.5)}/>
              <br />
              <br />

              <img src={require('../images/yelpstar_regular/regular_3@2x.png')} onClick={this.mapplot.bind(this, 3)}/>
              <br />
              <br />
            
        
            </div>
            <br />

            

          </div>
        </div>
      
        
          
        

        
        
  
      
      </div>
    );
  }
}


