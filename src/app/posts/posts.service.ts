import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PostIndex {
  postIndexList: any;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient) { }

  getPosts(): Observable<PostIndex> {
    let url = "https://jsonplaceholder.typicode.com/posts"
    return this.http.get<PostIndex>(url);
  }
}
