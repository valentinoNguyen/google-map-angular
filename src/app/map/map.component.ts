import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker, MapCircle } from '@angular/google-maps';

import { GMAP_DEFAULT_OPTIONS, latLngLiteral, MapMode } from './map.definition';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild(GoogleMap) map: GoogleMap;
  @ViewChild(MapInfoWindow) info: MapInfoWindow;

  zoom = 2;
  center: google.maps.LatLngLiteral = latLngLiteral;
  options: google.maps.MapOptions = GMAP_DEFAULT_OPTIONS;
  infoContent = '';
  mapMode: MapMode = MapMode.Country;
  mapCircles = [];
  filteredCountry = [
    {
      name: 'Australia',
      color: '#f54542',
      exposure: 1887112,
      center: {
        lat: -23.70021,
        lng: 133.88061,
      }
    },
    {
      name: 'Vietnam',
      color: '#4287f5',
      exposure: 587112,
      center: {
        lat: 10.762622,
        lng: 106.660172
      }
    },
  ];

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    // navigator.geolocation.getCurrentPosition(position => {
    //   this.center = {
    //     lat: 0,
    //     lng: 0,
    //   };

    //   const allowedBounds = new google.maps.LatLngBounds(
    //     new google.maps.LatLng(85, -180),	// top left corner of map
    //     new google.maps.LatLng(-85, 180)	// bottom right corner
    //   );

    //   const k = 8.0;
    //   const n = allowedBounds.getNorthEast().lat() - k;
    //   const e = allowedBounds.getNorthEast().lng() - k;
    //   const s = allowedBounds.getSouthWest().lat() + k;
    //   const w = allowedBounds.getSouthWest().lng() + k;
    //   const neNew = new google.maps.LatLng(n, e);
    //   const swNew = new google.maps.LatLng(s, w);
    //   const boundsNew = new google.maps.LatLngBounds(swNew, neNew);
    //   this.map.fitBounds(boundsNew);

    //   this.map.data.setStyle({
    //     fillColor: 'lightgrey',
    //     fillOpacity: 1,
    //   });
    // });
  }

  ngAfterViewInit() {
    this.loadCountryGeoStyle();

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
    this.filteredCountry.forEach((country) => {
      const circle = this.createCircle(country.center, country.exposure, country.color);
      this.mapCircles.push(circle);
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
        this.mapCircles = [];
        this.customizeDataFeatures();
      } else {
        this.customizeDataFeatures();
        this.addCircle();
      }
    }
  }

  loadCountryGeoStyle() {
    this.map.data.loadGeoJson('/assets/countries-users.geo.json', {}, this.customizeDataFeatures.bind(this));
  }

  private createCircle(center: { lat: number; lng: number }, radius: number, color: string) {
    return {
      center,
      radius,
      options: {
        fillColor: color,
        strokeColor: color
      }
    };
  }

  private customizeDataFeatures() {
    this.map.data.setStyle((feature: google.maps.Data.Feature) => {
      const name = feature.getProperty('name');
      let color = 'lightgrey';
      if (this.mapMode === MapMode.Country) {
        if (this.filteredCountry && this.filteredCountry.length > 0) {
          const filtered = this.filteredCountry.find(country => country.name === name);
          color = filtered ? filtered.color : 'lightgrey';
        }
      }
      return {
        fillColor: color,
        fillOpacity: 1,
        strokeWeight: 0.5,
        strokeColor: '#aaa'
      };
    });
  }

}
