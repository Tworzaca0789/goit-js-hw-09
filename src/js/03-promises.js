import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name = "delay"]');
const inputStep = document.querySelector('input[name = "step"]');
const inputAmount = document.querySelector('input[name = "amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        //resolve("success value");
        resolve({ position, delay });
      } else {
        // Reject
        //reject("error")
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (
    Number(inputDelay.value) < 0 ||
    Number(inputStep.value) < 0 ||
    Number(inputAmount.value) <= 0
  ) {
    Notiflix.Notify.warning('enter the correct numeric values');
  } else {
    for (let i = 0; i < inputAmount.value; i++) {
      //createPromise(position, delay)
      createPromise(i + 1, 1500)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
      inputDelay.value += inputStep.value;
    }
  }
  e.currentTarget.reset();
});
