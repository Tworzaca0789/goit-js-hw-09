const colorStartButton = document.querySelector('button[data-start]');
const colorStopButton = document.querySelector('button[data-stop]');
const colorChangeTime = 1000;
let timerId = null;

//funkcja dajaca wartosc losowa koloru
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
//style inline do wartosci losowej koloru body
function bodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
//klikniecie przyciskiem start
colorStartButton.addEventListener('click', e => {
  timerId = setInterval(bodyColor, colorChangeTime);
  console.log(timerId);
  e.target.setAttribute('disabled', true);
  colorStopButton.removeAttribute('disabled');
});
//klikniecie przyciskiem stop
colorStopButton.addEventListener('click', e => {
  e.target.setAttribute('disabled', true);
  colorStartButton.removeAttribute('disabled');
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
});

/*function inactiveStartButton() {
  colorStartButton.setAttribute(disabled, true);
}

function activeStartButton() {
  colorStartButton.setAttribute(disabled, false);
  timerId = null;
}

function checkingStartButton() {
  if ((timerId = true)) {
    // if (getRandomHexColor === colorStartButton) {
    return inactiveStartButton();
    {
    }
    return activeStartButton();
  }
}
//

/*<button type="button" data-start>Start</button>
<button type="button" data-stop>Stop</button>


Napisz skrypt, który po kliknięciu przycisku «Start», raz na sekundę zmienia kolor tła <body> na wartość losową /n
używając do tego stylu inline. Po kliknięciu przycisku «Stop», kolor tła powinien przestać się zmieniać/n
 i “zatrzymać” się na aktualnym kolorze.

UWAGA
Zwróć uwagę na to, że przycisk «Start» można klikać w nieskończoność./n
 Zrób tak, żeby przycisk «Start» był nieaktywny, tak długo jak zmiana kolorów jest uruchomiona /n
 (użytj atrybutu disabled).

Aby wygenerować losowy kolor użyj funkcji getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
*/
