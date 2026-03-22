import { Component, inject, AfterViewInit, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition, query, stagger, animateChild } from '@angular/animations';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import * as THREE from 'three';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ContactComponent } from '../contact/contact.component';

// Define a type for the userData object
interface MeshUserData {
  speed: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, AboutComponent, SkillsComponent, ExperienceComponent, ProjectsComponent, ContactComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('heroEnter', [
      transition(':enter', [
        query('.hero-content > *', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('600ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  developer = environment.developer;
  private router = inject(Router);
  
  @ViewChild('threeCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroContent') heroContent!: ElementRef<HTMLDivElement>;
  @ViewChild('heroActions') heroActions!: ElementRef<HTMLDivElement>;
  
  showScrollIndicator = true;
  private scrollThreshold = 300; // Hide scroll indicator after scrolling 300px
  private isScrolling = false;
  private scrollTimeout: any;
  
  // Parallax effect properties
  private parallaxSpeed = 0.3; // 3D particles move at 0.3x scroll speed
  private textParallaxSpeed = 1.0; // Text moves at 1x scroll speed
  private maxParallaxOffset = 100; // Maximum parallax offset in pixels
  
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationFrameId!: number;
  private meshes: THREE.Mesh[] = [];
  private particles!: THREE.Points;
  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;
  
  // Typewriter effect
  typewriterText = '';
  typewriterIndex = 0;
  typewriterSpeed = 50;
  typewriterComplete = false;
  typewriterInterval: ReturnType<typeof setTimeout> | null = null;
  
  // Typewriter phrases
  phrases = [
    'Full Stack Software Engineer',
    'Angular & .NET Developer',
    'Building Scalable Systems',
    'Creating Amazing Experiences'
  ];
  currentPhraseIndex = 0;
  currentPhrase = '';
  isDeleting = false;
  
  ngAfterViewInit(): void {
    this.initThreeJS();
    this.startTypewriter();
    this.animate();
  }
  
  ngOnDestroy(): void {
    this.cleanupThreeJS();
    this.cleanupTypewriter();
  }
  
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    // Normalize mouse position to -1 to 1
    this.targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  
  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
  
  private initThreeJS(): void {
    const canvas = this.canvasRef.nativeElement;
    
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00d4ff, 1, 100);
    pointLight.position.set(10, 10, 10);
    this.scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0x7c3aed, 1, 100);
    pointLight2.position.set(-10, -10, 10);
    this.scene.add(pointLight2);
    
    // Create 3D meshes
    this.createMeshes();
    
    // Create particle field
    this.createParticles();
  }
  
  private createMeshes(): void {
    const group = new THREE.Group();
    
    // Icosahedron
    const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
    const icosahedronMaterial = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.set(0, 0, 0);
    icosahedron.userData = { speed: 0.1 } as MeshUserData;
    this.meshes.push(icosahedron);
    group.add(icosahedron);
    
    // Torus
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.1, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(0, 0, -50);
    torus.userData = { speed: 0.05 } as MeshUserData;
    this.meshes.push(torus);
    group.add(torus);
    
    // Octahedron
    const octahedronGeometry = new THREE.OctahedronGeometry(0.8, 0);
    const octahedronMaterial = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(2, 1, -100);
    octahedron.userData = { speed: 0.02 } as MeshUserData;
    this.meshes.push(octahedron);
    group.add(octahedron);
    
    // Second Octahedron
    const octahedron2 = new THREE.Mesh(octahedronGeometry, octahedronMaterial.clone());
    octahedron2.position.set(-2, -1, -100);
    octahedron2.userData = { speed: 0.02 } as MeshUserData;
    this.meshes.push(octahedron2);
    group.add(octahedron2);
    
    this.scene.add(group);
  }
  
  private createParticles(): void {
    const particleCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      
      // Random colors between blue and violet
      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }
  
  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());
    
    // Smooth mouse interpolation
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
    
    // Animate meshes
    this.meshes.forEach((mesh) => {
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.005;
      
      // Parallax effect based on mouse position
      const userData = mesh.userData as MeshUserData;
      const speed = userData?.speed ?? 0.1;
      mesh.position.x += (this.mouseX * 2 - mesh.position.x) * speed;
      mesh.position.y += (this.mouseY * 2 - mesh.position.y) * speed;
    });
    
    // Animate particles
    if (this.particles) {
      this.particles.rotation.x += 0.0005;
      this.particles.rotation.y += 0.0005;
    }
    
    this.renderer.render(this.scene, this.camera);
  }
  
  private startTypewriter(): void {
    this.currentPhrase = this.phrases[this.currentPhraseIndex];
    this.type();
  }
  
  private type(): void {
    if (this.isDeleting) {
      this.typewriterText = this.currentPhrase.substring(0, this.typewriterIndex - 1);
      this.typewriterIndex--;
      
      if (this.typewriterIndex === 0) {
        this.isDeleting = false;
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
        this.currentPhrase = this.phrases[this.currentPhraseIndex];
        this.typewriterInterval = setTimeout(() => this.type(), 500);
      } else {
        this.typewriterInterval = setTimeout(() => this.type(), this.typewriterSpeed / 2);
      }
    } else {
      this.typewriterText = this.currentPhrase.substring(0, this.typewriterIndex + 1);
      this.typewriterIndex++;
      
      if (this.typewriterIndex === this.currentPhrase.length) {
        this.isDeleting = true;
        this.typewriterInterval = setTimeout(() => this.type(), 2000);
      } else {
        this.typewriterInterval = setTimeout(() => this.type(), this.typewriterSpeed);
      }
    }
  }
  
  private cleanupThreeJS(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    this.meshes.forEach((mesh) => {
      mesh.geometry.dispose();
      if (mesh.material instanceof THREE.Material) {
        mesh.material.dispose();
      }
    });
    
    if (this.particles) {
      this.particles.geometry.dispose();
      if (this.particles.material instanceof THREE.Material) {
        this.particles.material.dispose();
      }
    }
    
    this.scene.clear();
  }
  
  private cleanupTypewriter(): void {
    if (this.typewriterInterval) {
      clearTimeout(this.typewriterInterval);
      this.typewriterInterval = null;
    }
  }
  
  scrollToProjects(): void {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/projects']);
    }
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Clear previous timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    
    // Set scrolling flag
    this.isScrolling = true;
    
    // Clear scrolling flag after scroll stops
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 100);
    
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // Hide scroll indicator when scrolled past threshold
    this.showScrollIndicator = scrollPosition < this.scrollThreshold;
    
    // Apply parallax effects
    this.applyParallaxEffects(scrollPosition);
    
    // Apply fade-out effects
    this.applyFadeOutEffects(scrollPosition);
  }
  
