import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap) map: GoogleMap;
  @ViewChild(MapInfoWindow) info: MapInfoWindow;

  zoom = 2;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 7,
    minZoom: 2,
    zoom: 2,
  };
  markers = [];
  infoContent = '';

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: 0,
        lng: 0,
      };

      var allowedBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(85, -180),	// top left corner of map
        new google.maps.LatLng(-85, 180)	// bottom right corner
      );
  
      var k = 8.0;
      var n = allowedBounds.getNorthEast().lat() - k;
      var e = allowedBounds.getNorthEast().lng() - k;
      var s = allowedBounds.getSouthWest().lat() + k;
      var w = allowedBounds.getSouthWest().lng() + k;
      var neNew = new google.maps.LatLng(n, e);
      var swNew = new google.maps.LatLng(s, w);
      const boundsNew = new google.maps.LatLngBounds(swNew, neNew);
      this.map.fitBounds(boundsNew);

      // this.markers.push({
      //   position: {
      //     lat: position.coords.latitude,
      //     lng: position.coords.longitude,
      //   },
      //   label: {
      //     color: 'blue',
      //     text: 'Marker label ' + (this.markers.length + 1),
      //   },
      //   title: 'Marker title ' + (this.markers.length + 1),
      //   info: 'Marker info ' + (this.markers.length + 1),
      //   options: {
      //     animation: google.maps.Animation.BOUNCE,
      //   },
      // });
    });
  }

  ngAfterViewInit() {
    this.map.data.loadGeoJson('/assets/countries-users.geo.json');
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--;
  }

  click(event: google.maps.MouseEvent) {
    console.log(event);
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.info.open(marker);
  }

}
