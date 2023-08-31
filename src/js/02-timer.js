import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
const valueData = document.querySelectorAll('.value');
const labelSpan = document.querySelectorAll('.label');
const TIME_CALCULATION = 1000;
const options = {
  enableTime: true, //Włącza selektor czasu
  time_24hr: true, //Wyświetla selektor czasu w trybie 24-godzinnym bez wyboru AM/PM, jeśli jest włączony.
  defaultDate: new Date() /*Ustawia początkowo wybrane daty.

  Jeśli używasz mode: "multiple"kalendarza zakresu, dostarczaj Arrayobiekty Datelub tablicę ciągów dat, które podążają za twoim dateFormat.
  
  W przeciwnym razie możesz podać pojedynczy obiekt Date lub ciąg daty.*/,
  minuteIncrement: 1, //Reguluje krok wprowadzania minut (w tym przewijanie)

  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
//flatpickr(element, {options});
flatpickr(dateTimePicker, { options });

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

//const preciseTeamMeetingDate = new Date('March 16, 2030 14:25:00');
//console.log(preciseTeamMeetingDate);
// "Mon Mar 16 2030 14:25:00 GMT+0200 (Eastern European Standard Time)"
/*onClose: function(selectedDates, dateStr, instance){
       // ...
    }
    
   onClose#
onClose jest wyzwalany po zamknięciu kalendarza.

 selectedDates - tablica obiektów Date wybranych przez użytkownika. Jeśli nie wybrano żadnych dat, tablica jest pusta.
dateStr - ciąg reprezentujący ostatnio wybrany przez użytkownika obiekt Date. Ciąg jest sformatowany zgodnie z dateFormatopcją.
instance - obiekt flatpickr zawierający różne metody i właściwości
    */
