import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MapService } from '../services/map.service';

enum MapMode {
  Country = 'country',
  Exposure = 'exposure'
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap) map: GoogleMap;
  @ViewChild(MapInfoWindow) info: MapInfoWindow;

  zoom = 2;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'terrain',
    maxZoom: 7,
    minZoom: 2,
    zoom: 2,
  };
  markers = [];
  infoContent = '';

  mapMode: MapMode = MapMode.Country;
  mapCircles = [];

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: 0,
        lng: 0,
      };

      const allowedBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(85, -180),	// top left corner of map
        new google.maps.LatLng(-85, 180)	// bottom right corner
      );

      const k = 8.0;
      const n = allowedBounds.getNorthEast().lat() - k;
      const e = allowedBounds.getNorthEast().lng() - k;
      const s = allowedBounds.getSouthWest().lat() + k;
      const w = allowedBounds.getSouthWest().lng() + k;
      const neNew = new google.maps.LatLng(n, e);
      const swNew = new google.maps.LatLng(s, w);
      const boundsNew = new google.maps.LatLngBounds(swNew, neNew);
      this.map.fitBounds(boundsNew);

      this.map.data.setStyle({
        fillColor: 'LightGrey',
        fillOpacity: 0.7,
      });
    });
  }

  ngAfterViewInit() {
    this.loadCountryGeoStyle([
      {
        name: 'Australia',
        color: 'red'
      }
    ]);

    this.map.data.addListener('click', (event) => {
      console.log(event);
      const name = event.feature.getProperty('name');
      console.log(name);
    });
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) { this.zoom++; }
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) { this.zoom--; }
  }

  click(event: google.maps.MouseEvent) {
    console.log(event);
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }

  addCircle() {
    this.mapCircles.push({
      radius: 2000000,
      center: {
        lat: -23.70021,
        lng: 133.88061,
      },
      options: {
        fillColor: 'red',
        strokeColor: 'red'
      }
    });
  }

  openInfo(marker: MapMarker, content) {
    // this.infoContent = content;
    // this.info.open(marker);
  }

  switchMode(mapMode: MapMode) {
    if (this.mapMode !== mapMode) {
      this.mapMode = mapMode;
      if (this.mapMode === MapMode.Country) {
        this.markers = [];
        this.mapCircles = [];
        this.loadCountryGeoStyle([
          {
            name: 'Australia',
            color: 'red'
          }
        ]);
      } else {
        this.loadCountryGeoStyle();
        this.addCircle();
      }
    }
  }

  loadCountryGeoStyle(coloredCountry?: { name: string, color: string }[]) {
    this.map.data.loadGeoJson('/assets/countries-users.geo.json', {}, () => {
      this.map.data.setStyle((feature) => {
        const name = feature.getProperty('name');
        let color = 'gray';
        if (coloredCountry && coloredCountry.length > 0) {
          const filtered = coloredCountry.find(country => country.name === name);
          color = filtered ? filtered.color : 'gray';
        }
        console.log('-0=---');
        return {
          fillColor: color,
          fillOpacity: 1,
          strokeWeight: 1
        };
      });
    });
  }

}
