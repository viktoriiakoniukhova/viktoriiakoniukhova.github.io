import data from './projects.json' assert {type: 'json'};

    // Delete navigation blocks
const prevArrow = document.querySelector('.swiper-button-prev')
const nextArrow = document.querySelector('.swiper-button-next')

window.addEventListener('load', () => {
    if(window.innerWidth < 600) {
        prevArrow.remove()
        nextArrow.remove()
    }
})

window.addEventListener('resize', () => {
    if(window.innerWidth < 600) {
        prevArrow.remove()
        nextArrow.remove()
    }
})
    // Swiper containers

const swiperContainer = document.querySelector('.swiper-container')
const swiperWrapper = document.querySelectorAll('.swiper-wrapper')[0]

const swiperThumbsContainer = document.querySelector('.swiper-container__thumbs')
const swiperThumbsWrapper = document.querySelectorAll('.swiper-wrapper')[1]

    // Generate swiper content

data.map(({title, href, imgURL, tech, colors, type}) => generateSlide(title, href, imgURL, tech, colors, type))

const swiperThumbs = new Swiper('.swiper__thumbs', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 7,
    touchRatio: 0.2,
    slideToClickedSlide: true,

    loop: true,
    loopedSlides: data.length,
    parallax: true
})

    // Swiper
const swiper = new Swiper('.swiper__main', {

    direction: 'horizontal',
    loop: true,
    loopedSlides: data.length,
    // Pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Events
        // this.activeIndex -> index for looped slides (with dublicates)
        // this.realIndex -> real amount of slides
    on: {
        slideChange: function () {
            const currentActiveSlide = this.slides[this.activeIndex];
            const currentSlideContentHeight = currentActiveSlide.lastElementChild.clientHeight;

            setContentAnimation(currentSlideContentHeight, swiperWrapper)

            const currentSlideColors = data[this.realIndex].colors;
            this.realIndex ? setSwiperThemeColor(currentSlideColors[0]) : setSwiperThemeColor(currentSlideColors[1])
        }
      }
  });

  // Main and thumbs swiper controller
  swiper.controller.control = swiperThumbs;
  swiperThumbs.controller.control = swiper;

  // Open links in new tab

const allLinks = document.querySelectorAll('a');

allLinks.forEach(link => link.addEventListener('click', ev => { 
    preventDefault();
    window.open(ev.target.href, '_blank')})
)

    // Generate slide

function generateSlide(title, href, imgURL, tech, colors, type) {
    const slide = document.createElement('div')
    slide.classList.add('swiper-slide', 'slide')

    const slideContent = createSlideContent(colors, title, href, tech);

    const slideImage = type === 'main'
        ?  createSlideImage(slide, href, title, imgURL, true)
        :  createSlideImage(slide, href, title, imgURL)

    slide.append(slideImage, slideContent)
    swiperWrapper.append(slide)

    type === 'main' 
        ? swiperThumbsWrapper.append(createSlideThumb(imgURL, true))
        : swiperThumbsWrapper.append(createSlideThumb(imgURL))

    // Hide "More Info" panel
    slideContent.style.top = -slideContent.offsetHeight + 'px'
}

function createSlideImage(slide, href, title, imgURL, main = false) {

    /* Clickable slide Image*/

    const slide__image = document.createElement('div')
    slide__image.className = main ? 'slide__main_image' : 'slide__image'

    const slide__image_link = document.createElement('a')
    slide__image_link.setAttribute('href', href)
    slide__image_link.setAttribute('title', title)
    slide__image_link.setAttribute('target', ' _blank')

    const slide__image_img = document.createElement('img')
    slide__image_img.src = imgURL

    slide__image_link.append(slide__image_img)

    slide__image.append(slide__image_link)
    slide.append(slide__image)

    /* Main slide (github logo) animation */

    if(main) {
        slide.addEventListener('mouseenter', () => {
            slide__image_link.classList.add('heartbeat')
        })
    
        slide.addEventListener('mouseleave', () => {
            slide__image_link.classList.remove('heartbeat')
        })
    }

    return slide__image
}

