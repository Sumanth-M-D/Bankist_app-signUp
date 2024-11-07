// From mdn Docs -> example for create element and append child 
// Write the below code on your own
      // function generateTable() {
      //   // creates a <table> element and a <tbody> element
      //   const tbl = document.createElement("table");
      //   const tblBody = document.createElement("tbody");

      //   // creating all cells
      //   for (let i = 0; i < 2; i++) {
      //     // creates a table row
      //     const row = document.createElement("tr");

      //     for (let j = 0; j < 2; j++) {
      //       // Create a <td> element and a text node, make the text
      //       // node the contents of the <td>, and put the <td> at
      //       // the end of the table row
      //       const cell = document.createElement("td");
      //       const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
      //       cell.appendChild(cellText);
      //       row.appendChild(cell);
      //     }

      //     // add the row to the end of the table body
      //     tblBody.appendChild(row);
      //   }

      //   // put the <tbody> in the <table>
      //   tbl.appendChild(tblBody);
      //   // appends <table> into <body>
      //   document.body.appendChild(tbl);
      //   // sets the border attribute of tbl to '2'
      //   tbl.setAttribute("border", "2");
      // }





'use strict';

///////////////////////////////////////
//Dom elements
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const btnCloseModal = document.querySelector('.btn--close-modal');
  const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

  const learnMorebtn = document.querySelector('.btn--scroll-to');
  const section1 = document.querySelector('#section--1');

  const nav = document.querySelector('.nav');

  const tabs =document.querySelectorAll('.operations__tab');
  const tabsContainer = document.querySelector('.operations__tab-container');
  const tabsContent = document.querySelectorAll('.operations__content');




// Modal window
  const openModal = function (event) {
    event.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }; 

  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  btnsOpenModal.forEach(button => {
    button.addEventListener('click', openModal);
  })

  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });






// nav Bar 
    //1. smooth scrolling 
      // solution 1 (ineffecient )
        // document.querySelectorAll('.nav__link').forEach(
        //   (elem)=> elem.addEventListener('click',
        //     function(event){
        //       event.preventDefault();    //using 'href='#section--1' attribute will cause the default quick scrolling , when clicked 
        //       const id = this.getAttribute('href');
        //       document.querySelector(id).scrollIntoView({behavior: 'smooth'});
        //   }));

      
      //solution 2 (using 'Event delegation')
        document.querySelector('.nav__links').addEventListener('click', function(event){

        //matching required element
          if(event.target.classList.contains('nav__link')) {
            event.preventDefault();
          const id = event.target.getAttribute('href');
          document.querySelector(id).scrollIntoView({behavior: 'smooth'});
          }
        });


    //2. hover-> menu-fade effect
        function handleHover(event, opacity){
          if(event.target.classList.contains('nav__link')){
            const link = event.target;
            const siblings = link.closest('.nav').querySelectorAll('.nav__link');
            const logo = link.closest('.nav').querySelector('img');
      
            siblings.forEach(el=> {
              if(el !== link){
                el.style.opacity = opacity;
              }
            })
            logo.style.opacity = opacity;
          }
        }


      nav.addEventListener('mouseover', function(event){
        handleHover(event, 0.5);
      });    

      nav.addEventListener('mouseout', function(event){
      handleHover(event, 1);
      }); 



    //3. Sticky navigation
      // //a. solution 1 (inefficient)
      //   const initialCoords = section1.getBoundingClientRect();  // getting the coordinates of section 1
      //   console.log(initialCoords);
      //   window.addEventListener('scroll', function(event){
      //     if(window.scrollY > initialCoords.top){      //note:- scrollX = pageXOffset  & scrollY = pageYOffset
      //       nav.classList.add('sticky');
      //     } else nav.classList.remove('sticky');
      //   });

      //   /*note: using scroll event is not an optimum solution. '.' 
      //     scroll event fires all the time, even when there is a small scroll */
      
      
      //b. solution2 (Intersection Observer API)
        const header = document.querySelector('.header');
        const navHeight = nav.getBoundingClientRect().height;

        const obsCallback =function(entries, observer){  //1 entry for observing one threshold
          if(!entries[0].isIntersecting){
            nav.classList.add('sticky');
          } else nav.classList.remove('sticky');
        }
      
        let obsOptions ={
          root: null,
          rootMargin: `-${navHeight}px`,
          threshold: 0, 
        }

        const observer = new IntersectionObserver(obsCallback, obsOptions);      
        observer.observe(header);
      









