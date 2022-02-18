import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FUploadService {

  isUploadSuccess: boolean = true;
  private uploadedDataSubject = new BehaviorSubject<any[]>([]);
  readonly uploadedData$: Observable<any[]> = this.uploadedDataSubject.asObservable();
  private set uploadedData(data: any[]) {
    const arr = this.uploadedDataSubject.getValue();
    arr.push(data);
    this.uploadedDataSubject.next(arr);
  }

  private messageSubject = new BehaviorSubject<string>('File Upload Not Started!');
  readonly message$: Observable<string> = this.messageSubject.asObservable();
  private set message(msg: string) {
    this.messageSubject.next(msg);
  }

  constructor(private httpClient: HttpClient) { }

  parseFileAndUpload(file: File) {
    console.log(file);
    this.message = 'File Upload Started';
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      let data: any = e.target?.result + '';
      data = JSON.parse(data);
      console.log(data);
      this.uploadFile(data.employees, data.split);
    };
    fileReader.readAsText(file);

  }

  uploadFile(dataList: any[], splitCount: number) {
    let curatedData: any = [];
    this.message = 'File Upload Inprogress';
    dataList.forEach(async (element, index) => {
      curatedData.push(element);
      if(index+1 % splitCount === 0 || index === dataList.length - 1)  {
        try{
          await this.postData(curatedData);
          this.uploadedData = curatedData;
        } catch (err) {
          console.log(err);
          this.isUploadSuccess = false;
        }
        curatedData = [];
      }

      if(!this.isUploadSuccess || index === dataList.length - 1) {
        this.message = this.isUploadSuccess ? 'File Uploaded Successfully' : 'File Upload Failed';
      }

    });
  }

  postData(data: any) {
      return this.httpClient.post('https://reqres.in/api/users', data).pipe(delay(2000)).toPromise();
  }

}
