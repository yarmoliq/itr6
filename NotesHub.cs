using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;
using System.Linq;
using itr6.Data;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Text.Json;
using System.Text.Json.Serialization;

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

        public async Task UpdateNote(string  noteId, string newContents)
        {
            // _logger.LogWarning(noteId);
            Note note = _context.Notes.Find(Convert.ToInt32(noteId));
            if(note != null)
            {
                note.Contents = newContents;
                _context.Notes.Update(note);
                await _context.SaveChangesAsync();
            }

            await this.Clients.All.SendAsync("GoUpdateYall");
        }

        public async Task CreateNewNote()
        {
            Note newNote = new Note();
            newNote.Contents = "";
            newNote.DateCreated = DateTime.Now;
            newNote.LastModified = DateTime.Now;

            _context.Add<Note>(newNote);
            _context.SaveChanges();

            await this.Clients.All.SendAsync("CreateNewNote", JsonSerializer.Serialize(newNote));
        }

        public async Task DeleteNote(string noteId)
        {
            Note note = _context.Notes.Find(Convert.ToInt32(noteId));
            if(note != null)
            {
                await this.Clients.All.SendAsync("DeleteNote", noteId);
                _context.Notes.Remove(note);
                _context.SaveChanges();
            }
        }

        public string GetNotes()
        {
            return JsonSerializer.Serialize(Enumerable.ToArray(_context.Notes));
        }
    }
}