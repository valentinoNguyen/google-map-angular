export const GMAP_BASE_COLOR = {
  White: '#ffffff',
};

export const latLngLiteral: google.maps.LatLngLiteral = {
  lat: 0,
  lng: 0,
};

export enum MapMode {
  Country = 'country',
  Exposure = 'exposure'
}

export const GMAP_DEFAULT_OPTIONS: google.maps.MapOptions = {
  zoomControl: false,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  mapTypeId: 'terrain',
  maxZoom: 7,
  minZoom: 2,
  zoom: 2,
  backgroundColor: GMAP_BASE_COLOR.White,
  disableDefaultUI: true,
  styles: [
    {
      featureType: 'all',
      stylers: [
        {
          color: GMAP_BASE_COLOR.White
        },
        {
          visibility: 'off'
        }
      ],
    },
  ]
};
