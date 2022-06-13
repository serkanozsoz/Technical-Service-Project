let latitude, longitude = "";

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

} else {
    alert("taray�c�n�z konum bilgisi alam�yor...");
}

function onSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    initMap();

    const api_key = "***"
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`;

    fetch(url)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            let details = result.results[0].formatted;

            /*let { country, postcode, province, neighbourhood, road, town, state, formatted } = details;*/

            document.getElementById("CustomerAdressid").value =
                `${details}`;


        });
}

function onError(error) {
    if (error.code == 1) {
        alert("kullan�c� eri�im iznini reddetti.");
    } else if (error.code == 2) {
        alert("konum al�namad�");
    }
    else {
        alert("bir hata olu�tu");
    }
}

let map;
let marker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
    });

    marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
    });

    map.addListener('click', (e) => {
        var posClick = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };
        //markerlar� temizle
        marker.setMap(null);
        //t�klanan konuma g�re marker ekle
        //marker = new google.maps.Marker({
        //    position: posClick,
        //    map: map,
        //    title: 'Adresiniz',
        //    animation: google.maps.Animation.DROP
        //});
        const pos = {
            coords: {
                latitude: posClick.lat,
                longitude: posClick.lng
            }
        };
        onSuccess(pos);
    });
}