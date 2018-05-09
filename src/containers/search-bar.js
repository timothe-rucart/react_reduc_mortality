import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCountries, getMortality } from './../actions/index'

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {selectedCountry: this.props.defaultCountry}
    }

    componentWillMount() {        
        this.props.getCountries()
    }

    renderSelectBox() {
       const {countries} = this.props
    
       if(countries) {
           return(
                <select value={this.state.selectedCountry} onChange={this.search} className="col-lg-12 input-group" >
                {
                    countries.map( country => {
                        return <option key={country} value={country} >{country}</option>
                    })
                }
                </select>
           )
       } else {
           return <div>No country found</div>
       }
    }

    search = e => {
        this.setState({selectedCountry: e.target.value}, () => {
            this.props.getMortality(this.state.selectedCountry)
        })
    }

    render () {
        return (
            <div className="search-bar">
                {this.renderSelectBox()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        countries: state.countries
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({getCountries, getMortality}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchBar)