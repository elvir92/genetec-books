import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { StarRatingComponent } from '@shared/components/star-rating/star-rating.component';
import { IBook } from '@core/models/book.model';

@Component({
  selector: 'app-book-edit-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, StarRatingComponent],
  templateUrl: './book-edit-modal.component.html',
  styleUrls: ['./book-edit-modal.component.scss'],
})
export class BookEditModalComponent implements OnInit {
  @Input() book!: IBook;
  @Output() save = new EventEmitter<IBook>();
  @Output() close = new EventEmitter<void>();

  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.bookForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      year: [
        null,
        [Validators.required, Validators.min(1000), Validators.max(9999)],
      ],
      genre: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      coverUrl: ['', [Validators.required]],
      rating: [0],
    });
  }

  ngOnInit(): void {
    this.bookForm.reset(this.book);
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.save.emit(this.bookForm.value);
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.bookForm.controls).forEach((field) => {
        const control = this.bookForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onRatingChange(rating: number): void {
    this.bookForm.patchValue({ rating });
  }
}
