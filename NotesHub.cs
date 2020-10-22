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

        public async Task ChangeNote(string jsonNote)
        {
            Note editedNote = JsonSerializer.Deserialize<Note>(jsonNote);
            Note dbNote = _context.Notes.Find(editedNote.ID);
            if(editedNote != dbNote)
            {
                dbNote.Contents     = editedNote.Contents;
                dbNote.Color        = editedNote.Color;
                dbNote.posX         = editedNote.posX;
                dbNote.posY         = editedNote.posY;
                dbNote.width        = editedNote.width;
                dbNote.height       = editedNote.height;
                dbNote.LastModified = DateTime.UtcNow;
                
                _context.Notes.Update(dbNote);
                await _context.SaveChangesAsync();

                await Clients.All.SendAsync("UpdateNote", JsonSerializer.Serialize(editedNote));
            }
        }

        public async Task CreateNote()
        {
            Note newNote = new Note();

            _context.Add<Note>(newNote);
            _context.SaveChanges();

            await this.Clients.All.SendAsync("CreateNote", JsonSerializer.Serialize(newNote));
        }

        public async Task DeleteNote(string jsonNote)
        {
            Note note = _context.Notes.Find(JsonSerializer.Deserialize<Note>(jsonNote).ID);
            if(note != null)
            {
                await this.Clients.All.SendAsync("DeleteNote", JsonSerializer.Serialize(note));
                _context.Notes.Remove(note);
                _context.SaveChanges();
            }
        }

        public string GetNote(string s_noteId)
        {
            int noteId = Convert.ToInt32(s_noteId);
            Note note = _context.Find<Note>(noteId);

            if(note != null)
            {
                return JsonSerializer.Serialize(note);
            }

            return null;
        }

        public string GetNotes()
        {
            return JsonSerializer.Serialize(Enumerable.ToArray(_context.Notes));
        }
    }
}