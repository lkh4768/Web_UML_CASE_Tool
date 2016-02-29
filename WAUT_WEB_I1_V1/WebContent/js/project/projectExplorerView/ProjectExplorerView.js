ProjectExplorerView = Class.extend({
	Name : "ProjectExplorerView",

	init : function(serverRootPath, projectMainView) {
		this.serverRootPath = serverRootPath;
		this.projectMainView = projectMainView;
		this.folderTreeContainer = $("#folder-tree-container");
		this.moveTrashBtn = $("#move-trash-btn");
		this.emptyTrashBtn = $("#empty-trash-btn");
		this.explorerEntityList = [];

		// 초기화 시 최상위 프로젝트 추가
		this.addPrivateProjectExplorerEntity();
		this.addSharedProjectExplorerEntity();

		this.moveTrashBtnEvent();

		this.emptyTrashBtnEvent();
	},

	getExplorerEntityList : function() {
		return this.explorerEntityList;
	},

	// 최상위 내 프로젝트
	addPrivateProjectExplorerEntity : function() {
		var projectExplorerEntity = new ProjectExplorerEntity(this, this.serverRootPath, this.projectMainView,
				"내 프로젝트", 0, 0, -1, $("#header-user-id").attr("uid"));

		this.folderTreeContainer.append(projectExplorerEntity.getProjectExplorerEntity());

		this.explorerEntityList.push(projectExplorerEntity);
	},

	// 최상위 공유 프로젝트
	addSharedProjectExplorerEntity : function() {
		var projectExplorerEntity = new ProjectExplorerEntity(this, this.serverRootPath, this.projectMainView,
				"공유 프로젝트", 1, 0, -1, $("#header-user-id").attr("uid"));

		this.folderTreeContainer.append(projectExplorerEntity.getProjectExplorerEntity());

		this.explorerEntityList.push(projectExplorerEntity);
	},

	// 다른 폴더 엔티티 추가 메소드
	addProjectExplorerEntity : function(name, id, sharedRootFolderID, parentID, ownerID) {
		var projectExplorerEntity = new ProjectExplorerEntity(this, this.serverRootPath, this.projectMainView, name,
				id, sharedRootFolderID, parentID, ownerID);

		// 추가되는 폴더 엔티티의 부모 폴더 다음에 엔티티 추가
		$.each(this.explorerEntityList, function(i, val) {
			if (val.getID() == parentID) {
				val.getProjectExplorerEntity().after(projectExplorerEntity.getProjectExplorerEntity());
				projectExplorerEntity.setMargin(val.getMargin());
				return false;
			}
		});

		// list에 추가
		this.explorerEntityList.push(projectExplorerEntity);
	},

	resetChildrenExplorerEntity : function(parentID) {
		var _this = this;
		var delEntityIndexList = [];

		$.each(this.explorerEntityList, function(i, val) {
			if (typeof val != "undefined") {
				if (val.getParentID() == parentID) {
					// 재귀.
					_this.resetChildrenExplorerEntity(val.getID());

					val.getProjectExplorerEntity().remove();
					// 삭제할 값의 인덱스를 저장
					delEntityIndexList.push(val);
				}
			}
		});

		// 저장한 인덱스를 이용해 리스트에서 삭제
		$.each(delEntityIndexList, function(i, val) {
			var delIndex = _this.explorerEntityList.indexOf(val);
			_this.explorerEntityList.splice(delIndex, 1);
		});

	},

	moveTrashBtnEvent : function() {
		var _this = this;
		this.moveTrashBtn.click(function() {

			_this.projectMainView.resetProjectContentView();

			$.ajax({
				url : _this.serverRootPath+"/project?action=moveTrashView",
				type : "POST",
				dataType : "json",
				success : function(data, textStatus, jqXHR) {

					var projectFolder = null;
					var projectFile = null;

					// 현재 클릭하여 출력된 contentEntity 저장(휴지통)
					_this.projectMainView.setCurrentEntity("trash");

					$.each(data, function(i, entity) {
						// 먼저 폴더
						if (entity.type == "folder") {
							projectFolder = new ProjectFolder(_this.serverRootPath, _this.projectMainView, entity.id,
									entity.name, entity.ownerID, entity.ownerName, entity.sharedRootID,
									entity.parentID, entity.date, entity.isDelete);

							// 프로젝트 컨텐트 엔티티 추가
							_this.projectMainView.addProjectContentEntity(projectFolder);

							// 설정 버튼 이벤트 설정
							projectFolder.settingBtnEvent(true);
						}
						// 파일
						else if (entity.type == "file") {
							projectFile = new ProjectFile(_this.serverRootPath, _this.projectMainView, entity.id,
									entity.name, entity.ownerID, entity.ownerName, entity.modifierID,
									entity.modifierName, entity.sharedRootID, entity.parentID, entity.date,
									entity.isDelete, entity.isLock, entity.backgroundImg);

							// 프로젝트 컨텐트 엔티티 추가
							_this.projectMainView.addProjectContentEntity(projectFile);
						}
					});

					// 프로젝트뷰 타이틀 설정
					_this.projectMainView.setProjectTitle("휴지통");

					// 휴지통 툴바 출력
					_this.projectMainView.showProjectToolbarInTrash();

				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus);
				}
			});
		});
	},

	emptyTrashBtnEvent : function() {
		var _this = this;
		$("#empty-trash-btn").click(function() {
			var smModal = new SmallModal("휴지통", "모든 파일, 폴더를 완전 삭제하시겠습니까?");

			// '예' 버튼 이벤트 설정
			smModal.confirmEvent(function() {

				$.ajax({
					url : _this.serverRootPath+"/project?action=emptyTrash",
					type : "POST",
					dataType : "JSON",
					data : {
						"ownerID" : $("#header-user-id").attr("uid")
					},
					success : function(data, textStatus, jqXHR) {

						if (_this.projectMainView.getCurrentEntity() == "trash")
							_this.projectMainView.resetProjectContentView();

						var trashBtnImg = $("#empty-trash-btn-img");
						var trashBtnImgSrc = trashBtnImg.attr("src");

						trashBtnImg.attr("src", trashBtnImgSrc.replace("trash_empty_over.png", "trash_empty.png"));

						smModal.hide();
					},
					error : function(jqXHR, textStatus, errorThrown) {
						console.log("projectExplorerView all empty fail!!");
					}
				});
			});

			// body에 modal append
			smModal.assginModalPanel();

			// modal show.
			smModal.show();
		});
	}
});