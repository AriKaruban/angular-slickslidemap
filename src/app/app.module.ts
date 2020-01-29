import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MapComponent } from './map/map.component';
import { SlickComponent } from './slick/slick.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { LegendsComponent } from './dropdowns/legends/legends.component';
import { LayersComponent } from './dropdowns/layers/layers.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, MapComponent, SlickComponent, TopBarComponent, DropdownsComponent, LegendsComponent, LayersComponent, DetailComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
