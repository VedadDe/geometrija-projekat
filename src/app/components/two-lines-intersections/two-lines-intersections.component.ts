import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-two-lines-intersections',
  templateUrl: './two-lines-intersections.component.html',
  styleUrls: ['./two-lines-intersections.component.scss']
})
export class TwoLinesIntersectionsComponent {
  @ViewChild('canvas') canvasRef!: ElementRef;
  context!: CanvasRenderingContext2D;
  points: [number, number][] = [];

  ngAfterViewInit(): void {
    this.context = this.canvasRef.nativeElement.getContext('2d');
  }

  handleClick(event: MouseEvent): void {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.points.push([x, y]);
    this.drawPoint(x, y);

    if (this.points.length === 4) {
      this.drawLine(this.points[0], this.points[1]);
      this.drawLine(this.points[2], this.points[3]);

      if (this.linesIntersect(this.points[0], this.points[1], this.points[2], this.points[3])) {
        console.log('Lines intersect');
      } else {
        console.log('Lines do not intersect');
      }

      this.points = [];
    }
  }

  drawPoint(x: number, y: number): void {
    this.context.beginPath();
    this.context.arc(x, y, 3, 0, 2 * Math.PI);
    this.context.fillStyle = 'black';
    this.context.fill();
  }

  drawLine(start: [number, number], end: [number, number]): void {
    this.context.beginPath();
    this.context.moveTo(start[0], start[1]);
    this.context.lineTo(end[0], end[1]);
    this.context.stroke();
  }

  linesIntersect(a1: [number, number], a2: [number, number], b1: [number, number], b2: [number, number]): boolean {
    const d = (a2[1] - a1[1]) * (b2[0] - b1[0]) - (a2[0] - a1[0]) * (b2[1] - b1[1]);
    if (d === 0) return false; // parallel lines

    const ua = ((a2[0] - a1[0]) * (b1[1] - a1[1]) - (a2[1] - a1[1]) * (b1[0] - a1[0])) / d;
    const ub = ((b2[0] - b1[0]) * (b1[1] - a1[1]) - (b2[1] - b1[1]) * (b1[0] - a1[0])) / d;

    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
  }
}