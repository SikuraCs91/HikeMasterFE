import {Injectable} from '@angular/core';
import {User, UserLogin} from '../interfaces/user';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UsersResponse} from '../interfaces/users-response';
import {AdminUserResponse} from '../interfaces/admin-user-response';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: UserLogin;

  userChange: BehaviorSubject<UserLogin> = new BehaviorSubject<UserLogin>({userName: null, password: ''});

  constructor(private http: HttpClient) {
    this.userChange.subscribe((user) => {
      this.user = user;
      if (user && user.userName && user.userName.length > 0) {
        localStorage.setItem(USER_KEY, JSON.stringify({
          userName: user.userName,
          password: '****'
        }));
      }
    });

    if (localStorage.getItem(USER_KEY)) {
      this.setUser(JSON.parse(localStorage.getItem(USER_KEY)));
    }
  }

  login(user: UserLogin): Observable<any> {
    const formData = new FormData();
    formData.append('username', user.userName);
    formData.append('password', user.password);
    return this.http.post(environment.apiEndpoint + '/login', formData, {withCredentials: true});
    // return new Observable<any>(observer => {
    //   if (user.userName.length > 0) {
    //     observer.next({
    //       message: 'login successful'
    //     });
    //     console.log(this.user);
    //   } else {
    //     observer.error({
    //       message: 'login failed'
    //     });
    //   }
    // });
  }

  deleteUser(userName: string): Observable<User[]> {
    return this.http.delete<UsersResponse>(
      `${environment.apiEndpoint}?id=${userName}`,
      {withCredentials: true}
    ).pipe(map(uResp => uResp.user));
  }


  putUser(user: User): Observable<User[]> {
    return this.http.put<UsersResponse>(
      `${environment.apiEndpoint}?id=${user.id}`,
      {student: user},
      {withCredentials: true}
    ).pipe(map(uResp => uResp.user));
  }

  setUser(user: UserLogin): void {
    this.userChange.next(user);
  }

  register(user: User): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/registration', {
      username: user.userName,
      email: user.email,
      password: user.password,
      passwordConfirm: user.password,
      fullName: user.fullName
    });
  }

  logout(): void {
    this.userChange.next({userName: null, password: ''});
    localStorage.removeItem(USER_KEY);
  }

  adminUser(): Observable<string> {
    console.log('1');
    return this.http.get<string>(
      `${environment.apiEndpoint}/user_role`,
      {withCredentials: true}
    );
  }
  /*adminUser(user: User): Observable<User[]> {
    return this.http.get<UsersResponse>(
      `${environment.apiEndpoint}/user_role`,
      {withCredentials: true}
    ).pipe(map(uResp => uResp.user));
  }*/

}
