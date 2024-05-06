using Moq;
using NewsForYou.Business;
using NewsForYou.Models;
using NewsForYou.DAL;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using NewsForYou.DAL.Models; // Assuming use of xUnit for test framework

namespace NewsForYou.Tests
{
    public class BusinessTests
    {
        private readonly Mock<IDataAccess> _mockDataAccess;
        private readonly Service _service;

        public BusinessTests()
        {
            _mockDataAccess = new Mock<IDataAccess>();
            _service = new Service(_mockDataAccess.Object);
        }

        [Fact]
        public async Task SignUp_ShouldReturnTrue_WhenUserIsSuccessfullyAdded()
        {
            var userModel = new UserModel { Name = "Test User", Email = "test@example.com", Password = "password123" };
            _mockDataAccess.Setup(x => x.SignUp(It.IsAny<User>())).ReturnsAsync(true);

            var result = await _service.SignUp(userModel);

            Assert.True(result);
        }

        [Fact]
        public async Task Login_ShouldReturnUserModel_WhenCredentialsAreValid()
        {
            var loginModel = new LoginModel { Email = "test@example.com", Password = "password123" };
            var expectedUserModel = new UserModel { Name = "Test User", Email = "test@example.com" };
            _mockDataAccess.Setup(x => x.Login(loginModel)).ReturnsAsync(expectedUserModel);

            var result = await _service.Login(loginModel);

            Assert.Equal(expectedUserModel.Email, result.Email);
            Assert.Equal(expectedUserModel.Name, result.Name);
        }

        [Fact]
        public async Task AddCategory_ShouldReturnTrue_WhenCategoryIsSuccessfullyAdded()
        {
            var categoryModel = new CategoryModel { Title = "Test Category" };
            _mockDataAccess.Setup(x => x.AddCategory(It.IsAny<Category>())).ReturnsAsync(true);

            var result = await _service.AddCategory(categoryModel);

            Assert.True(result);
        }

        [Fact]
        public async Task GetCategory_ShouldReturnListOfCategoryModel()
        {
            var expectedCategories = new List<CategoryModel> { new CategoryModel { Title = "News" } };
            _mockDataAccess.Setup(x => x.GetCategory()).ReturnsAsync(expectedCategories);

            var result = await _service.GetCategory();

            Assert.NotNull(result);
            Assert.Equal(expectedCategories.Count, result.Count);
            Assert.Equal(expectedCategories.First().Title, result.First().Title);
        }

        [Fact]
        public async Task AddAgency_ShouldReturnTrue_WhenCategoryIsSuccessfullyAdded()
        {
            var agencyModel = new AgencyModel { Name = "Test Agency", Logopath = "" };
            _mockDataAccess.Setup(x => x.AddAgency(It.IsAny<AgencyModel>())).ReturnsAsync(true);

            var result = await _service.AddAgency(agencyModel);

            Assert.True(result);
        }

        [Fact]
        public async Task GetAgency_ShouldReturnListOfCategoryModel()
        {
            var expectedAgencies = new List<AgencyModel> { new AgencyModel { Logopath = "", Name = "Test Agency" } };
            _mockDataAccess.Setup(x => x.GetAgency()).ReturnsAsync(expectedAgencies);

            var result = await _service.GetAgency();

            Assert.NotNull(result);
            Assert.Equal(expectedAgencies.Count, result.Count);
            Assert.Equal(expectedAgencies.First().Name, result.First().Name);
        }

        [Fact]
        public async Task AddAgencyFeed_ShouldReturnTrue_WhenCategoryIsSuccessfullyAdded()
        {
            var agencyFeedModel = new AgencyFeedModel { AgencyId = 1, CategoryId = 1, AgencyFeedUrl = "" };
            _mockDataAccess.Setup(x => x.AddAgencyFeed(It.IsAny<AgencyFeedModel>())).ReturnsAsync(true);

            var result = await _service.AddAgencyFeed(agencyFeedModel);

            Assert.True(result);
        }

