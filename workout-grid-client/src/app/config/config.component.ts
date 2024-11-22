import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'config',
  imports: [CommonModule, FormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  buttons = Array.from({ length: 12 }, (_, index) => ({
    label: `Button ${index + 1}`
  }));

  saved = false;

  constructor() {
    this.loadButtonLabels();
  }

  loadButtonLabels(): void {
    const savedLabels = localStorage.getItem('buttonLabels');
    if (savedLabels) {
      const parsedLabels = JSON.parse(savedLabels);
      this.buttons.forEach((button, index) => {
        if (parsedLabels[index]) {
          button.label = parsedLabels[index].label;
        }
      });
    }
  }

  saveConfig(): void {
    localStorage.setItem('buttonLabels', JSON.stringify(this.buttons));
    this.saved = true;
    setTimeout(() => {
      this.saved = false;
    }, 2000);
  }
}
