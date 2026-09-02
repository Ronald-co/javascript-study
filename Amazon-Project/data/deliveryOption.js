import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryOption = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDays: 4,
  priceCents: 499
},{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]


export function calculateDeliveryDate(deliveryOptionn) {
  const days = deliveryOptionn.deliveryDays;
  let deliveryDay;
  let i = 0;
  while (i < days) {

    let newDate = deliveryDay;
    let addDay = newDate || dayjs();
    deliveryDay = addDay.add( 1, 'days');
    if (isWeekend(deliveryDay)) {
      continue;
    }
   i++;
  }
 
  const dateString = deliveryDay.format('dddd, MMMM D');
  return dateString;
}



function isWeekend (date){
    const day = date.format('dddd');
    if (day === 'Saturday' || day === 'Sunday') {
       return true;
    } 
  }

 