CommentView = Class
		.extend({
			Name : "CommentView",

			init : function(serverRootPath) {
				this.serverRootPath = serverRootPath;
				this.fileID = null;
				this.fileName = null;
				this.ownerName = null;
				this.ownerID = null;

				this.commentEditorContainer = $('<div id="editor-comment-container"></div>');

				this.commentEditorInputContainer = $('<div id="editor-comment-input-container"></div>');
				// 현재 사용자 이름 넣는 곳
				this.commentEditorInputTitle = $('<div id="editor-comment-input-title" class="editor-comment-title">'
						+ $("#header-user-id").attr("uname") + '</div>');
				this.commentEditorInputTextarea = $('<textarea id="editor-comment-input-textarea" class="form-control editor-comment-textarea" rows="3" placeholder="댓글 입력해주세요."></textarea>');
				this.commentEditorInputBtnContainer = $('<div class="editor-comment-input-btn-container editor-comment-btn-container"></div>');

				this.commentEditorInputAddBtn = $('<button type="button" class="btn btn-default editor-comment-input-add-btn editor-btn"></button>');
				this.commentEditorInputAddBtnImg = $('<img class="editor-comment-input-add-btn-img" src="'
						+ this.serverRootPath + '/img/slidebar/comment/comment_add.png" />');

				// 댓글 엔티티 넣는 곳
				this.commentEditorEntityContainer = $('<div id="editor-comment-entity-container"></div>');

				// append 부분
				this.commentEditorInputAddBtn.append(this.commentEditorInputAddBtnImg);

				this.commentEditorInputBtnContainer.append(this.commentEditorInputAddBtn);

				this.commentEditorInputContainer.append(this.commentEditorInputTitle);
				this.commentEditorInputContainer.append(this.commentEditorInputTextarea);
				this.commentEditorInputContainer.append(this.commentEditorInputBtnContainer);

				this.commentEditorContainer.append(this.commentEditorInputContainer);
				this.commentEditorContainer.append(this.commentEditorEntityContainer);

				// comment 추가
				this.addCommentBtnEvent();
			},

			hideCommentView : function() {
				this.commentEditorContainer.hide();
			},

			setCommentViewInfo : function(fileID, fileName, ownerName, ownerID) {
				this.fileID = fileID;
				this.fileName = fileName;
				this.ownerName = ownerName;
				this.ownerID = ownerID;
			},

			getCommentEditorPanel : function() {
				return this.commentEditorContainer
			},

			resetCommentEditorEntityContainer : function() {
				this.commentEditorEntityContainer.empty();
			},

			getInputText : function() {
				return this.commentEditorInputTextarea.val();
			},

			addCommentEntity : function(serverRootPath, id, ownerID, ownerName, date, comment) {
				var commentEntity = new CommentEntity(serverRootPath, id, ownerID, ownerName, date, comment);

				this.commentEditorEntityContainer.prepend(commentEntity.getCommentEntityPanel());
			},

			showCommentView : function() {
				var _this = this;
				this.commentEditorContainer.show();
				$.ajax({
					url : _this.serverRootPath+"/comment?action=getCommentList",
					type : "POST",
					dataType : "JSON",
					async : false,
					data : {
						"fileID" : _this.fileID
					},
					success : function(data, textStatus, jqXHR) {
						_this.resetCommentEditorEntityContainer();

						$.each(data, function(i, entity) {
							_this.addCommentEntity(_this.serverRootPath, entity.id, entity.ownerID, entity.ownerName,
									entity.date, entity.comment);
						});

					},
					error : function(jqXHR, textStatus, errorThrown) {
						console.log("get log list fail!!!!");
					}
				});
			},

			addCommentBtnEvent : function() {
				var _this = this;
				this.commentEditorInputAddBtn.click(function() {
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
								}
							},
							error : function(jqXHR, textStatus, errorThrown) {
							}
						});
					}
				});
			}
		});