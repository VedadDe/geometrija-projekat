import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-segment-polygon',
  templateUrl: './segment-polygon.component.html',
  styleUrls: ['./segment-polygon.component.scss']
})
export class SegmentPolygonComponent {

  @ViewChild('polygonCanvas', { static: true }) 
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  points: [number, number][] = []; // Example polygon: [[0,0], [1,0], [1,1], [0,1]]

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.drawPolygon();
  }
  drawPolygon() {
    this.ctx.clearRect(0, 0, 500, 500);

    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0][0], this.points[0][1]);
    for (let i = 1; i < this.points.length; i++) {
      this.ctx.lineTo(this.points[i][0], this.points[i][1]);
    }
    this.ctx.closePath();
    this.ctx.stroke();
  }

  checkOrientation(points: [number, number][]): string {
    let sum = 0;
    for (let i = 0; i < points.length; i++) {
      const currentPoint = points[i];
      const nextPoint = points[(i + 1) % points.length];

      sum += (nextPoint[0] - currentPoint[0]) * (nextPoint[1] + currentPoint[1]);
    }

    return sum > 0 ? 'Right-oriented' : 'Left-oriented';
  }

  onCanvasClick(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    this.points.push([x, y]);
    this.drawPolygon();

    if (this.points.length > 2) {
      const orientation = this.checkOrientation(this.points);
      console.log(orientation);
    }
  }
}