/**
 * Created by Abhi on 8/23/16.
 */
$(document).ready(function (){

  // create a LatLng object containing the coordinate for the center of the map
  var latlng = new google.maps.LatLng(-33.86455, 151.209);

  // prepare the map properties
  var options = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    navigationControl: true,
    mapTypeControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
  };

  // initialize the map object
  var map = new google.maps.Map(document.getElementById('google_map'), options);

  // add Marker
  var marker1 = new google.maps.Marker({
    position: latlng, map: map
  });

  // add listener for a click on the pin
  google.maps.event.addListener(marker1, 'click', function() {
    infowindow.open(map, marker1);
  });

  // add information window
  var infowindow = new google.maps.InfoWindow({
    content:  '<div class="info"><strong>This is my company</strong><br><br>My company address is here<br> 32846 Sydney</div>'
  });
});


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
var pop_up = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function createDonutCharts() {
  $("<style type='text/css' id='dynamic' />").appendTo("head");
  $("div[chart-type*=donut]").each(function () {
    var d = $(this);
    var id = $(this).attr('id');
    var max = $(this).data('chart-max');
    if ($(this).data('chart-text')) {
      var text = $(this).data('chart-text');
    } else {
      var text = "";
    }
    if ($(this).data('chart-caption')) {
      var caption = $(this).data('chart-caption');
    } else {
      var caption = "";
    }
    if ($(this).data('chart-initial-rotate')) {
      var rotate = $(this).data('chart-initial-rotate');
    } else {
      var rotate = 0;
    }
    var segments = $(this).data('chart-segments');

    for (var i = 0; i < Object.keys(segments).length; i++) {
      var s = segments[i];
      var start = ((s[0] / max) * 360) + rotate;
      var deg = ((s[1] / max) * 360);
      if (s[1] >= (max / 2)) {
        d.append('<div class="large donut-bite" data-segment-index="' + i + '"> ');
      } else {
        d.append('<div class="donut-bite" data-segment-index="' + i + '"> ');
      }
      var style = $("#dynamic").text() + "#" + id + " .donut-bite[data-segment-index=\"" + i + "\"]{-moz-transform:rotate(" + start + "deg);-ms-transform:rotate(" + start + "deg);-webkit-transform:rotate(" + start + "deg);-o-transform:rotate(" + start + "deg);transform:rotate(" + start + "deg);}#" + id + " .donut-bite[data-segment-index=\"" + i + "\"]:BEFORE{-moz-transform:rotate(" + deg + "deg);-ms-transform:rotate(" + deg + "deg);-webkit-transform:rotate(" + deg + "deg);-o-transform:rotate(" + deg + "deg);transform:rotate(" + deg + "deg); background-color: " + s[2] + ";}#" + id + " .donut-bite[data-segment-index=\"" + i + "\"]:BEFORE{ background-color: " + s[2] + ";}#" + id + " .donut-bite[data-segment-index=\"" + i + "\"].large:AFTER{ background-color: " + s[2] + ";}";
      $("#dynamic").text(style);
    }

    d.children().first().before("<div class='donut-hole'><span class='donut-filling'>" + text + "</span></div>");
    d.append("<div class='donut-caption-wrapper'><span class='donut-caption'>" + caption + "</span></div>");
  });
}

$(document).ready(function() {
  createDonutCharts();
});