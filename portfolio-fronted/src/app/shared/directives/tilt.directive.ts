import { Directive, ElementRef, HostListener, Renderer2, NgZone, inject } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective {
  private element = inject(ElementRef);
  private renderer = inject(Renderer2);
  private ngZone = inject(NgZone);

  private isHovering = false;
  private animationFrameId: number | null = null;

  // Configuration
  private maxTilt = 15; // Maximum tilt angle in degrees
  private perspective = 1000; // Perspective depth in pixels
  private scale = 1.05; // Scale factor on hover
  private transitionDuration = 0.1; // Transition duration in seconds

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovering = true;
    this.renderer.setStyle(this.element.nativeElement, 'transition', `transform ${this.transitionDuration}s ease-out`);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovering = false;
    this.resetTilt();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isHovering) return;

    this.ngZone.runOutsideAngular(() => {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }

      this.animationFrameId = requestAnimationFrame(() => {
        this.applyTilt(event);
      });
    });
  }

  private applyTilt(event: MouseEvent): void {
    const rect = this.element.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate mouse position relative to center
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;

    // Calculate tilt angles (inverted for natural feel)
    const rotateY = (mouseX / (rect.width / 2)) * this.maxTilt;
    const rotateX = -(mouseY / (rect.height / 2)) * this.maxTilt;

    // Apply transform
    const transform = `
      perspective(${this.perspective}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${this.scale})
    `;

    this.renderer.setStyle(this.element.nativeElement, 'transform', transform);
  }

  private resetTilt(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }

      this.animationFrameId = requestAnimationFrame(() => {
        this.renderer.setStyle(this.element.nativeElement, 'transform', 'perspective(1000px) rotateX(0) rotateY(0) scale(1)');
      });
    });
  }
}