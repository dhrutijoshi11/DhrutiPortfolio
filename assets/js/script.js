$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    
});




document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Dhruti | Portfolio";
            $("#favicon").attr("href", "assets/images/profile.png");
        }
        else {
            document.title = "Dhruti joshi";
            $("#favicon").attr("href", "assets/images/profile.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Data Scientist", "Data Analysts","Data Engineer", "ML Engineer", "AI Engineer"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}
function openRepo(repoLink) {
    window.open(repoLink, '_blank');
  }

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .project-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".box-container .slider-scrollbar");
    const scrollbarThumb = document.querySelector(".scrollbar-thumb"); // Correct variable name used

    let maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });

    window.addEventListener("resize", () => {
        maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
        handleSlideButtons();
        updateScrollThumbPosition();
    });

    // Thumb drag functionality
    let isDragging = false;
    scrollbarThumb.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isDragging = true;
        const startX = e.clientX;
        const startLeft = parseInt(window.getComputedStyle(scrollbarThumb).left, 10);
        
        const handleMouseMove = (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                const newLeft = Math.min(Math.max(startLeft + deltaX, 0), sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
                scrollbarThumb.style.left = `${newLeft}px`;
                const newScrollPosition = (newLeft / (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth)) * maxScrollLeft;
                imageList.scrollLeft = newScrollPosition;
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            isDragging = false;
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Initial call to set visibility and thumb position
    handleSlideButtons();
    updateScrollThumbPosition();
};

window.addEventListener("load", initSlider);

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}



/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.projects .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });



function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
    document.body.classList.add('modal-open'); // Disable background scrolling
  
    // Add event listeners to the buttons
    var buttons = modal.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', handleButtonClick);
    });
  }
  
  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
    document.body.classList.remove('modal-open'); // Enable background scrolling
  
    // Remove event listeners to prevent multiple alerts
    var buttons = modal.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.removeEventListener('click', handleButtonClick);
    });
  }
  
  function handleButtonClick(event) {
    var link = event.target.getAttribute('data-link');
    if (link) {
      window.open(link, '_blank');
    } else {
        alert('Coming Soon.....')
    }
  }
  
  window.onclick = function(event) {
    var modals = document.getElementsByClassName("modal");
    for (var i = 0; i < modals.length; i++) {
      if (event.target == modals[i]) {
        modals[i].style.display = "none";
        document.body.classList.remove('modal-open'); // Enable background scrolling
  
        // Remove event listeners to prevent multiple alerts
        var buttons = modals[i].querySelectorAll('.btn');
        buttons.forEach(button => {
          button.removeEventListener('click', handleButtonClick);
        });
      }
    }
  }
  

  
// Get all buttons
const portfolioButtons = document.querySelectorAll('#portfolio-button-container button');

// Get all image items
const imageItems = document.querySelectorAll('.image-item');

// Add click event listener to each button
portfolioButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    portfolioButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to the clicked button
    button.classList.add('active');

    // Get the data-portfolio-section attribute value of the clicked button
    const section = button.getAttribute('data-portfolio-section');

    // If section is 'all', display all image items
    if (section === 'all') {
      imageItems.forEach(item => item.style.display = 'block');
    } else {
      // Otherwise, hide all image items and display only those with matching data-portfolio-section value
      imageItems.forEach(item => {
        if (item.getAttribute('data-portfolio-section') === section) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
  });
});
