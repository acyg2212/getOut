import React from 'react';

const ImageSlideShow = ({ imageArray }) => {
    console.log(imageArray)
    let slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        // let slides = document.getElementsByClassName("mySlides");
        // let dots = document.getElementsByClassName("demo");

        if (n > imageArray.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = imageArray.length }
        for (i = 0; i < imageArray.length; i++) {
            imageArray[i].style.display = "none";
        }
        // for (i = 0; i < dots.length; i++) {
        //     dots[i].className = dots[i].className.replace(" active", "");
        // }
        imageArray[slideIndex - 1].style.display = "block";
        // dots[slideIndex - 1].className += " active";

    }



    return (

        <div class="container">
            {imageArray.length > 0 ? imageArray.map((image, i) => {
                return <div className='mySlides'>
                    <div className='numbertext'>{i + 1}/{image.length}</div>
                    <img src={image.URL} alt={image.Title} onClick={currentSlide(i + 1)} />
                </div>
            }
            ) : ""}

            {/* <!-- Next and previous buttons --> */}
            <a class="prev" onclick={plusSlides(-1)}>&#10094;</a>
            <a class="next" onclick={plusSlides(1)}>&#10095;</a>



        </div>
    )
}

export default ImageSlideShow;