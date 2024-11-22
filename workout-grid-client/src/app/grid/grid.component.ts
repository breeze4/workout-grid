import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import DATA from '../../data.json';

type GridButton = {
  label: string
  completed: boolean
  confirmUncomplete: boolean
}

@Component({
  selector: 'grid',
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  buttons: GridButton[] = Array.from({ length: 12 }, (_, index) => ({
    label: `Button ${index + 1}`,
    completed: false,
    confirmUncomplete: false,
  }));

  gridComplete = false
  resetComplete = false

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
    } else {
      const defaultLabels = DATA;
      this.buttons.forEach((button, index) => {
        if (defaultLabels[index]) {
          button.label = defaultLabels[index].label;
        }
      });
      localStorage.setItem('buttonLabels', JSON.stringify(this.buttons));

    }
  }

  toggleComplete(button: GridButton): void {
    if (button.completed && !button.confirmUncomplete) {
      // First tap: prompt to confirm uncomplete
      button.confirmUncomplete = true;
    } else if (button.completed && button.confirmUncomplete) {
      // Second tap: actually uncomplete
      button.completed = false;
      button.confirmUncomplete = false;
    } else {
      // Complete the button normally
      button.completed = true;
      button.confirmUncomplete = false;
      if (this.checkForGridCompleteness()) {
        console.log('buttons all complete')
        this.gridComplete = true

      }
    }
  }

  getButtonClasses(button: GridButton): string {
    if (button.completed && !button.confirmUncomplete) {
      return 'bg-blue-200 text-gray-500';
    } else if (button.completed && button.confirmUncomplete) {
      return 'border-4 border-green-500 bg-blue-200 text-black';
    } else {
      return 'bg-blue-500 text-white border-2 border-yellow-200';
    }
  }

  checkForGridCompleteness(): boolean {
    return this.buttons.every((button => button.completed))
  }

  resetGrid(): void {
    this.buttons.forEach((button) => button.completed = false)
    this.resetComplete = true;
    setTimeout(() => {
      this.resetComplete = false;
    }, 2000);
  }
}
