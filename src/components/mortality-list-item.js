import React from 'react'
import Flag from './flag'
import { ColumnChart } from 'react-chartkick';
import Chart from 'chart.js';

const xTitle = 'Age'
const yTitle = "% Mortalite"

const MortalityListItem = ({mortality}) => {
    const formatedDataMale = formatMortalityData(mortality.male)
    const formatedDataFemale = formatMortalityData(mortality.female)

    console.log(formatedDataFemale)
    console.log(formatedDataMale)
    return (
        <tr>
            <td><Flag country={mortality.country} className="flag_medium"/></td>
            <td className="col-md-6"><ColumnChart xtitle={xTitle} ytitle={yTitle} data={formatedDataMale} max={30}/></td>
            <td className="col-md-6"><ColumnChart xtitle={xTitle} ytitle={yTitle} data={formatedDataMale} max={30}/></td>
        </tr>
    )
}

function formatMortalityData(mortality) {    
    const array1 = mortality.filter(data => data.age <=101)

    const array = array1.map( data => {
        return [Number((data.age).toFixed(0)), Number((data.mortality_percent).toFixed(0))]
    })
    return array
}

export default MortalityListItem