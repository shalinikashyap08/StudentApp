
import { Component , OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import * as XLSX from 'xlsx';  
import { Student } from 'src/app/constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  workBook:any;
  students:any;
  initial:any;
  
  name:any;
  config: any;
  Student:any;
  obj={$key:"",firstName:"",lastName:"",email:"",mobileNumber:11};
  a:any;

  
  constructor(private http:HttpService) { 
    this.config = {
      itemsPerPage: 50,
      currentPage: 1,
      totalItems: 2000 //must be length of array 
    };
    // this.http.getAllStudents().valueChanges().subscribe(res=>{
    //   console.log(res);
    //   this.students=res;
    // });
  }

 
  pageChanged(event:any){
    this.config.currentPage = event;
  }
  ngOnInit(): void {
    let s = this.http.getAllStudents(); 
    s.snapshotChanges().subscribe(data => {
      this.Student = [];
      data.forEach(item => {
        this.a = item.payload.toJSON(); 
        this.a['$key'] = item.key;
        this.Student.push(this.a as Student);
        
      })
    })
    
  }

  deleteStudent(student_id:any){
    console.log("student",student_id);
    this.http.deleteStudent(student_id);
  }
  
  uploadExcel(e:any) {
  
    try{
    
    const fileName = e.target.files[0].name;
    
    import('xlsx').then(xlsx => {
      let jsonData = null;
      const reader = new FileReader();
      // const file = ev.target.files[0];
      reader.onload = (event) => {
        const data = reader.result;
        this.workBook = xlsx.read(data, { type: 'binary' });
        jsonData = this.workBook.SheetNames.reduce((initial:any, name:any) => {
          const sheet = this.workBook.Sheets[name];
          initial[name] = xlsx.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.students = jsonData[Object.keys(jsonData)[0]];
        // console.log(this.products);
        
        this.students.forEach(element  => {
          this.obj["firstName"]=element.firstName;
          this.obj["lastName"]=element.lastName;
          this.obj["email"]=element.email;
          this.obj["mobileNumber"]=element.mobileNumber;
          console.log(this.obj);
          this.http.AddStudents(this.obj);
        });
      };
       
      reader.readAsBinaryString(e.target.files[0]);
    });
  
  }catch(e){
     console.log('error', e);
  }
  

  }
  // dataOfFootballers: any = [{
  //   playerName: 'Cristiano Ronaldo',
  //   playerCountry: 'Pourtgal',
  //   playerClub: 'Juventus'
  // },
  // {
  //   playerName: 'Lionel Messi',
  //   playerCountry: 'Argentina',
  //   playerClub: 'Barcelona'
  // },
  // {
  //   playerName: 'Neymar Junior',
  //   playerCountry: 'Brazil',
  //   playerClub: 'PSG'
  // },
  // {
  // playerName: 'Tonni Kroos',
  // playerCountry: 'Germany',
  // playerClub: 'Real Madrid'
  // },
  // {
  //   playerName: 'Paul Pogba',
  //   playerCountry: 'France',
  //   playerClub: 'Manchester United'
  // }];
 
  // exportAsXLSX():void {
  //   this.excelService.exportAsExcelFile(this.dataOfFootballers, 'footballer_data');
  // }

  // ExportTOExcel() {  
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
  //   XLSX.writeFile(wb, 'ScoreSheet.xlsx');  
  // }
  

  ExportTOExcel() {

    let tbl = document.getElementById("dataTable");
    let wb = XLSX.utils.table_to_book(tbl);
    XLSX.writeFile(wb, "student_data" + '.xlsx');
  }
}