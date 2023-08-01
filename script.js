const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  navToggle.classList.toggle("active");
});

// Get all navigation links
const navLinks = document.querySelectorAll(".nav-menu li a");

// Loop through each link and add a click event listener
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Prevent the default link behavior (page scroll)
    event.preventDefault();

    // Remove the 'active' class from all links
    navLinks.forEach((link) => link.classList.remove("active"));

    // Add the 'active' class to the clicked link
    link.classList.add("active");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 80; // Adjust the offset if needed (e.g., to account for a fixed navbar)
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scroll({
        top,
        behavior: "smooth",
      });
    }
  });
});

const h2Elements = document.querySelectorAll(".info h2");
const texts = ["Paul Boncales"];

let h2Index = 0; // Current index of the h2 element in the array
let charIndex = 0; // Current character index in the text

function typeH2() {
  const currentText = texts[h2Index];
  const currentH2 = h2Elements[h2Index];

  // Display the next character in the h2 element
  currentH2.innerHTML = currentText.slice(0, charIndex + 1);
  charIndex++;

  if (charIndex <= currentText.length) {
    setTimeout(typeH2, 100); // Continue typing if there are more characters
  } else {
    // Typing of current h2 element is complete
    if (h2Index === texts.length - 1) {
      // If this is the last element in the texts array, stop here
      return;
    }

    // Move to the next h2 element in the array
    h2Index++;
    charIndex = 0; // Reset charIndex to start typing the next h2 element from the beginning
    setTimeout(typeH2, 1000); // Wait for 1 second before typing the next h2 element
  }
}

// Start the typing effect
setTimeout(typeH2, 1500);

function scrollToContact() {
  const contactSection = document.getElementById("contact");
  contactSection.scrollIntoView({ behavior: "smooth" });
}

function sendEmail() {
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };
  const serviceId = "service_770uovd";
  const templateId = "template_9ijaazm";

  emailjs
    .send(serviceId, templateId, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
      console.log(res);

      Swal.fire({
        icon: "success",
        title: "Message sent succesfuly!",
      });

      btn.classList.remove("ready");
    })

    .catch((err) => console.log(err));
}

const contact = document.getElementById("contact");
const btn = document.getElementById("btn");
const requiredElements = contact.querySelectorAll(
  "input[required], textarea[required]"
);

requiredElements.forEach((element) => {
  element.addEventListener("input", checkInputs);
});

function checkInputs() {
  const areAllInputsFilled = Array.from(requiredElements).every(
    (element) => element.value.trim() !== ""
  );
  btn.disabled = !areAllInputsFilled;

  if (areAllInputsFilled) {
    btn.classList.add("ready");
  } else {
    btn.classList.remove("ready");
  }
}

contact.addEventListener("submit", function (event) {
  if (
    !Array.from(requiredElements).every(
      (element) => element.value.trim() !== ""
    )
  ) {
    event.preventDefault(); // Prevent form submission
    Swal.fire({
      icon: "error",
      title: "Form Submission Error",
      text: "Please fill in all the required fields before submitting the form.",
    });
  }
});
