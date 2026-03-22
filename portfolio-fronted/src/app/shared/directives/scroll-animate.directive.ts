import {
  Directive,
  ElementRef,
  Input,
  inject,
  NgZone,
  OnInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';

export type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'flip-x'
  | 'flip-y'
  | 'zoom-in'
  | 'zoom-out'
  | 'rotate-in'
  | 'slide-3d-left'
  | 'slide-3d-right'
  | 'slide-3d-up'
  | 'tilt-reveal'
  | 'swing-in';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private ngZone = inject(NgZone);
  private renderer = inject(Renderer2);

  @Input('appScrollAnimate') animationType: AnimationType = 'fade-up';
  @Input() animDelay: number = 0;       // ms delay before animation starts
  @Input() animDuration: number = 700;  // total animation duration in ms
  @Input() animThreshold: number = 0.12; // IntersectionObserver threshold

  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.setInitialState();
    this.initObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  // ── Set the element to its "before-reveal" 3D state ────────────────────
  private setInitialState(): void {
    const el = this.el.nativeElement as HTMLElement;
    el.style.willChange = 'transform, opacity';
    el.style.opacity = '0';

    switch (this.animationType) {
      case 'fade-up':
        el.style.transform = 'perspective(800px) translateY(60px) translateZ(-40px)';
        break;
      case 'fade-down':
        el.style.transform = 'perspective(800px) translateY(-60px) translateZ(-40px)';
        break;
      case 'fade-left':
        el.style.transform = 'perspective(800px) translateX(-80px) translateZ(-40px)';
        break;
      case 'fade-right':
        el.style.transform = 'perspective(800px) translateX(80px) translateZ(-40px)';
        break;
      case 'flip-x':
        el.style.transform = 'perspective(1000px) rotateX(-90deg)';
        el.style.transformOrigin = 'top center';
        break;
      case 'flip-y':
        el.style.transform = 'perspective(1000px) rotateY(90deg)';
        el.style.transformOrigin = 'center center';
        break;
      case 'zoom-in':
        el.style.transform = 'perspective(800px) scale(0.6) translateZ(-100px)';
        break;
      case 'zoom-out':
        el.style.transform = 'perspective(800px) scale(1.3) translateZ(60px)';
        break;
      case 'rotate-in':
        el.style.transform = 'perspective(1000px) rotateY(-60deg) translateX(-40px)';
        el.style.transformOrigin = 'left center';
        break;
      case 'slide-3d-left':
        el.style.transform = 'perspective(1200px) rotateY(35deg) translateX(-100px) translateZ(-60px)';
        el.style.transformOrigin = 'left center';
        break;
      case 'slide-3d-right':
        el.style.transform = 'perspective(1200px) rotateY(-35deg) translateX(100px) translateZ(-60px)';
        el.style.transformOrigin = 'right center';
        break;
      case 'slide-3d-up':
        el.style.transform = 'perspective(1200px) rotateX(40deg) translateY(80px) translateZ(-60px)';
        el.style.transformOrigin = 'bottom center';
        break;
      case 'tilt-reveal':
        el.style.transform = 'perspective(1000px) rotateX(25deg) rotateY(-15deg) translateZ(-50px) scale(0.9)';
        break;
      case 'swing-in':
        el.style.transform = 'perspective(1000px) rotateX(-80deg) translateY(-40px)';
        el.style.transformOrigin = 'top center';
        break;
    }
  }

  // ── Reveal: transition back to identity ────────────────────────────────
  private reveal(): void {
    const el = this.el.nativeElement as HTMLElement;
    const ease = 'cubic-bezier(0.23, 1, 0.32, 1)';

    setTimeout(() => {
      this.ngZone.run(() => {
        el.style.transition =
          `transform ${this.animDuration}ms ${ease}, opacity ${this.animDuration}ms ease`;
        el.style.opacity = '1';
        el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateX(0) translateY(0) translateZ(0) scale(1)';
        el.style.willChange = 'auto';
      });
    }, this.animDelay);
  }

  private initObserver(): void {
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.reveal();
              this.observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: this.animThreshold,
          rootMargin: '0px 0px -40px 0px',
        }
      );
      this.observer.observe(this.el.nativeElement);
    });
  }
}
