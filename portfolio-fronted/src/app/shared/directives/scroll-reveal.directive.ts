import { Directive, ElementRef, Input, inject, NgZone, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnDestroy {
  private element = inject(ElementRef);
  private ngZone = inject(NgZone);

  @Input() revealClass: string = 'revealed';
  @Input() threshold: number = 0.15;
  @Input() rootMargin: string = '0px 0px -50px 0px';

  private observer: IntersectionObserver | null = null;

  constructor() {
    this.initObserver();
  }

  private initObserver(): void {
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.ngZone.run(() => {
                this.element.nativeElement.classList.add(this.revealClass);
              });
              // Unobserve after first trigger to avoid re-animation
              this.observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: this.threshold,
          rootMargin: this.rootMargin
        }
      );

      this.observer.observe(this.element.nativeElement);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}