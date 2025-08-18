import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Select2Module } from 'ng-select2-component';

import { taskImportance, tasks, taskStatus, teamMembers } from '../../../../shared/data/tasks';
import { TaskService } from '../../../../shared/services/task.service';

@Component({
  selector: 'app-add-task-modal',
  imports: [CommonModule, ReactiveFormsModule, NgbDatepickerModule, Select2Module],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss'
})

export class AddTaskModalComponent {

  public teamMembers = teamMembers;
  public taskStatus = taskStatus;
  public taskImportance = taskImportance;
  public tasks = tasks;

  public taskForm = new FormGroup({
    taskName: new FormControl('', [Validators.required]),
    taskDetails: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
    assignTo: new FormControl([], [Validators.required]),
    status: new FormControl('', [Validators.required]),
    importance: new FormControl('', [Validators.required]),
  })

  constructor(private modal: NgbActiveModal, private taskService: TaskService) {}

  addTask() {
    this.taskForm.markAllAsTouched();

    if(this.taskForm.valid) {
      const newTask = {
        id: Math.floor(Math.random() * 999) + 1,
        task_name: this.taskForm.value.taskName ? this.taskForm.value.taskName : '',
        task_details: this.taskForm.value.taskDetails ? this.taskForm.value.taskDetails : '',
        status: this.taskForm.value.status ? this.taskForm.value.status : '',
        importance: this.taskForm.value.importance ? this.taskForm.value.importance : '',
        due_date: this.handleDueDate(this.taskForm.value.dueDate) ? this.handleDueDate(this.taskForm.value.dueDate) : '',
        assign_to: this.handleMember(this.taskForm.value.assignTo) ? this.handleMember(this.taskForm.value.assignTo) : []
      }

      this.taskService.tasks.push(newTask);

      this.taskService.tableConfig = {...this.taskService.tableConfig, data: this.taskService.formatTask(this.taskService.tasks)}
      this.closeModal();
      this.taskForm.reset();
    }
  }

  handleDueDate(date: any) {
    if(date) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
      const day = date.day.toString().padStart(2, '0');
      const month = months[date.month - 1];
      const year = date.year;

      return `${day} ${month}, ${year}`;
    } else {
      return ''
    }
  }

  handleMember(members: any) {
    if(members) {
      const member =  members.map((member: string) => {
        return { 'name': member }
      })
      return member
    }
  }

  closeModal() {
    this.modal.close();
  }
  
}
