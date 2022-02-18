import { Component, OnInit } from '@angular/core';
import { FUploadService } from './f-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  constructor(public fUpload: FUploadService) { }

  ngOnInit(): void {
  }

  onUpload(files: any) {
    const file = files.target.files[0];
    this.fUpload.parseFileAndUpload(file);
  }

}
