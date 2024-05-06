using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsForYou.Models
{
    public class ReportModel
    {
        public string AgencyName { get; set; } = null!;
        public string NewsTitle { get; set; } = null!;
        public int ClickCount { get; set; }
    }
}
