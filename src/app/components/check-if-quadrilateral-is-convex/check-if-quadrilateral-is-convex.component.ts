import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-check-if-quadrilateral-is-convex',
  templateUrl: './check-if-quadrilateral-is-convex.component.html',
  styleUrls: ['./check-if-quadrilateral-is-convex.component.scss']
})
export class CheckIfQuadrilateralIsConvexComponent {
  @ViewChild('myCanvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null = null; // use nullable type

  private points: { x: number, y: number }[] = [];

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  
    // Set up event listener for canvas element
    this.canvas.nativeElement.addEventListener('click', this.onClickCanvas.bind(this));
  }
  

  onClickCanvas(event: MouseEvent) {
    console.log('onClickCanvas() called');

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.points.push({ x, y });

    // Draw a circle at the clicked point
    if (this.ctx) { // check if ctx is not null
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
      this.ctx.fill();
    }

    // If we have 4 points, draw the quadrilateral and check if it's convex
    if (this.points.length === 4) {
      this.drawQuadrilateral();
      this.checkConvex();
    } else if (this.points.length === 3) {
      // Connect the third point to the first two
      if (this.ctx) { // check if ctx is not null
        this.ctx.beginPath();
        this.ctx.moveTo(this.points[0].x, this.points[0].y);
        this.ctx.lineTo(this.points[1].x, this.points[1].y);
        this.ctx.lineTo(this.points[2].x, this.points[2].y);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    } else if (this.points.length > 1) {
      // Connect each new point to the previous one
      if (this.ctx) { // check if ctx is not null
        this.ctx.beginPath();
        this.ctx.moveTo(this.points[this.points.length - 2].x, this.points[this.points.length - 2].y);
        this.ctx.lineTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
        this.ctx.stroke();
      }
    }
  }
  

  drawQuadrilateral() {
    // Draw lines between the points to create the quadrilateral
    if (this.ctx) { // check if ctx is not null
      this.ctx.beginPath();
      this.ctx.moveTo(this.points[0].x, this.points[0].y);
      this.ctx.lineTo(this.points[1].x, this.points[1].y);
      this.ctx.lineTo(this.points[2].x, this.points[2].y);
      this.ctx.lineTo(this.points[3].x, this.points[3].y);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }
  checkConvex() {
    // Check if the quadrilateral is convex
    if (this.ctx) { // check if ctx is not null
      const area1 = this.calculateTriangleArea(this.points[0], this.points[1], this.points[2]);
      const area2 = this.calculateTriangleArea(this.points[0], this.points[2], this.points[3]);
      const area3 = this.calculateTriangleArea(this.points[0], this.points[3], this.points[1]);
      const area4 = this.calculateTriangleArea(this.points[1], this.points[3], this.points[2]);
  
      if (area1 >= 0 && area2 >= 0 && area3 >= 0 && area4 >= 0) {
        alert('The quadrilateral is convex.');
      } else {
        alert('The quadrilateral is not convex.');
      }
  
      // Clear canvas and array of points
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this.points = [];
    }
  }
  calculateTriangleArea(p1: { x: number, y: number }, p2: { x: number, y: number }, p3: { x: number, y: number }): number {
    return (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2;
  }
}