LogEntity = Class.extend({
	Name : "LogEntity",

	init : function(logSlidebarView, serverRootPath, id, ownerID, ownerName, date, content) {
		this.serverRootPath = serverRootPath;
		this.logSlidebarView = logSlidebarView;
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
	
	getDate: function(){
		return this.date;
	},

	getLogEntityPanel : function() {
		return this.logEntityPanel;
	},

	logEntityBtnEvent : function() {
		var _this = this;
		this.logEntityBtn.click(function() {
			if (_this.content == "수정") {
				_this.logSlidebarView.showLogBtnContainer();

				$.each(_this.logSlidebarView.getLogList(), function(i, log) {
					log.logEntity.css("background-color", "#ffffff");
				});
				_this.logEntity.css("background-color", "#f0eded");

				_this.logSlidebarView.setCurrentLog(_this);
			}
		});
	}
});