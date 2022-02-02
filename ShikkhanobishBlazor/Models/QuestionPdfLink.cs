using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShikkhanobishBlazor.Models
{
    public class QuestionPdfLink
    {
        public string className { get; set; }
        public string subjectName { get; set; }
        public string chapterName { get; set; }
        public int chapterID { get; set; }
        public string link { get; set; }
        public int noOfQues { get; set; }
        public string Response { get; set; }
    }
}
