ProjectContentView = Class.extend({
	Name : "ProjectContentView",
	
	init: function(serverRootPath){
		this.serverRootPath = serverRootPath;
		this.projectContentView = $("#project-content");
		this.contentEntityList = [];
	},
	
	addProjectContentEntity: function(projectEntity){
		this.projectContentView.append(projectEntity.getEntityPanel());
		
		this.contentEntityList.push(projectEntity);
	},
	
	removeProjectContentEntity: function(projectEntityID){
		var _this = this;
		$.each(_this.contentEntityList, function(i, val) {
			if (val.getID() == projectEntityID) {
				val.getEntityPanel().remove();

				_this.contentEntityList.splice(i, 1);
				
				return false;
			}
		});
	},
	
	resetProjectContentEntity:function(){
		this.projectContentView.empty();
		
		this.contentEntityList.splice(0,this.contentEntityList.length)
	},
	
	getProjectContentEntityList: function(){
		return this.contentEntityList;
	}
});