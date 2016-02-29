ProjectMainView = Class.extend({

	Name : "ProjectMainView",

	init : function(serverRootPath) {
		this.serverRootPath = serverRootPath;
		this.projectTitleLabel = $("#project-title-label");

		this.projectExplorerView = new ProjectExplorerView(this.serverRootPath, this);
		this.projectToolbarView = new ProjectToolbarView(this.serverRootPath, this);
		this.projectContentView = new ProjectContentView(this.serverRootPath);
		
		this.currentEntity = null;
	},
	
	getProjctExplorerEntityList: function(){
		return this.projectExplorerView.getExplorerEntityList();
	},
	
	//휴지통 툴바 보여주는 메소드
	showProjectToolbarInTrash:function(){
		this.projectToolbarView.showProjectToolbarInTrash();
	},
	
	//프로젝트 기본 툴바
	showProjectToolbar:function(){
		this.projectToolbarView.showProjectToolbar();
	},
	
	//프로젝트 기본 툴바 하이드
	hideProjectToolbarView: function(){
		this.projectToolbarView.hideProjectToolbar();
	},
	
	//프로젝트 파일 버튼 추가 하이드
	hideProjectToolbarAddFileBtn: function(){
		this.projectToolbarView.hideAddFileBtn();
	},
	
	//프로젝트 가져오기 버튼 추가 하이드
	hideProjectToolbarImportFileBtn: function(){
		this.projectToolbarView.hideImportFileBtn();
	},
	
	//현재 상위 엔티티 설정
	setCurrentEntity: function(entity){
		this.currentEntity = entity
	},
	
	//현재 상위 엔티티 가져오기
	getCurrentEntity: function(){
		return this.currentEntity;
	},

	//프로젝트 타이틀 설정
	setProjectTitle : function(title) {
		this.projectTitleLabel.text(title);
	},
	
	//프로젝트컨텐트 리스트 겟
	getProjectContentEntityList: function(){
		return this.projectContentView.getProjectContentEntityList();
	},
	
	//프로젝트컨턴트 엔티티 삭제
	removeProjectContentEntity: function(projectEntityID){
		this.projectContentView.removeProjectContentEntity(projectEntityID);
	},
	
	//프로젝트컨텐트 엔티티 추가
	addProjectContentEntity:function(projectEntityPanel){
		this.projectContentView.addProjectContentEntity(projectEntityPanel);
	},
	
	//프로젝트 컨텐트 클리어
	resetProjectContentView:function(){
		this.projectContentView.resetProjectContentEntity();
	}
});