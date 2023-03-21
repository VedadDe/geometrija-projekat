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

@NgModule({
  declarations: [
    AppComponent,
    JarwisMarchComponent,
    PointInsideTriangleComponent,
    PointsOrientationComponent,
    CheckIfQuadrilateralIsConvexComponent,
    PointInPolygonComponent,
    TwoLinesIntersectionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
