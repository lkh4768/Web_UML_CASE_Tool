ImgModal = Class
		.extend({
			Name : "ImgModal",

			init : function(src) {
				this.modalPanel = $('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>');

				this.modalDialog = $('<div class="modal-dialog img-modal-dialog"></div>');

				this.modalContent = $('<div class="modal-content"></div>');

				this.modalBody = $('<div class="modal-body img-modal-body"></div>');

				this.modalImg = $('<img src="' + src + '" style="width:100%; height:100%;">');

				this.modalBody.append(this.modalImg);
				this.modalContent.append(this.modalBody);
				this.modalDialog.append(this.modalContent);
				this.modalPanel.append(this.modalDialog);

				this.modalPanel.on('hidden', function() {
					$(this).remove();
				});
			},

			assginModalPanel : function() {
				// 주기 전에 body에 append해서 줌.
				$('body').append(this.modalPanel);
			},

			hide : function() {
				this.modalPanel.modal('hide');
			},

			show : function() {
				this.modalPanel.modal('show');
			}
		});
