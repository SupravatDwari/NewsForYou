using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsForYou.Models
{
    public class AgencyFeedModel
    {
        public int AgencyFeedId { get; set; }
        public string AgencyFeedUrl {  get; set; }
        public int AgencyId { get; set;}
        public int CategoryId { get; set;}
    }
}
