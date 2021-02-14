import React, {Fragment, Component, useState} from 'react'
import RegionalVariety from '../components/RegionalVariety.js'
import {Button} from "react-bootstrap"

class RegionalVarietyContainer extends Component {

    state = {
        data: [],
        currentPage: 1,
        pageSize: 10,
        variety: ''
    }

    componentDidMount(){
        this.variety()
    }

    variety = () => {
        console.log(this.state.variety)
        this.setState({
            variety: this.props.variety
        })
        this.getVariety(this.props.variety)
    }

     
    getVariety = (variety) =>  {
    
      const token = localStorage.token;
      fetch(`http://localhost:3000/wines/${variety}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      .then(resp => resp.json())
      .then(data => this.setState({
         data: data
      }))
    }
  
      showTen = ()  => {
        this.setState(prevState => {
            return {currentPage: prevState.currentPage + 1}
        })} 
        
      previousTen =  () => {
        if (this.state.currentPage > 1) {
        this.setState(prevState => {
            return {currentPage: prevState.currentPage - 1}
        })} }

      filterWines = (e) => {
        e.preventDefault()
        console.log(e.target.children[0].value)  
        this.setState(prevState => { 
              return { data: prevState.data.filter(wines => wines.title.includes(e.target.children[0].value)) } 
         } )  
      }
    

    render(){ 
        const {pageSize, currentPage} = this.state
        return(
          
            <div><br></br>
                <form onSubmit={(e) => this.filterWines(e)}> 
                <input name='filter-wine' placeholder='...search'></input><Button type='submit' value='Submit' variant='outline-dark'>Search</Button>
                </form>
                {this.state.data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map(rv  => <RegionalVariety wine={rv} ten={this.showTen} key={rv.id} selectedWine={this.props.selectedWine}  />) }
                <Button variant='outline-dark' onClick={() => this.previousTen()}>Previous Page</Button>  
                <Button variant='outline-dark' onClick={() => this.showTen()}>Next Page</Button><br></br>
                <a className='left body'>Page: {this.state.currentPage}</a>       
            </div>
     
     
        )
    } 
}

export default RegionalVarietyContainer