        [Fact]
        public async Task Delete_ShouldReturnTrue_WhenCategoryIsSuccessfullyDeleted()
        {
            _mockDataAccess.Setup(da => da.DeleteAllNews()).ReturnsAsync(true);

            var result = await _service.DeleteAllNews();

            Assert.True(result);
            _mockDataAccess.Verify(da => da.DeleteAllNews(), Times.Once);
        }

        [Fact]
        public async Task GetCategoriesFromAgencyId_ShouldReturnListOfCategoryModel()
        {
            var expectedCategories = new List<CategoryModel> { new CategoryModel { Title = "News" } };
            _mockDataAccess.Setup(x => x.GetCategoriesFromAgencyId(1)).ReturnsAsync(expectedCategories);

            var result = await _service.GetCategoriesFromAgencyId(1);

            Assert.NotNull(result);
            Assert.Equal(expectedCategories.Count, result.Count);
            Assert.Equal(expectedCategories.First().Title, result.First().Title);
        }

        [Fact]
        public async Task GetAllNews_ShouldReturnListOfNewsModel()
        {
            var expectedNews = new List<NewsModel> { new NewsModel { NewsTitle = "News" } };
            _mockDataAccess.Setup(x => x.GetAllNews(1)).ReturnsAsync(expectedNews);

            var result = await _service.GetAllNews(1);

            Assert.NotNull(result);
            Assert.Equal(expectedNews.Count, result.Count);
            Assert.Equal(expectedNews.First().NewsTitle, result.First().NewsTitle);
        }

        [Fact]
        public async Task GeneratePdf_ShouldReturnListOfReportModel()
        {
            var start = new DateTime(2024, 1, 1);
            var end = new DateTime(2024, 1, 31);
            var expectedReports = new List<ReportModel>
            {
                new ReportModel { NewsTitle="Hello",ClickCount=10, AgencyName="Hi" }
            };

            _mockDataAccess.Setup(da => da.GeneratePdf(start, end))
                          .ReturnsAsync(expectedReports);

            var actualReports = await _service.GeneratePdf(start, end);

            Assert.NotNull(actualReports);
            Assert.Equal(expectedReports.Count, actualReports.Count);
            _mockDataAccess.Verify(da => da.GeneratePdf(start, end), Times.Once);
        }

        [Fact]
        public async Task GetNewsByCategories_ShouldReturnListOfReportModel()
        {
            var categories = new List<int> { 1, 2 };
            var agencyId = 1;
            var expectedNews = new List<NewsModel>
            {
                new NewsModel { AgencyId=1, CategoryId=1, ClickCount=10, NewsDescription="Hello", NewsId=1, NewsTitle="Hello",NewsLink="hijodjwd", NewsPublishDateTime=DateTime.Now }
            };

            _mockDataAccess.Setup(da => da.GetNewsByCategories(categories, agencyId))
                          .ReturnsAsync(expectedNews);

            var actualNews = await _service.GetNewsByCategories(categories, agencyId);

            Assert.NotNull(actualNews);
            Assert.Equal(expectedNews.Count, actualNews.Count);
        }

        [Fact]
        public async Task IncrementClickCount_ShouldReturnBoolean()
        {
            var newsId = 1;
            var expected = true;

            _mockDataAccess.Setup(da => da.IncrementNewsClickCount(newsId))
                          .ReturnsAsync(expected);

            var result = await _service.IncrementNewsClickCount(newsId);

            Assert.True(result);
        }

        [Fact]
        public async Task FindEmail_ShouldReturnBoolean()
        {
            var email = "admin@gmail.com";
            var expected = true;

            _mockDataAccess.Setup(da => da.FindEmail(email))
                          .ReturnsAsync(expected);

            var result = await _service.FindEmail(email);

            Assert.True(result);
        }
    }
}
