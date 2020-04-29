import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { GoogleMapsModule } from "@angular/google-maps";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from "@angular/cdk/clipboard";

import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { MapComponent } from './map/map.component';
import { CbDemoComponent } from './cb-demo/cb-demo.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    MapComponent,
    CbDemoComponent
  ],
  imports: [
    BrowserModule,
    YouTubePlayerModule,
    GoogleMapsModule,
    ClipboardModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
