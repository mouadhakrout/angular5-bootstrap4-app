import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../models/User";
import {environment} from "../../environments/environment";


@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(environment.users);
  }
  getById(id: number) {
    return this.http.get('/api/users/' + id);
  }

  create(user: User) {
    return this.http.post(environment.user, user);
  }

  update(user: User) {
    return this.http.put(environment.user , user);
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id);
  }
}
