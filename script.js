
    document.addEventListener("DOMContentLoaded", function () {
        // Inicializa las animaciones AOS
        AOS.init(); 

        // GSAP: Animación de entrada para el header
        gsap.from("header", { duration: 1, y: -50, opacity: 0, ease: "power2.out" });

        // GSAP: Efecto de entrada para la sección "about"
        gsap.from("#about h2", { duration: 1, y: 20, opacity: 0, delay: 0.5 });

        // GSAP: Animación de entrada para cada sección
        gsap.from("section", {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out"
        });

        // GSAP: Animación de flotación en la imagen de perfil
        gsap.to("img.rounded-circle", {
            y: 15,
            repeat: -1,
            duration: 2,
            yoyo: true,
            ease: "power1.inOut"
        });

        // JavaScript para hacer desaparecer el encabezado cuando se hace scroll
        let lastScrollTop = 0;
        const header = document.querySelector("header");

        window.addEventListener("scroll", function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop) {
                // Si se desplaza hacia abajo, ocultar el encabezado
                header.style.top = "-70px"; // Ajusta según el tamaño de tu encabezado
            } else {
                // Si se desplaza hacia arriba, mostrar el encabezado
                header.style.top = "0";
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evita valores negativos
        });

        // Manejo de la apariencia del navbar con IntersectionObserver
        const observer = new IntersectionObserver(
            ([entry]) => {
                header.classList.toggle("scrolled", !entry.isIntersecting);
            },
            { threshold: 0.1 }
        );
        observer.observe(document.body);

        // Efecto de desplazamiento suave al hacer clic en los enlaces del menú
        function smoothScroll(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        }

        // Delegación de eventos para enlaces de navegación
        document.body.addEventListener("click", function (event) {
            const link = event.target.closest("a.nav-link");
            if (link) smoothScroll.call(link, event);
        });

        // Cambio de opacidad del navbar al hacer scroll
        window.addEventListener("scroll", function() {
            if (window.scrollY > 50) {
                header.classList.add("bg-opacity-90");
            } else {
                header.classList.remove("bg-opacity-90");
            }
        });

        // Menú hamburguesa: abrir/cerrar menú en móviles
        const menuToggle = document.getElementById("menu-toggle");
        const menu = document.getElementById("menu");
        const menuLinks = menu.querySelectorAll("a");

        menuToggle.addEventListener("click", function() {
            menu.classList.toggle("hidden");
        });

        // Cerrar menú al hacer clic en un enlace en móvil
        menuLinks.forEach(link => {
            link.addEventListener("click", function () {
                menu.classList.add("hidden");
            });
        });

        // Formulario de contacto: mostrar mensaje de éxito
        const form = document.getElementById("contactForm");
        const successMessage = document.getElementById("successMessage");

        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Evita envío tradicional del formulario

            // Mostrar el mensaje de éxito
            successMessage.style.display = "block";

            // Limpiar los campos del formulario
            form.reset();

            // Ocultar el mensaje después de 5 segundos
            setTimeout(function() {
                successMessage.style.display = "none";
            }, 5000);
        });
    });