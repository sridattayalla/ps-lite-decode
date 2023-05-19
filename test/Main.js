
export function stringify(fn){
    return JSON.stringify(fn)
}

export function movieData(){
    var x = []
    for(var i=0 ;i<5; i++){
        x.push({cast : ["asdf", "123"], title : "afg", year: 2020, rating: 7.3, reviews : {count: 10}})
    }
    // return ["", "", "", "", "",]
    return {cast : ["asdf", "123"], title : "afg", year: 2020, rating: 7.3, reviews : {count: 10}};
}

export function carData(){
    return {wheels : 5, fuelLevel: 10}
}