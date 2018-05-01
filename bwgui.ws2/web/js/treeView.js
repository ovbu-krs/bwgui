(function () {
$('ul#tree')
	.hide()
	.prev('span')
	.before('<span></span>')
	.prev()
	.addClass('handle closed')
	.click(function() {
		$(this)
			.toogleClass('closed opened')
			.nextAll('ul')
			.toogle();
});
})();