  private applyParallaxEffects(scrollPosition: number): void {
    // Calculate parallax offset for 3D particles (0.3x speed)
    const particleOffset = Math.min(scrollPosition * this.parallaxSpeed, this.maxParallaxOffset);
    
    // Calculate parallax offset for text (1x speed)
    const textOffset = Math.min(scrollPosition * this.textParallaxSpeed, this.maxParallaxOffset);
    
    // Apply parallax to 3D canvas
    if (this.canvasRef) {
      this.canvasRef.nativeElement.style.transform = `translateY(${particleOffset}px)`;
    }
    
    // Apply parallax to hero content
    if (this.heroContent) {
      this.heroContent.nativeElement.style.transform = `translateY(${textOffset}px)`;
    }
  }
  
  private applyFadeOutEffects(scrollPosition: number): void {
    // Calculate fade progress (0 to 1) based on scroll position
    const fadeProgress = Math.min(scrollPosition / 300, 1);
    
    // Calculate opacity (1 to 0)
    const opacity = 1 - fadeProgress;
    
    // Calculate translate Y (0 to 60px)
    const translateY = fadeProgress * 60;
    
    // Apply fade-out to hero content
    if (this.heroContent) {
      this.heroContent.nativeElement.style.opacity = opacity.toString();
      this.heroContent.nativeElement.style.transform = `translateY(${translateY}px)`;
    }
    
    // Apply shrink effect to CTA buttons
    if (this.heroActions) {
      const scale = 1 - (fadeProgress * 0.5); // Scale from 1 to 0.5
      this.heroActions.nativeElement.style.transform = `scale(${scale})`;
      this.heroActions.nativeElement.style.opacity = opacity.toString();
    }
  }
}