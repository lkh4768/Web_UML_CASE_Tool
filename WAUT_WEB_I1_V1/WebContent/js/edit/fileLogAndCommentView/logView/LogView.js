LogView = Class.extend({
	Name : "LogView",

	init : function(serverRootPath) {
		this.serverRootPath = serverRootPath;
		this.fileID = null;
		this.fileName = null;
		this.ownerName = null;
		this.ownerID = null;
		this.parentID = null;
		this.modifierID = null;
		this.modifierName = null;

		this.logList = [];
		this.currentLog = null;

		this.logEditorContainer = $('<div id="editor-log-container"></div>');

		this.logBtnContainer = $('<div id="editor-log-btn-container"></div>');

		this.showLogBtn = $('<button id="editor-log-show-btn" type="button" class="btn btn-default"></button>');
		this.showLogBtnImg = $('<img id="editor-log-show-btn-img" src="' + this.serverRootPath
				+ '/img/slidebar/log/log_show.png" />');

		// 댓글 엔티티 넣는 곳
		this.logEditorEntityContainer = $('<div id="editor-log-entity-container"></div>');

		// append 부분
		this.showLogBtn.append(this.showLogBtnImg);
		this.showLogBtn.append("보기");

		this.logBtnContainer.append(this.showLogBtn);

		this.logEditorContainer.append(this.logBtnContainer);
		this.logEditorContainer.append(this.logEditorEntityContainer);

		this.hideLogBtnContainer();

		this.showLogBtnEvent();
	},

	showLogView : function() {
		var _this = this;
		this.logEditorContainer.show();
		$.ajax({
			url : _this.serverRootPath+"/log?action=getLogList",
			type : "POST",
			dataType : "JSON",
			async : false,
			data : {
				"fileID" : _this.fileID
			},
			success : function(data, textStatus, jqXHR) {
				_this.resetLogEditorEntityContainer();

				$.each(data, function(i, entity) {
					_this.addLogEntity(_this.serverRootPath, entity.id, entity.ownerID, entity.ownerName, entity.date,
							entity.content);
				});

			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log("get log list fail!!!!");
			}
		});
	},

	hideLogView : function() {
		this.logEditorContainer.hide();
	},

	setLogViewInfo : function(fileID, fileName, ownerName, ownerID, parentID, modifierID, modifierName) {
		this.fileID = fileID;
		this.fileName = fileName;
		this.ownerName = ownerName;
		this.ownerID = ownerID;
		this.parentID = parentID;
		this.modifierID = modifierID;
		this.modifierName = modifierName;
	},

	getLogEditorPanel : function() {
		return this.logEditorContainer
	},

	resetLogEditorEntityContainer : function() {
		this.logEditorEntityContainer.empty();
	},

	addLogEntity : function(serverRootPath, id, ownerID, ownerName, date, content) {
		var logEntity = new LogEntity(this, serverRootPath, id, ownerID, ownerName, date, content);

		this.logEditorEntityContainer.prepend(logEntity.getLogEntityPanel());
	},

	showLogBtnEvent : function() {
		var _this = this;
		this.showLogBtn.click(function() {
			var imgModal = new ImgModal("http://capstone.myaxler.org/" + _this.currentLog.id + ".png");

			// body에 modal append
			imgModal.assginModalPanel();

			// modal show.
			imgModal.show();
		});
	},

	hideLogBtnContainer : function() {
		this.logBtnContainer.hide();
	},

	showLogBtnContainer : function() {
		this.logBtnContainer.show();
	},

	getLogList : function() {
		return this.logList;
	},

	getCurrentLog : function() {
		return this.currentLog;
	},

	setCurrentLog : function(log) {
		this.currentLog = log;
	}
});