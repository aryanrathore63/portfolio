import { Directive, ElementRef, HostListener, Renderer2, inject, Input, NgZone, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appFloatingEmojis]',
  standalone: true
})
export class FloatingEmojisDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private ngZone = inject(NgZone);

  // You can pass custom emojis, otherwise defaults to these tech/dev emojis
  @Input() emojis: string[] = ['💻', '🚀', '☕', '🔥', '💡', '👨‍💻', '✨', '⚡️'];
  @Input() autoSpawn: boolean = false;

  private spawnInterval: any;
  private autoSpawnInterval: any;
  private isHovering = false;

  ngOnInit() {
    if (this.autoSpawn) {
      // Ensure parent is relative
      const parent = this.el.nativeElement;
      if (getComputedStyle(parent).position === 'static') {
        this.renderer.setStyle(parent, 'position', 'relative');
      }

      this.ngZone.runOutsideAngular(() => {
        // Continuous spawn
        this.autoSpawnInterval = setInterval(() => {
          this.spawnEmoji();
        }, 400);
      });
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.autoSpawn) return; // Don't trigger hover bursts if auto-spawning continuously

    this.isHovering = true;

    // Ensure parent is positioned relative so absolute emojis spawn from it
    const parent = this.el.nativeElement;
    if (getComputedStyle(parent).position === 'static') {
      this.renderer.setStyle(parent, 'position', 'relative');
    }

    // Spawn immediately on hover
    this.spawnEmojiBurst(3);

    // Spawn periodically while hovering
    this.ngZone.runOutsideAngular(() => {
      this.spawnInterval = setInterval(() => {
        if (this.isHovering) {
          this.spawnEmoji();
        }
      }, 150); // spawn one every 150ms
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.autoSpawn) return;
    this.isHovering = false;
    if (this.spawnInterval) {
      clearInterval(this.spawnInterval);
    }
  }

  @HostListener('click')
  onClick() {
    // Spawn a burst of emojis on click
    this.spawnEmojiBurst(5);
  }

  ngOnDestroy() {
    if (this.spawnInterval) {
      clearInterval(this.spawnInterval);
    }
    if (this.autoSpawnInterval) {
      clearInterval(this.autoSpawnInterval);
    }
  }

  private spawnEmojiBurst(amount: number = 3) {
    for (let i = 0; i < amount; i++) {
      setTimeout(() => this.spawnEmoji(), i * 50);
    }
  }

  private spawnEmoji() {
    const parent = this.el.nativeElement;
    const emojiElement = this.renderer.createElement('div');
    const randomEmoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];

    const text = this.renderer.createText(randomEmoji);
    this.renderer.appendChild(emojiElement, text);

    // Initial styling
    this.renderer.setStyle(emojiElement, 'position', 'absolute');
    this.renderer.setStyle(emojiElement, 'font-size', `${Math.random() * 15 + 20}px`); // 20px to 35px
    this.renderer.setStyle(emojiElement, 'pointer-events', 'none');
    this.renderer.setStyle(emojiElement, 'z-index', '100');
    this.renderer.setStyle(emojiElement, 'user-select', 'none');

    // Initial placement at the center/bottom of the avatar/container
    const startX = 50 + (Math.random() * 20 - 10); // 40% to 60%
    const startY = 80 + (Math.random() * 20);      // 80% to 100%

    this.renderer.setStyle(emojiElement, 'left', `${startX}%`);
    this.renderer.setStyle(emojiElement, 'top', `${startY}%`);
    this.renderer.setStyle(emojiElement, 'opacity', '0');
    this.renderer.setStyle(emojiElement, 'transform', `translate(-50%, -50%) scale(0.1)`);
    this.renderer.setStyle(emojiElement, 'transition', 'all 1.5s cubic-bezier(0.25, 1.25, 0.4, 1)');

    this.renderer.appendChild(parent, emojiElement);

    // Animate next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const spreadX = (Math.random() * 160) - 80; // drift up to -80px to 80px left/right
        const endY = - (50 + Math.random() * 100);  // float up 50px to 150px outside container top

        this.renderer.setStyle(emojiElement, 'opacity', '1');
        this.renderer.setStyle(emojiElement, 'transform', `translate(calc(-50% + ${spreadX}px), ${endY}px) scale(${Math.random() * 0.5 + 0.8}) rotate(${Math.random() * 60 - 30}deg)`);

        // Setup fade out towards the end
        setTimeout(() => {
          this.renderer.setStyle(emojiElement, 'opacity', '0');
        }, 1000);
      });
    });

    // Cleanup emoji after animation completes
    setTimeout(() => {
      if (emojiElement.parentNode) {
        this.renderer.removeChild(parent, emojiElement);
      }
    }, 1500);
  }
}
