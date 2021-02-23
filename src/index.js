module.exports = function toReadable(number) {

    if(number === 0) {

        return "zero";
    }

    if(!number) {

        return;
    }

   const numbers = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];

   const tensNumbers = ["", 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

   const decimalPlaces = ["",'hundred', 'thousand', 'million', 'billion', 'trillion'];

  return getArrayOfDecimalPlaces(number).reduce((readableNumber, item, index, array) => {

       const hundred = getHundreds(item) ? `${numbers[getHundreds(item)]} ${decimalPlaces[1]}` : "";

       readableNumber.push(`${hundred}`);

       let tens = getTens(item);
       let num = "";

       switch(true) {

           case tens < 10:
               num = numbers[tens];
               break;
           case tens < 20:
               tens = numbers[tens];
               readableNumber.push(`${tens}`);
               break;
           case tens < 100:
               num = numbers[tens % 10];
               let divide = tens / 10;
               tens = tensNumbers[Math.floor(divide)];
               readableNumber.push(`${tens}`);
               break;
           default: break;
       }

       if(index === array.length - 1) {
           readableNumber.push(`${num}`);

           return readableNumber;
       }

       readableNumber.push(`${num} ${decimalPlaces[Math.abs(index -  array.length)]}`);

       return readableNumber;
   }, []).join(" ").trim();
}

function getArrayOfDecimalPlaces(number) {

    let array = [];

    while(Math.floor(number / 1000)) {

        array.push(number % 1000);

        number = (number - number % 1000) / 1000;
    }

    array.push(number);

    return array.reverse();
}

function getHundreds(number) {

    return (number - number % 100) / 100;
}

function getTens(number) {

    return number % 100;
}
