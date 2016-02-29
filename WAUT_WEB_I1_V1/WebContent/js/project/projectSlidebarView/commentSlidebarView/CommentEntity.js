CommentEntity = Class
		.extend({
			Name : "CommentEntity",

			init : function(serverRootPath, id, ownerID, ownerName, date, comment) {
				this.serverRootPath = serverRootPath;
				this.id = id;
				this.ownerID = ownerID;
				this.ownerName = ownerName;
				this.date = date.replace(".0", "");
				this.comment = comment;

				this.commentEntityPanel = $('<div class="slidebar-comment-entity"></div>');

				this.commentEntityHeader = $('<div class="slidebar-comment-entity-header"><div>');
				this.commentEntityTitle = $('<div class="slidebar-comment-entity-title slidebar-comment-title">'
						+ this.ownerName + '  ( ' + this.date + ' )' + '</div>');

				this.commentEntityBody = $('<div class="panel panel-default slidebar-comment-entity-content"></div>');
				this.commentEntityContent = $('<div class="panel-body">' + this.comment + '</div>');

				this.commentEntityToolbar = $('<div class="slidebar-comment-entity-header-toolbar slidebar-comment-btn-container"></div>');
				this.commentModifyBtn = $('<button type="button" class="btn btn-default slidebar-comment-entity-modify-btn slidebar-btn"></button>');
				this.commentModifyBtnImg = $('<img class="slidebar-comment-entity-modify-btn-img slidebar-comment-entity-btn-img" src="'
						+ this.serverRootPath + '/img/slidebar/comment/comment_modify.png" />');
				this.commentDeleteBtn = $('<button type="button" class="btn btn-default slidebar-comment-entity-delete-btn slidebar-btn"></button>');
				this.commentDeleteBtnImg = $('<img class="slidebar-comment-entity-delete-btn-img slidebar-comment-entity-btn-img" src="'
						+ this.serverRootPath + '/img/delete.png" />');

				// 댓글 수정할 때.
				this.commentEntityInputTextarea = $('<textarea id="slidebar-comment-input-textarea" class="form-control slidebar-comment-textarea" rows="3" placeholder="댓글 입력해주세요."></textarea>');

				this.commentModifyConfirmBtn = $('<button type="button" class="btn btn-default slidebar-comment-entity-modify-confirm-btn slidebar-btn"></button>');
				this.commentModifyConfirmBtnImg = $('<img class="slidebar-comment-input-add-btn-img" src="'
						+ this.serverRootPath + '/img/slidebar/comment/comment_add.png" />');
				this.commentModifyCancleBtn = $('<button type="button" class="btn btn-default slidebar-comment-entity-modify-cancle-btn slidebar-btn"></button>');
				this.commentModifyCancleBtnImg = $('<img class="slidebar-comment-entity-modify-cancle-btn-img slidebar-comment-entity-btn-img" src="'
						+ this.serverRootPath + '/img/delete.png" />');

				this.commentModifyConfirmBtn.append(this.commentModifyConfirmBtnImg);
				this.commentModifyCancleBtn.append(this.commentModifyCancleBtnImg);

				this.commentDeleteBtn.append(this.commentDeleteBtnImg);
				this.commentModifyBtn.append(this.commentModifyBtnImg);

				this.commentEntityToolbar.append(this.commentDeleteBtn);
				this.commentEntityToolbar.append(this.commentModifyBtn);

				// 댓글 수정할 때.
				this.commentEntityToolbar.append(this.commentModifyCancleBtn);
				this.commentEntityToolbar.append(this.commentModifyConfirmBtn);

				this.commentEntityHeader.append(this.commentEntityTitle);

				this.commentEntityBody.append(this.commentEntityContent);

				this.commentEntityPanel.append(this.commentEntityHeader);
				this.commentEntityPanel.append(this.commentEntityBody);

				if (this.ownerID === $("#header-user-id").attr("uid")) {
					this.commentEntityPanel.append(this.commentEntityToolbar);
				}

				// 초기 수정이벤트 후 버튼, 텍스트area 숨기기
				this.commentModifyConfirmBtn.hide();
				this.commentModifyCancleBtn.hide();

				// comment 이벤트 등록
				this.commentDeleteBtnEvent();
				this.commentModifyBtnEvent();
				this.commentModifyConfirmBtnEvent();
				this.commentModifyCancleBtnEvent();
			},

			setCommentEntityContent : function(text) {
				this.commentEntityContent.text(text);
			},

			getCommentEntityPanel : function() {
				return this.commentEntityPanel;
			},

			getInputText : function() {
				return this.commentEntityInputTextarea.val();
			},

			setInputText : function(text) {
				this.commentEntityInputTextarea.val(text);
			},

			commentDeleteBtnEvent : function() {

				var _this = this;

				this.commentDeleteBtn.click(function() {
					var smModal = new SmallModal("댓글", "삭제하시겠습니까?");

					// '예' 버튼 이벤트 설정
					smModal.confirmEvent(function() {
						$.ajax({
							url : _this.serverRootPath+"/comment?action=delComment",
							type : "POST",
							dataType : "JSON",
							data : {
								id : _this.id
							},
							success : function(data, textStatus, jqXHR) {
								console.log(data.result);
								if (data.result == "true") {
									// 화면에서 삭제
									_this.commentEntityPanel.remove();
									smModal.hide();
								} else {
									console.log("project comment entity del : "+data.result);
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

				});
			},

			commentModifyBtnEvent : function() {

				var _this = this;

				this.commentModifyBtn.click(function() {
					_this.commentEntityContent.hide();
					_this.commentModifyBtn.hide();
					_this.commentDeleteBtn.hide();

					_this.commentEntityBody.append(_this.commentEntityInputTextarea);
					_this.commentModifyConfirmBtn.show();
					_this.commentModifyCancleBtn.show();

					_this.setInputText(_this.comment);
				});
			},

			commentModifyConfirmBtnEvent : function() {
				var _this = this;

				this.commentModifyConfirmBtn.click(function() {
					if (_this.getInputText() != "") {
						$.ajax({
							url : _this.serverRootPath+"/comment?action=modifyComment",
							type : "POST",
							dataType : "JSON",
							data : {
								id : _this.id,
								comment : _this.getInputText()
							},
							success : function(data, textStatus, jqXHR) {
								console.log(data.result);
								if (data.result == "true") {
									_this.comment = _this.getInputText()
									_this.setCommentEntityContent(_this.comment);

									_this.commentEntityInputTextarea.remove();
									_this.commentModifyConfirmBtn.hide();
									_this.commentModifyCancleBtn.hide();

									_this.commentEntityContent.show();
									_this.commentModifyBtn.show();
									_this.commentDeleteBtn.show();
								} else {
									console.log(data.result);
								}
							},
							error : function(jqXHR, textStatus, errorThrown) {
							}
						});
					}
				});
			},

			commentModifyCancleBtnEvent : function() {

				var _this = this;

				this.commentModifyCancleBtn.click(function() {
					_this.commentEntityInputTextarea.remove();
					_this.commentModifyConfirmBtn.hide();
					_this.commentModifyCancleBtn.hide();

					_this.setCommentEntityContent(_this.comment);

					_this.commentEntityContent.show();
					_this.commentModifyBtn.show();
					_this.commentDeleteBtn.show();
				});
			}
		});