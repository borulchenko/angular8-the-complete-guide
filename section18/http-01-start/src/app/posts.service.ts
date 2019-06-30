import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content};

    this.http
      .post<{ [key: string]: Post }>(
        'https://ng-complete-guide-d5f2a.firebaseio.com/posts.json',
        postData)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchPosts() {
    this.http
      .get<{ [key: string]: Post }>('https://ng-complete-guide-d5f2a.firebaseio.com/posts.json')
      .pipe(map(response => {
        const postsArray = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postsArray.push({...response[key], id: key});
          }
        }
        return postsArray;
      }))
      .subscribe(posts => {
      });
  }
}
