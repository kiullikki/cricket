

export class Helper  {

    static numberRandom (min, max) {
        Helper.numberRandom.numberRndOldest;
        Helper.numberRandom.numberRndOld;
        let numberRnd = Math.floor(min + Math.random() * (max + 1 - min));
        while(numberRnd ===  Helper.numberRandom.numberRndOld || numberRnd ===  Helper.numberRandom.numberRndOldest) {
            numberRnd = Math.floor(min + Math.random() * (max + 1 - min));
        }
         Helper.numberRandom.numberRndOldest =  Helper.numberRandom.numberRndOld;
         Helper.numberRandom.numberRndOld = numberRnd;
        return numberRnd;
    }


    static getDistance (coordsStart, coordsEnd) {
            return Math.sqrt((coordsStart.x - coordsEnd.x) *(coordsStart.x - coordsEnd.x) + (coordsStart.y - coordsEnd.y) * (coordsStart.y - coordsEnd.y));
        }

    static getSegments (coordsStart, coords) {
        let curve = new Bezier(coordsStart.x, coordsStart.y, coords.xControlOne, coords.yControlOne, coords.xControlTwo, coords.yControlTwo, coords.xEnd, coords.yEnd),
            coordsEnd = {
                x: coords.xEnd,
                y: coords.yEnd
            },
            lengthCurve = Helper.getDistance(coordsStart, coordsEnd),
            coefCurve = 0.6,
            qtSegments = Math.round(lengthCurve / coefCurve);

        return curve.getLUT(qtSegments);
    }

    static getDrawSegments (lineCoords, radius) {
        let index = 0;
        for (let i = 1; i < lineCoords.length && index === 0; i++) {
            let distance = Helper.getDistance (lineCoords[0], lineCoords[i]);

            if (distance < radius)
                continue;
            index = i;
        }
        return lineCoords.copyWithin(0, index);
    }

    static getFormated (value, digits) {
        let str = value.toString();
        for(let i = 0; i < digits - 1; i++) {
            str = "0" + str;
        }

        return str.substr(str.length - digits, digits).split('');
    }
}