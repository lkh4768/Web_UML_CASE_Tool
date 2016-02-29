ProjectExplorerFile = Class.extend({
	Name : "ProjectExplorerFile",

	init : function(sourceView, serverRootPath, name, id, sharedRootID, parentID, ownerID, isLock) {
		this.sourceView = sourceView;
		this.serverRootPath = serverRootPath;
		this.parentID = parentID;
		this.id = id;
		this.sharedRootID = sharedRootID;
		this.ownerID = ownerID;
		this.lock = isLock;
		this.margin = 0;

		this.projectExplorerBtn = $('<a class="project-explorer-btn" href="#"></a>');
		this.projectExplorerBtnImg = $('<img class="project-explorer-btn-img" src="' + serverRootPath
				+ '/img/editor/toolbar/save.png" />');
		this.projectExplorerBtnName = $('<span class="project-explorer-btn-span"></span>');

		this.setProjectExplorerEntityName(name);

		this.projectExplorerBtn.append(this.projectExplorerBtnImg);
		this.projectExplorerBtn.append(this.projectExplorerBtnName);

		// clickEvent 등록
		if (sourceView instanceof ProjectExplorerView)
			this.clickEvent(true);
		else
			this.clickEvent(false);
	},

	isLock : function() {
		return this.lock;
	},

	getOwnerID : function() {
		return this.ownerID;
	},

	getMargin : function() {
		return this.margin;
	},

	setMargin : function(margin) {
		this.margin = margin + 15;

		this.projectExplorerBtn.css("margin-left", this.margin + "px");
	},

	getID : function() {
		return this.id;
	},

	getParentID : function() {
		return this.parentID;
	},

	getSharedRootID : function() {
		return this.sharedRootID;
	},

	getProjectExplorerEntity : function() {
		return this.projectExplorerBtn;
	},

	getProjectExplorerEntityName : function() {
		return this.projectExplorerBtnName.text();
	},

	setProjectExplorerEntityName : function(text) {
		this.projectExplorerBtnName.text(text);
	},

	clickEvent : function(isProjectExplorerView) {
		var _this = this;
		this.projectExplorerBtn.click(function() {

			// explorer modal 일 때.
			// 현재 클릭하여 출력된 contentEntity 저장
			_this.sourceView.setCurrentEntity(_this);

			// 현재 클릭한거 굵기 조정.
			$(".project-explorer-btn-span").css("font-weight", "normal");
			_this.projectExplorerBtnName.css("font-weight", "bold");

		});

	}
});