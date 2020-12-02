import {Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDisColor]'
})
export class DisColorDirective implements OnInit{
    @Input() appDisBackground: number;
    @Input() appDisOutline: number;
    @Input() appDisColor: number;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        if (typeof this.appDisBackground === 'number') {
            const color = this.discountColor(this.appDisBackground);
            this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
        }
        if (typeof this.appDisOutline  === 'number') {
            const color = this.discountColor(this.appDisOutline);
            this.renderer.setStyle(this.el.nativeElement, 'outline-color', color);
        }
        if (typeof this.appDisColor === 'number') {
            const color = this.discountColor(this.appDisColor);
            this.renderer.setStyle(this.el.nativeElement, 'color', color);
        }
     }

    discountColor(discount: number = 0): string {
        return discount > 69 ? 'red' : discount < 51 ? 'orange' : 'pink';
    }
}
