using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MalihaPolyTechProject.Models;

namespace MalihaPolyTechProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentRegistrationsController : ControllerBase
    {
        private readonly SchoolDbContext _context;

        public StudentRegistrationsController(SchoolDbContext context)
        {
            _context = context;
        }

        // GET: api/StudentRegistrations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentRegistration>>> GetStudentRegistrations()
        {
            return await _context.StudentRegistrations.ToListAsync();
        }

        // GET: api/StudentRegistrations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentRegistration>> GetStudentRegistration(int id)
        {
            var studentRegistration = await _context.StudentRegistrations.FindAsync(id);

            if (studentRegistration == null)
            {
                return NotFound();
            }

            return studentRegistration;
        }

        // PUT: api/StudentRegistrations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentRegistration(int id, StudentRegistration studentRegistration)
        {
            if (id != studentRegistration.StudentId)
            {
                return BadRequest();
            }

            _context.Entry(studentRegistration).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentRegistrationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/StudentRegistrations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<StudentRegistration>> PostStudentRegistration(StudentRegistration studentRegistration)
        {
            _context.StudentRegistrations.Add(studentRegistration);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StudentRegistrationExists(studentRegistration.StudentId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStudentRegistration", new { id = studentRegistration.StudentId }, studentRegistration);
        }

        // DELETE: api/StudentRegistrations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentRegistration>> DeleteStudentRegistration(int id)
        {
            var studentRegistration = await _context.StudentRegistrations.FindAsync(id);
            if (studentRegistration == null)
            {
                return NotFound();
            }

            _context.StudentRegistrations.Remove(studentRegistration);
            await _context.SaveChangesAsync();

            return studentRegistration;
        }
        /// 
        /// Custom methods
        ///
        [HttpGet("Ex/{sid}/{cid}")]
        public async Task<ActionResult<StudentRegistration>> GetStudentRegistration(int sid, int cid)
        {
            var studentRegistration = await _context.StudentRegistrations
                .FirstOrDefaultAsync(x=> x.StudentId == sid && x.CourseId == cid);

            if (studentRegistration == null)
            {
                return NotFound();
            }

            return studentRegistration;
        }
        private bool StudentRegistrationExists(int id)
        {
            return _context.StudentRegistrations.Any(e => e.StudentId == id);
        }
    }
}
