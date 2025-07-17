import { Component, AfterViewInit } from '@angular/core';
import { StudentService } from './services/student.service';
import { Chart, registerables } from 'chart.js'; // 👈 import registerables
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Register Chart.js components
Chart.register(...registerables); // 👈 This line fixes the error

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  providers: [StudentService]
})
export class AppComponent implements AfterViewInit {
  student = {
    name: '',
    subject1: null,
    subject2: null,
    subject3: null
  };

  chart: any;

  constructor(private studentService: StudentService) {}

  onSubmit() {

    if (
    (this.student.subject1 ?? 0) > 50 ||
    (this.student.subject2 ?? 0) > 50 ||
    (this.student.subject3 ?? 0) > 50
  ) {
    alert('Subject marks should not exceed 50!');
    return;
  }

    this.studentService.addStudent(this.student).subscribe({
      next: () => {
        alert('Student added successfully!');
        this.student = { name: '', subject1: null, subject2: null, subject3: null };
      },
      error: (err) => {
        alert('Error adding student');
        console.error(err);
      }
    });
  }

  showAverageChart() {
    this.studentService.getStudents().subscribe(data => {
      const names = data.map(s => s.name);
      const averages = data.map(s => +s.average);

      if (this.chart) this.chart.destroy();

      this.chart = new Chart('averageChart', {
        type: 'bar',
        data: {
          labels: names,
          datasets: [{
            label: 'Average Marks',
            data: averages,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: '#2c3e50',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  ngAfterViewInit(): void {}
}
