import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(postId: string) {
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string }>(
      'http://localhost:3000/api/posts/' + postId
    );
  }

  addPost(title: string, content: string, image: File) {
    // const post: Post = { id: null, title: title, content: content };
    const postData = new FormData(); // combine text and blob
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe((resData) => {
        const post: Post = {id: resData.post.id, title: title, content: content, imagePath: resData.post.imagePath}
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"])
      });
  }

  updatePost(postId: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof(image === 'object')) {
      postData = new FormData();
      postData.append("id", postId);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = { id: postId, title: title, content: content, imagePath: image as string};
    }

    this.http
      .put('http://localhost:3000/api/posts/' + postId, postData)
      .subscribe((resData) => {
        // const updatedPosts = [...this.posts];
        // const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        // updatedPosts[oldPostIndex] = post;
        // this.posts = updatedPosts;
        const oldPostIndex = this.posts.findIndex((p) => p.id === postId);
        const post: Post = { id: postId, title: title, content: content, imagePath: ""}; // local image path is being set to empty here, this is something we didn't come back to.
        this.posts[oldPostIndex] = post;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"])
      });
  }

  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((p) => p.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
