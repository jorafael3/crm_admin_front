import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-default-demo',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './default-demo.component.html',
  styleUrl: './default-demo.component.scss'
})

export class DefaultDemoComponent {

  public columns = [
    {
      title: 'In Review',
      tasks: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
    },
    {
      title: 'Pending',
      tasks: ['Task 5', 'Task 6', 'Task 7'],
    },
    {
      title: 'In Progress',
      tasks: ['Task 8', 'Task 9'],
    },
    {
      title: 'Completed',
      tasks: ['Task 10'],
    },
  ];

  public createBoardForm: FormGroup;
  public createCardForm: FormGroup;
  public draggedTaskIndex: number | null = null;
  public draggedTaskColumn: any = null;

  constructor(private fb: FormBuilder) {
    // Initialize forms
    this.createBoardForm = this.fb.group({
      boardTitle: ['', Validators.required],
    });

    this.createCardForm = this.fb.group({
      cardText: ['', Validators.required],
      columnIndex: [null, Validators.required],
    });
  }

  // Create a new board (column)
  createBoard() {
    if (this.createBoardForm.valid) {
      const boardTitle = this.createBoardForm.value.boardTitle.trim();
      this.columns.push({ title: boardTitle, tasks: [] });
      this.createBoardForm.reset(); // Reset the form
    }
  }

  // Add a new card (task) to the selected column
  addCard() {
    if (this.createCardForm.valid) {
      const { cardText, columnIndex } = this.createCardForm.value;
      this.columns[columnIndex].tasks.push(cardText.trim());
      this.createCardForm.reset(); // Reset the form
    }
  }

  onDragStart(event: DragEvent, task: string, column: any, index: number) {
    this.draggedTaskIndex = index;
    this.draggedTaskColumn = column;
    event.dataTransfer?.setData('text/plain', JSON.stringify({ task }));
  }

  // Allow drop by preventing default behavior
  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  // **Move task between columns**
  onDrop(event: DragEvent, targetColumn: any) {
    event.preventDefault();
    const draggedData = JSON.parse(event.dataTransfer?.getData('text/plain') || '{}');

    if (!this.draggedTaskColumn || this.draggedTaskColumn === targetColumn) return;

    this.draggedTaskColumn.tasks.splice(this.draggedTaskIndex, 1);

    targetColumn.tasks.push(draggedData.task);

    this.draggedTaskIndex = null;
    this.draggedTaskColumn = null;
  }

  // **Reorder tasks inside the same column**
  onDropInsideColumn(event: DragEvent, column: any, dropIndex: number) {
    event.preventDefault();
    
    if (this.draggedTaskColumn !== column || this.draggedTaskIndex === null) return;

    const movedTask = column.tasks[this.draggedTaskIndex];
    column.tasks.splice(this.draggedTaskIndex, 1);
    column.tasks.splice(dropIndex, 0, movedTask); 

    this.draggedTaskIndex = null;
    this.draggedTaskColumn = null;
  }

}
