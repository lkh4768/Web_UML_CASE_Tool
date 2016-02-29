ProjectSlidebarView = Class.extend({
	Name : "ProjectSlidebarView",

	init : function(projectMainView) {
		this.projectMainView = projectMainView;
		this.slidebarContainer = $("#slidebar-container");
		this.toggle = false;
	},

	getToggleCondition : function() {
		return this.toggle;
	},

	showProjectSlideView : function() {
		$("#project-main-container").addClass("toggled");
		this.toggle = true;
	},

	hideProjectSlideView : function() {
		$("#project-main-container").removeClass("toggled");
		this.toggle = false;
	},

	isActiveProjectSlideView : function() {
		return $("#project-main-container").hasClass("toggled");
	},

	assingCommentSlidebarView : function(serverRootPath, fileID, fileName, ownerName, ownerID) {
		this.slidebarContainer.empty();
		var csv = new CommentSlidebarView(serverRootPath, this, fileID, fileName, ownerName, ownerID);

		this.slidebarContainer.append(csv.getCommentSlideBarPanel());

		return csv;
	},

	assingLogSlidebarView : function(serverRootPath, fileID, fileName, ownerName, ownerID, parentID, modifierID,
			modifierName, sharedRootID) {

		this.slidebarContainer.empty();
		var lsv = new LogSlidebarView(serverRootPath, this.projectMainView, this, fileID, fileName, ownerName, ownerID,
				parentID, modifierID, modifierName, sharedRootID);

		this.slidebarContainer.append(lsv.getLogSlideBarPanel());

		return lsv;
	},
	assignShareSlidebarView : function(serverRootPath, folderID, folderName, projectFolder) {
		this.slidebarContainer.empty();
		var ssv = new ShareSlidebarView(serverRootPath, folderID, folderName, projectFolder, this);

		this.slidebarContainer.append(ssv.getShareSlidebarContainer());
		return ssv;
	}

});