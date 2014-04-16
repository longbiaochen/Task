/* =============================================================================
* MaterialGenius/index.js
* ------------------------------------------------------------
* Copyright 2012 Exacloud, Inc.
* http://www.qunhe.cc
* ========================================================================== */

// ================= GLOBAL VARIABLES ==========================================
var LIST_URL = 'api/list.php?page={0}&tab={1}';
var COUNT_URL = 'api/count.php?page={0}';
var POST_URL = 'api/post.php';
var PLACE_URL = 'api/place.php';
var DELETE_URL = 'api/delete.php?rowid={0}';

var ITEM_TPL = '<tr><td class="span1">{0}</td><td class="span10"><span href="#" class="item" page={1} tab={2}>{3}</span></td><td><div class="btn btn-danger item_done_btn" page={1} tab={2} rowid={0}>Done</div></td></tr>';

// ================= INIT FUNCTIONS ============================================

$(function() {
	// start here
	$.get(PLACE_URL, function(place) {
		$('#{0}_link'.format(place)).click();
	});

});
// ================= EVENT BINDING FUNCTIONS ===================================
$('.page_link').live('click', function() {
	$('.page_link').removeClass('active');
	$(this).addClass('active');

	$('.page_content').hide();
	var m = $(this);
	var page = m.attr('page');
	$('#' + page).show();

	// update tab count
	$.getJSON(COUNT_URL.format(page), function(data) {
		var badge;
		$.each(data, function(tab, c) {
			badge = $('#{0}_{1}_badge'.format(page, tab));
			badge.html(c);
			if (badge.html() == '0') {
				badge.hide();
			} else {
				badge.show();
			}
		});
	});

	$('#{0} .active a'.format(page)).click();

});

$('.tab_link').live('click', function() {
	var m = $(this);
	var page = m.attr('page');
	var tab = m.attr('tab');
	$.getJSON(LIST_URL.format(page, tab), function(data) {
		var item_list = '';
		$.each(data, function(i, item) {
			item_list += ITEM_TPL.format(item.id, page, tab, item.task);
		});
		$('#{0}_{1}_list'.format(page, tab)).html(item_list);
	});
});

$('.task_input').live('keypress', function(e) {
	if (e.keyCode == 13) {
		// add new task
		var m = $(this);
		var data = {
			page : m.attr('page'),
			tab : m.attr('tab'),
			content : m.val().urlify()
		}

		$.post(POST_URL, data, function(rowid) {
			m.val('');
			$('#{0}_{1}_link'.format(data.page, data.tab)).click();
			var badge = $('#{0}_{1}_badge'.format(data.page, data.tab));
			badge.html((parseInt(badge.html()) + 1));
			badge.show();
		});
	}
});

$('.item').live('click', function() {
	var m = $(this);
	var page = m.attr('page');
	var tab = m.attr('tab');
	$('#{0}_{1}_input'.format(page, tab)).val(m.html()).select();

});

$('.item_done_btn').live('click', function(e) {
	// delete task
	var m = $(this);
	var page = m.attr('page');
	var tab = m.attr('tab');
	var rowid = m.attr('rowid');

	$.get(DELETE_URL.format(rowid), function() {
		$('#{0}_{1}_link'.format(page, tab)).click();
		var badge = $('#{0}_{1}_badge'.format(page, tab));
		badge.html((parseInt(badge.html()) - 1));
		if (badge.html() == '0') {
			badge.hide();
		} else {
			badge.show();
		}
	});
});

// =============================================================================
// detect url in string
String.prototype.urlify = function() {
	var urlRegex = /(https?:\/\/[^\s]+)/g;
	return this.replace(urlRegex, '<a href="$1" target=_blank>$1</a>');
}
// string formatter
String.prototype.format = function() {
	var pattern = /\{\d+\}/g;
	var args = arguments;
	return this.replace(pattern, function(capture) {
		return args[capture.match(/\d+/)];
	});
};
