const min_elem = document.querySelector('#min');
const sec_elem = document.querySelector('#sec');

let time = 62;

const f = () => {
  console.log(time);

  const [min, sec] = convert_from_secs(time);

  min_elem.textContent = String(min).padStart(2, '0');
  sec_elem.textContent = String(sec).padStart(2, '0');

  time--;
};

const repeat_time = 1000; // 1s. = 1000ms]
setInterval(f, repeat_time);