import React from 'react';
import { connect } from 'react-redux';
import HomeComponent from '../components/HomeComponent'
import DataMap from '../components/DataMap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <HomeComponent />
        <div className='datamap-outer-conainer'>
        <DataMap 
        regionData={this.props.regionData} 
        />
        <div className = 'data'></div>
      </div>
      </div>
      );
    }
  }
  
  App.propTypes = {
    regionData: React.PropTypes.array.isRequired,
    emptyRegions: React.PropTypes.array.isRequired,
    sortState: React.PropTypes.object.isRequired,
  };
  
  function sortCollection(collection, sortState) {
    switch (sortState.direction) {
      case 'ASC':
      return collection.sort(function (a, b) {
        if (a[sortState.key] > b[sortState.key]) return 1;
        if (a[sortState.key] < b[sortState.key]) return -1;
        return 0;
      });
      
      case 'DESC':
      return collection.sort(function (a, b) {
        if (a[sortState.key] > b[sortState.key]) return -1;
        if (a[sortState.key] < b[sortState.key]) return 1;
        return 0;
      });
      
      default:
      return collection;
    }
  }
  
  function alphabeticOrder(collection) {
    return collection.sort(function (a, b) {
      if (a.regionName > b.regionName) return 1;
      if (a.regionName < b.regionName) return -1;
      return 0;
    });
  }
  
  function mapStateToProps(state) {
    return {
      regionData: sortCollection(state.regionData, state.sortState),
      emptyRegions: alphabeticOrder(state.emptyRegions),
      sortState: state.sortState,
    };
  }
  
  export default connect(mapStateToProps)(App);
  