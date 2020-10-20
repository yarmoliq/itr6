using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

using Microsoft.EntityFrameworkCore;
using itr6.Data;

namespace itr6.Pages
{
    public class IndexModel : PageModel
    {
        public readonly ApplicationDbContext _context;
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger, ApplicationDbContext context)
        {
            context.Database.EnsureCreated();
            _context = context;
            _logger = logger;
        }

        public void OnGet()
        {

        }

        public Note[] GetNotes()
        {
            return Enumerable.ToArray(_context.Notes);
        }
    }
}