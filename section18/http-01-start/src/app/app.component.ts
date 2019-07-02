import { Post } from './post.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post [] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;
  private postsChangedSub: Subscription;

  constructor(private http: HttpClient,
              private postService: PostsService) {
  }

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe((error: string) => {
      this.error = error;
    });
    this.postsChangedSub = this.postService.postsChanged.subscribe(() => {
      this.fetchPosts();
    });
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts()
      .subscribe(() => {
        this.loadedPosts = [];
      });
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts()
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.error = error.message;
      });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
    this.postsChangedSub.unsubscribe();
  }
}
