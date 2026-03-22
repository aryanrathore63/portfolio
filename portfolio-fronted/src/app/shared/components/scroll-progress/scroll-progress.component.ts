import { Component, HostListener, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-scroll-progress",
  standalone: true,  imports: [CommonModule],  templateUrl: "./scroll-progress.component.html",  styleUrls: ["./scroll-progress.component.scss"]})

export class ScrollProgressComponent implements OnInit {
  scrollPercentage: number = 0;
