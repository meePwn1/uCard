// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
import { gsap } from "gsap";


const body = document.querySelector('body');
let cx = window.innerWidth / 2;
let cy = window.innerHeight / 2;
let clientX = 0;
let clientY = 0;
const cursor = document.getElementById('cursor');
const follower = document.getElementById('aura');
const links = document.querySelectorAll('a');

if (isMobile.any()) {
	cursor.hidden = true;
	follower.hidden = true;
} else {
	body.addEventListener('mousemove', e => {
		clientX = e.pageX;
		clientY = e.pageY;

		mouseCoord(e);
		cursor.classList.remove('hidden')
		follower.classList.remove('hidden')

		let request = requestAnimationFrame(updateMe)
	})

	function updateMe() {
		let dx = clientX - cx;
		let dy = clientY - cy;
		let tiltx = dy / cy;
		let tilty = dx / cx;
		let radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
		let degree = radius * 12;

		gsap.to('.main__wrapper', {
			transform: `rotate3d(${tiltx}, ${tilty}, 0, ${degree}deg)`,
			duration: 1
		});
	}

	cursor.hidden = false;
	follower.hidden = false;

	let mouseX = 0;
	let mouseY = 0;
	let posX = 0;
	let posY = 0;


	function mouseCoord(e) {
		mouseX = e.pageX;
		mouseY = e.pageY;
	}

	gsap.to({}, {
		duration: 0.01,
		repeat: -1,
		onRepeat: () => {

			posX += (mouseX - posX) / 5;
			posY += (mouseY - posY) / 5;

			gsap.set(cursor, {
				css: {
					left: mouseX,
					top: mouseY
				}
			});

			gsap.set(follower, {
				css: {
					left: posX - 23,
					top: posY - 23
				}
			})
		}
	})

	for (let index = 0; index < links.length; index++) {
		const link = links[index];
		link.addEventListener('mouseover', () => {
			cursor.classList.add('active')
			follower.classList.add('active')
		})

		link.addEventListener('mouseout', () => {
			cursor.classList.remove('active')
			follower.classList.remove('active')
		})
	}

	document.body.addEventListener('mouseout', () => {
		cursor.classList.add('hidden')
		follower.classList.add('hidden')
	})
}