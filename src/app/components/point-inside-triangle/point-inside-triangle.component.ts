import { Component, ElementRef, ViewChild } from '@angular/core';

interface Point {
  x: number;
  y: number;
}
class Point {
  constructor(public x: number, public y: number) {}
}


@Component({
  selector: 'app-point-inside-triangle',
  templateUrl: './point-inside-triangle.component.html',
  styleUrls: ['./point-inside-triangle.component.scss']
})
export class PointInsideTriangleComponent {

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  points: Point[] = [];
  showModal = false;
  isInside = false;

  addPoint(event: MouseEvent) {
   const canvas = this.canvasRef.nativeElement;
   const rect = canvas.getBoundingClientRect();
   const x = event.clientX - rect.left;
   const y = event.clientY - rect.top;
 
   const point = new Point(x, y);
   this.points.push(point);
 
   // Draw point
   this.ctx.beginPath();
   this.ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
   this.ctx.fillStyle = 'red';
   this.ctx.fill();
   this.ctx.stroke();
 
   if (this.points.length === 3) {
     this.drawTriangle();
   }
 }
 

 ngAfterViewInit() {

     // Get canvas element and context
     const canvas = this.canvasRef.nativeElement;
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
     this.ctx = canvas.getContext('2d')!;
     this.drawTriangle();
 }
 

 canvasClick(event: MouseEvent) {
   const canvas = this.canvasRef.nativeElement;
   const rect = canvas.getBoundingClientRect();
   // const x = event.clientX - rect.left;
   // const y = event.clientY - rect.top;


   // Create a point object from the click coordinates
   const point = { x: event.offsetX, y: event.offsetY };

   //
   this.ctx.beginPath();
   this.ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
   this.ctx.fillStyle = 'red';
   this.ctx.fill();
   this.ctx.stroke();
   // Add the point to the points array
   this.points.push(point);

   // If three points have been clicked, draw the triangle and add an event listener for the fourth click
   if (this.points.length === 3) {
     this.drawTriangle();

     // Add an event listener for the fourth click
     const canvas = this.canvasRef.nativeElement;
     canvas.addEventListener('click', (e: MouseEvent) => {
       // Create a point object from the click coordinates
       const point = { x: e.offsetX, y: e.offsetY };

       // Check if the point is inside or outside the triangle
       this.isInside = this.isPointInsideTriangle(point);

       // Show the modal with the result
       this.showModal = true;
     });
   }
 }

 drawTriangle() {
   this.ctx.beginPath();
   this.ctx.moveTo(this.points[0].x, this.points[0].y);
   this.ctx.lineTo(this.points[1].x, this.points[1].y);
   this.ctx.lineTo(this.points[2].x, this.points[2].y);
   this.ctx.closePath();
   this.ctx.stroke();
 }

 calcTriangleArea(p1: Point, p2: Point, p3: Point) {
   return Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2);
 }

 isPointInsideTriangle(p: Point) {
   // Calculate the area of the triangle formed by the point and each edge of the triangle
   const area1 = this.calcTriangleArea(p, this.points[0], this.points[1]);
   const area2 = this.calcTriangleArea(p, this.points[1], this.points[2]);
   const area3 = this.calcTriangleArea(p, this.points[2], this.points[0]);

   // Calculate the total area of the triangle
   const totalArea = this.calcTriangleArea(this.points[0], this.points[1], this.points[2]);

   // Check if the sum of the areas of the triangles formed by the point and each edge is equal to the total area of the triangle
   return (area1 + area2 + area3) === totalArea;
 }

 closeModal() {
   this.showModal = false;
   this.points = [];
   this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
 }
}