let base_url ="https://api.football-data.org/v2/";
const token = 'd36c266a83a744b4866a994b5d99c2dc';


let url_classement = `${base_url}competitions/2001/standings`;
let url_team =`${base_url}teams/`;
var url_matches = `${base_url}competitions/2001/matches`;

let fetchApi = url => {
  return fetch(url, {
    method: "get",
    mode: "cors",
    headers: {
      'X-Auth-Token': token
    }
  });
}


// fetch success will call this function
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);

    // Method reject() will call catch block
    return Promise.reject(new Error(response.statusText));
  } else {

    //turn object to promise
    return Promise.resolve(response);
  }
}

//parsing json to array
function json(response) {
  return response.json();
}

//handle error
function error(error) {
  
  // error from promise.reject()
  console.log("Error : " + error);
}





// request json to get classement liga

function getClassementLiga() {
    if ('caches' in window) {
    caches.match(url_classement).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          showClassement(data);
        });
      }
    });
  }

	fetchApi(url_classement)
    .then(status)
    .then(json)
    .then(function(data) {

      showClassement(data)   

    })
    .catch(error);
}



function getTeam(team) {
  if ('caches' in window) {
    caches.match(url_team + team).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          showTeam(data);
          
        });
      }
    });
  }
  fetchApi(url_team + team)
    .then(status)
    .then(json)
    .then(function(data) {

      showTeam(data);

    })
    .catch(error);
}

function getTeamsIdDetail(team) {
  
    return new Promise(function (resolve, reject) {
      if ('caches' in window) {
        caches.match(url_team + team).then(function (response) {
          if (response) {
            response.json().then(function (data) {
              resolve(data);
            });
          }
        });
      }
      fetchApi(url_team + team)
        .then(status)
        .then(json)
        .then(function(data) {
          
          resolve(data);

        })
        .catch(error);
  });
}

function getFavoritTeam() {
  
  var dataIndexDb = getAllDataFavorit();
  dataIndexDb.then(function (data) {
    
  var teamData = '';
   data.forEach(function(team) {
       teamData +=`
            <li class="collection-item avatar">
              <img src=${team.crestUrl.replace(/^http:\/\//i, 'https://')} width="100">
              
              <h2 class="title" style="color : #02C6F8">${team.name}</h2>
                <p>Address: ${team.address}</p>
                
                <p>website: <a href=${team.website}>${team.website}</a></p>

            </li>
  `;
   });
   document.getElementById("isi").innerHTML = teamData;                  
  });
  
}

function showTeam(data){
  var teamTitle = '';
  var teamIsi = '';

  teamTitle=`
      <img src=${data.crestUrl.replace(/^http:\/\//i, 'https://')} align="center" width="100" height="100">
      <h2>${data.name}</h2>
  `;

  teamIsi =`
      <p> Name : ${data.name} </p>
      <p> Address : ${data.address} </p>
      <p> Email : ${data.email} </p>
      <p> Stadion: ${data.venue} </p>
      <p> Website : ${data.website} </p>

  `;

   document.getElementById("teamHeader").innerHTML = teamTitle;
   document.getElementById("teamBody").innerHTML = teamIsi;
}

function showClassement(data){
   var classementData = '';
    var classementLeagueTitle ='';

    classementLeagueTitle =`
       <div>${data.competition.name} ${data.competition.area.name} ${data.standings[0].stage} ${data.competition.id} </div>
    `;
    data.standings[0].table.forEach(function(teamData) {
      
      classementData += `
              
                <td>${teamData.position}</td>
                <td>
                  <a href="./tim.html?tim=${teamData.team.id}">
                  <div class="hide-on-small-only">
                    <img class="responsive-img" width="20" height="20" src="${ teamData.team.crestUrl || '/images/img/no_image.png'}">
                    <p>${teamData.team.name}</p>
                  </div>
                  </a>
                  <a href="./tim.html?tim=${teamData.team.id}">
                   <p class="hide-on-med-and-up">
                    <img class="responsive-img" width="20" height="20" src="${ teamData.team.crestUrl || '/images/img/no_image.png'}">
                  </p>
                  </a>
                </td>

                <td>${teamData.playedGames}</td>
                <td>${teamData.won}</td>
                <td>${teamData.draw}</td>
                <td>${teamData.lost}</td>
                <td><b>${teamData.points}</b></td>

              </tr>
          `;
    });

    document.getElementById("classementTitle").innerHTML = classementLeagueTitle;
    document.getElementById("classement").innerHTML = classementData;
    
}


//get data dari yang match

function getMatches() {
    if ('caches' in window) {
    caches.match(url_matches).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          showMatches(data);
        });
      }
    });
  }

  fetchApi(url_matches)
    .then(status)
    .then(json)
    .then(function(data) {
      // console.log(data)

      showMatches(data)   
    })
    .catch(error);
}



function showMatches(data){
    var matchesData = '';
      data.matches.forEach(function(matchgame) {
      
      matchesData += `

      <div class="col s12 m6 l6">
            <div class="card">

              <div class="card-content card-match row">

              <div class="col s6"><h6>${matchgame.stage}</h6></div>
              <br><br>
              <div class="col s6"><h6>${changeDateFormat(new Date(matchgame.utcDate))}</h6></div>
              <br><br>

                <div class="col s4"><a href="" onClick="getTim(${matchgame.homeTeam.id})">${matchgame.homeTeam.name}</a></div>
                <div class="col s1 center">${matchgame.score.fullTime.homeTeam}</div>
                
                <div class="col s2 center" style="color:#ff9000">
                <h5>VS</h5></div>

                <div class="col s1 center">${matchgame.score.fullTime.awayTeam}</div>
                <div class="col s4"><a href="" onClick="timdetail(${matchgame.awayTeam.id})">${matchgame.awayTeam.name}</a></div>
              </div>
            </div>
          </div>
          </div>

             
               
          `;
    });

    // document.getElementById("titles").innerHTML = 'Pertandingan';
    document.getElementById("match").innerHTML = matchesData;
}

// ./tim.html?tim=${matchgame.awayTeam.id} buat dapetin idnya

var changeDateFormat = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}