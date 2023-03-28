import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-set-points-triangle',
  templateUrl: './set-points-triangle.component.html',
  styleUrls: ['./set-points-triangle.component.scss']
})
export class SetPointsTriangleComponent {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private trianglePoints: [number, number][] = [];
  private randomPoints: [number, number][] = [];

  constructor() {}

  ngOnInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    if (!context) {
      console.error('Failed to get 2D context');
      return;
    }
    this.ctx = context;
    this.canvas.nativeElement.addEventListener('click', (event: MouseEvent) => {
      this.handleCanvasClick(event);
    });
  }

  handleCanvasClick(event: MouseEvent): void {
    if (this.trianglePoints.length < 3) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.trianglePoints.push([x, y]);
      this.drawPoint(x, y);
      if (this.trianglePoints.length === 3) {
        this.drawTriangle();
      }
    }
  }
  generateRandomPoints(): void {
    if (this.trianglePoints.length !== 3) {
      alert('Please create a triangle by clicking on the canvas first.');
      return;
    }
    
    this.randomPoints = [];
    for (let i = 0; i < 100000; i++) {
      const x = Math.floor(Math.random() * this.canvas.nativeElement.width);
      const y = Math.floor(Math.random() * this.canvas.nativeElement.height);
      this.randomPoints.push([x, y]);
  
      if (this.isPointInsideTriangle(x, y)) {
        this.drawPoint(x, y, 'red');
      } else {
        this.drawPoint(x, y, 'blue');
      }
    }
  }
  


  isPointInsideTriangle(x: number, y: number): boolean {
    const [A, B, C] = this.trianglePoints.map(point => point as [number, number]);
    const P: [number, number] = [x, y];

    const areaABC = this.triangleArea(A, B, C);
    const areaABP = this.triangleArea(A, B, P);
    const areaBCP = this.triangleArea(B, C, P);
    const areaCAP = this.triangleArea(C, A, P);

    return areaABC === areaABP + areaBCP + areaCAP;
  }

  triangleArea([x1, y1]: [number, number], [x2, y2]: [number, number], [x3, y3]: [number, number]): number {
    return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
  }

  drawPoint(x: number, y: number, color: string = 'blue'): void {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  drawTriangle(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(this.trianglePoints[0][0], this.trianglePoints[0][1]);
    this.ctx.lineTo(this.trianglePoints[1][0], this.trianglePoints[1][1]);
    this.ctx.lineTo(this.trianglePoints[2][0], this.trianglePoints[2][1]);
    this.ctx.closePath();
    this.ctx.strokeStyle = 'green';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  clearCanvas(): void {
    this.trianglePoints = [];
    this.randomPoints = [];
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }
}
