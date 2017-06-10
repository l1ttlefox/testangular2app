import {Injectable} from '@angular/core';
import {Jsonp, URLSearchParams, QueryEncoder, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Options } from './options';

class MyQueryEncoder extends QueryEncoder {
  encodeValue(v: any): string {
    return v.toString().replace('+', '%2B');
  }
}

const userkey = 'AJA3Cw9XcJZf';
const secret = '1J+YxAY47khnuXf4GKSggLpPFBbQv8Hq';
const apikey = '3_inujb44QPskKBok5VwhYnqy40eaVrwAJXXLsqaHRI_6DCM3KHhxNXjjcFQe0PASK';
const format = 'jsonp';
const callback = 'JSONP_CALLBACK';
const url = 'https://accounts.gigya.com/accounts.getPolicies';
const url2 = 'https://accounts.gigya.com/accounts.setPolicies';
const headers: Headers = new Headers();
headers.append('Accept', 'application/json');

@Injectable()
export class JsonpService {

  constructor(private jsonp: Jsonp) { }

  getData(): Promise<Options> {
    const params: URLSearchParams = new URLSearchParams('', new MyQueryEncoder());
    params.append('userkey', userkey);
    params.append('secret', secret);
    params.append('apikey', apikey);
    params.append('format', format);
    params.append('callback', callback);
    return this.jsonp.get(url, { params, headers})
      .toPromise()
      .then(response => {
        const data: Options = response.json().accountOptions;
        data.errorCode = response.json().errorCode;
        data.errorMessage = data.errorCode === 0 ? null : data.errorMessage;
        return data;
      })
      .catch((err) => console.log(err));
  }

  setData(sendOptions): Promise<any> {

    const params: URLSearchParams = new URLSearchParams('', new MyQueryEncoder());
    const options = Object.assign({}, sendOptions);
    delete options.errorCode;
    delete options.errorMessage;
    params.append('userkey', userkey);
    params.append('secret', secret);
    params.append('apikey', apikey);
    params.append('format', format);
    params.append('callback', callback);
    params.append('accountOptions', JSON.stringify(options));
    return this.jsonp.get(url2, { params, headers })
      .toPromise()
      .then(response => response)
      .catch((err) => console.log(err));
  }
}