// Header
  //1. Implementing smooth scrolling
    learnMorebtn.addEventListener('click', function(event){
      section1.scrollIntoView({behavior: 'smooth'});    

        // //old method
        //   const s1Cords = section1.getBoundingClientRect(); //getting coordinates of section 1
        //   console.log(s1Cords);
        //     console.log(event.target.getBoundingClientRect()); //getting coordinates of 'learn more' button 
          
        //     console.log('Current scroll coordinates:', window.pageXOffset, window.pageYOffset); //getting the coordinates of the scrollbar
        //     console.log('height & width of viewport: ', 
        //       document.documentElement.clientHeight,
        //       document.documentElement.clientWidth,
        //     );                                         // getting the curentheight and width of the clients viewport

        //   //scrolling
        //   window.scrollTo({
        //     left: s1Cords.left + window.pageXOffset ,
        //     top: s1Cords.top+ window.pageYOffset,
        //     behavior: 'smooth',
        //   });
    });










// Section 1 -> features
  //1. Lazy loading
    const imgTargets = document.querySelectorAll('img[data-src]')
    
    const loadImg = function(entries, observer){
      const [entry] = entries;

      if(!entry.isIntersecting) return;
        
      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener('load', function(){
        entry.target.classList.remove('lazy-img');  
      });
      observer.unobserve(entry.target);
    };

    const optionsImg = {
      root:null,
      rootMargin: '200px',
      threshold: 0.5
    }

    const imgObserver = new IntersectionObserver(loadImg, optionsImg);

    imgTargets.forEach(img=> imgObserver.observe(img));










//Section 2 ->Operations
  //Tabbed component
    tabsContainer.addEventListener('click', function(event){
      const clicked = event.target.closest('.operations__tab');  

      //guard clause
        //if(!clicked) return; // alternative to below if condition

      if(clicked){
        // activeating tab
        tabs.forEach(tab=> tab.classList.remove('operations__tab--active'));
        clicked.classList.add('operations__tab--active');

        //displaying particular content 
        tabsContent.forEach(content=> content.classList.remove('operations__content--active'));
        document.querySelector(`.operations__content--${clicked.dataset.tab}`)
                .classList.add('operations__content--active');        
      }
    })






// Section 3 -> testimonials
  //1. Slider component
    function slider(){
      const slides = document.querySelectorAll('.slide');
      const btnLeft = document.querySelector('.slider__btn--left');
      const btnRight = document.querySelector('.slider__btn--right');
      const dotContainer =document.querySelector('.dots');

      let currentSlide = 0;
      const maxSlide = slides.length - 1;

      //functions
      function goToSlide(currentSlide){
        slides.forEach((slide,i) => {
          slide.style.transform =`translateX(${(i - currentSlide)*100}%)`;
        });
      }
      function nextSLide(){
        currentSlide = currentSlide === maxSlide ? 0 : currentSlide+1;
        goToSlide(currentSlide);
        activateDot(currentSlide);
      }
      function prevSlide(){
        currentSlide = currentSlide === 0 ? maxSlide : currentSlide-1;
        goToSlide(currentSlide);
        activateDot(currentSlide);
      }
      function createDots(){
        slides.forEach((_, i) =>{
          dotContainer.insertAdjacentHTML('beforeend', 
          `<button class="dots__dot" data-slide="${i}"></button>`
          );
        })
      }
      function activateDot(currentSlide){
        document.querySelectorAll('.dots__dot')
                .forEach(dot=> dot.classList.remove('dots__dot--active'));
        document.querySelector(`.dots__dot[data-slide="${currentSlide}"]`)
                .classList.add('dots__dot--active');
      }

      function init(){
        createDots();
        goToSlide(0);
        activateDot(0);
      }
      init();
      

      
      //event handlers
      btnRight.addEventListener('click', nextSLide) ;
      btnLeft.addEventListener('click', prevSlide);

      document.addEventListener('keydown', function(event){
        if(event.key === 'ArrowLeft')   prevSlide();
        
        if(event.key === 'ArrowRight')  nextSLide();
      });

      dotContainer.addEventListener('click', function(event){
        if(event.target.classList.contains('dots__dot'));
        const {slide} =  event.target.dataset;
        goToSlide(slide);
        activateDot(slide);
      });
    }
    slider();






// Section4 --> sign up
// footer section


// Whole web page
  //1. revealing elements on scroll
    const allSections = document.querySelectorAll('.section');
    const revealSection = function(entries, observer){
      const [entry] = entries; 

      //guard clause 
      if(!entry.isIntersecting) return;
  
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
  
    }
    const options = {
      root: null,
      rootMargin:'0px',
      threshold: 0.15,
    }
    
    const sectionObserver = new IntersectionObserver(revealSection, options);

    allSections.forEach(section => {
      sectionObserver.observe(section)
      section.classList.add('section--hidden');
    });












