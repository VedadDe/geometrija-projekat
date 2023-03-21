import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-points-orientation',
  templateUrl: './points-orientation.component.html',
  styleUrls: ['./points-orientation.component.scss']
})
export class PointsOrientationComponent {

  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  showModal = false;
  isClockwise = false;
  points: Point[] = [];

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(0, 0);
      // context.lineTo(canvas.width, 0);
      // context.lineTo(canvas.width, canvas.height);
      // context.lineTo(0, canvas.height);
      context.closePath();
      context.stroke();
    }
  }

  canvasClick(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.points.push({ x, y });

    const context = canvas.getContext('2d');
    if (context) {
      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI);
      context.fill();

      if (this.points.length === 3) {
        this.showModal = true;
        this.isClockwise = this.isPointsClockwise(this.points);
      }
    }
  }

  isPointsClockwise(points: Point[]): boolean {
    const p1 = points[0];
    const p2 = points[1];
    const p3 = points[2];

    const val = (p2.y - p1.y) * (p3.x - p2.x) - (p2.x - p1.x) * (p3.y - p2.y);

    return val < 0;
  }

  closeModal(): void {
    this.showModal = false;
    this.isClockwise = false;
    this.points = [];

    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(0, 0);
      // context.lineTo(canvas.width, 0);
      // context.lineTo(canvas.width, canvas.height);
      // context.lineTo(0, canvas.height);
      context.closePath();
      context.stroke();
    }
  }
}
