using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;
using System.Linq;
using itr6.Data;

namespace itr6
{
    public class NotesHub : Hub
    {
        private readonly ILogger<NotesHub> _logger;
        public ApplicationDbContext _context;

        public NotesHub(ILogger<NotesHub> looger, ApplicationDbContext context)
        {
            _logger = looger;
            _context = context;
        }

        public void AddNewNote(string contents)
        {
            Note newNote = new Note();
            newNote.Contents = contents;
            newNote.DateCreated = DateTime.Now;
            newNote.LastModified = DateTime.Now;

            _context.Add<Note>(newNote);
            _context.SaveChanges();
        }
    }
}