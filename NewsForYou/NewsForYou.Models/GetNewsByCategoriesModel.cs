using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsForYou.Models
{
    public class GetNewsByCategoriesModel
    {
        public List<int> Categories { get; set; } = null!;
        public int Id {  get; set; }
    }
}
