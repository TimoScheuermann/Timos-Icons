/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'Timos-Icons\'">' + entity + '</span>' + html;
	}
	var icons = {
		'ti-search': '&#xe900;',
		'ti-add': '&#xe902;',
		'ti-admin': '&#xe904;',
		'ti-arrow': '&#xe907;',
		'ti-at': '&#xe908;',
		'ti-book': '&#xe909;',
		'ti-delete': '&#xe90b;',
		'ti-dislike': '&#xe90e;',
		'ti-error': '&#xe90f;',
		'ti-feedback': '&#xe913;',
		'ti-hashtag': '&#xe914;',
		'ti-home': '&#xe915;',
		'ti-info': '&#xe917;',
		'ti-like': '&#xe91d;',
		'ti-list': '&#xe91e;',
		'ti-login': '&#xe924;',
		'ti-logout': '&#xe926;',
		'ti-nav-placeholder': '&#xe928;',
		'ti-questionmark': '&#xe931;',
		'ti-rating': '&#xe932;',
		'ti-remove': '&#xe937;',
		'ti-reply': '&#xe938;',
		'ti-review': '&#xe939;',
		'ti-save': '&#xe93b;',
		'ti-share': '&#xe93e;',
		'ti-success': '&#xe940;',
		'ti-user': '&#xe944;',
		'ti-user-active': '&#xe945;',
		'ti-user-card': '&#xe947;',
		'ti-user-inactive': '&#xe949;',
		'ti-users': '&#xe94b;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/ti-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
