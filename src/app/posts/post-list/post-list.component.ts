import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts = [
    // {title: 'first post', content: 'first posts content'},
    // {title: 'second post', content: 'second posts content'},
    // {title: 'third post', content: 'third posts content'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
