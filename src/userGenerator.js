//generating users for axios mock

//latitude and longitude generator
const generateRandomCoords = () => {

    let minLat = 59.91663594967815,
        maxLat = 59.364993245140347,
        minLon = 30.364993245140347,
        maxLon = 30.33321983772915


    let randCoords = [
        {
        startLat: Math.random() * (maxLat - minLat) + minLat,
        startLon: Math.random() * (maxLon - minLon) + minLon,
        start: new Date(new Date().setHours(new Date().getHours() - 1)).toLocaleString(),
    },
        {
            endLat: Math.random() * (maxLat - minLat) + minLat,
            endLon: Math.random() * (maxLon - minLon) + minLon,
            end: new Date().toLocaleString()
        }
    ]

    return randCoords

};

//user data generator
export const generateUsers = (num) => { //hardcoded for mocking reasons
    let users = []
    const names = ['Joe', 'Rogan', 'Eric', 'Weinstein', 'Andy', 'Stumpf', 'Jocko', 'Willink', 'Bob', 'Lazar']
    for (let i = 0; i < num; i++) {
        let userName = names[i]
        let randomNumber = Math.floor(Math.random() * 100)
        let randomCoordsLength = []

        for(let j=0; j<randomNumber; j++) {
            randomCoordsLength.push(generateRandomCoords())
        }

        users.push({
            id: i,
            name: userName,
            coordinates: randomCoordsLength
        })


    }


    return users
}


