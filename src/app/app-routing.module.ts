import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvexCheckComponent } from './components/convex-check/convex-check.component';
import { JarwisMarchComponent } from './components/jarwis-march/jarwis-march.component';
import { MultipleSegmentsComponent } from './components/multiple-segments/multiple-segments.component';
import { PointInsideTriangleComponent } from './components/point-inside-triangle/point-inside-triangle.component';
import { PointsOrientationComponent } from './components/points-orientation/points-orientation.component';
import { SetPointsTriangleComponent } from './components/set-points-triangle/set-points-triangle.component';
import { SimplePolygonComponent } from './components/simple-polygon/simple-polygon.component';
import { TwoLinesIntersectionsComponent } from './components/two-lines-intersections/two-lines-intersections.component';
import { ConvexCheckDokumentacijaComponent } from './dokumentacija/convex-check-dokumentacija/convex-check-dokumentacija.component';

const routes: Routes = [  
{ path: 'jarwis-march', component: JarwisMarchComponent },//1
{ path: 'point-triangle', component: PointInsideTriangleComponent},//2
{ path: 'points-orientation', component: PointsOrientationComponent},//3
{ path: 'two-segments', component: TwoLinesIntersectionsComponent},//4
{ path: 'simple-polygon', component: SimplePolygonComponent},//5//6//point inside polygon
{ path: 'convex-check', component: ConvexCheckComponent},//6
{ path: 'set-triangle', component: SetPointsTriangleComponent},//6
{ path: 'multiple-segments', component: MultipleSegmentsComponent},
///////////////////////////////////////////////////////////////////////////////////////////////
{ path: 'convex-check-dokumentacija', component: ConvexCheckDokumentacijaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
