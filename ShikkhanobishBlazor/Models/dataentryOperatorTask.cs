using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShikkhanobishBlazor.Models
{
    public class dataentryOperatorTask
    {
        public int userID { get; set; }
        public string userName { get; set; }
        public string taskID { get; set; }
        public int chapterID { get; set; }
        public string MCQNumbers { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        public string date { get; set; }
        public string chapterName { get; set; }
        public string isTaskSub { get; set; }
        public string isTaskSubColor { get; set; }
        public string isTaskApp { get; set; }
        public string isTaskAppColor { get; set; }
        public string Response { get; set; }
    }
}
