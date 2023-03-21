import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckIfQuadrilateralIsConvexComponent } from './components/check-if-quadrilateral-is-convex/check-if-quadrilateral-is-convex.component';
import { JarwisMarchComponent } from './components/jarwis-march/jarwis-march.component';
import { PointInPolygonComponent } from './components/point-in-polygon/point-in-polygon.component';
import { PointInsideTriangleComponent } from './components/point-inside-triangle/point-inside-triangle.component';
import { PointsOrientationComponent } from './components/points-orientation/points-orientation.component';

const routes: Routes = [  
{ path: 'jarwis-march', component: JarwisMarchComponent },
{ path: 'point-triangle', component: PointInsideTriangleComponent},
{ path: 'points-orientation', component: PointsOrientationComponent},
{ path: 'convex-quadrilateral', component: CheckIfQuadrilateralIsConvexComponent},
{ path: 'point-in-polygon', component: PointInPolygonComponent},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
