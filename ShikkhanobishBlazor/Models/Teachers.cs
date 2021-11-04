using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShikkhanobishBlazor.Models
{
    public class Teachers
    {
        public int teacherID { get; set; }
        public string name { get; set; }
        public string password { get; set; }
        public string phonenumber { get; set; }
        public int selectionStatus { get; set; }
        public int monetizetionStatus { get; set; }
        public int activeStatus { get; set; }
        public int totalMinuite { get; set; }
        public int favTeacherCount { get; set; }
        public int reportCount { get; set; }
        public int totalTuition { get; set; }
        public int fiveStar { get; set; }
        public int fourStar { get; set; }
        public int threeStar { get; set; }
        public int twoStar { get; set; }
        public int oneStar { get; set; }
        public double amount { get; set; }
        public string activeTime { get; set; }
        public string Response { get; set; }
        public string namephoneTeacher { get; set; }
    }
}
