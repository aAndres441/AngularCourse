import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-active-post',
  templateUrl: './active-post.component.html',
  styleUrls: ['./active-post.component.css']
})
export class ActivePostComponent implements OnInit {

  loadedPosts = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  
  onCreatePost(postData: { title: string; content: string }) {
    console.log(postData);
    // Send Http request
    this.http.post('https://angularcourse-bc12b.firebaseio.com/.pposts.json', postData);
    
    
    /* this.http
      .post(
        'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      }); */
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
