import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-active-post',
  templateUrl: './active-post.component.html',
  styleUrls: ['./active-post.component.css']
})
export class ActivePostComponent implements OnInit {

  loadedPosts = [];

  constructor(private http: HttpClient ,
              private firestore: AngularFirestore
              ) { }

  ngOnInit() {
    //this.fetchPosts();

    console.log('Fier ' + this.firestore);
  }
  
  onCreatePost(postData: { title: string; content: string }) {
    console.log(postData);
    // Send Http request
    this.http.post('https://angularcourse-bc12b.firebaseio.com/.mypPosts.json', postData)
    .subscribe(responde => {
      console.log(responde);
    });
  }

   // nueva solicitud obtener envios
  private onFetchPosts() {

    // Send Http request
    this.fetchPosts();
  }

  
  onClearPosts() {
    // Send Http request
  }

  fetchPosts() {
    this.http.get('https://angularcourse-bc12b.firebaseio.com/.mypPosts.json')
    .subscribe(posts => {
      console.log(posts);
    });
  }



}
