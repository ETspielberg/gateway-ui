import {HttpHeaders} from '@angular/common/http';


export const userUrl = 'http://localhost:11999';
export const headers = new HttpHeaders().set('Content-Type', 'application/json');
export const textHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('responseType', 'text');
