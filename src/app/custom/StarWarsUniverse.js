import StarShip from './Starship'

export default class StarWarsUniverse {
    constructor() {

        this.starships = [];
        this.count = 0;
        this.allShips = [];

        this._getStarshipCount();
        this._createStarships();
        this._validateData()

        this.init();

    }

    async _getStarshipCount() {

        await fetch('https://swapi.dev/api/')
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

        await fetch('https://swapi.dev/api/starships/')
            .then(response => response.json())
            .then(data => {

                let next = data.next;
                let numberOfPages = parseInt(data.count / 10 + 1);

                for (let i = 1; i <= numberOfPages; i++) {
                    next = next.substring(0, next.length - 1) + i;

                    if (next !== null) {

                        fetch(next)
                            .then(response => response.json())
                            .then(data => {

                                data.results.map(j => {

                                    if (!this.allShips.find(o => o.name === j.name)) {
                                        this.allShips.push(j);
                                    }
                                })
                            });
                    }
                }

                this._validateData()
            });
    }

    _validateData() {
        for (let i = 0; i < 36; i++) {

            this.allShips[i]

            let key = this.allShips[i]

            for (const element in key) {

                let shipName = key.name.substring(0, 3)

                if ((key[element] !== null && key[element] !== undefined && key.consumables != 'unknown' && key.passengers != 'unknown' && key.passengers !== 'n/a' && key.passengers !== '0')) {

                    if (key.passengers.indexOf(',')) {

                        var specialChars = ",";
                        key.passengers = key.passengers.replace(new RegExp("\\" + specialChars, "gi"), "");
                    }

                    shipName = new StarShip(key.name, key.consumables, key.passengers)

                    if (!this.starships.find(o => o.name === key.name)) {

                        this.starships.push(shipName)
                    }
                }
            }
        }
        return this.starships;
    }

    get theBestStarship() {

        const maxValueOfY = Math.max(...this.starships.map(o => o.maxDaysInSpace), 0);

        let highestShip = this.starships.find(i => i.maxDaysInSpace === maxValueOfY);

        return highestShip;
    }

    async init() {

        await this._getStarshipCount();
        await this._createStarships();
        this.theBestStarship;
    }
}
