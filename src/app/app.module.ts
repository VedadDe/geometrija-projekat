import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JarwisMarchComponent } from './components/jarwis-march/jarwis-march.component';
import { PointInsideTriangleComponent } from './components/point-inside-triangle/point-inside-triangle.component';
import { PointsOrientationComponent } from './components/points-orientation/points-orientation.component';
import { TwoLinesIntersectionsComponent } from './components/two-lines-intersections/two-lines-intersections.component';
import { MultipleSegmentsComponent } from './components/multiple-segments/multiple-segments.component';
import { SimplePolygonComponent } from './components/simple-polygon/simple-polygon.component';
import { FormsModule } from '@angular/forms';
import { ConvexCheckComponent } from './components/convex-check/convex-check.component';
import { HeaderComponent } from './header/header.component';
import { SetPointsTriangleComponent } from './components/set-points-triangle/set-points-triangle.component';
import { ConvexCheckDokumentacijaComponent } from './dokumentacija/convex-check-dokumentacija/convex-check-dokumentacija.component';
import { TwoLinesIntersectionsDokumentacijaComponent } from './dokumentacija/two-lines-intersections-dokumentacija/two-lines-intersections-dokumentacija.component';
import { SetPointsTriangleDokumentacijaComponent } from './dokumentacija/set-points-triangle-dokumentacija/set-points-triangle-dokumentacija.component';
import { PointsDocumentatrionDokumentacijaComponent } from './dokumentacija/points-documentatrion-dokumentacija/points-documentatrion-dokumentacija.component';
import { PointInsideTriangleDokumentacijaComponent } from './dokumentacija/point-inside-triangle-dokumentacija/point-inside-triangle-dokumentacija.component';

@NgModule({
  declarations: [
    AppComponent,
    JarwisMarchComponent,
    PointInsideTriangleComponent,
    PointsOrientationComponent,
    TwoLinesIntersectionsComponent,
    MultipleSegmentsComponent,
    SimplePolygonComponent,
    ConvexCheckComponent,
    HeaderComponent,
    SetPointsTriangleComponent,
    ConvexCheckDokumentacijaComponent,
    TwoLinesIntersectionsDokumentacijaComponent,
    SetPointsTriangleDokumentacijaComponent,
    PointsDocumentatrionDokumentacijaComponent,
    PointInsideTriangleDokumentacijaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
