using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShikkhanobishBlazor.Models
{
    public class TecaherQuestionHistory
    {
        public int tqID { get; set; }
        public int teacherID { get; set; }
        public int questionID { get; set; }
        public string review { get; set; }
    }
}
