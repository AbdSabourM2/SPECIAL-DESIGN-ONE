// Navbar...
// [01] Click On Menu Toggle => Add & Remove (On) Class From It.
// [02] If Menu Toggle Contains (On) Class => Add Original Height If Not Remove Original Height.

// Select Items
// Settings Box
const btnSett = document.querySelector(".sett-icon");
const settingsBox = document.querySelector(".settings-box");
const settingsIcon = document.querySelector(".sett-icon .icon");

// Nav Bullets
const bullets = document.querySelectorAll(".nav-bullets .bullet");

/// Colors List
const colorsList = document.querySelectorAll(".colors-list li");
const colorsLi = Array.from(colorsList);
// console.log(colorsLi);

// Navbar
const btnMenu = document.querySelector(".menu-toggle");
const links = document.querySelector(".links");
const linksContainer = document.querySelector(".links-container");

// Random Background
const landingPage = document.querySelector(".overlay");
const randomBG = document.querySelectorAll(".bg-btns button");

// Skills
const skills = document.querySelector(".main-skills .skills-container");

// Our Works
const ourWorks = document.querySelectorAll(".box-img img");
const imgs = Array.from(ourWorks);

// Links
const navLinks = document.querySelectorAll(".links a");

// Bullets Options
const bulletsBtns = document.querySelectorAll(".bu-btns button");
const bulletsContainer = document.querySelector(".nav-bullets");

// Loacl Storage
// Color
// Check If There's Local Storage Color Option
const mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
	document.documentElement.style.setProperty("--clr-primary-2", mainColors);

	randomBG.forEach(but => {
		but.addEventListener("click", e => {
			handleActive(e);
		});
	});
}

// Background
// Random Background Option
let bgOption = true;

// Variable To Control The Background Interval
let bgInterval;

// Check If There's Local Storage Random Background Item
const backgroundOption = localStorage.getItem("background_option");
const backgroundImg = localStorage.getItem("background_img");
// Check If Random Background Local Storage Is Not Empty
if (backgroundOption !== null) {
	if (backgroundOption === "false") {
		bgOption = false;

		clearInterval(bgInterval);

		landingPage.style.backgroundImage = `url('imgs/bg-${backgroundImg}.jpg')`;
	}

	// Remove (Active) Class From All Btns
	document.querySelectorAll(".bg-btns button").forEach(el => {
		el.classList.remove("active");
	});

	// Add (Active) Class
	if (backgroundOption === "true") {
		document.querySelector(".bg-btns .yes").classList.add("active");
	} else {
		document.querySelector(".bg-btns .no").classList.add("active");
	}
}

// Event Listeners
// Navbar
btnMenu.addEventListener("click", menuToggle);

// Settings Box
btnSett.addEventListener("click", showSettings);

// Switch Colors
// Loop On All List Of Colors
colorsList.forEach(li => {
	// Click On Every List Colors
	li.addEventListener("click", e => {
		// Set Color On Root
		document.documentElement.style.setProperty(
			"--clr-primary-2",
			e.target.dataset.color
		);

		// Add & Remove (Active) Class
		colorsLi.forEach(el => {
			// Remove (Active) Class From Other Cildrens
			el.classList.remove("active");
		});
		// Add (Active) Class On Target
		e.target.classList.add("active");

		// Set Color On Local Storage
		localStorage.setItem("color_option", e.target.dataset.color);
	});
});

// Bullets Options
let bulletLoacalItem = localStorage.getItem("bullets_options");

if (bulletLoacalItem !== null) {
	bulletsBtns.forEach(btn => {
		btn.classList.remove("active");
	});

	if (bulletLoacalItem === "block") {
		bulletsContainer.style.display = "block";
		document.querySelector(".bu-btns .yes").classList.add("active");
	} else {
		bulletsContainer.style.display = "none";
		document.querySelector(".bu-btns .no").classList.add("active");
	}
}

// Get Array Of Imgs
const imgsArray = ["bg-0.jpg", "bg-1.jpg", "bg-2.jpg", "bg-3.jpg", "bg-4.jpg"];

// Functions
// Navbar
function menuToggle() {
	// Add & Remove (On) Class To Menu Toggle
	btnMenu.classList.toggle("on");

	// Get Height Of Links
	const containerHeight = linksContainer.getBoundingClientRect().height;
	const linksHeight = links.getBoundingClientRect().height;
	// Show Links
	// console.log(linksHeight);
	if (containerHeight === 0) {
		linksContainer.style.height = `${linksHeight}px`;
	} else {
		linksContainer.style.height = "";
	}
	// Fix Settings Icon Height
	if (btnMenu.classList.contains("on")) {
		// If Menu Toggle Has (On) Class => Add 100px and Height Of Links
		btnSett.style.top = `${100 + linksHeight}px`;
	} else {
		// if Menu Toggle has (On) Class => Just Add 100px To Settings Icon
		btnSett.style.top = `${100}px`;
	}
}

