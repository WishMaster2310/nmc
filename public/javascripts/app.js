$(function () {
	var mainSlider = $('#mainSlider');
	if (mainSlider.length > 0) {
		mainSlider.slick({
			dots: true,
			nextArrow: '<div class="c-mainSlider__arrow c-mainSlider__arrow--next"><span></span></div>',
			prevArrow: '<div class="c-mainSlider__arrow c-mainSlider__arrow--prev"><span></span></div>'
		})
	}
});