ProjectExplorerEntity = Class.extend({
	Name : "ProjectExplorerEntity",

	init : function(sourceView, serverRootPath, projectMainView, name, id, sharedRootID, parentID, ownerID) {
		this.sourceView = sourceView;
		this.serverRootPath = serverRootPath;
		this.projectMainView = projectMainView;
		this.parentID = parentID;
		this.id = id;
		this.sharedRootID = sharedRootID;
		this.ownerID = ownerID;
		this.margin = 0;
		this.name = name;

		this.projectExplorerBtn = $('<a class="project-explorer-btn" href="#"></a>');
		this.projectExplorerBtnImg = $('<img class="project-explorer-btn-img" src="' + serverRootPath
				+ '/img/folder.png" />');
		this.projectExplorerBtnName = $('<span class="project-explorer-btn-span"></span>');

		this.setProjectExplorerEntityName(this.name);

		this.projectExplorerBtn.append(this.projectExplorerBtnImg);
		this.projectExplorerBtn.append(this.projectExplorerBtnName);

		// clickEvent 등록
		if (sourceView instanceof ProjectExplorerView) {
			this.clickEvent(true);
		} else {
			this.clickEvent(false);
		}
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
		this.name = text;
		if (text.length > 10) {
			text = text.substring(0, 9) + "...";
			this.projectExplorerBtnName.attr("data-toggle", "tooltip");
			this.projectExplorerBtnName.attr("data-placement", "bottom");
			this.projectExplorerBtnName.attr("title", this.name);
		}

		this.projectExplorerBtnName.text(text);
	},

	setOpen : function(flag) {
		if (flag) {
			var imgSrc = this.projectExplorerBtnImg.attr("src");

			imgSrc = imgSrc.replace("folder.png", "folder_over.png");

			this.projectExplorerBtnImg.attr("src", imgSrc);
		} else {
			var imgSrc = this.projectExplorerBtnImg.attr("src");

			imgSrc = imgSrc.replace("folder_over.png", "folder.png");

			this.projectExplorerBtnImg.attr("src", imgSrc);
		}
	},

	clickEvent : function(isProjectExplorerView) {
		var _this = this;

		this.projectExplorerBtn.click(function() {
			// 체크 박스 초기화
			$("#project-toolbar-check-btn").data("checked", true);
			$("#project-toolbar-check-btn").click();

			if (_this.getID() == 1) {
				console.log("shared");
				$.ajax({
					url : _this.serverRootPath+"/project?action=getSharedEntity",
					type : "POST",
					data : {
						"folderID" : _this.id,
					},
					dataType : "json",
					success : function(data, textStatus, jqXHR) {

						var projectFolder = null;

						if (isProjectExplorerView)
							_this.projectMainView.resetProjectContentView();

						// 익스플러로 뷰 리셋
						_this.sourceView.resetChildrenExplorerEntity(_this.id);

						if (isProjectExplorerView) {
							// 프로젝트뷰 타이틀 설정
							_this.projectMainView.setProjectTitle(_this.getProjectExplorerEntityName());

							$("#project-toolbar-whole").show();
							$(".project-toolbar-trash-btn").hide();

							// 현재 클릭하여 출력된 contentEntity 저장
							_this.projectMainView.setCurrentEntity(_this);

						} else {
							// explorer modal 일 때.
							// 현재 클릭하여 출력된 contentEntity 저장
							_this.sourceView.setCurrentEntity(_this);

						}

						_this.setOpen(true);

						$.each(data, function(i, entity) {

							// explorerModal 일때는 explorerEntity만 추가!
							if (isProjectExplorerView) {
								projectFolder = new ProjectFolder(_this.serverRootPath, _this.projectMainView,
										entity.id, entity.name, entity.ownerID, entity.ownerName, entity.sharedRootID,
										entity.parentID, entity.date, entity.isDelete);

								// 프로젝트 컨텐트 엔티티 추가
								_this.projectMainView.addProjectContentEntity(projectFolder);
							}

							// explorer에 추가
							_this.sourceView.addProjectExplorerEntity(entity.name, entity.id, entity.sharedRootID,
									entity.parentID, entity.ownerID, "folder");

						});
						// 현재 클릭한거 굵기 조정.
						$(".project-explorer-btn-span").css("font-weight", "normal");
						_this.projectExplorerBtnName.css("font-weight", "bold");

						if (isProjectExplorerView) {
							if (_this.getID() == 0) {
								_this.projectMainView.hideProjectToolbarAddFileBtn();
							} else if (_this.getID() == 1) {
								_this.projectMainView.hideProjectToolbarView();
							} else {
								_this.projectMainView.showProjectToolbar();
							}
						}

					},
					error : function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus);
					}
				});
			} else {
				console.log("nonshared");
				console.log(_this.id);
				console.log(_this.ownerID);
				$.ajax({
					url : _this.serverRootPath+"/project?action=getEntity",
					type : "POST",
					data : {
						"folderID" : _this.id,
						"ownerID" : _this.ownerID,
					},
					dataType : "json",
					success : function(data, textStatus, jqXHR) {

						var projectFolder = null;
						var projectFile = null;

						if (isProjectExplorerView)
							_this.projectMainView.resetProjectContentView();

						_this.sourceView.resetChildrenExplorerEntity(_this.id);

						if (isProjectExplorerView) {
							// 프로젝트뷰 타이틀 설정
							_this.projectMainView.setProjectTitle(_this.getProjectExplorerEntityName());

							$("#project-toolbar-whole").show();
							$(".project-toolbar-trash-btn").hide();

							// 현재 클릭하여 출력된 contentEntity 저장
							_this.projectMainView.setCurrentEntity(_this);

						} else {
							// explorer modal 일 때.
							// 현재 클릭하여 출력된 contentEntity 저장
							_this.sourceView.setCurrentEntity(_this);

						}

						_this.setOpen(true);

						$.each(data, function(i, entity) {
							// 먼저 폴더
							if (entity.type == "folder") {
								// explorerModal 일때는 explorerEntity만 추가!
								if (isProjectExplorerView) {
									projectFolder = new ProjectFolder(_this.serverRootPath, _this.projectMainView,
											entity.id, entity.name, entity.ownerID, entity.ownerName,
											entity.sharedRootID, entity.parentID, entity.date, entity.isDelete);

									// 프로젝트 컨텐트 엔티티 추가
									_this.projectMainView.addProjectContentEntity(projectFolder);
								}

								// explorer에 추가
								_this.sourceView.addProjectExplorerEntity(entity.name, entity.id, entity.sharedRootID,
										entity.parentID, entity.ownerID, entity.type);
							}
							// 파일
							else if (entity.type == "file") {

								if (isProjectExplorerView) {
									projectFile = new ProjectFile(_this.serverRootPath, _this.projectMainView,
											entity.id, entity.name, entity.ownerID, entity.ownerName,
											entity.modifierID, entity.modifierName, entity.sharedRootID,
											entity.parentID, entity.date, entity.isDelete, entity.isLock);
									// 프로젝트 컨텐트 엔티티 추가
									_this.projectMainView.addProjectContentEntity(projectFile);
								} else {
									// explorer에 추가
									_this.sourceView.addProjectExplorerEntity(entity.name, entity.id,
											entity.sharedRootID, entity.parentID, entity.ownerID, entity.type,
											entity.isLock);
								}
							}
						});
						// 현재 클릭한거 굵기 조정.
						$(".project-explorer-btn-span").css("font-weight", "normal");
						_this.projectExplorerBtnName.css("font-weight", "bold");

						if (isProjectExplorerView) {
							if (_this.getID() == 0) {
								_this.projectMainView.showProjectToolbar();
								_this.projectMainView.hideProjectToolbarAddFileBtn();
								_this.projectMainView.hideProjectToolbarImportFileBtn();
							} else if (_this.getID() == 1) {
								_this.projectMainView.hideProjectToolbarView();
							} else {
								_this.projectMainView.showProjectToolbar();
							}
						}
					},
					error : function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus);
					}
				});
			}
		});

	}
});