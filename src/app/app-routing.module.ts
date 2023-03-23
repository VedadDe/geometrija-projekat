import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckIfQuadrilateralIsConvexComponent } from './components/check-if-quadrilateral-is-convex/check-if-quadrilateral-is-convex.component';
import { JarwisMarchComponent } from './components/jarwis-march/jarwis-march.component';
import { MultipleSegmentsComponent } from './components/multiple-segments/multiple-segments.component';
import { PointInPolygonComponent } from './components/point-in-polygon/point-in-polygon.component';
import { PointInsideTriangleComponent } from './components/point-inside-triangle/point-inside-triangle.component';
import { PointsOrientationComponent } from './components/points-orientation/points-orientation.component';
import { SimplePolygonComponent } from './components/simple-polygon/simple-polygon.component';
import { TwoLinesIntersectionsComponent } from './components/two-lines-intersections/two-lines-intersections.component';

const routes: Routes = [  
{ path: 'jarwis-march', component: JarwisMarchComponent },
{ path: 'point-triangle', component: PointInsideTriangleComponent},
{ path: 'points-orientation', component: PointsOrientationComponent},
{ path: 'convex-quadrilateral', component: CheckIfQuadrilateralIsConvexComponent},
{ path: 'point-in-polygon', component: PointInPolygonComponent},
{ path: 'two-segments', component: TwoLinesIntersectionsComponent},
{ path: 'multiple-segments', component: MultipleSegmentsComponent},
{ path: 'simple-polygon', component: SimplePolygonComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
