import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

interface Point {
  x: number;
  y: number;
}

type Polygon = Point[];

@Component({
  selector: 'app-point-in-polygon',
  templateUrl: './point-in-polygon.component.html',
  styleUrls: ['./point-in-polygon.component.scss']
})
export class PointInPolygonComponent {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  // Sample points and polygon
  private points = [
    { x: 100, y: 100 },
    { x: 200, y: 200 },
    { x: 300, y: 100 },
  ];

  private polygon = [
    { x: 150, y: 50 },
    { x: 250, y: 50 },
    { x: 250, y: 150 },
    { x: 150, y: 150 },
  ];

  ngAfterViewInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    if (context) {
      this.ctx = context;
      this.drawPolygon();
      this.drawPoints();
      this.checkPointsInsidePolygon();
    } else {
      console.error('CanvasRenderingContext2D not available');
    }
  }

  drawPolygon() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      this.ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    this.ctx.closePath();
    this.ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    this.ctx.fill();
    this.ctx.strokeStyle = 'blue';
    this.ctx.stroke();
  }
  drawPoints() {
    for (const point of this.points) {
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      this.ctx.fillStyle = 'red';
      this.ctx.fill();
      this.ctx.strokeStyle = 'red';
      this.ctx.stroke();
    }
  }
  isPointInsidePolygon(point: Point, polygon: Polygon): boolean {
    let isInside = false;
    let j = polygon.length - 1;
  
    for (let i = 0; i < polygon.length; i++) {
      if (
        (polygon[i].y > point.y) !== (polygon[j].y > point.y) &&
        point.x <
          ((polygon[j].x - polygon[i].x) * (point.y - polygon[i].y)) /
            (polygon[j].y - polygon[i].y) +
            polygon[i].x
      ) {
        isInside = !isInside;
      }
      j = i;
    }
  
    return isInside;
  }
  
  checkPointsInsidePolygon() {
    for (const point of this.points) {
      if (this.isPointInsidePolygon(point, this.polygon)) {
        console.log('Point inside polygon:', point);
      }
    }
  }
      
}  