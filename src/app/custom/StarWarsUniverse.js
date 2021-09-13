import StarShip from './Starship'

export default class StarWarsUniverse {
    constructor(count) {

        this.starships = [];
        this.count = count;
        this.allShips = [];

        this._getStarshipCount();
        this._createStarships();
        this.validateData()

        this.init();

    }

    // get theBestStarship() {
    //     return this.starships.map(i => {

    //     })
    // }

    get theBestStarship() {
        for(let i = 0; i < this.starships.length - 1; i++){
            console.log(this.starships[i])
            console.log(this.starships[i].maxDaysInSpace)

            // let a = this.starships[i].maxDaysInSpace;
            // let b = this.theBestStarship.starships[i + 1]


        }
    }

    async _getStarshipCount() {

        await fetch('https://swapi.boom.dev/api/')
            .then(response => response.json())
            .then(data => {

                fetch(data.starships)
                    .then(response => response.json())
                    .then(data => {

                        this.count = data.count

                    });
            });

        return this.count;
    }

    async _createStarships() {

        await fetch('https://swapi.boom.dev/api/starships/')
            .then(response => response.json())
            .then(data => {

                let next = data.next;
                let numberOfPages = data.count / 10 + 1;

                for (let i = 1; i <= numberOfPages; i++) {
                    next = next.substring(0, next.length - 1) + i;

                    if (next !== null) {

                        fetch(next)
                            .then(response => response.json())
                            .then(data => {

                                data.results.map(j => {

                                    this.allShips.push(j);
                                })


                            });
                    }
                }

                this.validateData()
            });

        // console.log(this.allShips)

        return this.allShips;
    }

    validateData() {

        for (let i = 0; i < 36; i++) {

            this.allShips[i]

            let key = this.allShips[i]

            for (const element in key) {

                let shipName = key.name.substring(0, 3)

                if ((key[element] !== null && key[element] !== undefined && key.consumables != 'unknown' && key.passengers != 'unknown' && key.passengers !== 'n/a' && key.passengers !== '0')) {

                    shipName = new StarShip(key.name, key.consumables, key.passengers)

                    if (this.starships.indexOf(shipName) === -1) {

                        if (key.passengers.indexOf(',')) {

                            var specialChars = ",";
                            key.passengers = key.passengers.replace(new RegExp("\\" + specialChars, "gi"), "");
                        }

                        this.starships.push(shipName)
                        break
                    }

                }
            }
        }
        console.log(this.starships)
    }

    async init() {

        await this._getStarshipCount();
        await this._createStarships();

        this.theBestStarship();

        // console.log(this.allShips.length)

    }
}