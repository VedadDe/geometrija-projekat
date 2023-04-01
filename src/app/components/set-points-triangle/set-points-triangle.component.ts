import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-set-points-triangle',
  templateUrl: './set-points-triangle.component.html',
  styleUrls: ['./set-points-triangle.component.scss']
})
export class SetPointsTriangleComponent {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private trokutTacke: [number, number][] = [];
  private nasumicneTacke: [number, number][] = [];

  constructor() {}

  ngOnInit(): void {
    const kontekst = this.canvas.nativeElement.getContext('2d');
    if (!kontekst) {
      console.error('Neuspjelo dobavljanje 2D konteksta');
      return;
    }
    this.ctx = kontekst;
    this.canvas.nativeElement.addEventListener('click', (event: MouseEvent) => {
      this.obradiKlikNaPlatnu(event);
    });
  }

  obradiKlikNaPlatnu(event: MouseEvent): void {
    if (this.trokutTacke.length < 3) {
      const pravougaonik = this.canvas.nativeElement.getBoundingClientRect();
      const x = event.clientX - pravougaonik.left;
      const y = event.clientY - pravougaonik.top;
      this.trokutTacke.push([x, y]);
      this.crtajTacku(x, y);
      if (this.trokutTacke.length === 3) {
        this.crtajTrokut();
      }
    }
  }
  generisiNasumicneTacke(): void {
    if (this.trokutTacke.length !== 3) {
      alert('Prvo kreirajte trokut klikom na canvas.');
      return;
    }
    
    this.nasumicneTacke = [];
    for (let i = 0; i < 100000; i++) {
      const x = Math.floor(Math.random() * this.canvas.nativeElement.width);
      const y = Math.floor(Math.random() * this.canvas.nativeElement.height);
      this.nasumicneTacke.push([x, y]);
  
      if (this.daLiJeTackaUnutarTrokuta(x, y)) {
        this.crtajTacku(x, y, 'red');
      } else {
        this.crtajTacku(x, y, 'blue');
      }
    }
  }

  daLiJeTackaUnutarTrokuta(x: number, y: number): boolean {
    const [A, B, C] = this.trokutTacke.map(tacka => tacka as [number, number]);
    const P: [number, number] = [x, y];

    const povrsinaABC = this.povrsinaTrokuta(A, B, C);
    const povrsinaABP = this.povrsinaTrokuta(A, B, P);
    const povrsinaBCP = this.povrsinaTrokuta(B, C, P);
    const povrsinaCAP = this.povrsinaTrokuta(C, A, P);

    return povrsinaABC === povrsinaABP + povrsinaBCP + povrsinaCAP;
  }

  povrsinaTrokuta([x1, y1]: [number, number], [x2, y2]: [number, number], [x3, y3]: [number, number]): number {
    return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
  }

  crtajTacku(x: number, y: number, boja: string = 'plava'): void {
    this.ctx.fillStyle = boja;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  crtajTrokut(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(this.trokutTacke[0][0], this.trokutTacke[0][1]);
    this.ctx.lineTo(this.trokutTacke[1][0], this.trokutTacke[1][1]);
    this.ctx.lineTo(this.trokutTacke[2][0], this.trokutTacke[2][1]);
    this.ctx.closePath();
    this.ctx.strokeStyle = 'green';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  ocisticanvas(): void {
    this.trokutTacke = [];
    this.nasumicneTacke = [];
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }
}
