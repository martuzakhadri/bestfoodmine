import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { icon, latLng, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/order';
@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() order!:Order
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });


  private readonly DEFAULT_LATLONG:LatLngTuple = [13.99, 74.54]

@ViewChild('map',{static:true})
mapRef!:ElementRef;
map!:Map;
currentmarker!:Marker
  constructor( private locationService:LocationService) { }

  ngOnInit(): void {
    this.initializeMap();
  }
  initializeMap(){
    if(this.map) return;

    this.map = map(this.mapRef.nativeElement,
      {attributionControl:false
      }).setView(this.DEFAULT_LATLONG,13);

      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      this.map.on('click',(e:LeafletMouseEvent)=>{
        this.setMarker(e.latlng);
      })
  }

  findMyLocation(){
    this.locationService.getcurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng,this.MARKER_ZOOM_LEVEL);
       this.setMarker(latlng)
      }
    })

  }
  setMarker(latlng:LatLngExpression){
    this.addresslatLng = latlng as LatLng;
     if(this.currentmarker){
        this.currentmarker.setLatLng(latlng);
        return;
     }
     this.currentmarker = marker(latlng,{
      draggable:true,
      icon:this.MARKER_ICON
    }).addTo(this.map);

    this.currentmarker.on('dragend',()=>{
      this.addresslatLng = this.currentmarker.getLatLng();

    })

  }
  set addresslatLng(latlng:LatLng){
 latlng.lat = parseFloat(latlng.lat.toFixed(8));
 latlng.lng = parseFloat(latlng.lng.toFixed(8));
 this.order.addressLng = latlng;
 console.log(this.order.addressLng);
  }

}
