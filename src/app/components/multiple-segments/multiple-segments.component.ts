import { Component, ElementRef, ViewChild } from '@angular/core';
import { RBTree } from 'bintrees'



@Component({
  selector: 'app-multiple-segments',
  templateUrl: './multiple-segments.component.html',
  styleUrls: ['./multiple-segments.component.scss']
})
export class MultipleSegmentsComponent {
  @ViewChild('canvas') canvasRef!: ElementRef;
  points: [number, number][] = [];
  segments: [[number, number], [number, number]][] = [];
  resultMessage: string = '';

  onCanvasClick(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.points.push([x, y]);

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();

    if (this.points.length % 2 === 0) {
      const startPoint = this.points[this.points.length - 2];
      const endPoint = this.points[this.points.length - 1];
      this.segments.push([startPoint, endPoint]);

      ctx.beginPath();
      ctx.moveTo(startPoint[0], startPoint[1]);
      ctx.lineTo(endPoint[0], endPoint[1]);
      ctx.stroke();
    }
  }

  checkIntersecting(): void {
    const intersecting = this.bentleyOttmann(this.segments);

    if (intersecting) {
      this.resultMessage = 'There are intersecting segments.';
    } else {
      this.resultMessage = 'There are no intersecting segments.';
    }
  }

  bentleyOttmann(segments: [[number, number], [number, number]][]): boolean {
    if (segments.length < 2) {
      return false;
    }

    const eventQueue = new EventQueue(segments);
    const sweepLineStatus = new SweepLineStatus();

    while (!eventQueue.isEmpty()) {
      const eventPoint = eventQueue.pop();
      sweepLineStatus.setSweepX(eventPoint.point[0]);
    

      if (eventPoint.type === 'start') {
        const segment = eventPoint.segment;
        const above = sweepLineStatus.above(segment);
        const below = sweepLineStatus.below(segment);

        if ((above && this.intersect(above, segment)) || (below && this.intersect(below, segment))) {
          return true;
        }

        sweepLineStatus.insert(segment);
      } else { // eventPoint.type === 'end'
        const segment = eventPoint.segment;
        const above = sweepLineStatus.above(segment);
        const below = sweepLineStatus.below(segment);

        if (above && below && this.intersect(above, below)) {
          return true;
        }

        sweepLineStatus.delete(segment);
      }
    }

    return false;
  }

  intersect(segment1: [number, number][], segment2: [number, number][]): boolean {
    const [p1, p2] = segment1;
    const [p3, p4] = segment2;

    const d1 = this.direction(p1, p2, p3);
    const d2 = this.direction(p1, p2, p4);
    const d3 = this.direction(p3, p4, p1);
    const d4 = this.direction(p3, p4, p2);

    if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) {
      return true;
    }

    return false;
  }

  direction(p1: [number, number], p2: [number, number], p3: [number, number]): number {
    return (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0]);
  }
}

class EventQueue {
  private queue: any[];

  constructor(segments: [[number, number], [number, number]][]) {
    this.queue = [];

    for (const segment of segments) {
      const [p1, p2] = segment;
      const startPoint = { type: 'start', point: p1[0] < p2[0] ? p1 : p2, segment: segment };
      const endPoint = { type: 'end', point: p1[0] < p2[0] ? p2 : p1, segment: segment };

      this.queue.push(startPoint, endPoint);
    }

    this.queue.sort((a, b) => a.point[0] - b.point[0] || a.point[1] - b.point[1]);
  }

  pop() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

class SweepLineStatus {
  private tree: any;
  private sweepX: number;

  constructor() {
    this.tree = new RBTree<[number, number][]>((a, b) => this.compareSegments(a, b, this.sweepX));
    this.sweepX = 0;
  }

  setSweepX(x: number) {
    this.sweepX = x;
  }

  insert(segment: [number, number][]) {
    this.tree.insert(segment);
  }

  delete(segment: [number, number][]) {
    this.tree.remove(segment);
  }

  above(segment: [number, number][]) {
    const node = this.tree.find(segment);
    if (node && node.next) {
      return node.next.key;
    }
    return null;
  }

  below(segment: [number, number][]) {
    const node = this.tree.find(segment);
    if (node && node.prev) {
      return node.prev.key;
    }
    return null;
  }

  compareSegments(segment1: [number, number][], segment2: [number, number][], sweepX: number): number {
    const y1 = this.interpolateY(segment1, sweepX);
    const y2 = this.interpolateY(segment2, sweepX);

    if (y1 < y2) {
      return -1;
    }
    if (y1 > y2) {
      return 1;
    }
    return 0;
  }

  interpolateY(segment: [number, number][], x: number): number {
    const [p1, p2] = segment;
    if (p1[0] === p2[0]) {
      return p1[1];
    }
    return p1[1] + (p2[1] - p1[1]) * (x - p1[0]) / (p2[0] - p1[0]);
  }
}
