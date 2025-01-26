using NewsForYou.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsForYou.Business
{
    public interface IService
    {
        public Task<bool> SignUp(UserDetailsModel model);

        public Task<UserDetailsModel> Login(LoginModel model);

        public Task<bool> AddCategory(CategoryModel category);

        public Task<bool> AddAgency(AgencyModel agency);

        public Task<bool> AddAgencyFeed(AgencyFeedModel agencyfeed);

        public Task<List<CategoryModel>> GetCategory();

        public Task<List<AgencyModel>> GetAgency();

        public Task<bool> DeleteAllNews();

        public Task<List<CategoryModel>> GetCategoriesFromAgencyId(int id);

        public Task<List<NewsModel>> GetAllNews(int id);

        public Task<List<ReportModel>> GeneratePdf(DateTime start, DateTime end);

        public Task<List<NewsModel>> GetNewsByCategories(List<int> categories, int id);

        public Task<bool> IncrementNewsClickCount(int id);

        public Task<bool> FindEmail(string email);
    }
}
