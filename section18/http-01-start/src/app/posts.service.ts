import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
  error = new Subject<string>();
  postsChanged = new Subject<void>();
  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content};

    this.http
      .post<{ [key: string]: Post }>(
        'https://ng-complete-guide-d5f2a.firebaseio.com/posts.json',
        postData)
      .subscribe(() => {
        this.postsChanged.next();
      }, error => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    const searchParams = this.createQueryParams();

    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-d5f2a.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Custom-Header': 'Hello'}),
          params: searchParams
        }
      )
      .pipe(
        map(response => {
          const postsArray = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              postsArray.push({...response[key], id: key});
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          // send to analytics/other generic error tasks
          return throwError(errorRes);
        }));
  }

  private createQueryParams() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return searchParams;
  }

  deletePosts() {
    return this.http.delete('https://ng-complete-guide-d5f2a.firebaseio.com/posts.json');
  }
}
