SmallModal = Class
		.extend({

			Name : "SmallModal",

			init : function(title, bodyText, confirmEventFunction) {

				this.modalPanel = $('<div class="modal fade sm-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"></div>');

				this.modalDialog = $('<div class="modal-dialog modal-sm"></div>');

				this.modalContent = $('<div class="modal-content"></div>');

				// sm modal header 타이틀 넣는 곳
				this.modalHeader = $('<div class="modal-header sm-modal-header"></div>');

				// sm modal body 문구 넣는 곳
				this.modalBody = $('<div class="modal-body sm-modal-body"></div>');
				
				// sm modal footer 부분
				this.modalFooter = $('<div class="modal-footer sm-modal-footer"></div>');

				this.modalCancleBtn = $('<button type="button" class="btn btn-default" data-dismiss="modal">아니요</button>');
				this.modalConfirmBtn = $('<button type="button" class="btn btn-default modal-color-btn">예</button>');

				// append 부분
				this.modalFooter.append(this.modalConfirmBtn);
				this.modalFooter.append(this.modalCancleBtn);

				this.modalContent.append(this.modalHeader);
				this.modalContent.append(this.modalBody);
				this.modalContent.append(this.modalFooter);

				this.modalDialog.append(this.modalContent);

				this.modalPanel.append(this.modalDialog);

				// 문구들 초기 설정.
				this.setTitle(title);
				this.setBodyText(bodyText);

				// event function 초기 설정.
				this.confirmEvent(confirmEventFunction);

				this.modalPanel.on('hidden', function() {
					$(this).remove();
				});
			},

			hide : function() {
				this.modalPanel.modal('hide');
			},

			show : function() {
				this.modalPanel.modal('show');
			},
			
			hideModalConfirmBtn : function() {
				this.modalConfirmBtn.hide();
			},
			
			showModalConfirmBtn : function() {
				this.modalConfirmBtn.show();
			},
			
			setModalCancleBtnText : function(text) {
				this.modalCancleBtn.text(text);
			},

			assginModalPanel : function() {
				// 주기 전에 body에 append해서 줌.
				$('body').append(this.modalPanel);
			},

			setTitle : function(title) {
				this.modalHeader.text(title);
			},

			setBodyText : function(text) {
				this.modalBody.text(text);
			},

			confirmEvent : function(f) {
				this.modalConfirmBtn.click(f);
			}
		});