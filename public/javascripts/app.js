$(function () {
	var mainSlider = $('#mainSlider');
	if (mainSlider.length > 0) {
		mainSlider.slick({
			dots: true,
			nextArrow: '<div class="c-mainSlider__arrow c-mainSlider__arrow--next"><span></span></div>',
			prevArrow: '<div class="c-mainSlider__arrow c-mainSlider__arrow--prev"><span></span></div>'
		})
	}

	$('.c-accordion__label').on('click', function(e) {
		e.preventDefault();
		var accordion = $(this).closest('.c-accordion__item');
		var content = accordion.find('.c-accordion__content');
		accordion.toggleClass('c-accordion__item--active');
		if ($(accordion).hasClass('c-accordion__item--active')) {

			$(content).stop(true, true).slideDown(300)
		} else {
			$(content).stop(true, true).slideUp(275)
		}
	});
});