////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//Lectures

  // //I. Seleecting, creating and deleting elements
  //   //1. Selecting elements
  //     console.log(document);
  //     console.log(document.documentElement);  //root node
  //     console.log(document.head);
  //     console.log(document.body);

  //     const header = document.querySelector('.header');
  //     const sections = document.querySelectorAll('.section');
      
  //      // returning live html collection 
  //      console.log(document.getElementsByClassName('nav__item'));
  //      console.log(document.getElementsByTagName('button'));

  //     // Returning nodelist of element objects (static / non-live)
  //     console.log(document.querySelectorAll('.nav__item'));
  //     console.log(document.querySelectorAll('button'));
      

  //     //returning the first element object of particular selector
  //     console.log(document.querySelector('botton'));  //returns a first element
  //     console.log(document.getElementById('section--1'));
     


  //2. Creating and inserting elements
    // 2.1 insertAdjacentHTML
          // const html = 
          // `<div class="movements__row">
          //   <div class="movements__type movements__type--${type}"> ${i+1} ${type} </div>
          //   <div class="movements__date">${displayDate}</div>
          //   <div class="movements__value"> ${formattedMovement} </div>

          // </div>` ;
          // containerMovements.insertAdjacentHTML('afterbegin', html);

    // //2.2 createElement 
    //   //creating an element
    //   const message = document.createElement('div');
    //   message.classList.add('cookie-message');
    //   message.textContent = 'We use cookies for functionalities and analytics!';
    //   message.innerHTML = `We use cookies for functionalities and analytics! 
    //                       <button class = 'btn btn--close--cookie'> Got it </button>`
      
    //   const header2 = document.querySelector('.header')

    //   // inserting the element as the first child of the target element 
    //   header2.prepend(message); 
      
      // // inserting the element as the last child of the target element
      // header2.append(message);  //or .appendChild(message) -> old method

      // // cloning the element and appending it
      // header2.prepend(message.cloneNode(true));

      // // Inserting the element before the target element -> as a sibling
      // header.before(message);

      // // Inserting the element before the target element -> as a sibling
      // header.after(message);
      

  // //3. Deleting elements --> target_element.remove();
  //   document.querySelector('.btn--close--cookie').addEventListener('click', function(){
  //     message.remove();
  //   });


    // //removeChild -> old method
    // message.parentElement.removeChild(message);







  // //II. Styles, attributes and classes
  //   //1. Styles 
  //     //1.1 inline styles
  //     message.style.backgroundColor = '#37383d';
  //     message.style.width = '120%';

  //     //1.2. accesseing all styles
  //     console.log(getComputedStyle(message).color);
  //     console.log(getComputedStyle(message).height); 

  //     //1.3 
  //     message.style.height = (parseFloat(getComputedStyle(message).height, 10) + 30) +'px';
  //     console.log(message.style.height);

  //     //1.4 CSS custom properties / variables
  //       document.documentElement.style.setProperty('--color-primary', 'orangered');


  //   //2. Attributes
  //     //2.1 getting and setting the properties using dot notation
  //       const logo = document.querySelector('.nav__logo');
  //       console.log(logo.alt);
  //       console.log(logo.src);
  //       console.log(logo.className);

  //       //cannot access the userDefined properties using dot notation
  //         console.log(logo.designer);

  //       logo.alt = 'Beautiful minimalist logo';

  //     //2.2 getAttribute, setAttribute
  //       console.log(logo.getAttribute('designer'));

  //       logo.setAttribute('Company', 'Bankist');
 
  //       console.log(logo.getAttribute('src'));   //relative url
  //       console.log(logo.src);                  //absolute url

  //       const link = document.querySelector('.nav__link--btn');
  //       console.log(link.href);                  //absolute url
  //       console.log(link.getAttribute('href'));  // relative url

  //     //2.3 Data attributes
  //       console.log(logo.dataset.versionNumber);  //property--> data-version-number = '3.0' 


  //   //3. classes 
  //     logo.classList.add('c');
  //     logo.classList.remove('c');
  //     logo.classList.toggle('c');
  //     logo.classList.contains('c');

  //     // logo.className = 'sumanth' -> replace all the class 






// //III. types event Handlers
//     const h1 = document.querySelector('h1');
      
//     //1. addEventListner and removeEventListener
//       function alerth1(event){
//         alert('addEventListner: Great!');
//       }
//       h1.addEventListener('mouseenter',alerth1);
//       setTimeout(()=> h1.removeEventListener('mouseenter', alerth1), 2000);
      
      

