HeaderView = Class.extend({

	init : function() {

		this.headerItemMouseEnter();
		this.headerItemMouseLeave();
	},

	headerItemMouseEnter : function() {
		// 각 오른쪽 메뉴 마우스 오버 변환
		$(".header-nav-item").mouseenter(function() {
			var a_tag = $(this).children();
			var img_tag = a_tag.children();
			var src_attr = img_tag.attr("src");

			src_attr = src_attr.replace(".png", "_over.png");
			img_tag.attr("src", src_attr);

			a_tag.css("color", "#32475B");
		});
	},

	headerItemMouseLeave : function() {
		$(".header-nav-item").mouseleave(function() {
			var a_tag = $(this).children();
			var img_tag = a_tag.children();
			var src_attr = img_tag.attr("src");

			src_attr = src_attr.replace("_over.png", ".png");
			img_tag.attr("src", src_attr);

			a_tag.css("color", "#ffffff");
		});
	}
});