function createSlideContent(colors, title, href, tech) {
    const slide__content = document.createElement('div')
    slide__content.classList.add('slide__content')
    slide__content.style.backgroundColor = colors[0]
    slide__content.style.color = colors[2]

    const slide__content_link = document.createElement('div')
    slide__content_link.className = 'slide__content-link'
    slide__content_link.style.borderColor = colors[1]

    const slide__content_link__a = document.createElement('a')
    slide__content_link__a.innerHTML = `${title}`
    slide__content_link__a.setAttribute('title', title)
    slide__content_link__a.setAttribute('href', href)
    slide__content_link__a.setAttribute('target', ' _blank')
    slide__content_link__a.style.color = colors[1]

    const slide__content_link__a_span = document.createElement('span')
    slide__content_link__a_span.className = 'slide__content-link_a__span'

    slide__content_link__a.append(slide__content_link__a_span)
    slide__content_link.append(slide__content_link__a)
    slide__content.append(slide__content_link)

    const slide__content_technologies = document.createElement('div')
    slide__content_technologies.className = 'slide__content-technologies'

    tech.map(curTech => {
        const newTech = document.createElement('div')
        const techText = document.createElement('p')
        techText.innerHTML = curTech

        newTech.style.backgroundColor = colors[1]
        newTech.append(techText)
        slide__content_technologies.append(newTech)
    })

    slide__content.append(slide__content_technologies)

    // Animations for "More Info" panel

    slide__content.addEventListener('mouseover', () => {
        slide__content.classList.remove('slide-top')
        slide__content.classList.add('slide-bottom')

        slide__content_link.classList.add('bounce-top')
        slide__content_technologies.classList.add('bounce-top')
    })

    slide__content.addEventListener('mouseleave', () => {
        slide__content.classList.remove('slide-bottom')
        slide__content.classList.add('slide-top')

        slide__content_link.classList.remove('bounce-top')
        slide__content_technologies.classList.remove('bounce-top')
    })

    return slide__content
}

function createSlideThumb(imgURL, main = false) {
    /* Non-clickable slide Image */

    const slide = document.createElement('div')
    slide.classList.add('swiper-slide', 'slide')

    const slide__image = document.createElement('div')
    slide__image.className = main ? 'slide__main_image' : 'slide__image_thumb'
    slide.setAttribute('data-swiper-parallax-opacity', '0.5')
    // slide__image.className = 'slide__image_thumb'

    const slide__image_img = document.createElement('img')
    slide__image_img.src = imgURL

    slide__image.append(slide__image_img)
    slide.append(slide__image)
    return slide
}

function setContentAnimation(heightOfContent, container) {

    const cssAnimation = document.createElement('style');

    const keyframes = 
    `
    @-webkit-keyframes slide-bottom {
        0% {
          -webkit-transform: translateY(0);
                  transform: translateY(0);
        }
        100% {
          -webkit-transform: translateY(${heightOfContent}px);
                  transform: translateY(${heightOfContent}px);
        }
      }
      @keyframes slide-bottom {
        0% {
          -webkit-transform: translateY(0);
                  transform: translateY(0);
        }
        100% {
          -webkit-transform: translateY(${heightOfContent}px);
                  transform: translateY(${heightOfContent}px);
        }
      }

    @-webkit-keyframes slide-top {
    0% {
        -webkit-transform: translateY(${heightOfContent}px);
                transform: translateY(${heightOfContent}px);
    }
    100% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
    }
    }
    @keyframes slide-top {
    0% {
        -webkit-transform: translateY(${heightOfContent}px);
                transform: translateY(${heightOfContent}px);
    }
    100% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
    }
    }
      
    `
    const rules = document.createTextNode(keyframes);

    cssAnimation.append(rules);
    container.append(cssAnimation);
}

function setSwiperThemeColor(color) {
    swiperContainer.style.setProperty('--swiper-theme-color', color);
}