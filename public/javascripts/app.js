(function() {
	this.nmcApp = {
		coldPalit: ['#6da1cd','#a6cbeb', '#d9edfe', '#d2dde6', '#a6cbeb', '#ecf5fd', '#99b4cc'],
		tabPrefix: 'nmc_tab',
		tabCallbacks: {
		},
		showTab: function(tab) {
			var target, 
					tabClass = 'c-tabs__menu-item--active', 
					tabContent = 'c-tabs__unit--active',
					current, 
					cb;
			if (!tab) {
				var tab = $('.c-tabs__menu-item').first().attr('data-tab')
			}
			current = $('.c-tabs__menu-item[data-tab='+ tab +']');
			target = '#' + nmcApp.tabPrefix +'_' + tab;

			if ($(target).length === 0) {
				console.error('=> Tab error. \ncan\'t find tabContent with id ' + target)
				return
			}

			window.location.hash = tab;

			current.addClass(tabClass)
				.siblings().removeClass(tabClass);

			$(target).addClass(tabContent)
				.siblings().removeClass(tabContent);

			try	{
				cb = eval(current.attr('data-cb'));
			} catch (e) {
				cb = null;
				console.error('OOps.. Error occured while tab callback\'s function... see status below: \n' + e)
			}

			if (!!cb) {
				cb()
			}
		},
		initTabs: function(tab) {
			var defaultTab = $('.c-tabs__menu-item').first();
			var tab = window.location.hash ? (window.location.hash).slice(1): defaultTab.attr('data-tab');
			this.showTab(tab);
		},
		slickOpts: {
			dots: true,
			nextArrow: '<div class="c-mainSlider__arrow c-mainSlider__arrow--next"><span></span></div>',
			prevArrow: '<div class="c-mainSlider__arrow c-mainSlider__arrow--prev"><span></span></div>'
		},
		drawPieChart: function (data, placeholder, opts) {
			var legendPlaceholder = $(placeholder).closest('.c-plot__wrapper').find('.c-plot__legend');
			opts.legend.container = $(legendPlaceholder);

			$.plot(placeholder, data, opts);

			$(placeholder).append('<div class="c-plot__tip"></div>');

			var ofset = $(placeholder).offset();
			var tip = $(placeholder).find('.c-plot__tip');

			$(placeholder).bind("plothover", function(event, pos, obj) {
				if (!obj) {
					return;
				}

				$(tip).css({
					'display': 'block',
					'top': Math.round(pos.pageY - ofset.top),
					'left': Math.round(pos.pageX - ofset.left)
				})

				$(tip).html("<span>" + obj.series.label + " " + Math.round(obj.series.percent) + " % </span>");
			})

			.bind('mouseleave', function() {
				$(tip).hide();
			})
		},
		smallTab: function(el) {
			var target = $(el).attr('data-tab');
			var tabClass = 'c-smalltab__unit--active';
			var tabMenuClass = 'c-smalltab__menu-item--active';

			if ($(target).hasClass(tabClass)) {return};

			$(el).addClass(tabMenuClass).siblings().removeClass(tabMenuClass);
			$(target).addClass(tabClass).siblings().removeClass(tabClass);
		}
	}
})();

$(function () {
	var mainSlider = $('#mainSlider');

	if (mainSlider.length > 0) {
		mainSlider.slick(nmcApp.slickOpts)
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
	
	$('.c-docs__item--withModal').fancybox();

	$('.c-tabs__menu-item').on('click', function() {
		var tab = $(this).attr('data-tab');
		var cb = eval($(this).attr('data-cb'));
		if ($(this).hasClass('c-tabs__menu-item--active')) return;
		nmcApp.showTab(tab)
	});

	$('.j-datepicker').pickmeup({
		format: 'd-m-Y'
	});

	// smalltab
	$('.c-smalltab__menu-item').on('click', function(e) {
		e.preventDefault();
		nmcApp.smallTab(this);
	});

	$('.c-burger, .c-header__close').on('click', function() {
		$('.c-header').toggleClass('c-header--active')
		$('body').toggleClass('body--on-menu-open')
	});

	$('.c-header__menu-item').on('click', function(e) {
		var that = $(this);
		if (that.attr('href')) {
			return true
		}
		if($(e.target).closest('.c-subnav').length > 0) {
			return
		}
		that.toggleClass('--is-active')
	});

	$('.c-subnav__link').on('click', function() {
		var that = $(this);
		if (that.attr('href')) {
			return true
		}
		that.toggleClass('--is-active')
	})
});