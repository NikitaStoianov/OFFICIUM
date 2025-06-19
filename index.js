setTimeout(function(){
    
    let textFieldHello = document.querySelector("#title");
    let hours = new Date;
    hours = hours.getHours(); 
    let text = "<br>mr. NIKITA STOIANOV";
    if (5<=hours && hours<12){
        text = "GOOD MORNING," + text;
    } else if (12<=hours && hours<17){
        text = "GOOD DAY," + text;
    } else if (17<=hours && hours<22){
        text = "GOOD EVENING," + text;
    } else{
        text = "GOOD NIGHT," + text;
    }
    textFieldHello.innerHTML= text;
}, 1)


setInterval(function(){
    timeField = document.querySelector("#timeField");
    dateField = document.querySelector("#dateField");
    zoneField = document.querySelector("#zoneField")
    date = new Date();
    if(date.getSeconds()%2 != 0){
        timeField.innerHTML = date.getHours().toString().padStart(2, "0") + ":" + 
        date.getMinutes().toString().padStart(2, "0") + ":" + 
        date.getSeconds().toString().padStart(2, "0")
    } else{
        timeField.innerHTML = date.getHours().toString().padStart(2, "0") + " " + 
        date.getMinutes().toString().padStart(2, "0") + " " + 
        date.getSeconds().toString().padStart(2, "0")
    }
    dateField.innerHTML = date.toString().slice(0,15)
    zoneField.innerHTML = date.toString().slice(25)

} , 1)


async function fetchWeather(city) {
      try {
    const iconMap = {
      "Sunny": "https://cdn-icons-png.flaticon.com/128/869/869869.png",
      "Clear": "https://cdn-icons-png.flaticon.com/128/869/869869.png",
      "Partly cloudy": "https://cdn-icons-png.flaticon.com/128/1163/1163661.png",
      "Cloudy": "https://cdn-icons-png.flaticon.com/128/414/414825.png",
      "Overcast": "https://cdn-icons-png.flaticon.com/128/414/414825.png",
      "Mist": "https://cdn-icons-png.flaticon.com/128/4005/4005901.png",
      "Patchy rain possible": "https://cdn-icons-png.flaticon.com/128/1163/1163624.png",
      "Light rain": "https://cdn-icons-png.flaticon.com/128/1163/1163624.png",
      "Moderate rain": "https://cdn-icons-png.flaticon.com/128/1163/1163630.png",
      "Heavy rain": "https://cdn-icons-png.flaticon.com/128/1163/1163636.png",
      "Snow": "https://cdn-icons-png.flaticon.com/128/642/642102.png",
    };  
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        const data = await response.json();

        const today = data.weather[0];
        const tomorrow = data.weather[1];

        function formatDay(dayData, label) {
          const avgTemp = dayData.avgtempC;
          const maxTemp = dayData.maxtempC;
          const minTemp = dayData.mintempC;
          const hourData = dayData.hourly[4]; 
          const condition = hourData.weatherDesc[0].value;
          const wind = hourData.windspeedKmph
          const humidity = hourData.humidity;

          const iconUrl = iconMap[condition] || "https://cdn-icons-png.flaticon.com/128/1163/1163624.png";

          return `
            <div id="day">
              <img class = "weather-icon" src="${iconUrl}" alt="${condition}" width="64" height="64">
              <div>
                <p style = "margin-top: 10px;">Condition: ${condition}</br>Average Temp: ${avgTemp}°C 
                (Min: ${minTemp}°C, Max: ${maxTemp}°C)<br>Wind: ${wind} 
                km/h<br>Humidity: ${humidity}%</p>
              </div>
            </div>
          `;
        }

        document.querySelector('#weather').innerHTML = formatDay(today, 'Today');
      } catch (error) {
        document.querySelector('#weather').innerHTML = 'Failed to load weather data.';
        console.error('Error fetching weather:', error);
      }
    }

fetchWeather("Moscow")

function upgradeWeather(){
    city = document.querySelector("#city").value
    fetchWeather(city) 
}

document.querySelector("#city").addEventListener("input",upgradeWeather)


function CBR_XML_Daily_Ru(rates) {

  function trend(current, previous) {
    if (current > previous) return ' ▲';
    if (current < previous) return ' ▼';
    return '';
  }

  function colorTrend(currency) {
    if (currency.innerHTML.indexOf("▼") > 0){
      currency.style.color = "red"
    } else {
      currency.style.color = "green"
    }
  }

  let currencyRUBCHF = document.querySelector("#select").value;

  if (currencyRUBCHF === "RUB") {
    let CHFrate = rates.Valute.CHF.Value.toFixed(4);
    let CHF = document.getElementById('CHF');
    CHF.innerHTML = "🇨🇭CHF " + CHFrate + " RUB";
    CHFtag.innerHTML = trend(rates.Valute.CHF.Value, rates.Valute.CHF.Previous);
    colorTrend(CHFtag);

    let USDrate = rates.Valute.USD.Value.toFixed(4);
    let USD = document.getElementById('USD');
    USD.innerHTML = "🇺🇸USD " + USDrate + " RUB";
    USDtag.innerHTML = trend(rates.Valute.USD.Value, rates.Valute.USD.Previous);
    colorTrend(USDtag);

    let EURrate = rates.Valute.EUR.Value.toFixed(4);
    let EUR = document.getElementById('EUR');
    EUR.innerHTML = "🇪🇺EUR " + EURrate + " RUB";
    EURtag.innerHTML = trend(rates.Valute.EUR.Value, rates.Valute.EUR.Previous);
    colorTrend(EURtag);

  } else if (currencyRUBCHF === "CHF") {
    let CHFrate = rates.Valute.CHF.Value;
    let CHFratePrev = rates.Valute.CHF.Previous;

    let USDrate = (rates.Valute.USD.Value / CHFrate).toFixed(4);
    let USD = document.getElementById('USD');
    USD.innerHTML = "🇺🇸USD " + USDrate + " CHF";
    USDtag.innerHTML = trend(rates.Valute.USD.Value, rates.Valute.USD.Previous/CHFratePrev);
    colorTrend(USDtag);

    let EURrate = (rates.Valute.EUR.Value / CHFrate).toFixed(4);
    let EUR = document.getElementById('EUR');
    EUR.innerHTML = "🇪🇺EUR " + EURrate + " CHF";
    EURtag.innerHTML = trend(rates.Valute.EUR.Value, rates.Valute.EUR.Previous/CHFratePrev);
    colorTrend(EURtag);

    let CHF = document.getElementById('CHF');
    CHF.innerHTML = "🇷🇺RUB " + (1/CHFrate).toFixed(4) + " CHF";
    CHFtag.innerHTML = trend(rates.Valute.CHF.Value, 1/rates.Valute.CHF.Previous); 
    colorTrend(CHFtag);
  }
}

