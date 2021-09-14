export default class Starship {
    constructor(name, consumables, passengers) {

        this.name = name;
        this._consumables = consumables;
        this._passengers = passengers;
    }

    get maxDaysInSpace() {

        let periodInSpace = '';

        for (let i = 0; i < this._consumables.length; i++) {

            if (this._consumables[i] === ' ') {
                break;
            }

            periodInSpace += this._consumables[i];
        }

        let days = 0;

        if (this._consumables.indexOf('day') > -1) {
            days = parseInt(periodInSpace);
        }
        if (this._consumables.indexOf('week') > -1) {
            days = parseInt(periodInSpace)*7;
        }
        if (this._consumables.indexOf('month') > -1) {
            days = parseInt(periodInSpace)*30;
        }
        if (this._consumables.indexOf('year') > -1) {
            days = parseInt(periodInSpace)*365;
        }

        let result = (days / this._passengers);

        return result;
    }

}