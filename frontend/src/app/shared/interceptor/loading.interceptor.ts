import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable,tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

var pendingrequst = 0;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor( private loading:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
this.loading.showloading();
    pendingrequst = pendingrequst + 1;
    return next.handle(request).pipe(
      tap({
        next:(event)=>{
          if(event.type === HttpEventType.Response){
            this.handleHideLoading();
          }
        },
        error:(_)=>{
          this.handleHideLoading();
        }
      })
    );
  }
  handleHideLoading(){
    pendingrequst = pendingrequst - 1;
    if(pendingrequst === 0){
      this.loading.hideLoading();
    }
  }
}
