import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective {
  @Input() tiltIntensity: number = 20;
  @Input() tiltPerspective: number = 1000;

  private isHovering = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter') onMouseEnter(): void {
    this.isHovering = true;
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.1s ease-out');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.isHovering = false;
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'perspective(' + this.tiltPerspective + 'px) rotateX(0deg) rotateY(0deg)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease-out');
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent): void {
    if (!this.isHovering) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -this.tiltIntensity;
    const rotateY = ((x - centerX) / centerX) * this.tiltIntensity;

    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `perspective(${this.tiltPerspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    );
  }
}