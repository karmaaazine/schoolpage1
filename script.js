document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    let currentPosition = 0;
    const slideWidth = 270; // 250px width + 20px gap
    const visibleSlides = 4;
    const maxPosition = -(slides.length - visibleSlides) * slideWidth;

    function moveCarousel(direction) {
        if (direction === 'next' && currentPosition > maxPosition) {
            currentPosition -= slideWidth;
        } else if (direction === 'prev' && currentPosition < 0) {
            currentPosition += slideWidth;
        }
        
        // Apply the transform
        track.style.transform = `translateX(${currentPosition}px)`;
        
        // Update button states
        prevButton.style.opacity = currentPosition >= 0 ? '0.5' : '1';
        nextButton.style.opacity = currentPosition <= maxPosition ? '0.5' : '1';
    }

    // Add click event listeners
    nextButton.addEventListener('click', () => moveCarousel('next'));
    prevButton.addEventListener('click', () => moveCarousel('prev'));


    // Add lights
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(5, 5, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(pointLight, ambientLight);

    // Load GLB model
    const loader = new THREE.GLTFLoader();
    loader.load(
        'model/school supply.glb', // Path to your model
        function (gltf) {
            const model = gltf.scene;
            // Center and scale the model
            model.scale.set(1.5, 1.5, 1.5);
            scene.add(model);

            // Optional: Auto-rotate the model
            function animate() {
                requestAnimationFrame(animate);
                model.rotation.y += 0.005;
                renderer.render(scene, camera);
            }
            animate();
        },
        // Loading progress
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Error handling
        function (error) {
            console.error('An error occurred loading the model:', error);
        }
    );

    camera.position.z = 5;

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.top = '-80px'; // Adjust this value to match the header's height
        } else {
            // Scrolling up
            header.style.top = '0';
        }

        lastScrollTop = scrollTop;
    });

    const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});
});
