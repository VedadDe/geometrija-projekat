import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-jarwis-march',
  templateUrl: './jarwis-march.component.html',
  styleUrls: ['./jarwis-march.component.scss']
})
export class JarwisMarchComponent {
  @ViewChild('canvas', { static: true })  canvas!: ElementRef<HTMLCanvasElement>; 

  tacke: { x: number; y: number }[] = [];


  ngOnInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const kontekst = canvasEl.getContext('2d');
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    canvasEl.addEventListener('click', (dogadjaj: MouseEvent) => {
      const pravougaonik = canvasEl.getBoundingClientRect();
      const x = dogadjaj.clientX - pravougaonik.left;
      const y = dogadjaj.clientY - pravougaonik.top;
      this.tacke.push({ x, y });
      if (kontekst) {
        this.crtajTacke(kontekst);
      }
    });
  }
  

  pokreniJarvisMarch(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const kontekst = canvasEl.getContext('2d');
    const omotac = this.jarvisMarch(this.tacke);
    this.crtajOmotac(kontekst, omotac);
    console.log("gotovo")
  }
  jarvisMarch(tacke: { x: number; y: number }[]): { x: number; y: number }[] {
    let najniziIndeks = 0;
    for (let i = 1; i < tacke.length; i++) {
      if (tacke[i].y < tacke[najniziIndeks].y || (tacke[i].y === tacke[najniziIndeks].y && tacke[i].x < tacke[najniziIndeks].x)) {
        najniziIndeks = i;
      }
    }
  
    const omotac: { x: number; y: number }[] = [tacke[najniziIndeks]];
  
    let trenutnaTacka = najniziIndeks;
    let krajnjaTacka: number;
    do {
      krajnjaTacka = 0;
      for (let i = 1; i < tacke.length; i++) {
        if (trenutnaTacka === krajnjaTacka || this.jeSuprotnoOdSata(tacke[trenutnaTacka], tacke[i], tacke[krajnjaTacka])) {
          krajnjaTacka = i;
        }
      }
      omotac.push(tacke[krajnjaTacka]);
      trenutnaTacka = krajnjaTacka;
    } while (trenutnaTacka !== najniziIndeks);
  
    return omotac;
  }
  jeSuprotnoOdSata(p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }): boolean {
    const vektorskiProizvod = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
    return vektorskiProizvod > 0;
}

crtajOmotac(kontekst: CanvasRenderingContext2D | null, omotac: { x: number; y: number }[]): void {
    if (!kontekst) {
        return;
    }

    kontekst.beginPath();
    kontekst.moveTo(omotac[0].x, omotac[0].y);

    for (let i = 1; i < omotac.length; i++) {
        kontekst.lineTo(omotac[i].x, omotac[i].y);
    }

    kontekst.closePath();
    kontekst.stroke();
}

crtajTacke(kontekst: CanvasRenderingContext2D): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    kontekst.clearRect(0, 0, canvasEl.width, canvasEl.height);
    kontekst.lineWidth = 1;

    this.tacke.forEach((tacka) => {
        kontekst.beginPath();
        kontekst.arc(tacka.x, tacka.y, 2, 0, 2 * Math.PI);
        kontekst.fill();
        kontekst.stroke();
    });
}

generisiTacke(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const kontekst = canvasEl.getContext('2d');
    const brojTacka = 100000;
    this.tacke = [];
    for (let i = 0; i < brojTacka; i++) {
        const x = Math.floor(Math.random() * canvasEl.width);
        const y = Math.floor(Math.random() * canvasEl.height);
        this.tacke.push({ x, y });
    }
    if (kontekst) {
        this.crtajTacke(kontekst);
    }
}

}
