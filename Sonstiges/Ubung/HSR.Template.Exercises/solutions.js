document.addEventListener('DOMContentLoaded', function() {
	showSolutionsButton = document.getElementById('showSolutions');
	if(showSolutionsButton) {
		body = document.getElementsByTagName('body')[0];
		showSolutionsButton.addEventListener('click', function() {
			if(body.hasAttribute('data-show-solutions')) {
				body.removeAttribute('data-show-solutions');
			} else {
				body.setAttribute('data-show-solutions','true');
			}
		});
	}
});