// Settings Box
// Show Settings
function showSettings() {
	// Toggle Class fa-spin On Self
	settingsIcon.classList.toggle("fa-spin");
	// Show Settings Box
	settingsBox.classList.toggle("show-sett");
}

// Random Backgorund
randomBG.forEach(but => {
	but.addEventListener("click", e => {
		handleActive(e);

		if (e.target.dataset.background === "yes") {
			bgOption = true;

			randomizeImg();

			// Set Backgound Option On Local Storage
			localStorage.setItem("background_option", true);
		} else {
			bgOption = false;

			clearInterval(bgInterval);

			// Set Backgound Option On Local Storage
			localStorage.setItem("background_option", false);
		}
	});
});

// Function Randomize Imags
function randomizeImg() {
	if (bgOption === true) {
		// Get Random Image Every 5s
		bgInterval = setInterval(() => {
			// Get Random Number
			let randomNumber = Math.floor(Math.random() * imgsArray.length);
			// console.log(randomNumber);

			// Modify Background Image Url
			landingPage.style.backgroundImage = `url('imgs/bg-${randomNumber}.jpg')`;
			localStorage.setItem("background_img", randomNumber);
		}, 10000);
	}
}
randomizeImg();

// Skills
window.onscroll = function () {
	// Skills Offset Top
	let skillsOffsetTop = skills.offsetTop;

	// Skills Outer Height
	let skillsOuterHeiht = skills.offsetHeight;

	// Window Height
	let windowHeight = this.innerHeight;

	// Window ScrollTop
	let windowScrollTop = this.pageYOffset;

	if (
		windowScrollTop + 100 >
		skillsOffsetTop + skillsOuterHeiht - windowHeight
	) {
		const allSkills = document.querySelectorAll("span");
		allSkills.forEach(skill => {
			skill.style.width = `${skill.dataset.progress}%`;
		});
	}
};

// Our Works
imgs.forEach(img => {
	img.addEventListener("click", e => {
		// Create Overlay Element
		let overlay = document.createElement("div");

		// Add Class To Overlay
		overlay.className = "popup-overlay";

		// Add Overlay To The Body
		document.body.appendChild(overlay);

		// Create Popup Box
		let popupBox = document.createElement("div");

		// Add Class To The Popup Box
		popupBox.className = "popup-box";

		// Check If The Image Is Not Null
		if (img.alt !== null) {
			// Create Heading
			let imgHeading = document.createElement("h2");

			// Add Class To The Heading
			imgHeading.className = "heading";

			// Create Text For Heading
			let imgText = document.createTextNode(img.alt);

			// Append The Text To The Heading
			imgHeading.appendChild(imgText);

			// Append The Heading To Popup Box
			popupBox.appendChild(imgHeading);
		}

		// Create The Image
		let popupImg = document.createElement("img");

		// Set Image Source
		popupImg.src = img.src;

		// Add Popup To The Box
		popupBox.appendChild(popupImg);

		// Add The Box To The Body
		document.body.appendChild(popupBox);

		// Create Close Button
		let closeBtn = document.createElement("button");

		closeBtn.textContent = "X";

		// Add Class To The Button
		closeBtn.className = "close-icon";

		// Add The Close Button To The Box
		popupBox.appendChild(closeBtn);
	});
});
document.addEventListener("click", function (e) {
	if (e.target.className == "close-icon") {
		// Remove Popup Box
		e.target.parentNode.remove();

		// Remove Overlay
		document.querySelector(".popup-overlay").remove();
	}
});

// Scroll Function
function scrollInto(elements) {
	elements.forEach(el => {
		el.addEventListener("click", e => {
			e.preventDefault();
			document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
				behavior: "smooth",
			});
		});
	});
}
// Nav Bullets
scrollInto(bullets);
// Links
scrollInto(navLinks);

// Handle Active State
function handleActive(ev) {
	// Add & Remove (Active) Class
	ev.target.parentElement.querySelectorAll(".active").forEach(el => {
		// Remove (Active) Class From Other Cildrens
		el.classList.remove("active");
		// console.log(e);
	});
	// Add (Active) Class On Target
	ev.target.classList.add("active");
}

// Bullets Options
bulletsBtns.forEach(btn => {
	btn.addEventListener("click", e => {
		if (btn.dataset.display === "show") {
			bulletsContainer.style.display = "block";

			// Local Storage
			localStorage.setItem("bullets_options", "block");
		} else {
			bulletsContainer.style.display = "none";

			// Local Storage
			localStorage.setItem("bullets_options", "none");
		}

		handleActive(e);
	});
});

// Reset Options
document.querySelector(".re-btn .reset-options").onclick = function () {
	localStorage.removeItem("color_option");
	localStorage.removeItem("background_option");
	localStorage.removeItem("background_img");
	localStorage.removeItem("bullets_options");

	// Reload Window
	window.location.reload();
};
