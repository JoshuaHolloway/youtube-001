// TODO: Change this to the value entered from user
const INITIAL_TIME = 2;

let time = INITIAL_TIME;

const min_elem = document.querySelector('#min');
const sec_elem = document.querySelector('#sec');
const circle_elem = document.querySelector('.circle');
const section3_elem = document.querySelector('.section-3');
const pills_inner = document.querySelectorAll('.pills-inner');

pills_inner[2].addEventListener('click', () => {
  console.log('reset pill clicked');

  // Reset time (for countdown logic)
  time = INITIAL_TIME;
  const [min, sec] = convert_from_secs(time);
  
  // Reset display
  min_elem.textContent = String(min).padStart(2, '0');
  sec_elem.textContent = String(sec).padStart(2, '0');

  // Stop flashing:
  clearInterval(flashing_interval_id);
  section3_elem.style.backgroundColor = '#161932';
});

let alarm_colors = [];
for (let i = 1; i <= 3; ++i) {

  const alarm_color = getComputedStyle(document.documentElement)
    .getPropertyValue(`--background-alarm-${i}`);
  alarm_colors.push(alarm_color);
}
// console.log('alarm_colors: ', alarm_colors);

let countdown_interval_id = null;
let flashing_interval_id = null;
circle_elem.addEventListener('click', () => {

  console.dir(circle_elem);
  
  circle_elem.style.backgroundColor = 'red';
  setTimeout(() => {
    circle_elem.style.backgroundColor = '#161932';
  }, 300);
  // Does exucution pause here?
  console.log('AFTER SetTimeOut()');
 
  // Only run when timer >= 0
  countdown_interval_id = setInterval(f, 1000);
});




const f = () => {
  console.log(time);

  const [min, sec] = convert_from_secs(time);

  if (time === 1) {
    let count = 0;
    flashing_interval_id = setInterval(() => {
      if(count % 2 === 0) { // even
        section3_elem.style.backgroundColor = alarm_colors[1];
      } else  {// odd
        section3_elem.style.backgroundColor = alarm_colors[2];
      }
    
      count++;
    }, 1000);
  } if (time <= 0) {
    min_elem.textContent = '00';
    sec_elem.textContent = '00';

    // Stop decrementing the timer
    clearInterval(countdown_interval_id);
  } else {
    min_elem.textContent = String(min).padStart(2, '0');
    sec_elem.textContent = String(sec).padStart(2, '0');
  }

  time--;
};

