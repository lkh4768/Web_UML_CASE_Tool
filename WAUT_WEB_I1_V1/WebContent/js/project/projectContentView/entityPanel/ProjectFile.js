ProjectFile = Class
		.extend({

			Name : "ProjectFile",

			init : function(serverRootPath, projectMainView, id, name, ownerID, ownerName, modifierID, modifierName,
					sharedRootID, parentID, date, isDelete, isLock) {
				this.serverRootPath = serverRootPath;
				this.projectMainView = projectMainView;
				this.id = id;
				this.name = name;
				this.ownerID = ownerID;
				this.ownerName = ownerName;
				this.modifierID = modifierID;
				this.modifierName = modifierName;
				this.sharedRootID = sharedRootID;
				this.parentID = parentID;
				this.date = date;
				this.isDelete = isDelete;
				this.isLock = isLock;
				this.checked = false;
				this.backgroundImg = "\'http://capstone.myaxler.org/" + id + ".png" + "\'";

				this.entityPanel = $('<div class="panel panel-default project-entity-panel"></div>');

				// 바디 부분
				this.entityPanelBtn = $('<a href="#" class="project-entity-panel-btn"></a>');
				this.entityPanelBody = $('<div class="project-entity-panel-body project-file-panel-body panel-body" style="background-image:url('
						+ this.backgroundImg
						+ '); background-size:100% 100%; background-position: center; background-repeat: no-repeat;">');
				this.entitySharedImgContainer = $('<div></div>');
				this.entitySharedImg = $('<img class="project-entity-shared-img" src="' + this.serverRootPath
						+ '/img/project/content/shared.png"/>');
				this.entityCheckBtn = $('<button type="button" class="btn btn-default project-entity-check-btn"></button>');
				this.entityCheckBtnImg = $('<img src="' + this.serverRootPath
						+ '/img/project/toolbar/check_over.png" class="project-entity-check-img">');
				this.entityLockImg = $('<img class="project-entity-locked-img" src="' + this.serverRootPath
						+ '/img/project/content/locked.png"/>');

				// 푸터 부분
				this.entityFooter = $('<div class="project-entity-panel-footer panel-footer"></div>');
				this.entityName = $('<div class="project-entity-name"></div>') // file
				// or
				// folder
				// 이름
				this.entityProperties = $('<div class="project-entity-properties"></div>');
				this.entityOwner = $('<div class="project-entity-owner">' + this.ownerName + '</div>'); // owner
				this.entityMenu = $('<div class="project-entity-menu"></div>');

				this.commentBtn = $('<a href="#" class="project-file-comment-btn project-entity-btn"></a>');
				this.commentBtnImg = $(' <img class="project-entity-menu-btn-img" src="' + this.serverRootPath
						+ '/img/project/content/comment.png" />');

				this.settingBtn = $('<a href="#" id="' + this.id + this.isDelete
						+ '"class="project-file-setting-btn project-entity-btn"></a>');
				this.settingBtnImg = $('<img class="project-entity-menu-btn-img" src="' + this.serverRootPath
						+ '/img/project/content/setting.png" />');

				this.projectFileForm = $('<form id="project-file-form" method="post" action="" style="display: none;"></form>');

				// append 부분
				this.settingBtn.append(this.settingBtnImg);

				this.commentBtn.append(this.commentBtnImg);

				if (this.projectMainView.getCurrentEntity() != "trash") {
					this.entityMenu.append(this.commentBtn);
				}
				this.entityMenu.append(this.settingBtn);

				this.entityProperties.append(this.entityMenu);
				this.entityProperties.append(this.entityOwner);

				this.entityFooter.append(this.entityName);
				this.entityFooter.append(this.entityProperties);

				this.entityCheckBtn.append(this.entityCheckBtnImg);

				this.entitySharedImgContainer.append(this.entitySharedImg);
				
				this.entityPanelBody.append(this.entityCheckBtn);
				this.entityPanelBody.append(this.entitySharedImgContainer);
				this.entityPanelBody.append(this.entityLockImg);

				this.entityPanelBtn.append(this.entityPanelBody);

				this.entityPanel.append(this.entityPanelBtn);
				this.entityPanel.append(this.entityFooter);

				// check버튼 초기화(안보이게)
				this.hideCheckBtn();
				this.checkedEvent();

				// shared 설정
				this.setShared(this.sharedRootID);

				this.setLock(this.isLock);
				this.commentBtnEvent();
				this.settingBtnEvent();

				// 에디터로 이동하는 이벤트
				this.entityPanelBtnEvent();

				this.setName(this.name);
			},

			getID : function() {
				return this.id;
			},

			getParentID : function() {
				return this.parentID
			},

			getEntityPanel : function() {
				return this.entityPanel;
			},

			getName : function() {
				return this.name;
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

			setShared : function(flag) {
				if (flag !== "0") {
					this.entitySharedImg.css("display", "inline-block");
				} else {
					this.entitySharedImg.css("display", "none");
				}
			},

			setLock : function(flag) {
				if (flag == "true")
					this.entityLockImg.css("display", "inline-block");
				else
					this.entityLockImg.css("display", "none");
			},

			showCheckBtn : function() {
				this.checked = true;
				this.entityCheckBtn.css("display", "inline-block");
				this.entityCheckBtn.click();
			},

			hideCheckBtn : function() {
				this.entityCheckBtn.css("display", "none");
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

			commentBtnEvent : function() {
				var _this = this;
				this.commentBtn.click(function(e) {
					e.preventDefault();
					var psv = new ProjectSlidebarView();
					psv.showProjectSlideView();

					// 슬라이드바뷰가 살아있는 경우
					if (psv.isActiveProjectSlideView) {
						// commentView 설정
						var commentslidebarView = psv.assingCommentSlidebarView(_this.serverRootPath, _this.id,
								_this.name, _this.ownerName, _this.ownerID);

						// commentView commentList 가져오기 및 추가.
						$.ajax({
							url : _this.serverRootPath+"/comment?action=getCommentList",
							type : "POST",
							dataType : "JSON",
							data : {
								fileID : _this.id
							},
							success : function(data, textStatus, jqXHR) {
								$.each(data, function(i, entity) {
									commentslidebarView.addCommentEntity(_this.serverRootPath, entity.id,
											entity.ownerID, entity.ownerName, entity.date, entity.comment);
								});

							},
							error : function(jqXHR, textStatus, errorThrown) {
							}
						});
					}
				});
			},

			settingBtnEvent : function() {
				var _this = this;
				$.contextMenu(_this.projectFileSettingContextMenu());

				this.settingBtn.click(function(e) {
					e.preventDefault();
					$(this).contextMenu();
				});
			},

			projectFileSettingContextMenu : function() {
				var _this = this;
				var contextMenuContent = null;

				if (_this.isDelete == "true") {
					contextMenuContent = {
						selector : "#" + _this.id + _this.isDelete,
						trigger : 'none',
						callback : function(key, options) {
							switch (key) {
							case "empty":
								var smModal = new SmallModal("파일", "완전 삭제하시겠습니까?");

								// '예' 버튼 이벤트 설정
								smModal.confirmEvent(function() {
									$.ajax({
										url : _this.serverRootPath+"/project?action=deleteFile",
										type : "POST",
										dataType : "JSON",
										data : {
											id : _this.id
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
												console.log("javascript file del fail!!");
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
									url : _this.serverRootPath+"/project?action=restoreFile",
									type : "POST",
									dataType : "JSON",
									data : {
										id : _this.getID(),
										name : _this.getName(),
										parentID : _this.getParentID()
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
											var smModal = new SmallModal("파일", "같은 이름이 존재합니다.");

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
					};
				} else {
					var items = null;
					if (_this.sharedRootID == 0 || _this.ownerID == $("#header-user-id").attr("uid")) {
						items = {
							"rename" : {
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
							"moveToTrash" : {
								name : "삭제",
								icon : ""
							},
							"sep" : "---------",
							"log" : {
								name : "로그",
								icon : ""
							},
							"export" : {
								name : "내보내기",
								icon : ""
							}
						}
					} else {
						items = {
							"rename" : {
								name : "이름변경",
								icon : ""
							},
							"copy" : {
								name : "복사",
								icon : ""
							},
							"moveToTrash" : {
								name : "삭제",
								icon : ""
							},
							"sep" : "---------",
							"log" : {
								name : "로그",
								icon : ""
							},
							"export" : {
								name : "내보내기",
								icon : ""
							}
						}
					}
					contextMenuContent = {
						selector : "#" + _this.id + _this.isDelete,
						trigger : 'none',
						callback : function(key, options) {
							switch (key) {
							case "copy":
								var explorerModal = new ExplorerModal(_this.serverRootPath, _this.projectMainView,
										"복사", _this.name, "이름을 입력해주세요", "복사", "같은 이름이 존재합니다.");

								explorerModal.btnEvent(function() {

									var parentEntity = explorerModal.getCurrentEntity();
									
									if (parentEntity instanceof ProjectExplorerEntity) {

										if (explorerModal.getInputText() != "") {
											$.ajax({
												url : _this.serverRootPath+"/project?action=copyFile",
												type : "POST",
												dataType : "JSON",
												data : {
													id : _this.id,
													newName : explorerModal.getInputText(),
													newParentID : parentEntity.getID(),
													newOwnerID : parentEntity.getOwnerID(),
													newModifierID : $("#header-user-id").attr("uid"),
													newSharedRootID : parentEntity.getSharedRootID()
												},
												success : function(data, textStatus, jqXHR) {
													if (data.result == "true") {
														if (data.parentID == _this.projectMainView.getCurrentEntity()
																.getID()) {
															var projectFile = new ProjectFile(_this.serverRootPath,
																	_this.projectMainView, data.id, data.name,
																	data.ownerID, data.ownerName, data.modifierID,
																	data.modifierName, data.sharedRootID,
																	data.parentID, data.date, data.isDelete,
																	data.isLock, null);

															// 프로젝트 컨텐트 엔티티 추가
															_this.projectMainView.addProjectContentEntity(projectFile);
														}
														explorerModal.hide();
													} else {
														explorerModal.setErrorMessage("같은 이름이 존재합니다.");
														explorerModal.showErrorMessage();
													}
												},
												error : function(jqXHR, textStatus, errorThrown) {
												}
											});
										} else {
											explorerModal.setErrorMessage("이름을 입력해주세요.");
											explorerModal.showErrorMessage();
										}
									}
								});

								explorerModal.assginModalPanel();
								explorerModal.show();
								break;
							case "moveToTrash":
								var smModal = new SmallModal("파일", "삭제하시겠습니까?");

								// '예' 버튼 이벤트 설정
								smModal.confirmEvent(function() {

									if (_this.isLock == "false") {

										$.ajax({
											url : _this.serverRootPath+"/project?action=moveToTrashFile",
											type : "POST",
											dataType : "JSON",
											data : {
												id : _this.id
											},
											success : function(data, textStatus, jqXHR) {
												if (data.result == "true") {
													_this.projectMainView.removeProjectContentEntity(_this.getID());

													if (_this.ownerID == $("#header-user-id").attr("uid")) {
														// 휴지통 이미지 변환
														var trashBtnImg = $("#empty-trash-btn-img");
														var trashBtnImgSrc = trashBtnImg.attr("src");

														trashBtnImg.attr("src", trashBtnImgSrc.replace(
																"trash_empty.png", "trash_empty_over.png"));
													}
													smModal.hide();
												} else {
													console.log("javascript file del fail!!");
												}
											},
											error : function(jqXHR, textStatus, errorThrown) {
											}
										});
									} else {
										smModal.setBodyText("현재 다른 사용자가 사용중인 파일입니다.");
										smModal.hideModalConfirmBtn();
										smModal.setModalCancleBtnText("확인");
									}
								});

								// body에 modal append
								smModal.assginModalPanel();

								// modal show.
								smModal.show();

								break;
							case "rename":
								var inputModal = new InputModal("이름 변경", "이름을 입력해주세요", "변경", "같은 이름이 존재합니다.");

								inputModal.btnEvent(function() {
									if (inputModal.getInputText() == "") {

										inputModal.setErrorMessage("이름을 입력해주세요.");
										inputModal.showErrorMessage();

									} else {
										$.ajax({
											url : _this.serverRootPath+"/project?action=renameFile",
											type : "POST",
											dataType : "JSON",
											data : {
												id : _this.id,
												parentID : _this.parentID,
												name : inputModal.getInputText()
											},
											success : function(data, textStatus, jqXHR) {
												if (data.result == "true") {

													_this.setName(inputModal.getInputText());
													inputModal.hide();

												} else {
													inputModal.setErrorMessage("같은 이름이 존재합니다.");
													inputModal.showErrorMessage();
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

									if (explorerModal.getInputText() != "") {
										$.ajax({
											url : _this.serverRootPath+"/project?action=moveFile",
											type : "POST",
											dataType : "JSON",
											data : {
												id : _this.id,
												newName : explorerModal.getInputText(),
												newParentID : parentEntity.getID(),
												newOwnerID : parentEntity.getOwnerID(),
												newModifierID : $("#header-user-id").attr("uid"),
												newSharedRootID : parentEntity.getSharedRootID()
											},
											success : function(data, textStatus, jqXHR) {
												if (data.result == "true") {

													_this.setName(explorerModal.getInputText());
													_this.projectMainView.removeProjectContentEntity(_this.getID());
													explorerModal.hide();

												} else {
													explorerModal.setErrorMessage("같은 이름이 존재합니다.");
													explorerModal.showErrorMessage();
												}
											},
											error : function(jqXHR, textStatus, errorThrown) {
											}
										});

									} else {
										explorerModal.setErrorMessage("이름을 입력해주세요.");
										explorerModal.showErrorMessage();
									}
								});

								explorerModal.assginModalPanel();
								explorerModal.show();
								break;
							case "export":
								$.ajax({
									url : _this.serverRootPath+"/project?action=exportFile",
									type : "POST",
									dataType : "JSON",
									data : {
										"id" : _this.id,
										"name" : _this.name
									},
									success : function(data, textStatus, jqXHR) {
										if (data.result == "true") {
											location.href = _this.serverRootPath+"/editor?action=download&fileName="
													+ _this.name + ".wml";
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
							case "log":
								var psv = new ProjectSlidebarView(_this.projectMainView);
								psv.showProjectSlideView();

								// 슬라이드바뷰가 살아있는 경우
								if (psv.isActiveProjectSlideView) {
									// logView 설정
									var logSlidebarView = psv.assingLogSlidebarView(_this.serverRootPath, _this.id,
											_this.name, _this.ownerName, _this.ownerID, _this.parentID,
											_this.modifierID, _this.modifierName, _this.sharedRootID);

									// logView logList 가져오기 및 추가.
									$.ajax({
										url : _this.serverRootPath+"/log?action=getLogList",
										type : "POST",
										dataType : "JSON",
										data : {
											fileID : _this.id
										},
										success : function(data, textStatus, jqXHR) {
											$.each(data, function(i, entity) {
												console.log(entity.date.trim());
												logSlidebarView.addLogEntity(_this.serverRootPath, entity.id,
														entity.ownerID, entity.ownerName, entity.date, entity.content);
											});

										},
										error : function(jqXHR, textStatus, errorThrown) {
										}
									});
								}
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

			entityPanelBtnEvent : function() {
				var _this = this;
				if (this.isDelete == "false") {
					this.entityPanelBtn.click(function() {
						if (_this.entityCheckBtn.css("display") == 'none') {
							if (_this.isLock == "false") {
								// project(lock을 true로 -> 파일 내용을 가져오기)
								$.ajax({
									url : _this.serverRootPath+"/project?action=moveEditorView",
									type : "POST",
									dataType : "JSON",
									data : {
										fileID : _this.id,
										modifierID : $("#header-user-id").attr("uid")
									},
									success : function(data, textStatus, jqXHR) {

										// -> editor(editor에 뿌려주기)
										if (data.result == "true") {
											console.log(data.result);
											_this.entityPanel.append(_this.projectFileForm);
											_this.projectFileForm.attr("action", _this.serverRootPath
													+ "/editor?action=editorPage");

											_this.projectFileForm.append($('<input type=hidden name="fileID" value="'
													+ _this.id + '">'));
											_this.projectFileForm.append($('<input type=hidden name="fileName" value="'
													+ _this.name + '">'));
											_this.projectFileForm
													.append($('<input type=hidden name="fileOwnerID" value="'
															+ _this.ownerID + '">'));
											_this.projectFileForm
													.append($('<input type=hidden name="fileOwnerName" value="'
															+ _this.ownerName + '">'));
											_this.projectFileForm
													.append($('<input type=hidden name="fileModifierID" value="'
															+ _this.modifierID + '">'));
											_this.projectFileForm
													.append($('<input type=hidden name="fileModifierName" value="'
															+ _this.modifierName + '">'));
											_this.projectFileForm
													.append($('<input type=hidden name="fileSharedRootID" value="'
															+ _this.sharedRootID + '">'));
											_this.projectFileForm
													.append($('<input type=hidden name="fileParentID" value="'
															+ _this.parentID + '">'));

											_this.projectFileForm.submit();

											// 폼 삭제
											_this.projectFileForm.remove();
										}

									},
									error : function(jqXHR, textStatus, errorThrown) {
									}

								});
							} else {
								console.log("현재 누가 사용중임.");
							}
						}
					});
				}
			},

			offEntityEvent : function() {
				this.settingBtn.off("click");
				this.commentBtn.off("click");
			},

			onEntityEvent : function() {
				this.commentBtnEvent();
				this.settingBtnEvent();
			}
		});