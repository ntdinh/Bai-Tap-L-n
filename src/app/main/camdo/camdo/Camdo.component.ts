import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;
@Component({
  selector: 'app-camdo',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class CamdoComponent extends BaseComponent implements OnInit {
  public Camdo: any;
  public camdos: any;
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
      'hoten': [''],
       
    });
   
   this.search();
  }

  loadPage(page) { 
    this._api.post('/api/Camdo/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.Camdo = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/Camdo/search',{page: this.page, pageSize: this.pageSize, hoten: this.formsearch.get('hoten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.Camdo = res.data;
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
           
          hoten:value.hoten,
          vatcam:value.vatcam,
          sotien:value.sotien,
          ngaycam:value.ngaycam,
          ghichu:value.ghichu,
          sdt:value.sdt,
                    
          };
        this._api.post('/api/Camdo/create-camdo',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
      });
    } else { 
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
       
        let tmp = {
            
          hoten:value.hoten,
          vatcam:value.vatcam,
          sotien:value.sotien,
          ngaycam:value.ngaycam,
          ghichu:value.ghichu,
          sdt:value.sdt,
          camdo_id:this.camdos.camdo_id,          
          };
        this._api.post('/api/Camdo/update-camdo',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
      });
    }
   
  } 

  onDelete(row) { 
    this._api.post('/api/Camdo/delete-camdo',{camdo_id:row.camdo_id}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search(); 
      });
  }

  Reset() {  
    this.camdos = null;
    this.formdata = this.fb.group({
      'hoten': ['', Validators.required],
      'vatcam': ['', [Validators.required]],
      ' sotien': ['', Validators.required],
      
      'ngaycam': [this.today, Validators.required],
      ' ghichu': ['', Validators.required],
      'sdt': [  Validators.required],
    }); 
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.camdos = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'hoten': ['', Validators.required],
      'vatcam': ['', [Validators.required]],
      ' sotien': ['', Validators.required],
      
      'ngaycam': [this.today, Validators.required],
      ' ghichu': ['', Validators.required],
      'sdt': [ '', Validators.required],
      });
      this.formdata.get('ngaycam').setValue(this.today);
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true; 
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this._api.get('/api/Camdo/get-by-id/'+ row.camdo_id).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.camdos = res; 
        let ngaycam = new Date(this.camdos.ngaycam);
          this.formdata = this.fb.group({
            'hoten': [this.camdos.hoten, Validators.required],
            'vatcam': [this.camdos.vatcam, Validators.required],
            'sotien': [this.camdos.sotien, Validators.required],
            'ngaycam': [ngaycam, Validators.required],
            'ghichu': [this.camdos.ghichu, Validators.required],
            'sdt': [this.camdos.sdt, Validators.required],
          }); 
          this.doneSetupForm = true;
        }); 
    }, 700);
  }

  closeModal() {
    $('#createUserModal').closest('.modal').modal('hide');
  }
}
