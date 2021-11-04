using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ShikkhanobishBlazor.ASPNetCore.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;


namespace ShikkhanobishBlazor.ASPNetCore.Controllers
{
    public class HomeController : Controller
    {
        
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        //public IActionResult Student()
        //{
        //    return View();
        //}

        //public async Task<List<Student>> Student()
        //{
        //    List<Student> studentList = new List<Student>();
        //    using (var httpClient = new HttpClient())
        //    {
        //        using (var response = await httpClient.GetAsync("https://api.shikkhanobish.com/api/ShikkhanobishLogin/getStudent"))
        //        {
        //            string apiResponse = await response.Content.ReadAsStringAsync();
        //            studentList = JsonConvert.DeserializeObject<List<Student>>(apiResponse);
        //        }
        //    }
        //    //return View(studentList);
        //    return Json(new { data = studentList });
        //}

        //public async Task <List<Student>> Student()
        //{
        //    var studentList = new List<Student>();
        //    //studentList = "https://api.shikkhanobish.com/api/ShikkhanobishLogin/getStudent".getJsonAsync<List<Student>>();

        //    using (var client = new HttpClient())
        //    {
        //        client.BaseAddress = new Uri("https://api.shikkhanobish.com/api/ShikkhanobishLogin/getStudent");
        //        client.DefaultRequestHeaders.Clear();
        //        client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
        //        var response = await client.GetAsync("/api/ShikkhanobishLogin/getStudent");

        //        if (response.IsSuccessStatusCode)
        //        {
        //            var readTask = response.Content.ReadAsStringAsync().Result;
        //            studentList = JsonConvert.DeserializeObject<List<Student>>(readTask);

        //            return studentList;
        //        }
        //    }
        //    //return Json(new { data = response });
        //}
       
        public IActionResult Add()
        {
            return View();
        }
        public IActionResult Voucher()
        {
            return View();
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
