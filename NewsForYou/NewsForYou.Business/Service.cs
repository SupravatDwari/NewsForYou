using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NewsForYou.Logger;
using NewsForYou.Models;
using NewsForYou.DAL;
using NewsForYou.DAL.Models;

namespace NewsForYou.Business
{
    public class Service : IService
    {
        private IDataAccess _dataAccess;

        public Service(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public async Task<bool> SignUp(UserModel model)
        {
            User newStudent = new User
            {
                Name = model.Name,
                Email = model.Email,
                Password = model.Password
            };
            return await _dataAccess.SignUp(newStudent);
        }

        public async Task<UserModel> Login(LoginModel model)
        {
            return await _dataAccess.Login(model);
        }

        public async Task<bool> AddCategory(CategoryModel category)
        {
            Category newCategory = new Category
            {
                CategoryTitle = category.Title,
            };
            return await _dataAccess.AddCategory(newCategory);
        }

        public async Task<bool> AddAgency(AgencyModel agency)
        {
            return await _dataAccess.AddAgency(agency);
        }

        public async Task<bool> AddAgencyFeed(AgencyFeedModel agencyfeed)
        {
            return await _dataAccess.AddAgencyFeed(agencyfeed);
        }

        public async Task<List<CategoryModel>> GetCategory()
        {
            return await _dataAccess.GetCategory();
        }

        public async Task<List<AgencyModel>> GetAgency()
        {
            return await _dataAccess.GetAgency();
        }

        public async Task<bool> DeleteAllNews()
        {
            return await _dataAccess.DeleteAllNews();
        }

        public async Task<List<CategoryModel>> GetCategoriesFromAgencyId(int id)
        {
            return await _dataAccess.GetCategoriesFromAgencyId(id);
        }

        public async Task<List<NewsModel>> GetAllNews(int id)
        {
            return await _dataAccess.GetAllNews(id);
        }

        public async Task<List<ReportModel>> GeneratePdf(DateTime start, DateTime end)
        {
            return await _dataAccess.GeneratePdf(start, end);
        }

        public async Task<List<NewsModel>> GetNewsByCategories(List<int> categories, int id)
        {
            return await _dataAccess.GetNewsByCategories(categories, id);
        }

        public async Task<bool> IncrementNewsClickCount(int id)
        {
            return await _dataAccess.IncrementNewsClickCount(id);
        }

        public async Task<bool> FindEmail(string email)
        {
            return await _dataAccess.FindEmail(email);
        }
    }
}
