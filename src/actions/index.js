import axios from 'axios'

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_MORTALITY = 'GET_MORTALITY'
export const ERROR_GET_COUNTRIES = 'ERROR_GET_COUNTRIES'

const API_END_POINT = 'http://api.population.io:80/1.0/'
const DEFAULT_PARAM = "25/today"

export function getCountries() {
    /** Permet de faire de l'asynchrone */
    return function (dispatch){
        axios(`${API_END_POINT}countries`).then( response => {            
            dispatch({type: GET_COUNTRIES, payload: response.data.countries})
        }).catch( error => {            
            dispatch({type: ERROR_GET_COUNTRIES, errors: error})
        })
    }
}

export function getMortality(country) {
    return function(dispatch) {
        return axios(`${API_END_POINT}mortality-distribution/${country}/male/${DEFAULT_PARAM}`).then( responseMale => {
            axios(`${API_END_POINT}mortality-distribution/${country}/female/${DEFAULT_PARAM}`).then( responseFemale => { 
                console.log(responseMale)
                console.log(responseFemale)
                dispatch(
                    {
                        type: GET_MORTALITY,
                        payload: {
                            country: country,
                            male: responseMale.data.mortality_distribution,
                            female: responseFemale.data.mortality_distribution
                        }
                    }
                )
            })
        })
    }
}