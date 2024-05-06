using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsForYou.Logger
{
    public interface ILogger
    {
        public void AddException(Exception data);
    }
}
