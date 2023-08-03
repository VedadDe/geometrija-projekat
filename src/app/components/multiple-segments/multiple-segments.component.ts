import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';



interface Tacka {
  x: number;
  y: number;
  jeLijevo: boolean;
  linija?: LinijskiSegment | null;
}


interface LinijskiSegment {
  pocetak: Tacka;
  kraj: Tacka;
}


@Component({
  selector: 'app-multiple-segments',
  templateUrl: './multiple-segments.component.html',
  styleUrls: ['./multiple-segments.component.scss']
})
export class MultipleSegmentsComponent implements OnInit {
 
  constructor() {}

  ngOnInit(): void {}
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
private ctx!: CanvasRenderingContext2D;
public prijesekPronaden = false;
public canvasWidth = 800;
public canvasHeight = 600;

private static readonly EPSILON = 1e-9;


ngAfterViewInit(): void {
  const context = this.canvas.nativeElement.getContext('2d');
  if (context === null) {
    throw new Error('greska prilikom dobavljanja 2D contexta');
  }
  this.ctx = context;
}

generisiNasumicneSegmente( broj: number): void {
  const brojSegmenata = broj;
  const segmenti: LinijskiSegment[] = [];
  const tacke: Tacka[] = [];

  for (let i = 0; i < brojSegmenata; i++) {
    const pocetak: Tacka = {
      x: Math.random() * this.canvasWidth,
      y: Math.random() * this.canvasHeight,
      jeLijevo: true,
    };

    const kraj: Tacka = {
      x: Math.random() * this.canvasWidth,
      y: Math.random() * this.canvasHeight,
      jeLijevo: false,
    };

    const segment: LinijskiSegment = { pocetak, kraj };
    pocetak.linija = segment;
    kraj.linija = segment;

    segmenti.push(segment);
    tacke.push(pocetak, kraj);
  }

  this.prijesekPronaden = this.sweepLinePresjek(tacke);

  this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  segmenti.forEach((segment) => this.crtajLinijskiSegment(segment));
}


crtajLinijskiSegment(linija: LinijskiSegment): void {
  this.ctx.beginPath();
  this.ctx.moveTo(linija.pocetak.x, linija.pocetak.y);
  this.ctx.lineTo(linija.kraj.x, linija.kraj.y);
  this.ctx.stroke();
}


  sweepLinePresjek(tacke: Tacka[]): boolean {
    tacke.sort((a, b) => a.x - b.x);
  
    const T: Set<LinijskiSegment> = new Set();
  
    for (let i = 0; i < tacke.length; i++) {
      const point = tacke[i];
  
      if (point.jeLijevo) {
        T.add(point.linija as LinijskiSegment);
  
        const pred = this.predecessor(T, point.linija as LinijskiSegment);
        const succ = this.successor(T, point.linija as LinijskiSegment);
  
        if (pred && this.presjecajuSe(point.linija as LinijskiSegment, pred)) {
          return true;
        }
  
        if (succ && this.presjecajuSe(point.linija as LinijskiSegment, succ)) {
          return true;
        }
      } else {
        const pred = this.predecessor(T, point.linija as LinijskiSegment);
        const succ = this.successor(T, point.linija as LinijskiSegment);
  
        if (pred && succ && this.presjecajuSe(pred, succ)) {
          return true;
        }
  
        T.delete(point.linija as LinijskiSegment);
      }
    }
  
    return false;
  }
  predecessor(set: Set<LinijskiSegment>, linija: LinijskiSegment): LinijskiSegment | null {
    let rezultat: LinijskiSegment | null = null;
    const sweepX = linija.pocetak.x;
  
    for (const clan of set) {
      const clanY = this.getYAtX(sweepX, clan);
      const linijaY = this.getYAtX(sweepX, linija);
  
      if (clanY < linijaY) {
        if (!rezultat || this.getYAtX(sweepX, rezultat) < clanY) {
          rezultat = clan;
        }
      }
    }
  
    return rezultat;
  }
  
  successor(set: Set<LinijskiSegment>, linija: LinijskiSegment): LinijskiSegment | null {
    let rezultat: LinijskiSegment | null = null;
    const sweepX = linija.pocetak.x;
  
    for (const clan of set) {
      const clanY = this.getYAtX(sweepX, clan);
      const linijaY = this.getYAtX(sweepX, linija);
  
      if (clanY > linijaY) {
        if (!rezultat || this.getYAtX(sweepX, rezultat) > clanY) {
          rezultat = clan;
        }
      }
    }
  
    return rezultat;
  }
  
  getYAtX(x: number, linija: LinijskiSegment): number {
    const { pocetak, kraj } = linija;
    const slope = (kraj.y - pocetak.y) / (kraj.x - pocetak.x);
    return pocetak.y + slope * (x - pocetak.x);
  }
  
  orijentacija(p: Tacka, q: Tacka, r: Tacka): number {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  
    if (Math.abs(val) < MultipleSegmentsComponent.EPSILON) return 0; 
    return val > 0 ? 1 : 2; // orijentacija u smjeru kazaljke ili obrnuto
  }
  segmentiPreklapanje(linija1: LinijskiSegment, linija2: LinijskiSegment): boolean {
    if (this.orijentacija(linija1.pocetak, linija1.kraj, linija2.pocetak) === 0 && this.orijentacija(linija1.pocetak, linija1.kraj, linija2.kraj) === 0) {
      return this.naSegmentu(linija1.pocetak, linija2.pocetak, linija1.kraj) || this.naSegmentu(linija1.pocetak, linija2.kraj, linija1.kraj) || this.naSegmentu(linija2.pocetak, linija1.pocetak, linija2.kraj) || this.naSegmentu(linija2.pocetak, linija1.kraj, linija2.kraj);
    }
    return false;
  }
  
  naSegmentu(p: Tacka, q: Tacka, r: Tacka): boolean {
    if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)) {
      return true;
    }
    return false;
  }
  
  presjecajuSe(linija1: LinijskiSegment, linija2: LinijskiSegment): boolean {
    if (this.segmentiPreklapanje(linija1, linija2)) return true;

    const p1 = linija1.pocetak;
    const q1 = linija1.kraj;
    const p2 = linija2.pocetak;
    const q2 = linija2.kraj;
  
    const o1 = this.orijentacija(p1, q1, p2);
    const o2 = this.orijentacija(p1, q1, q2);
    const o3 = this.orijentacija(p2, q2, p1);
    const o4 = this.orijentacija(p2, q2, q1);
  
    if (o1 !== o2 && o3 !== o4) return true;
  
    if (o1 === 0 && this.naSegmentu(p1, p2, q1)) return true;
    if (o2 === 0 && this.naSegmentu(p1, q2, q1)) return true;
    if (o3 === 0 && this.naSegmentu(p2, p1, q2)) return true;
    if (o4 === 0 && this.naSegmentu(p2, q1, q2)) return true;
  
    return false; // Doesn't fall in any of the above cases
  }
  
}