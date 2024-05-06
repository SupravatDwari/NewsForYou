using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.Data;
using System.Text;

namespace NewsForYou.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileDownloadController : ControllerBase
    {
        [HttpPost]
        public IActionResult DownloadFile()
        {
            DataTable dataTable = GetDataTable();
            byte[] byteArray = Encoding.UTF8.GetBytes(ConvertDataTableToCSV(dataTable));

            //string fileName = "export.csv";
            //var contentDisposition = new ContentDispositionHeaderValue("attachment")
            //{
            //    FileNameStar = "\"" + fileName + "\"",
            //    FileName = fileName
            //};
            //Response.Headers.Append(HeaderNames.ContentDisposition, contentDisposition.ToString());

            //// Set the content type
            //Response.ContentType = "text/csv";

            //// Return the byte array as a file download
            //return File(byteArray, "text/csv", fileName);

            var fileName = string.Format
                  ("MindfireTEst" + "{0}.csv", DateTime.Now.ToString("yyyyMMdd-HHmm"));

          
            var file = File(byteArray, "application/octet-stream", fileName);
            return file;
        }

        private string ConvertDataTableToCSV(DataTable dataTable)
        {
            StringBuilder csv = new StringBuilder();

            // Append column headers
            foreach (DataColumn column in dataTable.Columns)
            {
                csv.Append(column.ColumnName);
                csv.Append(",");
            }
            csv.AppendLine(); // New line after headers

            // Append data rows
            foreach (DataRow row in dataTable.Rows)
            {
                foreach (var item in row.ItemArray)
                {
                    csv.Append(item.ToString());
                    csv.Append(",");
                }
                csv.AppendLine(); // New line after each row
            }

            return csv.ToString();
        }


        private DataTable GetDataTable()
        {
            DataSet ds = new DataSet();
            DataTable dt = new DataTable();
            dt.Columns.Add("Name");
            dt.Columns.Add("Branch");
            dt.Columns.Add("Officer");
            dt.Columns.Add("CustAcct");
            dt.Columns.Add("Grade");
            dt.Columns.Add("Rate");
            dt.Columns.Add("OrigBal");
            dt.Columns.Add("BookBal");
            dt.Columns.Add("Available");
            dt.Columns.Add("Effective");
            dt.Columns.Add("Maturity");
            dt.Columns.Add("Collateral");
            dt.Columns.Add("LoanSource");
            dt.Columns.Add("RBCCode");

            dt.Rows.Add(new object[] { "James Bond, LLC", 120, "Garrison Neely", "123 3428749020", 35, "6.000", "$24,590", "$13,432",
        "$12,659", "12/13/21", "1/30/27", 55, "ILS", "R"});

            ds.Tables.Add(dt);

            return dt;
        }


    }


}
