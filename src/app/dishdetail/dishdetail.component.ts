import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import 'rxjs/add/operator/switchMap';
// import { trigger, state, style, animate, transition } from '@angular/animations';
import { visibility } from '../animations/app.animation';
import { flyInOut } from '../animations/app.animation';
import { expand } from '../animations/app.animation';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],

  // animations: [
  //   trigger('visibility', [
  //     state('shown', style({
  //       transform: 'scale(1.0)',
  //       opacity: 1
  //     })),
  //     state('hidden', style({
  //       transform: 'scale(0.5)',
  //       opacity: 0
  //     })),
  //     transition('* => *', animate('0.5s ease-in-out'))
  //   ])
  // ]
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})

export class DishdetailComponent implements OnInit {

  commentForm: FormGroup
  dish: Dish;
  comment: Comment
  dishIds: number[];
  prev: number;
  next: number;

  errMess: string


  formErrors = {
    'author': '',
    'comment': ''
  };

  validationcomments = {
    'author': {
      'required': 'Author Name is required.',
      'minlength': 'Author Name must be at least 2 characters long.',
    },
    'comment': {
      'required': 'Comment is required.'
    }
  };

  dishcopy = null;

  visibility = 'shown';

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
    this.createForm();
  }

  ngOnInit() {

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds, errmess => this.errMess = <any>errmess);
    this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => { this.dish = null; this.errMess = <any>errmess; });
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: '5',
      comment: ['', [Validators.required]]
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation comments now
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = String(Date.now());
    this.dish.comments.push(this.comment);
    console.log(this.comment);
    this.commentForm.reset({
      firstname: '',
      rating: '5',
      comment: ''
    });

    this.dishcopy.comments.push(this.comment);
    this.dishcopy.save()
      .subscribe(dish => { this.dish = dish; console.log(this.dish); });

  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error comment (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const comments = this.validationcomments[field];
        for (const key in control.errors) {
          this.formErrors[field] += comments[key] + ' ';
        }
      }
    }
  }

}
