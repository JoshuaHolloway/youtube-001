// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Globals:
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

let countdown_interval_id = null;
let flashing_interval_id = null;


const min_elem = document.querySelector('#min');
const sec_elem = document.querySelector('#sec');
const circle_elem = document.querySelector('.circle');
const section3_elem = document.querySelector('.section-3');
const pills_inner = document.querySelectorAll('.pills-inner');
const input_fields = document.querySelectorAll('.input-fields');

console.dir(input_fields[0]);


// TODO: Change this to the value entered from user

let time = 0;
input_fields.forEach(elem => {
  
  elem.value = 0;
  elem.addEventListener('input', () => {
    const total_secs = convert_to_secs(
      input_fields[0].value, 
      input_fields[1].value
    );
      
    console.log('total-secs: ', total_secs);

    time = total_secs;
    const [min, sec] = convert_from_secs(total_secs);

    // Reset display
    min_elem.textContent = String(min).padStart(2, '0');
    sec_elem.textContent = String(sec).padStart(2, '0');

  })
});
  
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Grab global colors:
let alarm_colors = [];
for (let i = 1; i <= 3; ++i) {

  const alarm_color = getComputedStyle(document.documentElement)
    .getPropertyValue(`--background-alarm-${i}`);
  alarm_colors.push(alarm_color);
}

// Run / Set toggle class 'selected-pill'
pills_inner[0].addEventListener('click',  () => {

  // Toggle class 'selected-pill'
  pills_inner[0].classList.add('selected-pill');
  pills_inner[1].classList.remove('selected-pill');

  // .section-3 .input_fields{
  //   display: none;
  // }
  input_fields.forEach((elem, idx, arr) => {
    elem.style.display = 'none';
  });


}); // run 

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

pills_inner[1].addEventListener('click',  () => {

  // Toggle class 'selected-pill'
  pills_inner[0].classList.remove('selected-pill');
  pills_inner[1].classList.add('selected-pill');


  // .section-3 .input_fields{
  //   display: inline-block;
  // }
  input_fields.forEach((elem, idx, arr) => {

    console.log('elem: ', elem);

    elem.style.display = 'inline-block';
  });

}); // set

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Reset Button Logic
pills_inner[2].addEventListener('click', () => {
  console.log('reset pill clicked');

  // Flash the button
  pills_inner[2].style.backgroundColor = alarm_colors[2];
  setTimeout(() => {
    pills_inner[2].style.backgroundColor = '#161932';
  }, 300);

  // Reset time (for countdown logic)
  const [min, sec] = convert_from_secs(time);
  
  // Reset display
  min_elem.textContent = String(min).padStart(2, '0');
  sec_elem.textContent = String(sec).padStart(2, '0');

  // Stop flashing:
  clearInterval(flashing_interval_id);
  section3_elem.style.backgroundColor = '#161932';
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Start timer
circle_elem.addEventListener('click', () => {

  console.dir(circle_elem);
  
  // Flash the timer start button
  circle_elem.style.backgroundColor = alarm_colors[2];
  setTimeout(() => {
    circle_elem.style.backgroundColor = '#161932';
  }, 300);
  // Does exucution pause here?
  console.log('AFTER SetTimeOut()');
 
  // Only run when timer >= 0
  countdown_logic_f();
  countdown_interval_id = setInterval(countdown_logic_f, 1000);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const countdown_logic_f = () => {
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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -