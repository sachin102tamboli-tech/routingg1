import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { login } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL : string= environment.AUTH_BASE_URL
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken())
  token$ = this.tokenSubject.asObservable()
  constructor(
    private _http : HttpClient
  ) { }

  signUp(user : any) : Observable<any>{
    let signUpUrl = `${this.BASE_URL}/api/auth/register`
    return this._http.post(signUpUrl, user)
  }

  login(userCred :any) :Observable<login> {
    let loginUrl = `${this.BASE_URL}/api/auth/login`
    return this._http.post<login>(loginUrl, userCred)
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    this.tokenSubject.next(null)
  } 
  saveToken(token : string) {
    localStorage.setItem('token',token)
    this.tokenSubject.next(token)
  }
  getToken() :string | null {
    return localStorage.getItem('token')
  }
  
  getUserRole() :string | null{
    return localStorage.getItem('userRole')
  }


  authentiCated() : boolean {
    return !!this.getToken()
  }

  saveUserRole (userRole : string){
    localStorage.setItem('userRole', userRole)
  }

  
}
  
