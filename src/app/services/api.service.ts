import { Injectable } from '@angular/core';
import { Client, Account, Databases, Functions, Storage} from 'appwrite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   provider() {
    let client = new Client();
    client
      .setEndpoint(environment.endPoint)
      .setProject(environment.projectId)
      .setLocale('en-US');
    return client;
  }

  account(){
    return new Account(this.provider())
  }
  db(){
    return new Databases(this.provider())
  }

  functions(){
    return new Functions(this.provider())
  }

  storage(){
    return new Storage(this.provider())
  }

}