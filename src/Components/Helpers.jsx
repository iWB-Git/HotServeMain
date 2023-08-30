import { getAllData } from "../firebase";

export function formatDate(date) {
  //22032023
  let day = Math.floor(date / 1000000);
  let month = Math.floor(date / 10000) - day * 100;
  if (month < 10) {
    month = `0${month}`;
  }
  let year = date - day * 1000000 - month * 10000;
  let newDate = `${day}/${month}/${year}`;
  return newDate;
}

export const getTableData = (data, index) => {
  const keys = Object.keys(data[index].temp);
  const values = Object.values(data[index].temp);
  const myData = [];
  for (let i = 0; i < keys.length; i++) {
    if (i % 10 === 0) {
      let temp = {
        time: keys[i],
        temp: values[i].Temp,
      };
      if (myData.length < 25) {
        myData.push(temp);
      } else {
        break;
      }
    }
  }
  return myData;
};

export const getChartData = (data, index) => {
  const keys = Object.keys(data[index].temp);
  const values = Object.values(data[index].temp);
  const myData = [];
  for (let i = 0; i < keys.length; i++) {
    if (i % 10 === 0) {
      let temp = {
        name: keys[i],
        pv: values[i].Temp,
        amt: values[i].Temp,
      };
      if (myData.length < 50) {
        myData.push(temp);
      } else {
        break;
      }
    }
  }
  return myData;
};
