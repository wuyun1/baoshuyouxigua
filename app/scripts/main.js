'use strict';
console.log('\'Allo \'Allo!');

var $ = window.$;
$(document).ready(function() {
	// document.addEventListener('touchmove', function(e) {
	// 	e.preventDefault()
	// }, false);

	// var overscroll = function(el) {
	// 	el.addEventListener('touchstart', function() {
	// 		var top = el.scrollTop,
	// 			totalScroll = el.scrollHeight,
	// 			currentScroll = top + el.offsetHeight;
	// 		//If we're at the top or the bottom of the containers
	// 		//scroll, push up or down one pixel.
	// 		//
	// 		//this prevents the scroll from "passing through" to
	// 		//the body.
	// 		if (top === 0) {
	// 			el.scrollTop = 10;
	// 		} else if (currentScroll === totalScroll) {
	// 			el.scrollTop = top - 10;
	// 		}
	// 	});
	// 	el.addEventListener('touchmove', function(evt) {
	// 		//if the content is actually scrollable, i.e. the content is long enough
	// 		//that scrolling can occur
	// 		if (el.offsetHeight < el.scrollHeight)
	// 			evt._isScroller = true;
	// 	});
	// };

	// overscroll($('#output-wrap')[0]);


	var output = $('#output-scroll');
	var SHOW_MAX = 120;
	var isguo = $('#isguo').bootstrapSwitch();
	var startnum = $('#startnum');
	var chushu = $('#chushu');
	var myglobal = {
		start: +startnum.val(),
		end: SHOW_MAX + +startnum.val()
	};
	$('#calc').click(function() {
		var isguoVal = isguo.bootstrapSwitch('state');
		var startnumVal = +startnum.val();
		var chushu_val = chushu.val();
		output.children().remove();
		myglobal.start = startnumVal;
		for (var i = startnumVal, n = startnumVal + SHOW_MAX; i < n; i++) {

			var cell = $('<div class="cell_num" />');
			cell.text(i);
			if (i % chushu_val == 0 || i.toString().toString().indexOf(chushu_val) != -1) {
				cell.addClass("cell_num_guo");
				if (!isguoVal) {
					cell.css("display", "none");
				}
			}

			output.append(cell);
		}
		myglobal.end = startnumVal + SHOW_MAX;

	});
	var msg_list_loading = false;
	$("#output-wrap").scroll(function() {
		var self = $(this);

		function load_more_msg() {

			// 	console.log(output[0].scrollTop, output[0].scrollHeight);

			if (self.height() + self.scrollTop() >= output[0].scrollHeight - 60) {
				msg_list_loading = true;
				output.append('<div class="loading">正在计算...</div>');
				self.scrollTop(self.scrollTop() - 9);
				setTimeout(function() {

					output.find(".loading").remove();
					startnum.val(+startnum.val() + 10);
					startnum.change();
					self.scrollTop(self.scrollTop() - 1);
					msg_list_loading = false;
				}, 500);



			} else if (self.scrollTop() == 0) {
				msg_list_loading = true;
				output.prepend('<div class="loading">正在计算...</div>');
				setTimeout(function() {
					output.find(".loading").remove();
					startnum.val(+startnum.val() - 10);
					startnum.change();
					self.scrollTop(10);
					msg_list_loading = false;
				}, 500);


			}

		}
		if (!msg_list_loading) {

			load_more_msg();
		}
	});

	isguo.on('switchChange.bootstrapSwitch', function() {
		if ($(this).bootstrapSwitch("state")) {
			output.find(".cell_num_guo").show(500);
		} else {
			output.find(".cell_num_guo").hide(500);
		}
	});
	startnum.change(function() {
		var c_start = +$(this).val();

		if (Math.abs(myglobal.start - c_start) > 50) {
			$("#calc").click();
		} else {
			var isguoVal = isguo.bootstrapSwitch("state");
			var startnumVal = +startnum.val();
			var chushu_val = chushu.val();
			if (myglobal.start < c_start) {
				for (var i = 1, n = c_start - myglobal.start; i <= n; i++) {
					output.find('.cell_num:first').remove();

					var cell = $("<div class='cell_num' />");
					var num = i + myglobal.end;
					cell.text(num);
					if (num % chushu_val == 0 || num.toString().indexOf(chushu_val) != -1) {
						cell.addClass("cell_num_guo");
						if (!isguoVal) {
							cell.css("display", "none");
						}
					}

					output.append(cell);

				}
			} else if (myglobal.start > c_start) {
				for (var i = 1, n = myglobal.start - c_start; i <= n; i++) {
					output.find('.cell_num:last').remove();

					var cell = $("<div class='cell_num' />");
					var num = myglobal.start - i;
					cell.text(num);
					if (num % chushu_val == 0 || num.toString().indexOf(chushu_val) != -1) {
						cell.addClass("cell_num_guo");
						if (!isguoVal) {
							cell.css("display", "none");
						}
					}

					output.prepend(cell);

				}
			}


			myglobal.start = startnumVal;
			myglobal.end = startnumVal + SHOW_MAX;
		}

	});
	chushu.change(function() {
		$("#calc").click();
	});
	// $("#calc").click();

});