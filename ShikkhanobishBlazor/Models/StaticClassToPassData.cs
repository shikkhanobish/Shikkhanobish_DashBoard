using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShikkhanobishBlazor.Models
{
    public class StaticClassToPassData
    {
        public static UserLogin thisAdmin { get; set; }
        public static List<Chapter> sortedChapter { get; set; }
    }
}
