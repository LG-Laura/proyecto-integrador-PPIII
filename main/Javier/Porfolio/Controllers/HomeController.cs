using Microsoft.AspNetCore.Mvc;
using Porfolio.Models;
using System.Diagnostics;

namespace Porfolio.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        //Obtener link a proyecto Miriñaque en proceso...
        private List<ProyectoViewModel> ObtenerProyectos()
        {
            return new List<ProyectoViewModel>() { new ProyectoViewModel
            {
                Titulo = "Miriñaque",
                Descripcion = "Gestión de club deportivo",
                Link="https://www.google.com/maps/place/Club+Social+y+Dep+Miri%C3%B1aque/@-34.6515214,-58.408653,15z/data=!4m2!3m1!1s0x0:0x7d05ccc69f1f380c?sa=X&ved=1t:2428&ictx=111",
                ImagenURL="/source/mirinaque.jpg"
            }
            };
        }

        public IActionResult Index()
        {
            var proyectosEnProceso = ObtenerProyectos().ToList();
            var modelo = new HomeIndexViewModel() { Proyectos = proyectosEnProceso };
            return View(modelo);
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult Presentacion()
        {
            return View();
        }
        public IActionResult Habilidades()
        {
            return View();
        }

        public IActionResult SeccionProyectos()
        {
            return View();
        }
        public IActionResult Contacto()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Contacto(ContactoViewModel contactoViewModel)
        {
            return RedirectToAction("Gracias");
        }
        public IActionResult Gracias()
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
