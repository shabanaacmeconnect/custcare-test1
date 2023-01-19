import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    public apiStatusHandler=new Subject<any>();
    private currentstatusSubject: BehaviorSubject<any>;
    public currentstatus: Observable<any>;

    public defaultCompanySubject: BehaviorSubject<any>;
    // public defaultCompany: Observable<any>;
    constructor(private router:Router, private http: HttpClient) {
        const userdata=''
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(String(localStorage.getItem('currentUser'))));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentstatusSubject = new BehaviorSubject<any>(JSON.parse(String(localStorage.getItem('currentstatus'))));
        this.currentstatus = this.currentstatusSubject.asObservable();

        this.defaultCompanySubject = new BehaviorSubject<any>(JSON.parse(String(localStorage.getItem('defaultCompany'))));
        // this.defaultCompany = this.defaultCompanySubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }
    public get currentstatusvalue(): any {
        return this.currentstatusSubject.value;
    }
    public get defaultCompanyValue(): any {
      return this.defaultCompanySubject.value;
  }
    public getApiLoaderStatus()
    {
      return this.apiStatusHandler.asObservable();
    }
    public setApiLoaderStatus()
    {
      this.apiStatusHandler.next({show:false});

    }
    forgot(email: string) {
        this.apiStatusHandler.next({show:true});
        let formData=new FormData();
        formData.append('email',email)
        return this.http.post<any>(environment.baseurl+'auth/forgotPassword', formData)
                   .pipe(map(res => {
            this.apiStatusHandler.next({show:false});
                return res;
            }));
    }
    resetPassword(password: string,confirm_password:string,token:string) {
        this.apiStatusHandler.next({show:true});
        let formData=new FormData();
        formData.append('password',password);
        formData.append('confirm_password',confirm_password);
        formData.append('token',token);

        return this.http.post<any>(environment.baseurl+'auth/resetPassword', formData)
                   .pipe(map(res => {
            this.apiStatusHandler.next({show:false});
                return res;
            }));
    }
    login(form:any) {
        this.apiStatusHandler.next({show:true});
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type' : 'application/json',
              'Access-Control-Allow-Origin':'*',
            })
          };
        return this.http.post<any>(environment.baseurl+'auth/login', JSON.stringify(form),httpOptions)
        .pipe(
            map(res => {
                this.apiStatusHandler.next({show:false});
                if (res['status']==true) {
                    let decoded_value:any=jwt_decode(res['data'])
                    decoded_value['token']=res['data'];
                    decoded_value['email_verified']=res['userInfo']['email_verified'];
                    localStorage.setItem('currentUser', JSON.stringify(decoded_value));
                    this.currentUserSubject.next(decoded_value);
                }
                return res
            }),
          );
        //   .pipe(map(res => {
        //     this.apiStatusHandler.next({show:false});
        //         if (res['status']==true) {
        //             let decoded_value:any=jwt_decode(res['data'])
        //             console.log(decoded_value)
        //             decoded_value['token']=res['data'];
        //             localStorage.setItem('currentUser', JSON.stringify(decoded_value));
        //             this.currentUserSubject.next(decoded_value);
        //         }
        //         return res;
        //     }),
        //     );
    }

    logout() {
        // remove any from local storage to log any out
        localStorage.clear();
        this.currentUserSubject.next(null);
        this.router.navigateByUrl('/account/login')
        // location.reload()
    }
    getFile( url:string) {
        this.apiStatusHandler.next({show:true});
        const httpOptions = {
            responseType: 'blob' as 'json',
        }
        return this.http.get<any>(environment.baseurl+url, httpOptions)
                      .pipe(map(res => {
            this.apiStatusHandler.next({show:false});
            // login successful if there's a jwt token in the response
            if (res['status']==true) {
             
            }
            return res;
        }));
    }
    post( url:any,body:any) {
        this.apiStatusHandler.next({show:true});
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type' : 'application/json',
              'Access-Control-Allow-Origin':'*',
            })
          };
        return this.http.post<any>(environment.baseurl+url,JSON.stringify(body),httpOptions)
                   .pipe(map(res => {
            this.apiStatusHandler.next({show:false});

                return res;
            }));
    }
    put( url:string,body:any) {
        this.apiStatusHandler.next({show:true});
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type' : 'application/json',
              'Access-Control-Allow-Origin':'*',
            })
          };
        return this.http.put<any>(environment.baseurl+url,JSON.stringify(body),httpOptions)
                   .pipe(map(res => {
            this.apiStatusHandler.next({show:false});

                return res;
            }));
    }
    putMultipart( url:string,body:any) {
        this.apiStatusHandler.next({show:true});

        return this.http.put<any>(environment.baseurl+url,body)
                   .pipe(map(res => {
            this.apiStatusHandler.next({show:false});

                return res;
            }));
    }
    postMultipart( url:string,body:any) {
        this.apiStatusHandler.next({show:true});

        return this.http.post<any>(environment.baseurl+url,body)
                   .pipe(map(res => {
            this.apiStatusHandler.next({show:false});

                return res;
            }));
    }
    get( url:any) {
        this.apiStatusHandler.next({show:true});
        return this.http.get<any>(environment.baseurl+url)
                      .pipe(map(res => {
            this.apiStatusHandler.next({show:false});
            if (res['status']==true) {
             
            }
            return res;
        }));
    }
    delete( url:string) {
        return this.http.delete<any>(environment.baseurl+url)
                      .pipe(map(res => {
            this.apiStatusHandler.next({show:false});
            // login successful if there's a jwt token in the response
            if (res['status']==true) {
             
            }
            return res;
        }));
    }
    dataURLtoFile(dataurl:any, filename:any) {
        var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n)
    
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
    
        return new File([u8arr], filename, { type: mime })
      }
      private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
          // TODO: better job of transforming error for user consumption
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

}
