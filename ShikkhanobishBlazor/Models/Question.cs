using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShikkhanobishBlazor.Models
{
    public class Question
    {
        public int questionID { get; set; }
        public int index { get; set; }
        public int classID { get; set; }
        public string className { get; set; }
        public int subjectID { get; set; }
        public int chapterID { get; set; }
        public int topicID { get; set; }
        public string mainQuestion { get; set; }
        public string option1 { get; set; }
        public string option2 { get; set; }
        public string option3 { get; set; }
        public string option4 { get; set; }
        public int rightAnswer { get; set; }
        public int review { get; set; }
        public string quesImages { get; set; }
        public string Response { get; set; }
        public string appBackColor { get; set; }
        public string decBackColor { get;set; }
        public string option1Color { get; set; }
        public string option2Color { get; set; }
        public string option3Color { get; set; }
        public string option4Color { get; set; }
      
    }
}
