FileLogAndCommentView = Class.extend({

	init : function(serverRootPath) {
		this.serverRootPath = serverRootPath;

		// 처음 초기화 됐을 때.
		$(".fileLogAndComment-tab-item").each(function(i) {
			if ($(this).hasClass("active")) {
				$(this).children("a").css("background-color", "#c4c0c0");
			}
		});

		// 클릭했을 때
		var _this = this;
		$(".fileLogAndComment-tab-item").click(function() {
			if (!($(this).hasClass("active"))) {
				$(this).addClass("active");

				$(this).siblings().removeClass("active");
				$(this).siblings().children().css("background-color", "#fafafb");

				if ($(this).attr("id") == "log-tab-item") {
					_this.showLogEntityContainer();
				} else {
					_this.showCommentEntityContainer();
				}
			}

			$(this).children().css("background-color", "#c4c0c0");
		});

		this.logAndCommentEntityContainer = $("#fileLogAndCommentEntity-container");

		// log 뷰 생성 후 추가
		this.logView = new LogView(this.serverRootPath);
		this.logAndCommentEntityContainer.append(this.logView.getLogEditorPanel());

		this.commentView = new CommentView(this.serverRootPath)
		this.logAndCommentEntityContainer.append(this.commentView.getCommentEditorPanel());
	},

	showLogEntityContainer : function(fileID, fileName, ownerName, ownerID, parentID, modifierID, modifierName) {
		this.hideCommentEntityContainer();
		if (fileID != null)
			this.logView.setLogViewInfo(fileID, fileName, ownerName, ownerID, parentID, modifierID, modifierName);
		this.logView.showLogView();
	},

	hideLogEntityContainer : function(entityContainer) {
		this.logView.hideLogView();
	},

	showCommentEntityContainer : function(fileID, fileName, ownerName, ownerID) {
		this.hideLogEntityContainer();
		if (fileID != null)
			this.commentView.setCommentViewInfo(fileID, fileName, ownerName, ownerID);
		this.commentView.showCommentView();

	},

	hideCommentEntityContainer : function(entityContainer) {
		this.commentView.hideCommentView();
	}
});