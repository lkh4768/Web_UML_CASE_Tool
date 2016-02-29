CommentSlidebarView = Class
		.extend({
			Name : "CommentSlidebarView",

			init : function(serverRootPath, projectSlidebarView, fileID, fileName, ownerName, ownerID) {
				this.serverRootPath = serverRootPath;
				this.projectSlidebarView = projectSlidebarView;
				this.fileID = fileID;
				this.fileName = fileName;
				this.ownerName = ownerName;
				this.ownerID = ownerID;

				this.commentSlidebarContainer = $('<div id="slidebar-comment-container"></div>');

				this.commentSlidebarHeader = $('<div id="slidebar-comment-header" class="slidebar-header"></div>');
				this.commentSlidebarTitle = $('<div id="slidebar-comment-title" class="slidebar-title">'
						+ this.fileName + '</div>');
				this.commentSlidebarCloseBtn = $('<button type="button" class="btn btn-default slidebar-comment-title-close-btn slidebar-btn slidebar-close-btn"></button>');
				this.commentSlidebarCloseBtnImg = $('<img class="slidebar-title-close-btn-img" src="'
						+ this.serverRootPath + '/img/delete.png" />');

				this.commentSlidebarInputContainer = $('<div id="slidebar-comment-input-container"></div>');
				// 현재 사용자 이름 넣는 곳
				this.commentSlidebarInputTitle = $('<div id="slidebar-comment-input-title" class="slidebar-comment-title">'
						+ $("#header-user-id").attr("uname") + '</div>');
				this.commentSlidebarInputTextarea = $('<textarea id="slidebar-comment-input-textarea" class="form-control slidebar-comment-textarea" rows="3" placeholder="댓글 입력해주세요."></textarea>');
				this.commentSlidebarInputBtnContainer = $('<div class="slidebar-comment-input-btn-container slidebar-comment-btn-container"></div>');

				this.commentSlidebarInputAddBtn = $('<button type="button" class="btn btn-default slidebar-comment-input-add-btn slidebar-btn"></button>');
				this.commentSlidebarInputAddBtnImg = $('<img class="slidebar-comment-input-add-btn-img" src="'
						+ this.serverRootPath + '/img/slidebar/comment/comment_add.png" />');

				// 댓글 엔티티 넣는 곳
				this.commentSlidebarEntityContainer = $('<div id="slidebar-comment-entity-container"></div>');

				// append 부분
				this.commentSlidebarInputAddBtn.append(this.commentSlidebarInputAddBtnImg);

				this.commentSlidebarInputBtnContainer.append(this.commentSlidebarInputAddBtn);

				this.commentSlidebarInputContainer.append(this.commentSlidebarInputTitle);
				this.commentSlidebarInputContainer.append(this.commentSlidebarInputTextarea);
				this.commentSlidebarInputContainer.append(this.commentSlidebarInputBtnContainer);

				this.commentSlidebarCloseBtn.append(this.commentSlidebarCloseBtnImg);

				this.commentSlidebarHeader.append(this.commentSlidebarTitle);
				this.commentSlidebarHeader.append(this.commentSlidebarCloseBtn);

				this.commentSlidebarContainer.append(this.commentSlidebarHeader);
				this.commentSlidebarContainer.append(this.commentSlidebarInputContainer);
				this.commentSlidebarContainer.append(this.commentSlidebarEntityContainer);

				// slidebar 닫기
				this.closeBtnEvent();
				// comment 추가
				this.addCommentBtnEvent();
			},

			closeBtnEvent : function() {
				var _this = this;
				this.commentSlidebarCloseBtn.click(function(e) {
					_this.projectSlidebarView.hideProjectSlideView();
				});
			},

			getCommentSlideBarPanel : function() {
				return this.commentSlidebarContainer
			},

			getInputText : function() {
				return this.commentSlidebarInputTextarea.val();
			},

			addCommentEntity : function(serverRootPath, id, ownerID, ownerName, date, comment) {
				var commentEntity = new CommentEntity(serverRootPath, id, ownerID, ownerName, date, comment);

				this.commentSlidebarEntityContainer.prepend(commentEntity.getCommentEntityPanel());
			},

			addCommentBtnEvent : function() {
				var _this = this;
				this.commentSlidebarInputAddBtn.click(function() {
					if (_this.getInputText() != "") {
						$.ajax({
							url : _this.serverRootPath+"/comment?action=addComment",
							type : "POST",
							dataType : "JSON",
							data : {
								ownerID : $("#header-user-id").attr("uid"),
								fileID : _this.fileID,
								comment : _this.getInputText()
							},
							success : function(data, textStatus, jqXHR) {
								if (data.result == "true") {
									_this.addCommentEntity(_this.serverRootPath, data.id, data.ownerID, data.ownerName,
											data.date, data.comment);
									_this.setInputText("")
								}
							},
							error : function(jqXHR, textStatus, errorThrown) {
							}
						});
					}
				});
			}
		});