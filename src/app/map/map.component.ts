/*
  Copyright 2020 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
 
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';
import { setDefaultOptions } from 'esri-loader';
import esri = __esri;
 
@Component({
  selector: 'app-esri-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class EsriMapComponent implements OnInit {
 
  @Output() mapLoaded = new EventEmitter<boolean>();
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
 
  /**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
  private _zoom: number = 0;
  private _center: Array<number> = [,];
  private _basemap: string = '';
 
  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }
 
  get zoom(): number {
    return this._zoom;
  }
 
  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }
 
  get center(): Array<number> {
    return this._center;
  }
 
  @Input()
  set basemap(basemap: string) {
    this._basemap ='gray';
  }
 
  get basemap(): string {
    return this._basemap;
  }
 
  constructor() { }
 
  async initializeMap() {
    try {
      // setDefaultOptions({ version: '4.13' });
      const [EsriMap, EsriMapView, EsriFeatureLayer] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        "esri/layers/FeatureLayer"
      ]);
 
      const layer = new EsriFeatureLayer({
        url:"https://gis.davey.com/arcgis/rest/services/TracyCA/TracyCA_2020/MapServer/8"
      })
      const layer2 = new EsriFeatureLayer({
        url:"https://gis.davey.com/arcgis/rest/services/TracyCA/TracyCA_2020/MapServer/0"
      })
      // Set type of map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
        ground: "world-elevation"
      };
 
      const map= new EsriMap({
        basemap: 'satellite',
        center: [-121.448637, 37.724050],
      });
      
       map.add(layer);
       map.add(layer2)
      // Set type of map view
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: map.center,
        zoom: 13,
        map: map
      };
      
      const mapView: esri.MapView = new EsriMapView(mapViewProperties);
 
      // All resources in the MapView and the map have loaded.
      // Now execute additional processes
      mapView.when(() => {
        this.mapLoaded.emit(true);
      });
    } catch (error) {
      alert('We have an error: ' + error);
    }
 
  }
 
  ngOnInit() {
    this.initializeMap();
  }
 
}
 

