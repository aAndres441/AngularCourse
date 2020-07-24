import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable(
    {providedIn: 'root'
})

export class UserServiceSubject {

eveActivatedEmitter = new EventEmitter<boolean>();

subjActivatedSubject = new  Subject<boolean>();
subjecFenix = new Subject<User>();

}
