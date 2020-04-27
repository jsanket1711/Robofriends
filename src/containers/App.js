import React, { Component } from 'react'
import CardList from '../components/CardList';
//import {robots} from './robots';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundry from '../components/ErrorBoundry';

import {setSearchField} from './/actions';            
import { connect } from 'react-redux';

const mapStateToProps = state =>{
    return{
        searchField : state.searchField
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}   
class App extends Component {
    constructor() {
      super()
      this.state = {
        robots: [], 
        
      }
    }

    componentDidMount(){
        
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(users => {this.setState({robots: users})});
        
    }
     
    render() {
        const {robots,searchfield} = this.state;
        const {searchField,onSearchChange}= this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        
        return !robots.length ?
        <h1> Loading </h1>:
        (
            <div className='tc'>
                <h1 className = 'f1'> 'RoboFriends' </h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll> 
                 <ErrorBoundry>

                    <CardList robots ={filteredRobots}/>
                 </ErrorBoundry>
                </Scroll>
            </div>

        );
           
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);