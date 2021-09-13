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

        // switch (fruits) {
        //     case "Banana":
        //         text = "Banana is good!";
        //         break;
        //     case "Orange":
        //         text = "I am not a fan of orange.";
        //         break;
        //     case "Apple":
        //         text = "How you like them apples?";
        //         break;
        //     default:
        //         text = "I have never heard of that fruit...";
        // }

        if (this._consumables.indexOf('day')) {
            days = parseInt(periodInSpace);
        }
        if (this._consumables.indexOf('week')) {
            days = parseInt(periodInSpace)*7;
        }
        if (this._consumables.indexOf('month')) {
            days = parseInt(periodInSpace)*30;
        }
        if (this._consumables.indexOf('year')) {
            days = parseInt(periodInSpace)*365;
        }

        return (days / this._passengers);
    }

}