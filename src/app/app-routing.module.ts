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
import { PointsDocumentatrionDokumentacijaComponent } from './dokumentacija/points-documentatrion-dokumentacija/points-documentatrion-dokumentacija.component';
import { SetPointsTriangleDokumentacijaComponent } from './dokumentacija/set-points-triangle-dokumentacija/set-points-triangle-dokumentacija.component';
import { TwoLinesIntersectionsDokumentacijaComponent } from './dokumentacija/two-lines-intersections-dokumentacija/two-lines-intersections-dokumentacija.component';

const routes: Routes = [  
{ path: 'jarwis-march', component: JarwisMarchComponent },//!
{ path: 'point-triangle', component: PointInsideTriangleComponent},//!
{ path: 'points-orientation', component: PointsOrientationComponent},//
{ path: 'two-segments', component: TwoLinesIntersectionsComponent},//
{ path: 'simple-polygon', component: SimplePolygonComponent},//!
{ path: 'convex-check', component: ConvexCheckComponent},//
{ path: 'set-triangle', component: SetPointsTriangleComponent},//
{ path: 'multiple-segments', component: MultipleSegmentsComponent},//!
///////////////////////////////////////////////////////////////////////////////////////////////
{ path: 'convex-check-dokumentacija', component: ConvexCheckDokumentacijaComponent},
{ path: 'two-segments-dokumentacija', component: TwoLinesIntersectionsDokumentacijaComponent},
{ path: 'set-triangle-dokumentacija', component: SetPointsTriangleDokumentacijaComponent},
{ path: 'points-orientation-dokumentacija', component: PointsDocumentatrionDokumentacijaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
