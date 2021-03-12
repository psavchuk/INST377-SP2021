function mapInit() {
  // follow the Leaflet Getting Started tutorial here

  var map = L.map('mapid').setView([-77, 39], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoicHNhdmNodWsiLCJhIjoiY2ttNXd0aXlvMGltNjJuanlua29jOHMycyJ9.NU4Xvcm6CG8UUflzSIgxBQ'
  }).addTo(map);

  return map;
}

async function dataHandler(mapObject) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers

  const form = document.querySelector(".userform");
  const search = document.querySelector("#search");
  const list = document.querySelector(".results")
  
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  //list


  //const request = await get('/api');
  //const data = await request.json();

  const request = await fetch(endpoint);
      //.then(blob => blob.json())
      //.then(data => places.push(...data));

  const places = await request.json();

  function findMatches(wordToMatch, places) {
      return places.filter(place => {
          const regex = new RegExp(wordToMatch, 'gi');
          return place.zip.match(regex);
      });
  }

  function displayMatches(value) {

      //get values and filter
      const matchArray = findMatches(value, places).filter(place => place.geocoded_column_1 !== undefined);

      if (value === "")
      {
        list.innerHTML = "";
      }
      else 
      {

        //split array
      const results = matchArray.slice(0, 5);
      console.log(results);

      const html = results.map(place => {
        console.log();
        const regex = new RegExp(value, 'gi');
        const nameMatch = place.name.replace(regex, `<span class='hl'>${value}</span>`);
        const catMatch = place.category.replace(regex, `<span class='hl'>${value}</span>`)
          return `
              <div class="box">
                  <li>
                      <span class="name is-capitalized is-size-4">
                        ${nameMatch.toLowerCase()}
                      </span>
                      <span class="category is-capitalized">
                        ${catMatch.toLowerCase()}
                      </span>
                      <address>
                        ${place.address_line_1.toUpperCase()}<br>
                        ${place.zip}
                      </address>
                  </li>
              </div>
              `
      }).join('');

      const mapMarkers = results.map(place => {
        return L.marker(place.geocoded_column_1.coordinates).addTo(mapObject);
      });

      list.innerHTML = html;


    }
  }

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    displayMatches(search.value);
    
  });
  /*
  search.addEventListener('change', displayMatches);
  search.addEventListener('keyup', (evt) => {
      displayMatches(evt)
  }); */
}

async function windowActions() {

  const map = mapInit();
  await dataHandler(map);
  
}

window.onload = windowActions;