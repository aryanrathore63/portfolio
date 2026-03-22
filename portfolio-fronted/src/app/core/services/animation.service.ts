import { Injectable, inject, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export interface AnimationEvent {
  element: ElementRef;
  animationClass: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnimationService implements OnDestroy {
  private ngZone = inject(NgZone);
  private animationSubject = new Subject<AnimationEvent>();
  private observers: Map<ElementRef, IntersectionObserver> = new Map();

  animationEvents$ = this.animationSubject.asObservable();

  ngOnDestroy(): void {
    this.cleanupObservers();
    this.animationSubject.complete();
  }

  initScrollObserver(): void {
    // This method can be used to initialize global scroll observers
    // Individual observers are created per element
  }

  registerElement(element: ElementRef, animClass: string = 'revealed', threshold: number = 0.15): void {
    this.ngZone.runOutsideAngular(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.ngZone.run(() => {
                this.animationSubject.next({
                  element,
                  animationClass: animClass
                });
              });
              // Unobserve after first trigger to avoid re-animation
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      observer.observe(element.nativeElement);
      this.observers.set(element, observer);
    });
  }

  unregisterElement(element: ElementRef): void {
    const observer = this.observers.get(element);
    if (observer) {
      observer.disconnect();
      this.observers.delete(element);
    }
  }

  private cleanupObservers(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
  }

  // Counter animation utility
  animateCounter(
    element: ElementRef,
    targetValue: number,
    duration: number = 2000,
    prefix: string = '',
    suffix: string = ''
  ): void {
    this.ngZone.runOutsideAngular(() => {
      const startValue = 0;
      const startTime = performance.now();
      const elementNative = element.nativeElement;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuart)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
        
        elementNative.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    });
  }

  // Typewriter effect utility
  typewriterEffect(
    element: ElementRef,
    text: string,
    speed: number = 50,
    callback?: () => void
  ): void {
    this.ngZone.runOutsideAngular(() => {
      const elementNative = element.nativeElement;
      let index = 0;

      const type = () => {
        if (index < text.length) {
          elementNative.textContent += text.charAt(index);
          index++;
          setTimeout(type, speed);
        } else if (callback) {
          this.ngZone.run(callback);
        }
      };

      elementNative.textContent = '';
      type();
    });
  }
}