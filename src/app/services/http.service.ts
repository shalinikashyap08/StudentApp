import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  studentsRef: AngularFireList<any>;
  studentRef: AngularFireObject<any>;
  constructor(private db:AngularFireDatabase) { }

  getAllStudents(){
    this.studentsRef = this.db.list('students-list');
    return this.studentsRef;
  }
  deleteStudent(student_id:any){
    this.db.object("students-list/"+student_id).remove();
  }
  AddStudents(student:any){
    this.studentsRef.push({firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber
    });
  }

  GetStudent(){

  }

  UpdateStudents(){
    
  }
}
