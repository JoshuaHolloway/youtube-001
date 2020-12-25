const min_elem = document.querySelector('#min');
const sec_elem = document.querySelector('#sec');
const circle_elem = document.querySelector('.circle');

circle_elem.addEventListener('click', () => {

  console.dir(circle_elem);
  
  circle_elem.style.backgroundColor = 'red';
  setTimeout(() => {
    circle_elem.style.backgroundColor = '#161932';
  }, 30);
  // Does exucution pause here?
  console.log('AFTER SetTimeOut()');

  const repeat_time = 1000; // 1s. = 1000ms]
  setInterval(f, repeat_time);

  
});


let time = 62;

const f = () => {
  console.log(time);

  const [min, sec] = convert_from_secs(time);

  if (time === 0) {
    console.log('TIMER END!');
  } if (time < 0) {
    min_elem.textContent = '00';
    sec_elem.textContent = '00';
  } else {
    min_elem.textContent = String(min).padStart(2, '0');
    sec_elem.textContent = String(sec).padStart(2, '0');
  }

  time--;
};

