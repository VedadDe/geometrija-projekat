import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-jarwis-march',
  templateUrl: './jarwis-march.component.html',
  styleUrls: ['./jarwis-march.component.css']
})
export class JarwisMarchComponent {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>; // note the "!" operator

  points: { x: number; y: number }[] = [];

  // ngOnInit(): void {
  //   const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
  //   const context = canvasEl.getContext('2d');
  //   canvasEl.width = 400;
  //   canvasEl.height = 400;
  //   canvasEl.addEventListener('click', (event: MouseEvent) => {
  //     const rect = canvasEl.getBoundingClientRect();
  //     const x = event.clientX - rect.left;
  //     const y = event.clientY - rect.top;
  //     this.points.push({ x, y });
  //     this.drawPoints(context);
  //   });
  // }
  // ngOnInit(): void {
  //   const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
  //   const context = canvasEl.getContext('2d');
  
  //   canvasEl.width = window.innerWidth;
  //   canvasEl.height = window.innerHeight;
  
  //   window.addEventListener('resize', () => {
  //     canvasEl.width = window.innerWidth;
  //     canvasEl.height = window.innerHeight;
  //     this.drawPoints(context);
  //   });
  
  //   canvasEl.addEventListener('click', (event: MouseEvent) => {
  //     const rect = canvasEl.getBoundingClientRect();
  //     const x = event.clientX - rect.left;
  //     const y = event.clientY - rect.top;
  //     this.points.push({ x, y });
  //     this.drawPoints(context);
  //   });
  // }
  
  ngOnInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    canvasEl.addEventListener('click', (event: MouseEvent) => {
      const rect = canvasEl.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.points.push({ x, y });
      if (context) {
        this.drawPoints(context);
      }
    });
  }
  

  runJarvisMarch(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    const hull = this.jarvisMarch(this.points);
    this.drawHull(context, hull);
    console.log("gotovo")
  }
  jarvisMarch(points: { x: number; y: number }[]): { x: number; y: number }[] {
    // Find the point with the lowest y-coordinate (and then lowest x-coordinate)
    let lowestIndex = 0;
    for (let i = 1; i < points.length; i++) {
      if (points[i].y < points[lowestIndex].y || (points[i].y === points[lowestIndex].y && points[i].x < points[lowestIndex].x)) {
        lowestIndex = i;
      }
    }
  
    const hull: { x: number; y: number }[] = [points[lowestIndex]];
  
    let currentPoint = lowestIndex;
    let endpoint: number;
    do {
      endpoint = 0;
      for (let i = 1; i < points.length; i++) {
        if (currentPoint === endpoint || this.isCounterClockwise(points[currentPoint], points[i], points[endpoint])) {
          endpoint = i;
        }
      }
      hull.push(points[endpoint]);
      currentPoint = endpoint;
    } while (currentPoint !== lowestIndex);
  
    return hull;
  }
  isCounterClockwise(p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }): boolean {
    const crossProduct = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
    return crossProduct > 0;
  }
  // drawHull(context: CanvasRenderingContext2D, hull: { x: number; y: number }[]): void {
  //   context.beginPath();
  //   context.moveTo(hull[0].x, hull[0].y);
  //   for (let i = 1; i < hull.length; i++) {
  //     context.lineTo(hull[i].x, hull[i].y);
  //   }
  //   context.closePath();
  //   context.strokeStyle = '#FF0000';
  //   context.stroke();
  // }
  drawHull(context: CanvasRenderingContext2D | null, hull: { x: number; y: number }[]): void {
    if (!context) {
      return;
    }
  
    context.beginPath();
    context.moveTo(hull[0].x, hull[0].y);
  
    for (let i = 1; i < hull.length; i++) {
      context.lineTo(hull[i].x, hull[i].y);
    }
  
    context.closePath();
    context.stroke();
  }
    
  drawPoints(context: CanvasRenderingContext2D): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    context.lineWidth = 1;
  
    this.points.forEach((point) => {
      context.beginPath();
      context.arc(point.x, point.y, 2, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
    });
  }
  
  // drawPoints(context: CanvasRenderingContext2D | null): void {
  //   if (context) {
  //     const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
  //     context.clearRect(0, 0, canvasEl.width, canvasEl.height);      this.points.forEach((point) => {
  //       context.beginPath();
  //       context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
  //       context.fill();
  //     });
  //   }
  // }

  // generatePoints(): void {
  //   this.points = [];
  //   for (let i = 0; i < 1000; i++) {
  //     const x = Math.random() * 400;
  //     const y = Math.random() * 400;
  //     this.points.push({ x, y });
  //   }
  //   const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
  //   const context = canvasEl.getContext('2d');
  //   this.drawPoints(context);
  // }
  // generatePoints(): void {
  //   const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
  //   const width = canvasEl.width;
  //   const height = canvasEl.height;
  //   const numPoints = 10000;
  
  //   this.points = [];
  
  //   for (let i = 0; i < numPoints; i++) {
  //     const x = Math.floor(Math.random() * width);
  //     const y = Math.floor(Math.random() * height);
  //     this.points.push({ x, y });
  //   }
  
  //   const context = canvasEl.getContext('2d');
  //   this.drawPoints(context);
  // }
  generatePoints(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    const numPoints = 100000;
    this.points = [];
    for (let i = 0; i < numPoints; i++) {
      const x = Math.floor(Math.random() * canvasEl.width);
      const y = Math.floor(Math.random() * canvasEl.height);
      this.points.push({ x, y });
    }
    if (context) {
      this.drawPoints(context);
    }
  }
   
  
}
