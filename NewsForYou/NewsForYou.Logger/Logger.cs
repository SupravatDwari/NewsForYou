using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsForYou.Logger
{
    public class Logger(string folderpath) : ILogger
    {
        private readonly string _folderpath = folderpath;

        public void AddException(Exception data)
        {
            string fileName = DateTime.Now.ToString("yyyyMMdd") + ".txt";
            try
            {

                if (!Directory.Exists(_folderpath))
                {
                    Directory.CreateDirectory(_folderpath);
                }

                string path = _folderpath + "\\" + fileName;
                using StreamWriter writer = new StreamWriter(path, true);
                writer.WriteLine(data.ToString());
            }
            catch (Exception e)
            {
            }
        }
    }
}
