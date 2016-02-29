ProjectToolbarView = Class.extend({

	Name : "ProjectToolbarView",

	init : function(serverRootPath, projectMainView) {
		this.projectMainView = projectMainView;
		this.serverRootPath = serverRootPath;
		this.projectToolbarImportBtn = $("#project-toolbar-import-btn");

		this.addFolder();
		this.addFile();
		this.check();
		this.projectToolbarImportBtnEvent();

		this.trashEmptyBtnEvent();
		this.trashRestoreBtnEvent();
		this.exportBtnEvent();
		this.deleteBtnEvent();
		this.moveBtnEvent();
		this.copyBtnEvent();

		$("#project-toolbar-check-btn").data("checked", false);
		$(".project-toolbar-checked-btn").hide();

		this.hideProjectToolbar();
		this.searchBtnEvent();
	},

	projectToolbarImportBtnEvent : function() {
		var uploadFileBtn = $("#uploadFile");
		var _this = this;
		this.projectToolbarImportBtn.click(function() {
			uploadFileBtn.click();
		})

		uploadFileBtn.change(function() {
			var fileData = $("#uploadFile")[0].files[0];

			var formData = new FormData();

			formData.append("file", fileData);

			var tmpFileName = $("#uploadFile").val().split("\\");
			var fileName = tmpFileName[2].split(".");

			$.ajax({
				url : _this.serverRootPath+"/project?action=importFile",
				type : "POST",
				dataType : "TEXT",
				data : formData,
				processData : false,
				contentType : false,
				success : function(data, textStatus, jqXHR) {
					var parentEntity = _this.projectMainView.getCurrentEntity();
					var inputModal = new InputModal("가져오기", "이름을 입력해주세요", "가져오기", "같은 이름이 존재합니다.");

					inputModal.setInputText(fileName[0]);

					inputModal.btnEvent(function() {
						$.ajax({
							url : _this.serverRootPath+"/project?action=addFile",
							type : "POST",
							dataType : "JSON",
							data : {
								name : inputModal.getInputText(),
								parentID : parentEntity.getID(),
								ownerID : parentEntity.getOwnerID(),
								modifierID : $("#header-user-id").attr("uid"),
								content : data,
								sharedRootID : parentEntity.getSharedRootID()
							},
							success : function(data, textStatus, jqXHR) {
								if (data.result === "false") {
									inputModal.showErrorMessage();
								} else {
									var projectFile = new ProjectFile(_this.serverRootPath, _this.projectMainView,
											data.id, data.name, data.ownerID, data.ownerName, data.modifierID,
											data.modifierName, data.sharedRootID, data.parentID, data.date,
											data.isDelete, data.isLock, null);

									// 프로젝트 컨텐트 엔티티 추가
									_this.projectMainView.addProjectContentEntity(projectFile);
									inputModal.hide();
								}

							},
							error : function(jqXHR, textStatus, errorThrown) {
							}
						});

					});

					inputModal.assginModalPanel();
					inputModal.show();
				},
				error : function(jqXHR, textStatus, errorThrown) {
				}
			});
		});
	},

	showProjectToolbarInTrash : function() {
		$("#project-toolbar-whole").show();
		$(".project-toolbar-nonchecked-btn").hide();
		$(".project-toolbar-checked-btn").hide();
		$(".project-toolbar-trash-btn").show();
	},

	showProjectToolbar : function() {
		$(".project-toolbar-nonchecked-btn").show();
		$("#project-toolbar-add-file-btn").show();
		$("#project-toolbar-whole").show();
		$("#project-toolbar-import-btn").show();
	},

	hideAddFileBtn : function() {
		$("#project-toolbar-add-file-btn").hide();
	},

	hideImportFileBtn : function() {
		$("#project-toolbar-import-btn").hide();
	},

	hideProjectToolbar : function() {
		$("#project-toolbar-whole").hide();
	},

	addFile : function() {
		var _this = this;
		$("#project-toolbar-add-file-btn").click(
				function() {
					var parentEntity = _this.projectMainView.getCurrentEntity();
					var inputModal = new InputModal("파일 생성", "이름을 입력해주세요", "생성", "같은 이름이 존재합니다.");
				
						inputModal.btnEvent(function() {
							if(inputModal.getInputText()===""){
								inputModal.setErrorMessage("입력란이 비어있습니다.");
								inputModal.showErrorMessage();					
						}else{
							$.ajax({
								url : _this.serverRootPath+"/project?action=addFile",
								type : "POST",
								dataType : "JSON",
								data : {
									name : inputModal.getInputText(),
									parentID : parentEntity.getID(),
									ownerID : parentEntity.getOwnerID(),
									modifierID : $("#header-user-id").attr("uid"),
									content : "[]",
									sharedRootID : parentEntity.getSharedRootID()
								},
								success : function(data, textStatus, jqXHR) {
									if (data.result === "false") {
										inputModal.showErrorMessage();
									} else {
										var projectFile = new ProjectFile(_this.serverRootPath, _this.projectMainView,
												data.id, data.name, data.ownerID, data.ownerName, data.modifierID,
												data.modifierName, data.sharedRootID, data.parentID, data.date,
												data.isDelete, data.isLock, null);
	
										// 프로젝트 컨텐트 엔티티 추가
										_this.projectMainView.addProjectContentEntity(projectFile);
										inputModal.hide();
									}
								},
								error : function(jqXHR, textStatus, errorThrown) {
								}
							});
						}
					});
					
					inputModal.assginModalPanel();
					inputModal.show();
				});
	},

	addFolder : function() {
		var _this = this;
		$("#project-toolbar-add-folder-btn").click(
				function() {

					var inputModal = new InputModal("폴더 생성", "이름을 입력해주세요", "생성", "");
					var parentEntity = _this.projectMainView.getCurrentEntity();

					inputModal.btnEvent(function() {
						if (inputModal.getInputText() === "") {
							inputModal.setErrorMessage("입력란이 비어있습니다.");
							inputModal.showErrorMessage();
						} else {
							$.ajax({
								url : _this.serverRootPath+"/project?action=addFolder",
								type : "POST",
								dataType : "JSON",
								data : {
									folderName : inputModal.getInputText(),
									owner : parentEntity.getOwnerID(),
									parentID : parentEntity.getID(),
									sharedRootID : parentEntity.getSharedRootID()
								},
								success : function(data, textStatus, jqXHR) {
									if (data.result === "false") {
										inputModal.setErrorMessage("같은 이름이 존재합니다.");
										inputModal.showErrorMessage();
									} else {
										var projectFolder = new ProjectFolder(_this.serverRootPath,
												_this.projectMainView, data.folderID, data.folderName,
												data.folderOwnerID, data.folderOwnerName, data.folderShareRootID,
												data.folderParentID, data.folderDate, data.folderDelete);

										_this.projectMainView.addProjectContentEntity(projectFolder);
										inputModal.hide();

										// explorer 업데이트를 위해
										$.each(_this.projectMainView.getProjctExplorerEntityList(), function(i, pee) {
											if (parentEntity.getID() == pee.getID())
												pee.getProjectExplorerEntity().click();
										});

									}
								},
								error : function(jqXHR, textStatus, errorThrown) {
								}
							});
						}
					});

					inputModal.assginModalPanel();
					inputModal.show();

				});

	},

	check : function() {
		var _this = this;
		$("#project-toolbar-check-btn").click(function() {
			var checkImg = $(this).children();
			var checkImgSrc = checkImg.attr("src");

			var isChecked = $(this).data("checked");

			if (isChecked) {
				checkImgSrc = checkImgSrc.replace("check_over.png", "check.png");
				checkImg.attr("src", checkImgSrc);
				$(this).css("background-color", "#ffffff");
				$(this).data("checked", false);

				var projectContentEntityList = _this.projectMainView.getProjectContentEntityList();
				$.each(projectContentEntityList, function(i, val) {
					val.hideCheckBtn();
					val.onEntityEvent();
				});

				// 휴지통 화면인지 아닌지 구분
				if (_this.projectMainView.getCurrentEntity() != "trash") {
					$(".project-toolbar-nonchecked-btn").show();
					$(".project-toolbar-checked-btn").hide();
				} else {
					_this.showProjectToolbarInTrash();
				}

				$(".project-entity-menu-btn-img").each(function(i) {
					var projectEntityMenuBtnImg = $(this);
					var projectEntityMenuBtnImgSrc = $(this).attr("src");

					projectEntityMenuBtnImgSrc = projectEntityMenuBtnImgSrc.replace("_disable.png", ".png");

					projectEntityMenuBtnImg.attr("src", projectEntityMenuBtnImgSrc);
				});
			} else {

				checkImgSrc = checkImgSrc.replace("check.png", "check_over.png");
				checkImg.attr("src", checkImgSrc);
				$(this).css("background-color", "#3b4d5d");
				$(this).data("checked", true);

				var projectContentEntityList = _this.projectMainView.getProjectContentEntityList();
				$.each(projectContentEntityList, function(i, val) {
					val.showCheckBtn();
					val.offEntityEvent();
				});

				// 휴지통 화면인지 아닌지 구분
				if (_this.projectMainView.getCurrentEntity() != "trash") {
					$(".project-toolbar-nonchecked-btn").hide();
					$(".project-toolbar-checked-btn").show();
				}

				$(".project-entity-menu-btn-img").each(function(i) {
					var projectEntityMenuBtnImg = $(this);
					var projectEntityMenuBtnImgSrc = $(this).attr("src");

					projectEntityMenuBtnImgSrc = projectEntityMenuBtnImgSrc.replace(".png", "_disable.png");

					projectEntityMenuBtnImg.attr("src", projectEntityMenuBtnImgSrc);
				});
			}
		});
	},

	trashEmptyBtnEvent : function() {
		var _this = this;
		$("#project-toolbar-trash-empty-btn").click(function() {

			var smModal = new SmallModal("휴지통", "모든 파일, 폴더를 완전 삭제하시겠습니까?");

			if ($("#project-toolbar-check-btn").data("checked"))
				smModal.setBodyText("선택한 파일, 폴더를 완전 삭제하시겠습니까?");
			else
				smModal.setBodyText("모든 파일, 폴더를 완전 삭제하시겠습니까?");

			// '예' 버튼 이벤트 설정
			smModal.confirmEvent(function() {
				var deleteList = [];

				if ($("#project-toolbar-check-btn").data("checked")) {
					$.each(_this.projectMainView.getProjectContentEntityList(), function(i, entity) {
						if (entity.isChecked()) {
							var obj = null;

							if (entity instanceof ProjectFolder) {
								obj = {
									"type" : "folder",
									"id" : entity.getID()
								};
							} else {
								obj = {
									"type" : "file",
									"id" : entity.getID()
								};
							}

							deleteList.push(obj);
						}
					});
				} else {
					$.each(_this.projectMainView.getProjectContentEntityList(), function(i, entity) {

						var obj = null;
						if (entity instanceof ProjectFolder) {
							obj = {
								"type" : "folder",
								"id" : entity.getID()
							};
						} else {
							obj = {
								"type" : "file",
								"id" : entity.getID()
							};
						}

						deleteList.push(obj);

					});
				}

				$.ajax({
					url : _this.serverRootPath+"/project?action=allDelete",
					type : "POST",
					dataType : "JSON",
					data : {
						"deleteList" : JSON.stringify(deleteList)
					},
					success : function(data, textStatus, jqXHR) {
						if ($("#project-toolbar-check-btn").data("checked")) {
							$.each(deleteList, function(i, entity) {
								_this.projectMainView.removeProjectContentEntity(entity.id);
							});
						} else
							_this.projectMainView.resetProjectContentView();

						var trashBtnImg = $("#empty-trash-btn-img");
						var trashBtnImgSrc = trashBtnImg.attr("src");

						trashBtnImg.attr("src", trashBtnImgSrc.replace("trash_empty_over.png", "trash_empty.png"));

						smModal.hide();
					}
				});
			});

			// body에 modal append
			smModal.assginModalPanel();

			// modal show.
			smModal.show();
		});
	},

	trashRestoreBtnEvent : function() {
		var _this = this;
		$("#project-toolbar-trash-restore-btn").click(function() {
			var restoreList = [];

			if ($("#project-toolbar-check-btn").data("checked")) {
				$.each(_this.projectMainView.getProjectContentEntityList(), function(i, entity) {
					if (entity.isChecked()) {
						var obj = null;
						if (entity instanceof ProjectFolder) {
							obj = {
								"type" : "folder",
								"id" : entity.getID(),
								"name" : entity.getName(),
								"parentID" : entity.getParentID()
							};
						} else {
							obj = {
								"type" : "file",
								"id" : entity.getID(),
								"name" : entity.getName(),
								"parentID" : entity.getParentID()
							}
						}
						restoreList.push(obj);
					}
				});
			} else {
				$.each(_this.projectMainView.getProjectContentEntityList(), function(i, entity) {

					var obj = null;
					if (entity instanceof ProjectFolder) {
						obj = {
							"type" : "folder",
							"id" : entity.getID(),
							"name" : entity.getName(),
							"parentID" : entity.getParentID()
						};
					} else {
						obj = {
							"type" : "file",
							"id" : entity.getID(),
							"name" : entity.getName(),
							"parentID" : entity.getParentID()
						};
					}

					restoreList.push(obj);

				});
			}
			$.ajax({
				url : _this.serverRootPath+"/project?action=allRestore",
				type : "POST",
				dataType : "JSON",
				data : {
					"restoreList" : JSON.stringify(restoreList)
				},
				success : function(data, textStatus, jqXHR) {
					if (data == "") {
					} else {
						var overlapName = ""
						$.each(data, function(i, entity) {
							overlapName = overlapName + ", " + entity.name;
						});
						overlapName = overlapName.substring(2, overlapName.length);
						var smModal = new SmallModal("되살리기", overlapName + " 폴더(파일)가 같은 이름이 존재합니다.");

						smModal.hideModalConfirmBtn();
						smModal.setModalCancleBtnText("확인");

						// body에 modal append
						smModal.assginModalPanel();

						// modal show.
						smModal.show();
					}

					$("#move-trash-btn").click();
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log("projectToolbarView all empty fail!!");
				}
			});
		});
	},

	searchBtnEvent : function() {
		var _this = this;
			$("#project-toolbar-search-btn").click(function() {
			if ($("#project-toolbar-search-input").val() === "") {
				$("#project-toolbar-search-input").val("");
			} else {
				$.ajax({
					url : _this.serverRootPath+"/project?action=searchEntity",
					type : "POST",
					dataType : "JSON",
					data : {
						ownerID : $("#header-user-id").attr("uid"),
						clue : $("#project-toolbar-search-input").val()
					},
					success : function(data, textStatus, jqXHR) {
						$("#project-toolbar-search-input").val("");
						var projectFolder = null;
						var projectFile = null;

						_this.projectMainView.resetProjectContentView();


							// 프로젝트뷰 타이틀 설정
							_this.projectMainView.setProjectTitle("검색 결과");

							$("#project-toolbar-whole").show();
							$(".project-toolbar-trash-btn").hide();

							// 현재 클릭하여 출력된 contentEntity 저장
							_this.projectMainView.setCurrentEntity(_this);


						$.each(data, function(i, entity) {
							// 먼저 폴더
							if (entity.type == "folder") {
								// explorerModal 일때는 explorerEntity만 추가!
									projectFolder = new ProjectFolder(_this.serverRootPath, _this.projectMainView,
											entity.id, entity.name, entity.ownerID, entity.ownerName,
											entity.sharedRootID, entity.parentID, entity.date, entity.isDelete);

									// 프로젝트 컨텐트 엔티티 추가
									_this.projectMainView.addProjectContentEntity(projectFolder);
							}
							// 파일
							else if (entity.type == "file") {

									projectFile = new ProjectFile(_this.serverRootPath, _this.projectMainView,
											entity.id, entity.name, entity.ownerID, entity.ownerName,
											entity.modifierID, entity.modifierName, entity.sharedRootID,
											entity.parentID, entity.date, entity.isDelete, entity.isLock);
									// 프로젝트 컨텐트 엔티티 추가
									_this.projectMainView.addProjectContentEntity(projectFile);
								} 
							});
						},
					error : function(jqXHR, textStatus, errorThrown) {
						console.log("projectToolbarSearch Error!!");
					}
				});
			}
		});
	},

	exportBtnEvent : function() {
		var _this = this;
		$("#project-toolbar-export-btn").click(
				function() {
					var exportList = [];

					$.each(_this.projectMainView.getProjectContentEntityList(), function(i, entity) {
						if (entity.isChecked()) {
							var obj = null;
							if (entity instanceof ProjectFolder) {
								obj = {
									"type" : "folder",
									"id" : entity.getID(),
									"name" : entity.getName()
								};
							} else {
								obj = {
									"type" : "file",
									"id" : entity.getID(),
									"name" : entity.getName()
								}
							}
							exportList.push(obj);
						}
					});

					$.ajax({
						url : _this.serverRootPath+"/project?action=allExport",
						type : "POST",
						dataType : "JSON",
						data : {
							"userID" : $("#header-user-id").attr("uid"),
							"exportList" : JSON.stringify(exportList)
						},
						success : function(data, textStatus, jqXHR) {
							location.href = _this.serverRootPath+"/editor?action=download&fileName="
									+ $("#header-user-id").attr("uid") + ".zip";
						},
						error : function(jqXHR, textStatus, errorThrown) {
							console.log("projectToolbarSearch Error!!");
						}
					});
				});
	},

	deleteBtnEvent : function() {
		var _this = this;
		$("#project-toolbar-del-btn").click(function() {
			var smModal = new SmallModal("삭제", "선택한 파일,폴더를 삭제하시겠습니까?");

			// '예' 버튼 이벤트 설정
			smModal.confirmEvent(function() {
				var moveToTrashList = [];
				var moveToTrashListLength = moveToTrashList.length;

				$.each(_this.projectMainView.getProjectContentEntityList(), function(i, entity) {
					if (entity.isChecked()) {
						var obj = null;
						if (entity instanceof ProjectFolder) {
							obj = {
								"type" : "folder",
								"id" : entity.getID(),
								"name" : entity.getName()
							};
						} else {
							obj = {
								"type" : "file",
								"id" : entity.getID(),
								"name" : entity.getName(),
								"lock" : entity.isLock
							}
						}
						moveToTrashList.push(obj);
					}
				});

				$.ajax({
					url : _this.serverRootPath+"/project?action=allMoveToTrash",
					type : "POST",
					dataType : "JSON",
					data : {
						"moveToTrashList" : JSON.stringify(moveToTrashList)
					},
					success : function(data, textStatus, jqXHR) {
						var dataLength = 0;
						if (data == "") {
							smModal.hide();
						} else {
							var overlapName = "";
							$.each(data, function(i, entity) {
								overlapName = overlapName + ", " + entity.name;
								dataLength++;
							});

							overlapName = overlapName.substring(2, overlapName.length);

							smModal.setBodyText(overlapName + " 파일은 현재 다른 사용자가 사용중입니다.");
							smModal.hideModalConfirmBtn();
							smModal.setModalCancleBtnText("확인");
						}

						if (dataLength != moveToTrashListLength) {
							// 휴지통 이미지 변환
							var trashBtnImg = $("#empty-trash-btn-img");
							var trashBtnImgSrc = trashBtnImg.attr("src");

							trashBtnImg.attr("src", trashBtnImgSrc.replace("trash_empty.png", "trash_empty_over.png"));
						}

						_this.projectMainView.getCurrentEntity().getProjectExplorerEntity().click();
					},
					error : function(jqXHR, textStatus, errorThrown) {
						console.log("projectToolbarDelete Error!!");
					}
				});
			});

			// body에 modal append
			smModal.assginModalPanel();

			// modal show.
			smModal.show();

		});
	},

	moveBtnEvent : function() {
		var _this = this;
		$("#project-toolbar-move-btn").click(
				function() {
					var moveList = [];

					$.each(_this.projectMainView.getProjectContentEntityList(), function(i, entity) {
						if (entity.isChecked()) {
							var obj = null;

							if (entity instanceof ProjectFolder) {
								obj = {
									"type" : "folder",
									"id" : entity.getID(),
									"name" : entity.getName()
								};

							} else {
								obj = {
									"type" : "file",
									"id" : entity.getID(),
									"name" : entity.getName()
								};
							}
							moveList.push(obj);
						}
					});
					var explorerModal = new ExplorerModal(_this.serverRootPath, _this.projectMainView, "이동",
							_this.name, "이름을 입력해주세요", "이동", "같은 이름이 존재합니다.");

					explorerModal.hideModalBodyFormInputGroup();

					explorerModal.btnEvent(function() {
						var parentEntity = explorerModal.getCurrentEntity();

						$.ajax({
							url : _this.serverRootPath+"/project?action=allMove",
							type : "POST",
							dataType : "JSON",
							data : {
								moveList : JSON.stringify(moveList),
								newParentID : parentEntity.getID(),
								newOwnerID : parentEntity.getOwnerID(),
								newModifierID : $("#header-user-id").attr("uid"),
								newSharedRootID : parentEntity.getSharedRootID()
							},
							success : function(data, textStatus, jqXHR) {
								if (data == "") {
								} else {
									var overlapName = "";

									$.each(data, function(i, entity) {
										overlapName = overlapName + ", " + entity.name;
									});

									overlapName = overlapName.substring(2, overlapName.length);

									var smModal = new SmallModal("이동", overlapName + " 폴더(파일)는 같은 이름이 존재합니다.");

									smModal.hideModalConfirmBtn();
									smModal.setModalCancleBtnText("확인");

									// body에 modal append
									smModal.assginModalPanel();

									// modal show.
									smModal.show();
								}

								explorerModal.hide();

								_this.projectMainView.getCurrentEntity().getProjectExplorerEntity().click();
							},
							error : function(jqXHR, textStatus, errorThrown) {
							}
						});
					});

					explorerModal.assginModalPanel();
					explorerModal.show();

				});
	},

	copyBtnEvent : function() {
		var _this = this;
		$("#project-toolbar-copy-btn").click(
				function() {
					var copyList = [];

					$.each(_this.projectMainView.getProjectContentEntityList(), function(i, entity) {
						if (entity.isChecked()) {
							var obj = null;

							if (entity instanceof ProjectFolder) {
								obj = {
									"type" : "folder",
									"id" : entity.getID(),
									"name" : entity.getName()
								};

							} else {
								obj = {
									"type" : "file",
									"id" : entity.getID(),
									"name" : entity.getName()
								};
							}
							copyList.push(obj);
						}
					});
					var explorerModal = new ExplorerModal(_this.serverRootPath, _this.projectMainView, "복사",
							_this.name, "이름을 입력해주세요", "복사", "같은 이름이 존재합니다.");

					explorerModal.hideModalBodyFormInputGroup();

					explorerModal.btnEvent(function() {
						var parentEntity = explorerModal.getCurrentEntity();

						$.ajax({
							url : _this.serverRootPath+"/project?action=allCopy",
							type : "POST",
							dataType : "JSON",
							data : {
								copyList : JSON.stringify(copyList),
								newParentID : parentEntity.getID(),
								newOwnerID : parentEntity.getOwnerID(),
								newModifierID : $("#header-user-id").attr("uid"),
								newSharedRootID : parentEntity.getSharedRootID()
							},
							success : function(data, textStatus, jqXHR) {
								if (data == "") {
								} else {
									var overlapName = "";

									$.each(data, function(i, entity) {
										overlapName = overlapName + ", " + entity.name;
									});

									overlapName = overlapName.substring(2, overlapName.length);

									var smModal = new SmallModal("복사", overlapName + " 폴더(파일)는 같은 이름이 존재합니다.");

									smModal.hideModalConfirmBtn();
									smModal.setModalCancleBtnText("확인");

									// body에 modal append
									smModal.assginModalPanel();

									// modal show.
									smModal.show();
								}

								explorerModal.hide();

								_this.projectMainView.getCurrentEntity().getProjectExplorerEntity().click();
							},
							error : function(jqXHR, textStatus, errorThrown) {
							}
						});
					});

					explorerModal.assginModalPanel();
					explorerModal.show();

				});
	}
});