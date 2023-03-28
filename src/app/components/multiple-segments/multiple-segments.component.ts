import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

interface LineSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
interface Event {
  type: 'start' | 'end';
  x: number;
  y: number;
  index: number;
}



@Component({
  selector: 'app-multiple-segments',
  templateUrl: './multiple-segments.component.html',
  styleUrls: ['./multiple-segments.component.scss']
})
export class MultipleSegmentsComponent implements AfterViewInit {
 
  

  @ViewChild('lineCanvas') lineCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  private readonly numLineSegments = 100000;

  ngAfterViewInit(): void {
    const context = this.lineCanvas.nativeElement.getContext('2d');
    if (!context) {
      console.error('Failed to get 2D rendering context');
      return;
    }
  
    this.ctx = context;
    this.lineCanvas.nativeElement.width = window.innerWidth;
    this.lineCanvas.nativeElement.height = window.innerHeight;
    this.generateAndCheckLineSegments();
  }
  
  

  generateAndCheckLineSegments(): void {
    const lineSegments: LineSegment[] = [];
  
    for (let i = 0; i < this.numLineSegments; i++) {
      const lineSegment = this.randomLineSegment();
      lineSegments.push(lineSegment);
      this.drawLineSegment(lineSegment);
    }
  
    const intersections = this.sweepLineIntersections(lineSegments);
    intersections.forEach(([i, j]) => {
      console.log(`Line segments ${i} and ${j} intersect.`);
    });
  }
  
  // sweepLineIntersections(segments: LineSegment[]): [number, number][] {
  //   const events: Event[] = [];
  //   segments.forEach((segment, index) => {
  //     events.push({ type: 'start', x: segment.x1, y: segment.y1, index });
  //     events.push({ type: 'end', x: segment.x2, y: segment.y2, index });
  //   });
  
  //   events.sort((a, b) => a.x - b.x || a.y - b.y);
  
  //   const active = new Set<number>();
  //   const intersections: [number, number][] = [];
  
  //   for (const event of events) {
  //     const segment = segments[event.index];
  
  //     if (event.type === 'start') {
  //       for (const activeIndex of active) {
  //         if (this.lineSegmentsIntersect(segment, segments[activeIndex])) {
  //           intersections.push([event.index, activeIndex]);
  //         }
  //       }
  
  //       active.add(event.index);
  //     } else {
  //       active.delete(event.index);
  //     }
  //   }
  
  //   return intersections;
  // }
  
  sweepLineIntersections(segments: LineSegment[]): [number, number][] {
    const events: Event[] = [];
    segments.forEach((segment, index) => {
      events.push({ type: 'start', x: segment.x1, y: segment.y1, index });
      events.push({ type: 'end', x: segment.x2, y: segment.y2, index });
    });
  
    events.sort((a, b) => a.x - b.x || a.y - b.y);
  
    const active: number[] = [];
    const intersections: [number, number][] = [];
  
    for (const event of events) {
      const segment = segments[event.index];
  
      if (event.type === 'start') {
        const position = this.binarySearch(active, (i) => this.compareSegments(segments[i], segment));
  
        for (let i = position - 1; i >= 0; i--) {
          if (this.lineSegmentsIntersect(segment, segments[active[i]])) {
            intersections.push([event.index, active[i]]);
          } else {
            break;
          }
        }
  
        for (let i = position; i < active.length; i++) {
          if (this.lineSegmentsIntersect(segment, segments[active[i]])) {
            intersections.push([event.index, active[i]]);
          } else {
            break;
          }
        }
  
        active.splice(position, 0, event.index);
      } else {
        const position = active.indexOf(event.index);
        active.splice(position, 1);
      }
    }
  
    return intersections;
  }
  
  binarySearch<T>(array: T[], compare: (item: T) => number): number {
    let left = 0;
    let right = array.length;
  
    while (left < right) {
      const mid = (left + right) >>> 1;
      const cmp = compare(array[mid]);
  
      if (cmp < 0) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
  
    return left;
  }
  
  compareSegments(a: LineSegment, b: LineSegment): number {
    const aY = Math.min(a.y1, a.y2);
    const bY = Math.min(b.y1, b.y2);
  
    if (aY === bY) {
      const aX = Math.min(a.x1, a.x2);
      const bX = Math.min(b.x1, b.x2);
      return aX - bX;
    }
  
    return aY - bY;
  }
  

  randomLineSegment(): LineSegment {
    return {
      x1: Math.random() * window.innerWidth,
      y1: Math.random() * window.innerHeight,
      x2: Math.random() * window.innerWidth,
      y2: Math.random() * window.innerHeight,
    };
  }
  drawLineSegment(lineSegment: LineSegment): void {
    this.ctx.beginPath();
    this.ctx.moveTo(lineSegment.x1, lineSegment.y1);
    this.ctx.lineTo(lineSegment.x2, lineSegment.y2);
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }
  

  lineSegmentsIntersect(a: LineSegment, b: LineSegment): boolean {
    const det = (a.x1 - a.x2) * (b.y1 - b.y2) - (a.y1 - a.y2) * (b.x1 - b.x2);
    if (det === 0) return false; // parallel lines

    const t = ((a.x1 - b.x1) * (b.y1 - b.y2) - (a.y1 - b.y1) * (b.x1 - b.x2)) / det;
    const u = -((a.x1 - a.x2) * (a.y1 - b.y1) - (a.y1 - a.y2) * (a.x1 - b.x1)) / det;

    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
  }
}