//     //2. onevent property --> present in every event (old method)
//       h1.onmouseenter = function(event){
//         alert('addEventListner: Great!')
//       };



//     //3. using html attribuite --> should not be used
//       // <h1 onclick="alert('html alert')">
        



// //IV. Event propagation
//   //1. Event bubbling
//        const randomNumber = (min, max)=> Math.floor(Math.random()*(max-min+1))+ min;
//        const randomColor = ()=> `rgb(${randomNumber(0,255)}, ${randomNumber(0,255)}, ${randomNumber(0,255)})`;

//       //child element
//       document.querySelector('.nav__link').addEventListener('click', function(event){
//         console.log(`event target: `, event.target, 
//                     `event current Target (child): `, event.currentTarget);
//         console.log(event.currentTarget === this);
//         this.style.backgroundColor = randomColor();

//         // Stopping the event propegation 
//            //event.stopPropagation();
//       });

//       //parent element
//       document.querySelector('.nav__links').addEventListener('click', function(event){
//       console.log(`event target: `, event.target, 
//                     `event current Target (parent): `, event.currentTarget);
//         console.log(event.currentTarget === this);
//         this.style.backgroundColor = randomColor();
//       });

//       //grandparent element
//       document.querySelector('.nav').addEventListener('click', function(event){
//         console.log(`event target: `, event.target, 
//                     `event current Target (grandparent): `, event.currentTarget);
//         console.log(event.currentTarget === this);
//         this.style.backgroundColor = randomColor();
//       });


  // //2. capturing phase  -> (not used often)
  //     //child element
  //     document.querySelector('.nav__link').addEventListener('click', function(event){
  //       console.log(`event target: `, event.target, 
  //                   `event current Target (child): `, event.currentTarget);
  //     }, true);

  //     //parent element
  //     document.querySelector('.nav__links').addEventListener('click', function(event){
  //       console.log(`event target: `, event.target, 
  //                   `event current Target (parent): `, event.currentTarget);
  //     },true);

  //     //grandparent element
  //     document.querySelector('.nav').addEventListener('click', function(event){
  //       console.log(`event target: `, event.target, 
  //                   `event current Target (grandparent): `, event.currentTarget);
  //     }, true);









// //V. DOM traversing
//   const h1 = document.querySelector('h1');
  
//   //1. Traversing down the tree from particular element
//     //a. descendents
//       console.log(h1.querySelectorAll('.highlight'));

//     //b. Only direct children
//       console.log(h1.childNodes);  // all types of nodes
//       console.log(h1.children);   // only html element nodes

//     //c. firstElementChild and lastElementChild
//       h1.firstElementChild.style.color = 'white';    //first html child node
//       console.log(h1.firstElementChild);

//       h1.lastElementChild.style.color = 'orangered';  //last html child node
//       console.log(h1.lastElementChild);


//   //2. Traversing up the tree from particaular element
//     //a. to get parent / direct ancestor
//       console.log(h1.parentNode);
//       console.log(h1.parentElement);

//     //b. to get closest ancestor--> 
          /* 1. return the nodelist similar to queryselectorAll
             2. returns the closest ancestor, including itself, 
                corresponding to the particular selector.
             3. returns null if the element for the selector is not found */ 
//       h1.closest('.header').style.background ='var(--color-tertiary-opacity)';

//       h1.closest('h1').style.background ='var(--color-secondary)';


//   //3. Traversing sideways => only direct siblings
//     //a. html siblings
//       console.log(h1.previousElementSibling);  
//       console.log(h1.nextElementSibling);

//     //b. all types of sinlings
//       console.log(h1.previousSibling);
//       console.log(h1.nextSibling);

//     //c. trick to access all the siblings
//       console.log(h1.parentElement.children);
//       [...h1.parentElement.children].forEach(el => {
//         if(el !== h1){
//           el.style.transform = 'scale(0.5)';
//         }
//       });
















//VI. Lifecycle DOM events
  /* 1. DOMContentLoaded -> fired by the document ASA when the html is completly 
        parsed (converted into dom tree) and script is completly loaded */
    
    document.addEventListener('DOMContentLoaded', function(event){
      console.log(event);
    });

  //2. Load event --> loading of html and images
    window.addEventListener('load', function(event){
      console.log(event);
    });
    
  //3. beforeUnloadEvent --> created imediatly user exits the page
    window.addEventListener('beforeUnloadEvent', function(event){
      event.preventDefault();
      console.log(event);
      event.returnValue = '';
    });



//VII. Efficient script loading: defer and async  -->theory notes
