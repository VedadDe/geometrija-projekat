import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JarwisMarchComponent } from './components/jarwis-march/jarwis-march.component';
import { PointInsideTriangleComponent } from './components/point-inside-triangle/point-inside-triangle.component';
import { PointsOrientationComponent } from './components/points-orientation/points-orientation.component';
import { CheckIfQuadrilateralIsConvexComponent } from './components/check-if-quadrilateral-is-convex/check-if-quadrilateral-is-convex.component';
import { PointInPolygonComponent } from './components/point-in-polygon/point-in-polygon.component';
import { TwoLinesIntersectionsComponent } from './components/two-lines-intersections/two-lines-intersections.component';
import { MultipleSegmentsComponent } from './components/multiple-segments/multiple-segments.component';
import { SimplePolygonComponent } from './components/simple-polygon/simple-polygon.component';
import { FormsModule } from '@angular/forms';
import { ConvexCheckComponent } from './components/convex-check/convex-check.component';

@NgModule({
  declarations: [
    AppComponent,
    JarwisMarchComponent,
    PointInsideTriangleComponent,
    PointsOrientationComponent,
    CheckIfQuadrilateralIsConvexComponent,
    PointInPolygonComponent,
    TwoLinesIntersectionsComponent,
    MultipleSegmentsComponent,
    SimplePolygonComponent,
    ConvexCheckComponent
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