async function fetchRatesAndUpdate() {
  try {
    const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const data = await response.json();
    CBR_XML_Daily_Ru(data);
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
}


fetchRatesAndUpdate();
setInterval(fetchRatesAndUpdate, 1000);

document.querySelector("#select").addEventListener("change", fetchRatesAndUpdate);



async function fetchIMOEXData() {


  const url = 'https://iss.moex.com/iss/engines/stock/markets/index/boards/SNDX/securities/IMOEX.json'
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();

  document.querySelector("#imoex").innerHTML = "IMOEX: " + json.marketdata.data[0][4].toFixed(2) + " RUB";

  if (json.marketdata.data[0][9]>0){
    document.querySelector("#imoextag").innerHTML = " ▲ " + json.marketdata.data[0][9] + "%";
    document.querySelector("#imoextag").style.color = "green";
  } else if (json.marketdata.data[0][9]<0){
    document.querySelector("#imoextag").innerHTML = " ▼ " + json.marketdata.data[0][9] + "%";
    document.querySelector("#imoextag").style.color = "red";
  } else {
    document.querySelector("#imoextag").innerHTML = " = " + json.marketdata.data[0][9] + "%";
    document.querySelector("#imoextag").style.color = "black";
  }

}

fetchIMOEXData()

async function fetchIMOEXShare(share) {



  const url = `https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/${share}.json`
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();


  document.querySelector("#moexshare").innerHTML = `${share}: ` + json.marketdata.data[0][12].toFixed(2) + " RUB";
  if (json.marketdata.data[0][25]>0){
    document.querySelector("#moexsharetag").innerHTML = " ▲ " + json.marketdata.data[0][25] + "%";
    document.querySelector("#moexsharetag").style.color = "green";
  } else if (json.marketdata.data[0][25]<0){
    document.querySelector("#moexsharetag").innerHTML = " ▼ " + json.marketdata.data[0][25] + "%";
    document.querySelector("#moexsharetag").style.color = "red";
  } else {
    document.querySelector("#moexsharetag").innerHTML = " = " + json.marketdata.data[0][25] + "%";
    document.querySelector("#moexsharetag").style.color = "black";
  }

}

document.querySelector("#moexInput").addEventListener("input", function() {

  share = document.querySelector("#moexInput").value;
  fetchIMOEXShare(share);
})


async function fetchDIA() {
  const url = "https://api.twelvedata.com/time_series?apikey=3156b46023504006bc7335b767bf8c45&symbol=DIA&interval=1day&outputsize=2&format=JSON";
  const res = await fetch(url);
  const data = await res.json();


  const values = data.values;
  const current = parseFloat(values[0].close);
  const previous = parseFloat(values[1].close);
  const changePercent = ((current - previous) / previous * 100).toFixed(2);

  document.querySelector("#dia").innerHTML = `DIA: ${current.toFixed(2)} USD`;

  const tag = document.querySelector("#diatag");

  if (changePercent > 0) {
    tag.innerHTML = `▲ ${changePercent}%`;
    tag.style.color = "green";
  } else if (changePercent < 0) {
    tag.innerHTML = `▼ ${changePercent}%`;
    tag.style.color = "red";
  } else {
    tag.innerHTML = `= ${changePercent}%`;
    tag.style.color = "black";
  }
}
fetchDIA();


async function fetchBrent() {

  const url = 'https://iss.moex.com/iss/engines/futures/markets/forts/securities/BRN5.json'
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();

  document.querySelector("#brent").innerHTML = "BRENT: " + json.marketdata.data[0][8].toFixed(2) + " USD";
  dayDiffer = ((json.marketdata.data[0][8] - json.marketdata.data[0][5])/ json.marketdata.data[0][5] * 100).toFixed(2);

  if (dayDiffer>0){
    document.querySelector("#brenttag").innerHTML = " ▲ " + dayDiffer + "%";
    document.querySelector("#brenttag").style.color = "green";
  } else if (dayDiffer<0){
    document.querySelector("#brenttag").innerHTML = " ▼ " + dayDiffer + "%";
    document.querySelector("#brenttag").style.color = "red";
  } else {
    document.querySelector("#brenttag").innerHTML = " = " + dayDiffer + "%";
    document.querySelector("#brenttag").style.color = "black";
  }

}

fetchBrent()