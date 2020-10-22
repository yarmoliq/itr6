using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace itr6.Data
{
    public class Note
    {
        public int ID { get; set; }

        [DataType(DataType.Date)]
        public DateTime DateCreated { get; set; }
        
        [DataType(DataType.Date)]
        public DateTime LastModified { get; set; }
        public string Contents { get; set; }

        public string Color { get; set; }
        public int posX { get; set; }
        public int posY { get; set; }
        public int width { get; set; }
        public int height { get; set; }

        public Note()
        {
            DateCreated = DateTime.UtcNow;
            LastModified = DateTime.UtcNow;
            Contents = "";
            Color = "#ffcff7";
            posX = 50;
            posY = 50;
        }

        public static bool operator ==(Note one, Note two)
        {
            if((Object)one == null && (Object)two == null)
                return true;

            if((Object)one == null || (Object)two == null)
                return false;

            return one.ID == two.ID
                && one.Contents == two.Contents
                && one.Color == two.Color;
        }

        public static bool operator !=(Note one, Note two)
        {
            if ((Object)one == null && (Object)two == null)
                return false;

            if ((Object)one == null || (Object)two == null)
                return true;

            return !(one.ID == two.ID
                && one.Contents == two.Contents
                && one.Color == two.Color);
        }
    }
}