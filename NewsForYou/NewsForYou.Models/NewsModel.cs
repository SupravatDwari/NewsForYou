using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsForYou.Models
{
    public class NewsModel
    {
        public int NewsId { get; set; }
        public string NewsTitle { get; set; } = null!;
        public string NewsDescription { get; set; } = null!;
        public DateTime NewsPublishDateTime { get; set; }
        public string NewsLink { get; set; } = null!;
        public int? ClickCount { get; set; }
        public int CategoryId { get; set; }
        public int AgencyId { get; set; }
    }
}
