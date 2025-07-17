import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://hmftj.com/interns/api/student.php';

  constructor(private http: HttpClient) {}

  addStudent(studentData: any) {
    return this.http.post(this.apiUrl, studentData);
  }

  getStudents() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
