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

  saveConfig(): void {
    localStorage.setItem('buttonLabels', JSON.stringify(this.buttons));
  }
}
