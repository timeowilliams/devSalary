import d3 from 'd3';
import topojson from 'topojson';
import Datamap from 'datamaps/dist/datamaps.usa.min'
import React from 'react';
import ReactDOM from 'react-dom';
import statesDefaults from '../data/states-default';
import statesData from '../data/stateData';
import objectAssign from 'object-assign';

export default class DataMap extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      regionData : this.props.regionData,
      showTable : false,
      timeo: false,
      currState : ''
    }
    this.datamap = null;
    this.isLoggedIn = false;
    this.onClick = this.onClick.bind(this);
  }
  linearPalleteScale(value){ // for hash color of the region
    const dataValues = this.props.regionData.map(function(data) { return Math.floor(data.cost_of_living_index) }); // define d3 color range
    const minVal = Math.min(...dataValues);
    const maxVal = Math.max(...dataValues);
    //Min and max range is from 0 -> 192
    return d3.scale.linear().domain([minVal, maxVal]).range(["#EFEFFF","#02386F"])(value);
  }
  //Will return a 
  redducedData(){
    const newData = this.props.regionData.reduce((object, data) => {
      //if(statesDefaults.data.state_code){
      object[data.state_code] = { value: Math.floor(data.cost_of_living_index), fillColor: this.linearPalleteScale(Math.floor(data.cost_of_living_index)), salary: data.wage, application: data.application ? data.application: 0 }; // setting model color and data
      return object;
    // }
    }, {});
    
    return objectAssign({}, statesData, newData); // updating states
  }
  renderMap(){
    const amIuser = this.isLoggedIn;
    const test = new Datamap({
      element: ReactDOM.findDOMNode(this),
      scope: 'usa',
      data: this.redducedData(), // population the fill color range
      geographyConfig: {
        borderWidth: 0.5,
        highlightFillColor: '#FFCC80',
        popupTemplate: function(geography, data) {
          if (data && amIuser) { // If user is not logged in
            return `<div class="hoverinfo"><strong> ${geography.properties.name} <br> Median Salary: $${data.salary} <br> Cost of Living Index: ${data.value} </strong></div>`;
          }
          //If user is logged in
          else{
            return (`<div class="hoverinfo"}><strong> ${geography.properties.name} <br> Median Salary: $${data.salary} <br> Cost of Living Index: ${data.value} <br> # of Applications: ${data.application} </strong></div>`);
          }
        }
      }
    });
    test.options.element.onclick = this.onClick;
    return test;
  }
  onClick(e){
    e.preventDefault();
    console.log('Element data', Object.values(e.target));
    console.log(e.target["__data__"].properties.name);
    let state = e.target["__data__"].properties.name;
    
    console.log('I clicked on this state:', state);
    this.setState({currState: state})
    this.setState({timeo: true})
  }
  
  currentScreenWidth(){
    return window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  }
  componentDidMount(){
    // rescale the size of map here
    const mapContainer = d3.select('#datamap-container');
    const initialScreenWidth = this.currentScreenWidth();
    const containerWidth = (initialScreenWidth < 600) ?
    { width: initialScreenWidth + 'px',  height: (initialScreenWidth * 0.5625) + 'px' } :
    { width: `${600*2.5}px`, height: `${350*2.5}px` } // filling the whole page
    
    mapContainer.style(containerWidth);
    this.datamap = this.renderMap();
    window.addEventListener('resize', () => { // resize the map
      const currentScreenWidth = this.currentScreenWidth();
      const mapContainerWidth = mapContainer.style('width');
      if (this.currentScreenWidth() > 600 && mapContainerWidth !== '600px') {
        d3.select('svg').remove();
        mapContainer.style({
          width: `${600*2.5}px`,
          height: `${350*2.5}px`
        });
        this.datamap = this.renderMap();
      }
      else if (this.currentScreenWidth() <= 600) {
        d3.select('svg').remove();
        mapContainer.style({
          width: currentScreenWidth + 'px',
          height: (currentScreenWidth * 0.5625) + 'px'
        });
        this.datamap = this.renderMap();
      }
    });
  }
  componentDidUpdate(){
    console.log('from 110: component Did update.')
    // console.log('Testing component update. This.props is', this.props);
    console.log('The curr state is', this.state);
    var map = d3.select('.containerclass').append("svg").attr('class','map');
    map.style('width',`${600}px`).style('height',`${600}px`);
    // this.datamap.resize( `${600}px`,`${350}px`)
    // this.datamap.updateChoropleth(this.redducedData());
  }
  componentWillUnmount(){
    d3.select('svg').remove();
  }
  
  
  
  
  render() {
    //Render Component that will show additional state data
    let moreStateInfo;
    if (this.state.timeo) {
      let stateObj;
      console.log('Inside here', this.state)
      //Iterate through this.props.regionData and find the object where the state is equal to currState
      for(let i = 0; i < this.state.regionData.length; i++){
        if(this.state.currState === this.state.regionData[i].name){
          console.log(this.state.regionData[i])
          stateObj = this.state.regionData[i];
          break;
        }
      }
      //Render component that will show all application info
      let applicationInfo;
      
      
      if(stateObj){
        
        // div element 
        // p element 
        
        moreStateInfo = 
        React.createElement('div', stateObj,
        React.createElement('ul',{},
        [
          React.createElement('li', {},`State initials: ${stateObj.name}`),  
          React.createElement('li', {},`Median Salary: $${stateObj.wage}`),
          React.createElement('li', {},`Cost of Living Index: ${stateObj.cost_of_living_index}`),
          React.createElement('li', {},`Median rent for studio: $${stateObj.median_rent}`),  
          React.createElement('li', {},`Gallon of gas: $${stateObj.gas | 2.89}`),  
          React.createElement('li', {},`Gallon of milk: $${stateObj.milk | 3.59}`), 
          
        ]
        )
        );
        console.log('More State Info', moreStateInfo);
        const ul = moreStateInfo.props.children
        const list = ul.props.children
        console.log('ul: ',ul);
        console.log('list: ', list)
        console.log('list: ', list[0].key)
        // list.forEach((li, key) => {
        //   li.key = key;
        // });
      }
    }
    return (
      
      <div id="datamap-container">  
      {moreStateInfo}  
      </div>
      
      );
      
    }
  }
  
  DataMap.propTypes = {
    regionData: React.PropTypes.array.isRequired
  };
  