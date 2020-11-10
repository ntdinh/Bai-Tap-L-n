import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;
@Component({
  selector: 'app-vaytien',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class VaytienComponent extends BaseComponent implements OnInit {
  public Vaytien: any;
  public vaytiens: any;
  public totalRecords:any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;  
  public showUpdateModal:any;
  public isCreate:any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.formsearch = this.fb.group({
      'nguoivay': [''],
       
    });
   
   this.search();
  }

  loadPage(page) { 
    this._api.post('/api/Vaytien/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.Vaytien = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/Vaytien/search',{page: this.page, pageSize: this.pageSize, nguoivay: this.formsearch.get('nguoivay').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.Vaytien = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  pwdCheckValidator(control){
    var filteredStrings = {search:control.value, select:'@#!$%&*'}
    var result = (filteredStrings.select.match(new RegExp('[' + filteredStrings.search + ']', 'g')) || []).join('');
    if(control.value.length < 6 || !result){
        return {matkhau: true};
    }
  }

  get f() { return this.formdata.controls; }

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    } 
    if(this.isCreate) { 
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
         
        let tmp = {
           
          nguoivay:value.nguoivay,
          sotien:value.sotien,
          laisuat:value.laisuat,
          ngayvay:value.ngayvay,
          sdt:value.sdt,
                    
          };
        this._api.post('/api/Vaytien/create-tien',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
      });
    } else { 
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
       
        let tmp = {
          nguoivay:value.nguoivay,
          sotien:value.sotien,
          laisuat:value.laisuat,
          ngayvay:value.ngayvay,
          sdt:value.sdt,
          vaytien_id:this.vaytiens.vaytien_id,          
          };
        this._api.post('/api/Vaytien/update-tien',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
      });
    }
   
  } 

  onDelete(row) { 
    this._api.post('/api/Vaytien/delete-tien',{vaytien_id:row.vaytien_id}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search(); 
      });
  }

  Reset() {  
    this.vaytiens = null;
    this.formdata = this.fb.group({
      'nguoivay': ['', Validators.required],
      'sotien': ['', [Validators.required]],
      ' laisuat': ['', Validators.required],
      'ngayvay': [this.today, Validators.required],
      'sdt': [  Validators.required],
    }); 
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.vaytiens = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'nguoivay': ['', Validators.required],
        'sotien': ['', Validators.required],
        'laisuat': ['', Validators.required],
         
        'ngayvay': [this.today, Validators.required],
        'sdt': ['', Validators.required],
      });
      this.formdata.get('ngayvay').setValue(this.today);
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true; 
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this._api.get('/api/Vaytien/get-by-id/'+ row.vaytien_id).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.vaytiens = res; 
        let ngayvay = new Date(this.vaytiens.ngayvay);
          this.formdata = this.fb.group({
            'nguoivay': [this.vaytiens.nguoivay, Validators.required],
            'sotien': [this.vaytiens.sotien, Validators.required],
            'laisuat': [this.vaytiens.laisuat, Validators.required],
            'ngayvay': [ngayvay, Validators.required],
           
            'sdt': [this.vaytiens.sdt, Validators.required],
          }); 
          this.doneSetupForm = true;
        }); 
    }, 700);
  }

  closeModal() {
    $('#createUserModal').closest('.modal').modal('hide');
  }
}
