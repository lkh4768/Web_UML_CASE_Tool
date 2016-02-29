DiagramView= Class.extend({

	init : function() {
		//각 다이어그램 오른쪽 화살표 변환
		$(".diagram-item-title-collapse").click(function() {
			var rightImg = $(".diagram-item-title-right-img");
			rightImg = $(this).find(rightImg);

			var rightImgSrc = rightImg.attr("src");

			if ($(this).hasClass("collapsed")) {
				rightImgSrc = rightImgSrc.replace(".png", "_over.png");
				rightImg.attr("src", rightImgSrc);
			} else {
				rightImgSrc = rightImgSrc.replace("_over.png", ".png");
				rightImg.attr("src", rightImgSrc);
			}
		});
	}
});