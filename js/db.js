var dbPromised = idb.open('teamdb', 1, upgradeDb => {
  var teamObjectStore = upgradeDb.createObjectStore('teamFavorite', {
    keyPath: 'id'
  });
  teamObjectStore.createIndex('team', 'team', { unique: false});
});

function simpanFavoriteTeam(teamData) {
  dbPromised.then(function(db) {
      var tx = db.transaction('teamFavorite', 'readwrite');
      var store = tx.objectStore('teamFavorite');
      var dataSave = {  
              id: teamData.id,
              name: teamData.name,
              address: teamData.address,
              website: teamData.website,
              email: teamData.email,
              crestUrl : teamData.crestUrl,

        };

       tx.objectStore('teamFavorite').put(dataSave);
        return tx.complete;

  }).then(function() {
      
       var title = `Save to favorite  ${teamData.name}`;
            var options = {
                'body': `${teamData.name} ${teamData.email}`
            }
            if (Notification.permission === 'granted') {
                navigator.serviceWorker.ready.then(function(registration) {
                    registration.showNotification(title, options);
                });
            } else {
                console.error('FItur notifikasi tidak diijinkan.');
            }
  }).catch(function(err) {
      console.log(err);
  })
}


function hapusFavoriteTeam(data) {
   dbPromised.then(function(db) {
      var tx = db.transaction('teamFavorite', 'readwrite');
      var store = tx.objectStore('teamFavorite');
      
      store.delete(data);
      return tx.complete;
  }).then(function() {
     var title = `Succes Delete Favorit`;
        
      if (Notification.permission === 'granted') {
          navigator.serviceWorker.ready.then(function(registration) {
              registration.showNotification(title);
          });
      } else {
          console.error('FItur notifikasi tidak diijinkan.');
      }
  }).catch(function(err) {
      console.log(err);
  })
}

function getAllDataFavorit() {
  return new Promise(function (resolve, reject) {
      dbPromised
          .then(function (db) {
              var tx = db.transaction('teamFavorite', "readonly");
              var store = tx.objectStore('teamFavorite');
              return store.getAll();
          })
          .then(function (data) {
              resolve(data);
          });
  });
}


function chekDataTeam(id) {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
                var tx = db.transaction('teamFavorite', "readonly");
                var store = tx.objectStore('teamFavorite');
                return store.get(id);
            })
            .then(function (data) {
                if (data != undefined) {
                    resolve(true)
                }else {
                  reject(false);
                }
            });
    });
}