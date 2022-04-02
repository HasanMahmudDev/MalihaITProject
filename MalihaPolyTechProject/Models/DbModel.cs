using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MalihaPolyTechProject.Models
{
    public class Course
    {
        public Course() { this.GetStudentRegistrations = new List<StudentRegistration>(); }
        public int CourseId { get; set; }
        [Required, StringLength(50)]
        public string Title {get; set;}
        [Required]
        public int  SeatCount { get; set; }
        [Required, Column(TypeName ="money")]
        public decimal Fee { get; set; }
        public virtual ICollection<StudentRegistration> GetStudentRegistrations { get; set; }
    }
    public class Department
    {
        public Department() { this.Students = new List<Student>(); }
        public int DepartmentId { get; set; }
        [Required, StringLength (50)]
        public string DepartmentName { get; set; }
        public virtual ICollection<Student> Students { get; set; }

    }
    public class Student
    {
        public Student() { this.StudentRegistrations = new List<StudentRegistration>(); }
        public int StudentId { get; set; }
        [Required, StringLength(50)]
        public string Name { get; set; }
        [Required, Column (TypeName ="date")]
        public DateTime DateOfBirth { get; set; }
        [Required, ForeignKey("Department")]
        public int DepartmentId { get; set; }   
        public virtual Department Department { get; set; }
        public virtual ICollection<StudentRegistration> StudentRegistrations { get; set; }

    }
    public class StudentRegistration
    {
        [Required, ForeignKey("Student")]
        public int StudentId { get; set; }
        [Required, ForeignKey("Course")]

        public int CourseId { get; set; }

        public DateTime EnrollDate { get; set; }

        public bool IsPaymentComplete { get; set; }
        public virtual Course Course { get; set; }
        public virtual Student Student { get; set; }

    }
    public class SchoolDbContext : DbContext
    {
        public SchoolDbContext(DbContextOptions<SchoolDbContext> options) : base(options) { }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<StudentRegistration> StudentRegistrations { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StudentRegistration>().HasKey(sr => new { sr.StudentId, sr.CourseId });
            base.OnModelCreating(modelBuilder);
        }
    }
}
