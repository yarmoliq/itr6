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
    }
}