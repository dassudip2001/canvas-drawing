import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss',
})
export class CanvasComponent {
  @ViewChild('drawingCanvas', { static: true })
  drawingCanvas!: ElementRef<HTMLCanvasElement>;

  selectedTool: 'brush' | 'eraser' = 'brush';
  selectedColor: string = '#000000';
  brushSize: number = 5;

  colors: string[] = ['#000000', '#ff0000', '#00ff00', '#0000ff']; // Example colors

  isDrawing: boolean = false;

  constructor() {}

  selectTool(tool: 'brush' | 'eraser'): void {
    this.selectedTool = tool;
  }

  // Set the selected color
  onMouseDown(event: MouseEvent): void {
    this.isDrawing = true;
    this.draw(event);
  }

  //  Draw on the canvas when mouse is moving
  onMouseMove(event: MouseEvent): void {
    if (this.isDrawing) {
      this.draw(event);
    }
  }

  // Stop drawing when mouse is up
  onMouseUp(event: MouseEvent): void {
    this.isDrawing = false;
  }

  // Draw on the canvas
  draw(event: MouseEvent): void {
    const ctx = this.drawingCanvas.nativeElement.getContext('2d');

    // Check if ctx is not null
    if (!ctx) {
      console.error('Canvas context is null');
      return;
    }

    const rect = this.drawingCanvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (this.selectedTool === 'eraser') {
      ctx.strokeStyle = '#ffffff'; // White color for eraser
    } else {
      ctx.strokeStyle = this.selectedColor;
    }
    ctx.lineWidth = this.brushSize;
    ctx.lineCap = 'round';

    if (event.type === 'mousedown') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (event.type === 'mousemove') {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  // clear the canvas
  clearCanvas(): void {
    const ctx = this.drawingCanvas.nativeElement.getContext('2d');

    // Check if ctx is not null
    if (!ctx) {
      console.error('Canvas context is null');
      return;
    }

    ctx.clearRect(
      0,
      0,
      this.drawingCanvas.nativeElement.width,
      this.drawingCanvas.nativeElement.height
    );
  }

  // save the canvas as image
  saveDowingImage(): void {
    console.log('Save image');

    const ctx = this.drawingCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context is null');
      return;
    }
    const link = document.createElement('a');
    link.download = `${Date.now()}.jpg`;
    link.href = this.drawingCanvas.nativeElement.toDataURL();
    link.click();
  }
}
