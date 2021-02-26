
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Post } from "../post.model";
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  isLoading = false;
  startSpinner = false
  public  post: Post
  private mode = 'create';
  private postId: string;

  constructor(public postsService: PostsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((ParamMap) => {
      if (ParamMap.has('postId')) {
        this.mode = 'edit';
        this.postId = ParamMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false
          this.post = {id: postData._id, title: postData.title, content: postData.content}
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }

    }); // observe changes in the url params, doesn't need to rerender entire component
  }

  onSavePost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(postForm.value.title, postForm.value.content);
    } else {
     this.postsService.updatePost(this.postId, postForm.value.title, postForm.value.content)
    }
      this.isLoading = true;
    // postForm.resetForm();
  }
}
