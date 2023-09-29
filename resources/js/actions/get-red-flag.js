import { differenceInMonths, differenceInYears } from "date-fns"

export const getRedFlag = (data) => {
    const almostExpiredListings = data?.filter(item => {
        const monthsDiff = differenceInMonths(new Date(item.expiry_date_of_aggrement), new Date())

        if(monthsDiff < 6 && monthsDiff > 0 ) return item
        
    })
    return almostExpiredListings
}

export const getExpired = (data) => {
    const expiredListings = data.filter(item => {
        const monthsDiff = differenceInMonths(new Date(item.expiry_date_of_aggrement), new Date())

        if( monthsDiff <= 0 ) return item
 
    })
    return expiredListings
}



const graphData = [
    {year: 1, total: 0},
    {year: 2, total: 0},
    {year: 3, total: 0},
    {year: 4, total: 0},
    {year: 5, total: 0},
    {year: 6, total: 0},
    {year: 7, total: 0},
    {year: 8, total: 0},
    {year: 9, total: 0},
    {year: 10, total: 0},
]

export const getListingsBasedOnYears = (data, year) => {
    const expiredListings = data.filter(item => {
        const yearsDiff = differenceInMonths(new Date(item.expiry_date_of_aggrement), new Date())
        // console.log(yearsDiff)
        if( yearsDiff > (year - 1)*12 && yearsDiff <= year*12 ) return item
 
    })
    
    return expiredListings
}

export const getGraphData = (data) => {
    
    graphData.forEach(item => {
        item.total = getListingsBasedOnYears(data, item.year).length

    })
    
    return graphData
}
