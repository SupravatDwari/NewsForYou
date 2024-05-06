using Moq;
using Xunit;
using NewsForYou.Business;
using NewsForYou.Models;
using NewsForYou.Controllers;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace NewsForYou.Tests
{
    public class ControllerTest
    {
        [Fact]
        public async Task TestLoginSuccess()
        {
            // Arrange
            var mockService = new Mock<IService>();
            var mockConfig = new Mock<IConfiguration>();
            // Assume 'secureKey' is a valid key for JWT token generation
            var secureKey = "KJFLSj4Rr6CnF7uPw9BsYxGZdJgM8Gfs";
            mockConfig.Setup(x => x["Jwt:Key"]).Returns(secureKey);

            var controller = new LoginController(mockService.Object, mockConfig.Object);

            var testLoginModel = new LoginModel
            {
                Email = "admin@gmail.com",
                Password = "admin"
            };

            // Setup mock service to return a UserModel for successful login
            var user = new UserModel(); // Adjust according to your UserModel properties if needed
            mockService.Setup(s => s.Login(It.Is<LoginModel>(lm => lm.Email == "admin@gmail.com" && lm.Password == "admin")))
                        .ReturnsAsync(user);

            // Act
            var result = await controller.Login(testLoginModel);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);

            // Checking for the presence and type of 'authenticate' and 'jwtToken' properties in the result
            var resultValue = okResult.Value.GetType();
            var authenticateProperty = resultValue.GetProperty("authenticate");
            var jwtTokenProperty = resultValue.GetProperty("jwtToken");

            Assert.NotNull(authenticateProperty);
            Assert.NotNull(jwtTokenProperty);

            var authenticateValue = (bool)authenticateProperty.GetValue(okResult.Value);
            var jwtTokenValue = jwtTokenProperty.GetValue(okResult.Value).ToString();

            // Asserting 'authenticate' is true and 'jwtToken' is not null or empty
            Assert.True(authenticateValue);
            Assert.False(string.IsNullOrEmpty(jwtTokenValue));

            // Verify that the Login method was called once with any LoginModel
            mockService.Verify(s => s.Login(It.IsAny<LoginModel>()), Times.Once);
        }

        [Fact]
        public async Task GetCategory_ReturnsOkObjectResult_WithCategories()
        {
            // Arrange
            var mockService = new Mock<IService>();
            var mockConfig = new Mock<IConfiguration>();
            var controller = new CategoryController(mockService.Object, mockConfig.Object);
            var categories = new List<CategoryModel>
                {
                    new CategoryModel { Id = 1, Title = "Sports" },
                    new CategoryModel { Id = 2, Title = "Business" },
                    new CategoryModel { Id = 3, Title = "Science" },
                    new CategoryModel { Id = 4, Title = "Entertainment" }
                };

            mockService.Setup(s => s.GetCategory()).ReturnsAsync(categories);

            // Act
            var actionResult = await controller.GetCategory();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            Assert.NotNull(okResult.Value);

            // Deserialize the OkObjectResult's Value to a dictionary or directly access it
            var resultProperty = okResult.Value.GetType().GetProperty("result");
            Assert.NotNull(resultProperty); // Ensure the property exists

            var returnedCategories = resultProperty.GetValue(okResult.Value) as List<CategoryModel>;
            Assert.NotNull(returnedCategories);
            Assert.Equal(categories.Count, returnedCategories.Count);

            for (int i = 0; i < returnedCategories.Count; i++)
            {
                Assert.Equal(categories[i].Id, returnedCategories[i].Id);
                Assert.Equal(categories[i].Title, returnedCategories[i].Title);
            }

            // Verify that the GetCategory method was called once
            mockService.Verify(s => s.GetCategory(), Times.Once);
        }



        [Fact]
        public async Task GetAgency_ReturnsOkObjectResult_WithAgencies()
        {

            var mockService = new Mock<IService>();
            var mockConfig = new Mock<IConfiguration>();
            var controller = new AgencyController(mockService.Object, mockConfig.Object);
            var agencies = new List<AgencyModel>
            {
                new AgencyModel { Id = 1, Name = "Times of India" },
                new AgencyModel { Id = 2, Name = "Hindustan Times" }
            };

            mockService.Setup(s => s.GetAgency()).ReturnsAsync(agencies);

            var actionResult = await controller.GetAgency();

            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            Assert.NotNull(okResult.Value);

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(okResult.Value);
            var data = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, List<AgencyModel>>>(json);

            Assert.NotNull(data);
            Assert.True(data.ContainsKey("result"), "Result key not found in response.");
            var returnedAgencies = data["result"];
            Assert.Equal(agencies.Count, returnedAgencies.Count);

            for (int i = 0; i < returnedAgencies.Count; i++)
            {
                Assert.Equal(agencies[i].Id, returnedAgencies[i].Id);
                Assert.Equal(agencies[i].Name, returnedAgencies[i].Name);
            }

            mockService.Verify(s => s.GetAgency(), Times.Once);
        }

        [Fact]
        public async Task GetCategoriesFromAgencyId_ReturnsOkObjectResult_WithCategories()
        {
            // Arrange
            var mockService = new Mock<IService>();
            var mockConfig = new Mock<IConfiguration>();
            var controller = new CategoryController(mockService.Object, mockConfig.Object);
            int id = 1;

            // Set up mock service to return a non-null list of categories
            mockService.Setup(s => s.GetCategoriesFromAgencyId(It.IsAny<int>())).ReturnsAsync(new List<CategoryModel>());

            // Act
            var result = await controller.GetCategoriesFromAgencyId(id);

            // Assert
            var okResult = Assert.IsType<NotFoundResult>(result);
            Assert.Equal(404, okResult.StatusCode);
        }



        [Fact]
        public async Task GetAllNews_ReturnsOkObjectResult_WithAllNews()
        {
            var mockService = new Mock<IService>();
            var mockConfig = new Mock<IConfiguration>();
            var controller = new NewsController(mockService.Object, mockConfig.Object);
            int categoryId = 1;

            var result = await controller.GetAllNews(categoryId);


            Assert.NotNull(result);
        }

        [Fact]
        public async Task GeneratePdf_ReturnsOkObjectResult_WithReport()
        {
            // Arrange
            var mockService = new Mock<IService>();
            var mockConfig = new Mock<IConfiguration>();
            var controller = new ExportController(mockService.Object, mockConfig.Object);

            // Set up mock service to return a non-null list of ReportModel
            var reports = new List<ReportModel> { new ReportModel { /* report properties */ } };
            mockService.Setup(s => s.GeneratePdf(It.IsAny<DateTime>(), It.IsAny<DateTime>())).ReturnsAsync(reports);

            // Act
            var result = await controller.GeneratePdf(DateTime.Now.AddDays(-7), DateTime.Now);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);

            // Additional assertions if needed
        }


        [Fact]
        public async Task GetNewsByCategories_ReturnsOkObjectResult_WithNews()
        {

            var mockService = new Mock<IService>();
            var mockConfig = new Mock<IConfiguration>();
            var controller = new NewsController(mockService.Object, mockConfig.Object);
            var model = new GetNewsByCategoriesModel
            {
                Categories = new List<int> { 1, 2 },
                Id = 1
            };


            var result = await controller.GetNewsByCategories(model);


            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public async Task IncrementNewsClickCount_ReturnsOkObjectResult_WithFlag()
        {

            var mockService = new Mock<IService>();
            var mockConfig = new Mock<IConfiguration>();
            var controller = new NewsForYouController(mockService.Object, mockConfig.Object);
            var id = 1;
            var flag = true;

            mockService.Setup(s => s.IncrementNewsClickCount(id)).ReturnsAsync(flag);


            var result = await controller.IncrementNewsClickCount(id);


            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public async Task FindEmail_ReturnsOkObjectResult_WithFlag()
        {

            var mockService = new Mock<IService>();
            var mockConfig = new Mock<IConfiguration>();
            var controller = new SignUpController(mockService.Object, mockConfig.Object);
            var id = "test@example.com";
            var flag = false;

            mockService.Setup(s => s.FindEmail(id)).ReturnsAsync(flag);


            var result = await controller.FindEmail(id);


            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, okResult.StatusCode);
        }


    }
}
