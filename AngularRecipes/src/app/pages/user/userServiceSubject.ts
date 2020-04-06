import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable(
    {providedIn: 'root'
})

export class UserServiceSubject {

eveActivatedEmitter = new EventEmitter<boolean>();

subjActivatedSubject = new  Subject<boolean>();

}