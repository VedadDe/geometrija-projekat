import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-simple-polygon',
  templateUrl: './simple-polygon.component.html',
  styleUrls: ['./simple-polygon.component.scss']
})
export class SimplePolygonComponent implements AfterViewInit {

  @ViewChild('polygonCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private kontekst!: CanvasRenderingContext2D;
  private tacke: { x: number; y: number }[] = [];
  n: number = 3;
  pocetakSegmenta: { x: number; y: number } | null = null;
  krajSegmenta: { x: number; y: number } | null = null;
  segment: boolean = false;
  
  ngAfterViewInit(): void {
    const kontekst = this.canvasRef.nativeElement.getContext('2d');
    if (!kontekst) {
      throw new Error('Unable to get 2D rendering kontekst for the canvas.');
    }
    this.kontekst = kontekst;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas(): void {
    this.canvasRef.nativeElement.width = window.innerWidth * 0.8;
    this.canvasRef.nativeElement.height = window.innerHeight * 0.8;
  }

  generisiPoligon(): void {
    if (this.n >= 3) {
      this.tacke = this.generisiRandomtacke(this.n);
      this.tacke = this.sorttackePoPolarnomUglu(this.tacke);
      this.kontekst.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

      this.kontekst.beginPath();
      this.kontekst.moveTo(this.tacke[0].x, this.tacke[0].y);

      for (let i = 1; i < this.tacke.length; i++) {
        this.kontekst.lineTo(this.tacke[i].x, this.tacke[i].y);
      }

      this.kontekst.closePath();
      this.kontekst.stroke();

      for (const tacka of this.tacke) {
        this.crtajtacka(tacka.x, tacka.y);
      }
    }
  }
  segmentIlitacka(){
    this.segment = ! this.segment
  }
  private generisiRandomtacke(n: number): { x: number; y: number }[] {
    const tacke: { x: number; y: number }[] = [];
    const width = this.canvasRef.nativeElement.width;
    const height = this.canvasRef.nativeElement.height;

    for (let i = 0; i < n; i++) {
      tacke.push({
        x: Math.random() * width,
        y: Math.random() * height,
      });
    }

    return tacke;
  }

  private sorttackePoPolarnomUglu(tacke: { x: number; y: number }[]): { x: number; y: number }[] {
    const centroid = this.izracunajCentroid(tacke);

    tacke.sort((a, b) => {
      const ugaoA = Math.atan2(a.y - centroid.y, a.x - centroid.x);
      const ugaoB = Math.atan2(b.y - centroid.y, b.x - centroid.x);
      return ugaoA - ugaoB;
    });

    return tacke;
  }

  private izracunajCentroid(tacke: { x: number; y: number }[]): { x: number; y: number } {
    const centroid = { x: 0, y: 0 };

    for (const tacka of tacke) {
      centroid.x += tacka.x;
      centroid.y += tacka.y;
    }

    centroid.x /= tacke.length;
    centroid.y /= tacke.length;

    return centroid;
  }

  private crtajtacka(x: number, y: number): void {
    this.kontekst.beginPath();
    this.kontekst.arc(x, y, 3, 0, 2 * Math.PI);
    this.kontekst.fillStyle = 'black';
    this.kontekst.fill();
  }
  
  jeLiTackaUPoligonu(tacka: { x: number; y: number }): boolean {
    let presjeci = 0;
    const testLinija = { a: tacka, b: { x: this.canvasRef.nativeElement.width + 1, y: tacka.y } };
  
    for (let i = 0; i < this.tacke.length; i++) {
      const a = this.tacke[i];
      const b = this.tacke[(i + 1) % this.tacke.length];
  
      const daLiSePresjeca = this.daLiSeLinijeSijeku(a, b, testLinija.a, testLinija.b);
      if (daLiSePresjeca) {
        presjeci++;
      }
    }
  
    return presjeci % 2 !== 0;
  }
  
  daLiSeLinijeSijeku(a1: { x: number; y: number }, a2: { x: number; y: number }, b1: { x: number; y: number }, b2: { x: number; y: number }): boolean {
    const d = (a1.x - a2.x) * (b2.y - b1.y) - (a1.y - a2.y) * (b2.x - b1.x);
    if (d === 0) return false;
  
    const s = ((a1.x - b1.x) * (b2.y - b1.y) - (a1.y - b1.y) * (b2.x - b1.x)) / d;
    const t = ((a1.x - a2.x) * (a1.y - b1.y) - (a1.y - a2.y) * (a1.x - b1.x)) / d;
  
    return s >= 0 && s <= 1 && t >= 0 && t <= 1;
  }

  onCanvasClick(event: MouseEvent): void {
    if(this.segment){
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    if (!this.pocetakSegmenta) {
      this.pocetakSegmenta = { x, y };
    } else if (!this.krajSegmenta) {
      this.krajSegmenta = { x, y };
      this.crtajLineSegment(this.pocetakSegmenta, this.krajSegmenta);
  
      if (this.ispitivanjePresjeka(this.pocetakSegmenta, this.krajSegmenta)) {
        alert('Segment siječe poligon.');
      } else {
        const midtacka = { x: (this.pocetakSegmenta.x + this.krajSegmenta.x) / 2, y: (this.pocetakSegmenta.y + this.krajSegmenta.y) / 2 };
        if (this.jeLiTackaUPoligonu(midtacka)) {
          alert('Segment je u poligonu.');
        } else {
          alert('Segment je van poligona.');
        }
      }
  
      this.pocetakSegmenta = null;
      this.krajSegmenta = null;
    }}else{
        const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    if (this.jeLiTackaUPoligonu({ x, y })) {
      alert('Tacka je u poligonu.');
    } else {
      alert('Tacka nije u poligonu.');
    }
    }
  }
  

crtajLineSegment(start: { x: number; y: number }, end: { x: number; y: number }): void {
  this.kontekst.beginPath();
  this.kontekst.moveTo(start.x, start.y);
  this.kontekst.lineTo(end.x, end.y);
  this.kontekst.stroke();
}

ispitivanjePresjeka(pocetakSegmenta: { x: number; y: number }, krajSegmenta: { x: number; y: number }): boolean {
  for (let i = 0; i < this.tacke.length; i++) {
    const a = this.tacke[i];
    const b = this.tacke[(i + 1) % this.tacke.length];

    if (this.daLiSeLinijeSijeku(a, b, pocetakSegmenta, krajSegmenta)) {
      return true;
    }
  }

  return false;
}
orjentacijaPoligona() {
  const n = this.tacke.length;
  let prvrsina = 0;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    prvrsina += (this.tacke[i].x * this.tacke[j].y) - (this.tacke[j].x * this.tacke[i].y);
  }

  if (prvrsina < 0) {
    alert ("U smijeru kazaljke");
  } else if (prvrsina > 0) {
    alert ('U smijeru obrnuto od kazaljke');
  } else {
    alert( 'Nedefinisano');
  }
}

  
}