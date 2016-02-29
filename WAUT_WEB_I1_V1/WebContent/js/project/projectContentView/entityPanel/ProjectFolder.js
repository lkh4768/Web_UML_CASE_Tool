ProjectFolder = Class
		.extend({

			Name : "ProjectFolder",

			init : function(serverRootPath, projectMainView, id, name, ownerID, ownerName, sharedRootID, parentID,
					date, isDelete) {
				this.serverRootPath = serverRootPath;
				this.projectMainView = projectMainView;
				this.folder_id = id;
				this.name = name;
				this.ownerID = ownerID;
				this.ownerName = ownerName;
				this.sharedRootID = sharedRootID;
				this.parentID = parentID;
				this.date = date;
				this.isDelete = isDelete;
				this.checked = false;

				this.entityPanel = $('<div class="panel panel-default project-entity-panel"></div>');

				// 바디 부분
				this.entityPanelBtn = $('<a href="#" class="project-entity-panel-btn"></a>');
				this.entityPanelBody = $('<div class="project-entity-panel-body project-folder-panel-body panel-body" style="background-image:url(\''
						+ this.serverRootPath
						+ '/img/project/content/big_folder.png\'); background-size:80% 80%; background-position: center; background-repeat: no-repeat;">');
				this.entitySharedImg = $('<img class="project-entity-shared-img" src="' + this.serverRootPath
						+ '/img/project/content/shared.png" style="z-index:0;"/>');
				this.entityCheckBtn = $('<button type="button" class="btn btn-default project-entity-check-btn"></button>');
				this.entityCheckBtnImg = $('<img src="' + this.serverRootPath
						+ '/img/project/toolbar/check_over.png" class="project-entity-check-img">');

				// 푸터 부분
				this.entityFooter = $('<div class="project-entity-panel-footer panel-footer"></div>');
				this.entityName = $('<div class="project-entity-name"></div>') // file
				// or
				// folder
				// 이름
				this.entityProperties = $('<div class="project-entity-properties"></div>');
				this.entityOwner = $('<div class="project-entity-owner">' + this.ownerName + '</div>'); // owner
				this.entityMenu = $('<div class="project-entity-menu"></div>');

				this.sharedBtn = $('<a href="#" class="project-folder-share-btn project-entity-btn"></a>');
				this.sharedBtnImg = $(' <img class="project-entity-menu-btn-img" src="' + this.serverRootPath
						+ '/img/project/content/share.png" />');

				this.settingBtn = $('<a href="#" id="' + this.folder_id + this.isDelete
						+ '" class="project-folder-setting-btn project-entity-btn"></a>');
				this.settingBtnImg = $('<img class="project-entity-menu-btn-img" src="' + this.serverRootPath
						+ '/img/project/content/setting.png" />');

				// append 부분
				this.settingBtn.append(this.settingBtnImg);

				this.sharedBtn.append(this.sharedBtnImg);

				if (this.projectMainView.getCurrentEntity() != "trash") {
					this.entityMenu.append(this.sharedBtn);
				}
				this.entityMenu.append(this.settingBtn);

				this.entityProperties.append(this.entityMenu);
				this.entityProperties.append(this.entityOwner);

				this.entityFooter.append(this.entityName);
				this.entityFooter.append(this.entityProperties);

				this.entityCheckBtn.append(this.entityCheckBtnImg);

				this.entityPanelBody.append(this.entityCheckBtn);
				this.entityPanelBody.append(this.entitySharedImg);

				this.entityPanelBtn.append(this.entityPanelBody);

				this.entityPanel.append(this.entityPanelBtn);
				this.entityPanel.append(this.entityFooter);

				// check버튼 초기화(안보이게)
				this.hideCheckBtn();
				this.checkedEvent();

				// shared 설정
				this.setShared(this.sharedRootID);
				this.setSharedBtn();

				this.showSharedSlideBar();
				this.clickFolderEvent();

				this.settingBtnEvent();

				this.setName(this.name);
			},

			getID : function() {
				return this.folder_id;
			},

			getName : function() {
				return this.name;
			},

			getOwnerID : function() {
				return this.ownerID;
			},

			getOwnerName : function() {
				return this.ownerName;
			},

			getSharedRootID : function() {
				return this.sharedRootID;
			},

			getParentID : function() {
				return this.parentID;
			},

			getDate : function() {
				return this.date;
			},

			getEntityPanel : function() {
				return this.entityPanel;
			},

			setName : function(text) {
				this.name = text;
				if (text.length > 20) {
					text = text.substring(0, 19) + "...";
					this.entityName.attr("data-toggle", "tooltip");
					this.entityName.attr("data-placement", "bottom");
					this.entityName.attr("title", this.name);
				}

				this.entityName.text(text);
			},
			setSharedBtn : function() {
				if ($("#header-user-id").attr("uid") !== this.ownerID) {
					this.sharedBtn.hide();
				} else if ((this.sharedRootID !== "0") && (this.folder_id !== this.sharedRootID)) {
					this.sharedBtn.hide();
				} else {
					this.sharedBtn.show();
				}
			},

			setShared : function(flag) {
				if (flag !== "0") {
					this.entitySharedImg.show();
				} else {
					this.entitySharedImg.hide();
				}
			},

			showCheckBtn : function() {
				this.checked = true;
				this.entityCheckBtn.show();
				this.entityCheckBtn.click();
			},

			hideCheckBtn : function() {
				this.entityCheckBtn.hide();
			},

			checkedEvent : function() {
				var _this = this;
				this.entityCheckBtn.click(function() {
					if (_this.checked) {
						$(this).css("background-color", "#ffffff");
						_this.checked = false;
					} else {
						$(this).css("background-color", "#3b4d5d");
						_this.checked = true;
					}
				});
			},

			isChecked : function() {
				return this.checked;
			},

			settingBtnEvent : function() {
				var _this = this;
				$.contextMenu(_this.projectFolderSettingContextMenu());

				this.settingBtn.click(function(e) {
					e.preventDefault();
					$(this).contextMenu();
				});
			},

			projectFolderSettingContextMenu : function() {
				var _this = this;
				var contextMenuContent = null;

				if (_this.isDelete == "true") {
					contextMenuContent = {
						selector : "#" + _this.folder_id + _this.isDelete,
						trigger : 'none',
						callback : function(key, options) {
							switch (key) {
							case "empty":
								var smModal = new SmallModal("폴더", "완전 삭제하시겠습니까?");

								// '예' 버튼 이벤트 설정
								smModal.confirmEvent(function() {
									$.ajax({
										url : _this.serverRootPath+"/project?action=deleteFolder",
										type : "POST",
										dataType : "JSON",
										data : {
											id : _this.folder_id
										},
										success : function(data, textStatus, jqXHR) {
											if (data.result == "true") {
												_this.projectMainView.removeProjectContentEntity(_this.getID());

												// 휴지통 이미지 변환(휴지통에 아무것도 없을때)
												if (_this.projectMainView.getProjectContentEntityList.length == 0) {
													var trashBtnImg = $("#empty-trash-btn-img");
													var trashBtnImgSrc = trashBtnImg.attr("src");

													trashBtnImg.attr("src", trashBtnImgSrc.replace(
															"trash_empty_over.png", "trash_empty.png"));
												}
												smModal.hide();
											} else {
												console.log("javascript folder del fail!!");
											}
										},
										error : function(jqXHR, textStatus, errorThrown) {
										}
									});
								});

								// body에 modal append
								smModal.assginModalPanel();

								// modal show.
								smModal.show();
								break;
							case "restore":

								$.ajax({
									url : _this.serverRootPath+"/project?action=restoreFolder",
									type : "POST",
									dataType : "JSON",
									data : {
										name : _this.name,
										parentID : _this.parentID,
										id : _this.getID()
									},
									success : function(data, textStatus, jqXHR) {
										if (data.result == "true") {
											_this.projectMainView.removeProjectContentEntity(_this.getID());

											// 휴지통 이미지 변환(휴지통에 아무것도 없을때)
											if (_this.projectMainView.getProjectContentEntityList().length == 0) {
												var trashBtnImg = $("#empty-trash-btn-img");
												var trashBtnImgSrc = trashBtnImg.attr("src");

												trashBtnImg.attr("src", trashBtnImgSrc.replace("trash_empty_over.png",
														"trash_empty.png"));
											}
										} else {
											var smModal = new SmallModal("폴더", "같은 이름이 존재합니다.");

											smModal.hideModalConfirmBtn();
											smModal.setModalCancleBtnText("확인");

											// body에 modal append
											smModal.assginModalPanel();

											// modal show.
											smModal.show();
										}
									},
									error : function(jqXHR, textStatus, errorThrown) {
									}
								});

								break;
							default:
								break;
							}

						},
						items : {
							"empty" : {
								name : "비우기",
								icon : ""
							},
							"restore" : {
								name : "되살리기",
								icon : ""
							}
						}
					}
				} else {
					var items = null;
					if (_this.sharedRootID == 0 || _this.ownerID == $("#header-user-id").attr("uid")) {
						items = {
							"modifyName" : {
								name : "이름변경",
								icon : ""
							},
							"copy" : {
								name : "복사",
								icon : ""
							},
							"move" : {
								name : "이동",
								icon : ""
							},
							"delete" : {
								name : "삭제",
								icon : ""
							},
							"sep" : "---------",
							"export" : {
								name : "내보내기",
								icon : ""
							}
						}
					} else {
						items = {
							"copy" : {
								name : "복사",
								icon : ""
							},
							"delete" : {
								name : "삭제",
								icon : ""
							},
							"sep" : "---------",
							"export" : {
								name : "내보내기",
								icon : ""
							}
						}
					}

					contextMenuContent = {
						selector : "#" + _this.folder_id + _this.isDelete,
						trigger : 'none',
						callback : function(key, options) {
							switch (key) {
							case "copy":
								var explorerModal = new ExplorerModal(_this.serverRootPath, _this.projectMainView,
										"복사", _this.name, "이름을 입력해주세요", "복사", "같은 이름이 존재합니다.");

								explorerModal.btnEvent(function() {

									var parentEntity = explorerModal.getCurrentEntity();

									if (parentEntity instanceof ProjectExplorerEntity) {
										$.ajax({
											url : _this.serverRootPath+"/project?action=copyFolder",
											type : "POST",
											dataType : "JSON",
											data : {
												id : _this.folder_id,
												newName : explorerModal.getInputText(),
												newParentID : parentEntity.getID(),
												newOwnerID : parentEntity.getOwnerID(),
												newModifierID : $("#header-user-id").attr("uid"),
												newSharedRootID : parentEntity.getSharedRootID()
											},
											success : function(data, textStatus, jqXHR) {
												if (data.result == "true") {
													if (data.parentID == parentEntity.getID()) {
														var projectFolder = new ProjectFolder(_this.serverRootPath,
																_this.projectMainView, data.folderID, data.folderName,
																data.folderOwner, $("#header-user-id").attr("uname"),
																data.folderSharedRootID, data.folderParentID,
																data.folderDate, null);

														_this.projectMainView.addProjectContentEntity(projectFolder);
													}

													// explorer 업데이트를 위해
													$.each(_this.projectMainView.getProjctExplorerEntityList(),
															function(i, pee) {
																if (parentEntity.getID() == pee.getID())
																	pee.getProjectExplorerEntity().click();
															});

													explorerModal.hide();
												} else {
													explorerModal.showErrorMessage();
												}
											},
											error : function(jqXHR, textStatus, errorThrown) {
											}
										});
									}
								});

								explorerModal.assginModalPanel();
								explorerModal.show();
								break;
							case "delete":
								var smModal = new SmallModal("폴더", "삭제하시겠습니까?");

								// '예' 버튼 이벤트 설정
								smModal.confirmEvent(function() {

									$.ajax({
										url : _this.serverRootPath+"/project?action=moveToTrashFolder",
										type : "POST",
										dataType : "JSON",
										data : {
											id : _this.getID()
										},
										success : function(data, textStatus, jqXHR) {
											var lockFileStr = "";

											$.each(data, function(i, val) {
												lockFileStr = lockFileStr + ", " + val.name;
											});

											lockFileStr = lockFileStr.substring(2, lockFileStr.length);
											if (lockFileStr == "") {
												_this.projectMainView.removeProjectContentEntity(_this.getID());

												if (_this.ownerID == $("#header-user-id").attr("uid")) {
													// 휴지통 이미지 변환
													var trashBtnImg = $("#empty-trash-btn-img");
													var trashBtnImgSrc = trashBtnImg.attr("src");

													trashBtnImg.attr("src", trashBtnImgSrc.replace("trash_empty.png",
															"trash_empty_over.png"));
												}
												smModal.hide();

												// explorer 업데이트를 위해
												$.each(_this.projectMainView.getProjctExplorerEntityList(), function(i,
														pee) {
													if (_this.parentID == pee.getID())
														pee.getProjectExplorerEntity().click();
												});
											} else {
												smModal.setBodyText("하위 파일 " + lockFileStr + " 가 현재 다른 사용자가 사용중입니다.");
												smModal.hideModalConfirmBtn();
												smModal.setModalCancleBtnText("확인");
											}
										},
										error : function(jqXHR, textStatus, errorThrown) {
										}
									});
								});

								// body에 modal append
								smModal.assginModalPanel();

								// modal show.
								smModal.show();
								break;
							case "modifyName":
								var inputModal = new InputModal("이름 변경", "이름을 입력해주세요", "변경", "");
								inputModal.btnEvent(function() {
									if (inputModal.getInputText() === "") {
										inputModal.setErrorMessage("입력란이 비어있습니다.");
										inputModal.showErrorMessage();

									} else {
										$.ajax({
											url : _this.serverRootPath+"/project?action=renameFolder",
											type : "POST",
											dataType : "JSON",
											data : {
												"folderID" : _this.getID(),
												"folderName" : inputModal.getInputText(),
												"folderParentID" : _this.getParentID()
											},
											success : function(data, textStatus, jqXHR) {

												if (data.result === "false") {
													inputModal.setErrorMessage("같은 이름이 존재합니다.");
													inputModal.showErrorMessage();
												} else {
													inputModal.hide();

													// explorer 업데이트를 위해
													$.each(_this.projectMainView.getProjctExplorerEntityList(),
															function(i, pee) {
																if (_this.parentID == pee.getID())
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
								break;
							case "move":
								var explorerModal = new ExplorerModal(_this.serverRootPath, _this.projectMainView,
										"이동", _this.name, "이름을 입력해주세요", "이동", "같은 이름이 존재합니다.");

								explorerModal.btnEvent(function() {

									var parentEntity = explorerModal.getCurrentEntity();

									$.ajax({
										url : _this.serverRootPath+"/project?action=moveFolder",
										type : "POST",
										dataType : "JSON",
										data : {
											id : _this.folder_id,
											newName : explorerModal.getInputText(),
											newParentID : parentEntity.getID(),
											newOwnerID : parentEntity.getOwnerID(),
											newSharedRootID : parentEntity.getSharedRootID()
										},
										success : function(data, textStatus, jqXHR) {
											if (data.result == "true") {
												_this.setName(explorerModal.getInputText());
												_this.projectMainView.removeProjectContentEntity(_this.getID());
												explorerModal.hide();

												// explorer 업데이트를 위해
												$.each(_this.projectMainView.getProjctExplorerEntityList(), function(i,
														pee) {
													if (_this.parentID == pee.getID())
														pee.getProjectExplorerEntity().click();
												});

											} else {
												explorerModal.showErrorMessage();
											}
										},
										error : function(jqXHR, textStatus, errorThrown) {
										}
									});
								});

								explorerModal.assginModalPanel();
								explorerModal.show();
								break;
							case "export":
								$.ajax({
									url : _this.serverRootPath+"/project?action=exportFolder",
									type : "POST",
									dataType : "JSON",
									data : {
										"id" : _this.folder_id,
										"name" : _this.name
									},
									success : function(data, textStatus, jqXHR) {
										if (data.result == "true") {
											location.href = _this.serverRootPath+"/editor?action=download&fileName="
													+ _this.name + ".zip";
										} else {
											var smModal = new SmallModal("파일", "현재 저장된 파일이 없습니다.");

											smModal.hideModalConfirmBtn();
											smModal.setModalCancleBtnText("확인");

											// body에 modal append
											smModal.assginModalPanel();

											// modal show.
											smModal.show();
										}
									},
									error : function(jqXHR, textStatus, errorThrown) {
									}
								});
								break;
							default:
								break;
							}
						},
						items : items
					}
				}

				return contextMenuContent;
			},
			
			offEntityEvent : function() {
				this.settingBtn.off("click");
				this.sharedBtn.off("click");
			},

			onEntityEvent : function() {
				this.settingBtnEvent();
				this.showSharedSlideBar();
			},

			showSharedSlideBar : function() {
				var _this = this;

				var psv = new ProjectSlidebarView();
				_this.sharedBtn.click(function(e) {
					e.preventDefault();

					if (!(psv.getToggleCondition())) {
						psv.showProjectSlideView();

						if (psv.isActiveProjectSlideView) {

							var shareSlidebarView = psv.assignShareSlidebarView(_this.serverRootPath, _this.folder_id,
									_this.name, _this);
							$.ajax({
								url : _this.serverRootPath+"/share?action=getMemberList",
								type : "POST",
								dataType : "JSON",
								data : {
									"folderID" : _this.folder_id,
									"parentID" : _this.parentID
								},
								success : function(data, textStatus, jqXHR) {
									$.each(data, function(i, entity) {
										shareSlidebarView.addShareEntity(_this.serverRootPath, entity.member_id,
												entity.member_name, entity.folder_id);
									});

								},
								error : function(jqXHR, textStatus, errorThrown) {
								}
							});
						}
					} else {
						psv.hideProjectSlideView();

					}
				});

			},

			clickFolderEvent : function() {
				var _this = this;
				if (this.isDelete == "false") {
					this.entityPanelBtn.click(function(e) {
						if (_this.entityCheckBtn.css("display") == 'none') {
							e.preventDefault();
							$.ajax({
								url : _this.serverRootPath+"/project?action=getEntity",
								type : "POST",
								data : {
									"folderID" : _this.folder_id,
									"ownerID" : _this.ownerID,
								},
								dataType : "json",
								success : function(data, textStatus, jqXHR) {

									var projectFolder = null;
									var projectFile = null;

									_this.projectMainView.resetProjectContentView();

									// 프로젝트뷰 타이틀 설정
									_this.projectMainView.setProjectTitle(_this.name);

									$("#project-toolbar-whole").show();
									$(".project-toolbar-trash-btn").hide();

									// 현재 클릭하여 출력된 contentEntity 저장
									_this.projectMainView.setCurrentEntity(_this);

									$.each(data, function(i, entity) {
										// 먼저 폴더
										if (entity.type == "folder") {
											// explorerModal 일때는 explorerEntity만
											// 추가!
											projectFolder = new ProjectFolder(_this.serverRootPath,
													_this.projectMainView, entity.id, entity.name, entity.ownerID,
													entity.ownerName, entity.sharedRootID, entity.parentID,
													entity.date, entity.isDelete);

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

									if (_this.getID() == 0) {
										_this.projectMainView.showProjectToolbar();
										_this.projectMainView.hideProjectToolbarAddFileBtn();
										_this.projectMainView.hideProjectToolbarImportFileBtn();
									} else if (_this.getID() == 1) {
										_this.projectMainView.hideProjectToolbarView();
									} else {
										_this.projectMainView.showProjectToolbar();
									}
								},
								error : function(jqXHR, textStatus, errorThrown) {
									console.log(textStatus);
								}
							});
						}
					});
				}
			}

		});