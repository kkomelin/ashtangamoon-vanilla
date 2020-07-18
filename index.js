'use strict';

const sunCalc = require('suncalc');
const addMinutes = require('date-fns/addMinutes');
// const format = require('date-fns/format');
const { format } = require('date-fns-tz');

const timeZone = 'Europe/Moscow';

const currentDate = new Date();

const moonPhases = [];
for(let i = 0; i < 31 * 24 * 50; i++) {
  const date = addMinutes(currentDate, i);

  const { phase } = sunCalc.getMoonIllumination(date);
  moonPhases.push({
    phase, 
    date: format(date, "yyyy-MM-dd HH:mm", { timeZone })
  });
}

const n = moonPhases.reduce((prev, current) => 
  (prev.phase < current.phase && Math.round(prev.phase) === 0) ? prev : current
);
console.log('new', n);

const closeToFull = moonPhases.filter(item => 
  item.phase >= 0.49 && item.phase <= 0.51
)

const f = closeToFull.reduce((prev, current) => {
  return (prev.phase > current.phase) ? prev : current;
});
console.log('full', f);
