import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-point-in-polygon',
  templateUrl: './point-in-polygon.component.html',
  styleUrls: ['./point-in-polygon.component.scss']
})
export class PointInPolygonComponent {
  @ViewChild('canvas', {static: true})
  canvasRef!: ElementRef<HTMLCanvasElement>;
  
  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    // const context = canvas.getContext('2d');
    const context = this.canvasRef.nativeElement.getContext('2d');

    const numPoints = 5; // Change this to the desired number of points

    const polygon = this.generateRandomPolygon(numPoints, canvas.width, canvas.height);

    if (context) {
      this.drawPolygon(context, polygon);
    }
    
    const testPoint = {x: 100, y: 100}; // Change this to test different points

    const isInsidePolygon = this.isPointInsidePolygon(testPoint, polygon);

    console.log(`Is (${testPoint.x}, ${testPoint.y}) inside the polygon? ${isInsidePolygon}`);
  }

  generateRandomPolygon(numPoints: number, maxX: number, maxY: number): {x: number, y: number}[] {
    const polygon: {x: number, y: number}[] = [];

    for (let i = 0; i < numPoints; i++) {
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      polygon.push({x, y});
    }

    return polygon;
  }

  drawPolygon(context: CanvasRenderingContext2D, polygon: {x: number, y: number}[]): void {
    context.beginPath();
    context.moveTo(polygon[0].x, polygon[0].y);

    for (let i = 1; i < polygon.length; i++) {
      context.lineTo(polygon[i].x, polygon[i].y);
    }

    context.closePath();
    context.stroke();
  }

  isPointInsidePolygon(point: {x: number, y: number}, polygon: {x: number, y: number}[]): boolean {
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x;
      const yi = polygon[i].y;
      const xj = polygon[j].x;
      const yj = polygon[j].y;

      const intersect = ((yi > point.y) != (yj > point.y)) &&
                        (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);

      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  }
}