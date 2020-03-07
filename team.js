// REGISTER SERVICE WORKER
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
      .then(function() {
        console.log('Pendaftaran ServiceWorker berhasil');
      })
      .catch(function(){
        console.log('Pendaftaran ServiceWorker gagal');
      });
    })
  } else {
    console.log("ServiceWorker belum didukung browser ini.")
  }

  document.addEventListener("DOMContentLoaded", function () {
      var urlParams = new URLSearchParams(window.location.search);
      var id = Number(urlParams.get("tim"));

      getTeam(id);    

      var favoriteCheck = false

      let buttonSave = document.getElementById("save");
      let buttonDelete = document.getElementById("delete");

      chekDataTeam(id).then((msg) => {
        favoriteCheck = true
        buttonDelete.disabled = false;
        buttonSave.disabled = true;
      }).catch((msg) => {
        isFavorit = false
        buttonDelete.disabled = true;
        buttonSave.disabled = false;
       })


      buttonDelete.onclick = function () {
        if (favoriteCheck) {
          hapusFavoriteTeam(id);
          favoriteCheck = false
          buttonDelete.disabled = true;
          buttonSave.disabled = false;
        } else {
          team = getTeamsIdDetail(id);   
          team.then(function (team) {
            simpanFavoriteTeam(team);
          });
          favoriteCheck = true
          buttonDelete.disabled = false;
          buttonSave.disabled = true;
        }
      };

      buttonSave.onclick = function () {
        if (favoriteCheck) {
            hapusFavoriteTeam(id);
          favoriteCheck = false
          buttonDelete.disabled = true;

          buttonSave.disabled = false;

        } else {
          team = getTeamsIdDetail(id);   
          team.then(function (team) {
            simpanFavoriteTeam(team);
          });
          favoriteCheck = true
          buttonDelete.disabled = false;
          buttonSave.disabled = true;
        }
      };

      
   }) 