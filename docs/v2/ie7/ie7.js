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
		'ti-add': '&#xe900;',
		'ti-admin': '&#xe903;',
		'ti-arrow': '&#xe906;',
		'ti-at': '&#xe907;',
		'ti-book': '&#xe908;',
		'ti-delete': '&#xe90a;',
		'ti-dislike': '&#xe90d;',
		'ti-error': '&#xe90e;',
		'ti-feedback': '&#xe912;',
		'ti-hashtag': '&#xe913;',
		'ti-home': '&#xe914;',
		'ti-info': '&#xe916;',
		'ti-like': '&#xe91c;',
		'ti-list': '&#xe91d;',
		'ti-login': '&#xe923;',
		'ti-logout': '&#xe924;',
		'ti-questionmark': '&#xe925;',
		'ti-rating': '&#xe926;',
		'ti-remove': '&#xe92b;',
		'ti-reply': '&#xe92c;',
		'ti-review': '&#xe92d;',
		'ti-save': '&#xe92f;',
		'ti-search': '&#xe932;',
		'ti-share': '&#xe933;',
		'ti-success': '&#xe935;',
		'ti-user': '&#xe939;',
		'ti-user-active': '&#xe93a;',
		'ti-user-card': '&#xe93c;',
		'ti-user-inactive': '&#xe93e;',
		'ti-users': '&#xe940;',
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
