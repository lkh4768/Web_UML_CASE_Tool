LogEntity = Class.extend({
	Name : "LogEntity",

	init : function(logView, serverRootPath, id, ownerID, ownerName, date, content) {
		this.serverRootPath = serverRootPath;
		this.logView = logView;
		this.id = id;
		this.ownerID = ownerID;
		this.ownerName = ownerName;
		this.date = date.replace(".0", "");
		this.content = content;

		this.logEntityPanel = $('<div class="panel panel-default editor-log-entity"></div>');

		this.logEntityBtn = $('<a href="#" style="color: #000000; text-decoration: none !important;"></a>');

		this.logEntity = $('<div class="panel-body editor-log-entity-content">' + this.date + '<br>' + this.ownerName
				+ '님께서 ' + this.content + '했습니다.' + '</div>');

		this.logEntityBtn.append(this.logEntity);
		this.logEntityPanel.append(this.logEntityBtn);

		this.logEntityBtnEvent();
	},

	getLogEntityPanel : function() {
		return this.logEntityPanel;
	},

	logEntityBtnEvent : function() {
		var _this = this;
		this.logEntityBtn.click(function() {
			if (_this.content == "수정") {
				_this.logView.showLogBtnContainer();

				$.each(_this.logView.getLogList(), function(i, log) {
					log.logEntity.css("background-color", "#ffffff");
				});
				_this.logEntity.css("background-color", "#f0eded");

				_this.logView.setCurrentLog(_this);
			}
		});
	}
});