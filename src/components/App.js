import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
//import logo from './logo.svg';
//import './App.css';
import foodimg from '../images/food-header.png'
import fivestar from '../images/yelpstar_regular/regular_5@2x.png'
import fourhalfstar from '../images/yelpstar_regular/regular_4_half@2x.png'
import fourstar from '../images/yelpstar_regular/regular_4@2x.png'
import threehalfstar from '../images/yelpstar_regular/regular_3_half@2x.png'

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Portlanddata from '../data/portland.json'
import { Container, useAccordionToggle } from 'react-bootstrap';
//copied from google to solve marker bug in leaflet
var cors = require('cors');



delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


export default class App extends Component {
  constructor(){
    super()
    this.mapresponse = React.createRef();
    this.position = [45.52309, -122.64164]
    this.state = {
      markers: [],
      mapres: "abc",
    }
    
    
  }
  
  mapplot(star){
    const markers = []
    const titles = []
    const businesses = Portlanddata['businesses']
    for (var x=0 ; x < 1000; x++){

      //lat = businesses[x]['coordinates']['latitude']
      //long = businesses[x]['coordinates']['longitude']
      //markers.push({pos : [lat, long], titl: businesses[x]['name'], r_count:businesses[x]['review_count'] })
      if(businesses[x].rating === star){
        markers.push(businesses[x])
      }
    }
    console.log(this.state.markers)
    this.setState({markers, titles})
  }

  businessinfo(m){
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/` + m.id + "/reviews",{
      method: 'GET',
      headers: {
        Authorization: 'Bearer XdBia7yU2QMsgurA7Tyzm_A9lxiTDOqp-MW7lQYi0-6AMD7zc4odwN6FtDB-LvD0bAxLQCS6OPboZ38sEQ2LtpfRaVjaTHeIqZtt87sXe-Oxfr865KbbTT9ocn8nXnYx'
      },
    })
    .then(res => {
      console.log(res);
      var r = [];
      for(var i=0; i<3; i++){
        r.push(<div>{res.data.reviews[i].text}</div>);

      }

      this.setState({mapres: r});
    })

  

    

  }

  componentDidMount(){
    this.mapplot(5) 
  }

  render() {
    const position = this.position
    return (
      <div className="App">
        <div>
          <img src={`${foodimg}`} alt='foodimg' style= {
            {
              width : "100%",
            }
          }/>
          <p align='center'> Welcome to Yelp Data Analysis CS410/CS510</p>
        </div>
        
        <br />
        <br />

        <div class='container-fluid'>
          <div class='row no-gutters' >
            <div class='col-md-9 col-centered'>
              <Map preferCanvas = {true} style={{ left: '120px', width: '100%',height: '500px' }} center={position} zoom={13} touchZoom={false} scrollWheelZoom={false}>
                {this.state.markers.map((m, idx) => 
                  <Marker onClick={this.businessinfo.bind(this, m)} key={idx} position={[m['coordinates']['latitude'], m['coordinates']['longitude']]} >
                    
                    <Popup> {m.name} <br /> Reviews: {m.review_count} <br /> Rating: {m.rating} </Popup>
                  </Marker>
                )}

                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
              </Map>
            </div>

            <div class='col-md-3 col-centered' style={{left:'130px'}}>
              <img src={fivestar} alt='5star' onClick={this.mapplot.bind(this, 5)}/>
              <br />
              <br /> 
              <img src={fourhalfstar} alt='4.5star' onClick={this.mapplot.bind(this, 4.5)}/>
              <br /> 
              <br />

              <img src={fourstar} alt='4star' onClick={this.mapplot.bind(this, 4)}/>
              <br />
              <br />
              
              <img src={threehalfstar} alt='3.5star' onClick={this.mapplot.bind(this, 3.5)}/>
              <br />
              <br />

              <img src={require('../images/yelpstar_regular/regular_3@2x.png')} alt='3star' onClick={this.mapplot.bind(this, 3)}/>
              <br />
              <br />
            
        
            </div>
            <br />

            

          </div>
        </div>
      
        
        <br />
        <br />
        <br />
        
        
       
        <div ref={this.mapresponse}>
            {this.state.mapres}
        </div>
          
        <div align='Center' alt='most catagroies in porltand area'>
          <img src={require('../images/Categories.png')} alt='category' style={{
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

        <div align='center'>
          <img style={{height:'500px', width: '50%'}} src={require('../images/wordcloud_2.png')}></img>
        </div>
        
        
  
      
      </div>
    );
  }
}


