import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const valueDataSpan = document.querySelectorAll('.value');
const labelSpan = document.querySelectorAll('.label');
const field = document.querySelectorAll('.field');
const timer = document.querySelector('.timer');
const TIME_CALCULATION = 1000;
let timerId = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: selectedDates => {
    console.log(selectedDates[0].getTime());
    console.log(Date.now());
    dateFlatPicker(selectedDates);
  },
};

flatpickr(dateTimePicker, { ...options });

startBtn.disabled = true;

function dateFlatPicker(selectedDates) {
  if (selectedDates[0].getTime() < Date.now()) {
    alert('Please choose a date in the future', {
      clickToClose: true,
      timeout: 10000,
    });
    startBtn.disabled = true;
  } else {
    startBtn.disabled = false;
  }
}
//flatpickr(element, {options});

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  dateTimePicker.disabled = true;

  timerId = setInterval(() => {
    const startingDate = new Date(dateTimePicker.value);
    const endDate = startingDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(endDate);
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);

    if (endDate <= TIME_CALCULATION) {
      clearInterval(timerId);
      dateTimePicker.disabled = false;
    }
  }, TIME_CALCULATION);
});
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
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

//const preciseTeamMeetingDate = new Date('')

/*onClose: function(selectedDates, dateStr, instance){
       // ...
    }
    
   onClose#
onClose jest wyzwalany po zamknięciu kalendarza.

 selectedDates - tablica obiektów Date wybranych przez użytkownika. Jeśli nie wybrano żadnych dat, tablica jest pusta.
dateStr - ciąg reprezentujący ostatnio wybrany przez użytkownika obiekt Date. Ciąg jest sformatowany zgodnie z dateFormatopcją.
instance - obiekt flatpickr zawierający różne metody i właściwości
    */
