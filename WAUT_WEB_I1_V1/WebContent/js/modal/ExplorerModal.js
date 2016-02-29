ExplorerModal = Class
		.extend({

			Name : "ExplorerModal",

			init : function(serverRootPath, projectMainView, title, inputText, inputPlaceHolder, btnText, errorMassage,
					btnEventFunction) {
				this.serverRootPath = serverRootPath;
				this.projectMainView = projectMainView;
				this.explorerEntityList = [];
				this.currentEntity = null;
				this.hideLock = false;

				this.modalPanel = $('<div class="modal fade explorer-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"></div>');
				this.modalDialog = $('<div class="modal-dialog modal-sm"></div>');
				this.modalContent = $('<div class="modal-content"></div>');

				// modal header 타이틀 넣는 곳
				this.modalHeader = $('<div class="modal-header explorer-modal-header"></div>');

				// modal body 부분
				this.modalBody = $('<div class="modal-body explorer-modal-body"></div>');
				this.modalBodyPanel = $('<div class="panel panel-default explorer-modal-panel"></div>');

				// explorer entity 넣는 부분.
				this.modalBodyPanelBody = $('<div class="panel-body explorer-modal-panel-body"></div>');

				this.modalBodyFormInputGroup = $('<div class="input-group"></div>');

				// input 부분
				this.modalBodyInput = $('<input type="text" class="form-control" placeholder="">');

				this.modalBodyFormBtnContainer = $('<span class="input-group-btn"></span>');

				// btn 부분
				this.modalBodyBtn = $('<button class="btn modal-color-btn" type="button"></button>');

				// modal footer 부분
				this.modalFooter = $('<div class="modal-footer input-modal-error-footer"></div>');

				// error 출력 부분
				this.modalErrorMessage = $('<div class="input-modal-error"></div>');

				// append 부분
				this.modalFooter.append(this.modalErrorMessage);

				this.modalBodyFormBtnContainer.append(this.modalBodyBtn);

				this.modalBodyFormInputGroup.append(this.modalBodyInput);
				this.modalBodyFormInputGroup.append(this.modalBodyFormBtnContainer);

				this.modalBodyPanel.append(this.modalBodyPanelBody);
				this.modalBody.append(this.modalBodyPanel);
				this.modalBody.append(this.modalBodyFormInputGroup);

				this.modalContent.append(this.modalHeader);
				this.modalContent.append(this.modalBody);
				this.modalContent.append(this.modalFooter);

				this.modalDialog.append(this.modalContent);

				this.modalPanel.append(this.modalDialog);

				// 초기 에러메시지 hide;
				this.hideErrorMessage();

				// 타이틀 등 초기 설정
				this.setTitle(title);
				this.setInputText(inputText);
				this.setInputPlaceholder(inputPlaceHolder);
				this.setBtnText(btnText);
				this.setErrorMessage(errorMassage);

				this.btnEvent(btnEventFunction);

				// 초기화 시 최상위 프로젝트 추가
				this.addPrivateProjectExplorerEntity();
				this.addSharedProjectExplorerEntity();

				this.modalPanel.on('hidden', function() {
					$(this).remove();
				});
			},

			setHideLockFile : function() {
				this.hideLock = true;
			},

			hideModalBodyFormInputGroup : function() {
				this.modalBodyInput.hide();
			},

			showModalBodyFormInputGroup : function() {
				this.modalBodyInput.show();
			},

			setCurrentEntity : function(entity) {
				this.currentEntity = entity;
			},

			getCurrentEntity : function() {
				return this.currentEntity;
			},

			// 최상위 내 프로젝트
			addPrivateProjectExplorerEntity : function() {
				var projectExplorerEntity = new ProjectExplorerEntity(this, this.serverRootPath, this.projectMainView,
						"내 프로젝트", 0, 0, -1, $("#header-user-id").attr("uid"));

				this.modalBodyPanelBody.append(projectExplorerEntity.getProjectExplorerEntity());

				this.explorerEntityList.push(projectExplorerEntity);
			},

			// 최상위 공유 프로젝트
			addSharedProjectExplorerEntity : function() {
				var projectExplorerEntity = new ProjectExplorerEntity(this, this.serverRootPath, this.projectMainView,
						"공유 프로젝트", 1, 0, -1);

				this.modalBodyPanelBody.append(projectExplorerEntity.getProjectExplorerEntity());

				this.explorerEntityList.push(projectExplorerEntity);
			},

			// 다른 폴더 엔티티 추가 메소드
			addProjectExplorerEntity : function(name, id, sharedRootFolderID, parentID, ownerID, entityType, lock) {

				// lock은 파일이 안보임.
				if (entityType == "folder") {
					var projectExplorerEntity = new ProjectExplorerEntity(this, this.serverRootPath,
							this.projectMainView, name, id, sharedRootFolderID, parentID, ownerID);
				} else {
					var projectExplorerEntity = new ProjectExplorerFile(this, this.serverRootPath, name, id,
							sharedRootFolderID, parentID, ownerID, lock);
				}

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
							delEntityIndexList.push(i);
						}
					}
				});

				// 재귀를 멈추게 하는 조건.
				if (delEntityIndexList.length == 0)
					return true;

				// 저장한 인덱스를 이용해 리스트에서 삭제
				$.each(delEntityIndexList, function(i, val) {
					_this.explorerEntityList.splice(val, 1);
				});

			},

			hide : function() {
				this.modalPanel.modal('hide');
			},

			show : function() {
				this.modalPanel.modal('show');
			},

			assginModalPanel : function() {
				// 주기 전에 body에 append해서 줌.
				$('body').append(this.modalPanel);
			},

			setTitle : function(title) {
				this.modalHeader.text(title);
			},

			setInputPlaceholder : function(text) {
				this.modalBodyInput.attr("placeholder", text);
			},

			setInputText : function(text) {
				this.modalBodyInput.val(text);
			},

			getInputText : function() {
				return this.modalBodyInput.val();
			},

			setBtnText : function(text) {
				this.modalBodyBtn.text(text);
			},

			setErrorMessage : function(text) {
				this.modalErrorMessage.text(text);
			},

			showErrorMessage : function() {
				this.modalErrorMessage.show();
			},

			hideErrorMessage : function() {
				this.modalErrorMessage.hide();
			},

			btnEvent : function(f) {
				this.modalBodyBtn.click(f);
			}
		});