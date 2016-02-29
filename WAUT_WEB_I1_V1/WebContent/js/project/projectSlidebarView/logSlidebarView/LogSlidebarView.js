LogSlidebarView = Class
		.extend({
			Name : "LogSlidebarView",

			init : function(serverRootPath, projectMainView, projectSlidebarView, fileID, fileName, ownerName, ownerID,
					parentID, modifierID, modifierName, sharedRootID) {
				this.serverRootPath = serverRootPath;
				this.projectSlidebarView = projectSlidebarView;
				this.projectMainView = projectMainView;
				this.fileID = fileID;
				this.fileName = fileName;
				this.ownerName = ownerName;
				this.ownerID = ownerID;
				this.parentID = parentID;
				this.modifierID = modifierID;
				this.modifierName = modifierName;
				this.sharedRootID = sharedRootID;

				this.logList = [];
				this.currentLog = null;

				this.logSlidebarContainer = $('<div id="slidebar-log-container"></div>');

				this.logSlidebarHeader = $('<div id="slidebar-log-header" class="slidebar-header"></div>');
				this.logSlidebarTitle = $('<div id="slidebar-log-title" class="slidebar-title">' + this.fileName
						+ '</div>');
				this.logSlidebarCloseBtn = $('<button type="button" class="btn btn-default slidebar-log-title-close-btn slidebar-btn slidebar-close-btn"></button>');
				this.logSlidebarCloseBtnImg = $('<img class="slidebar-title-close-btn-img" src="' + this.serverRootPath
						+ '/img/delete.png" />');

				this.logBtnContainer = $('<div id="slidebar-log-btn-container"></div>');

				this.showLogBtn = $('<button id="slidebar-log-show-btn" type="button" class="btn btn-default slidebar-log-btn slidebar-btn"></button>');
				this.showLogBtnImg = $('<img id="slidebar-log-show-btn-img" class="slidebar-log-btn-img" src="'
						+ this.serverRootPath + '/img/slidebar/log/log_show.png" />');

				this.modifyLogBtn = $('<button id="slidebar-log-modify-btn" type="button" class="btn btn-default slidebar-log-btn slidebar-btn">');
				this.modifyLogBtnImg = $('<img id="slidebar-log-modify-btn-img" class="slidebar-log-btn-img" src="'
						+ this.serverRootPath + '/img/slidebar/log/log_modify.gif" />');

				this.saveLogBtn = $('<button id="slidebar-log-save-btn" type="button" class="btn btn-default slidebar-log-btn slidebar-btn"></button>');
				this.saveLogBtnImg = $('<img id="slidebar-log-save-btn-img" class="slidebar-log-btn-img" src="'
						+ this.serverRootPath + '/img/slidebar/log/log_save.png" />');

				// 댓글 엔티티 넣는 곳
				this.logSlidebarEntityContainer = $('<div id="slidebar-log-entity-container"></div>');

				this.projectLogForm = $('<form id="project-log-form" method="post" action="" style="display: none;"></form>');

				// append 부분
				this.showLogBtn.append(this.showLogBtnImg);
				this.showLogBtn.append("보기");

				this.modifyLogBtn.append(this.modifyLogBtnImg);
				this.modifyLogBtn.append("수정");

				this.saveLogBtn.append(this.saveLogBtnImg);
				this.saveLogBtn.append("저장");

				this.logBtnContainer.append(this.showLogBtn);
				this.logBtnContainer.append(this.modifyLogBtn);
				this.logBtnContainer.append(this.saveLogBtn);

				this.logSlidebarCloseBtn.append(this.logSlidebarCloseBtnImg);

				this.logSlidebarHeader.append(this.logSlidebarTitle);
				this.logSlidebarHeader.append(this.logSlidebarCloseBtn);

				this.logSlidebarContainer.append(this.logSlidebarHeader);
				this.logSlidebarContainer.append(this.logBtnContainer);
				this.logSlidebarContainer.append(this.logSlidebarEntityContainer);

				// slidebar 닫기
				this.closeBtnEvent();

				this.hideLogBtnContainer();

				this.showLogBtnEvent();
				this.modifyLogBtnEvent();
				this.saveLogBtnEvent();

			},
			getCurrentLog : function() {
				return this.currentLog;
			},

			setCurrentLog : function(log) {
				this.currentLog = log;
			},

			closeBtnEvent : function() {
				var _this = this;
				this.logSlidebarCloseBtn.click(function(e) {
					_this.projectSlidebarView.hideProjectSlideView();
				});
			},

			getLogSlideBarPanel : function() {
				return this.logSlidebarContainer
			},

			addLogEntity : function(serverRootPath, id, ownerID, ownerName, date, content) {
				var logEntity = new LogEntity(this, serverRootPath, id, ownerID, ownerName, date, content);

				this.logSlidebarEntityContainer.prepend(logEntity.getLogEntityPanel());

				this.logList.push(logEntity);
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

			modifyLogBtnEvent : function() {
				var _this = this;
				this.modifyLogBtn.click(function() {
					// -> editor(editor에 뿌려주기)
					_this.logSlidebarContainer.append(_this.projectLogForm);
					_this.projectLogForm.attr("action", _this.serverRootPath + "/editor?action=editorPageByLog");

					_this.projectLogForm.append($('<input type=hidden name="fileName" value="' + _this.fileName
							+ _this.currentLog.date + '">'));
					_this.projectLogForm.append($('<input type=hidden name="logID" value="' + _this.currentLog.id
							+ '">'));

					_this.projectLogForm.submit();

					// 폼 삭제
					_this.projectLogForm.remove();

				});
			},

			saveLogBtnEvent : function() {
				var _this = this;
				this.saveLogBtn.click(function() {
					var explorerModal = new ExplorerModal(_this.serverRootPath, null, "저장", "", "이름을 입력해주세요", "저장",
							"같은 이름이 존재합니다.");

					explorerModal.btnEvent(function() {

						var parentEntity = explorerModal.getCurrentEntity();

						if (parentEntity instanceof ProjectExplorerEntity) {

							if (explorerModal.getInputText() != "") {
								$.ajax({
									url : _this.serverRootPath+"/log?action=saveLog",
									type : "POST",
									dataType : "JSON",
									data : {
										"logID" : _this.currentLog.id,
										"fileName" : explorerModal.getInputText(),
										"fileOwnerID" : parentEntity.getOwnerID(),
										"fileModifierID" : $("#header-user-id").attr("uid"),
										"fileParentID" : parentEntity.getID(),
										"fileSharedRootID" : parentEntity.getSharedRootID()
									},
									success : function(data, textStatus, jqXHR) {
										if (data.result == "true") {

											if (data.fileParentID == _this.parentID) {
												console.log(data.fileIsLock);
												var projectFile = new ProjectFile(_this.serverRootPath,
														_this.projectMainView, data.fileID, data.fileName,
														data.fileOwnerID, data.fileOwnerName, data.fileModifierID,
														data.fileModifierName, data.fileShareRootID, data.fileParentID,
														data.fileDate, data.fileIsDelete, data.fileIsLock);

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
				});
			}
		});