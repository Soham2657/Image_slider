//references from dom in js elements
const slideWrapper=document.getElementById("sliderWrapper");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const dots = document.querySelectorAll(".dot");
//initialize
isPlaying=false;
let autoPlayInterval;
let currentSlide = 0;  // Which slide we're currently showing (0-4)
let totalSlides = 5;
//gotoSlide function
function goToSlide(slideIndex){
// Each slide is 20% width, so slide 0 = 0%, slide 1 = -20%, etc.
const translateX = -slideIndex * 20;
slideWrapper.style.transform=`translate(${translateX}%)`;
currentSlide=slideIndex;
 updateDots();
}
function nextSlide(){
    if(currentSlide>=totalSlides-1){
        goToSlide(0);
    }
    else{
        goToSlide(currentSlide+1);
    }
}
function prevSlide(){
     if (currentSlide <= 0) {
                goToSlide(totalSlides - 1);//last slide if we press prev button in slide 1
            } else {
                goToSlide(currentSlide - 1);
            }
}
function updateDots(){
    dots.forEach((dot,index)=>{
if(index===currentSlide){
            dot.classList.add('active');
        }else{
            dot.classList.remove('active');
        }
    })
}
 function startAutoPlay(){
    if(!isPlaying){
        autoPlayInterval=setInterval(nextSlide, 3000);
        isPlaying=true;
    }
 }
 function stopAutoPlay(){
if(autoPlayInterval){
    clearInterval(autoPlayInterval);
    isPlaying=false;
}
 }   
//just adding event listeners to all buttons 
nextBtn.addEventListener('click', function() {
            stopAutoPlay(); // Stop auto-play when user manually navigates
            nextSlide();
        });

        prevBtn.addEventListener('click', function() {
            stopAutoPlay(); // Stop auto-play when user manually navigates
            prevSlide();
        });

        // Control button events
        playBtn.addEventListener('click', startAutoPlay);
        pauseBtn.addEventListener('click', stopAutoPlay);

        // Dot navigation events
        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                stopAutoPlay(); // Stop auto-play when user clicks a dot
                goToSlide(index); // Go to the slide corresponding to the clicked dot
            });
        });
 // Keyboard navigation
        document.addEventListener('keydown', function(event) {
            // Check which key was pressed
            if (event.key === 'ArrowLeft') {
                stopAutoPlay();
                prevSlide();
            } else if (event.key === 'ArrowRight') {
                stopAutoPlay();
                nextSlide();
            } else if (event.key === ' ') { // Spacebar
                event.preventDefault(); // Prevent page scrolling
                if (isPlaying) {
                    stopAutoPlay();
                } else {
                    startAutoPlay();
                }
            }
        });

        // Mouse hover events - pause auto-play when hovering
        const sliderContainer = document.querySelector('.slide-container');
        
        sliderContainer.addEventListener('mouseenter', function() {
            // When mouse enters the slider area, temporarily stop auto-play
            if (isPlaying) {
                clearInterval(autoPlayInterval);
            }
        });

        sliderContainer.addEventListener('mouseleave', function() {
            // When mouse leaves, restart auto-play if it was playing
            if (isPlaying) {
                autoPlayInterval = setInterval(nextSlide, 3000);
            }
        });

        // 8. INITIALIZATION
        // Set up the initial state when the page loads
        goToSlide(0);  // Start with the first slide
        startAutoPlay(); // Begin auto-play        