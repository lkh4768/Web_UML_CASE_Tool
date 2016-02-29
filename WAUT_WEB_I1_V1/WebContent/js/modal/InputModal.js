InputModal = Class
		.extend({

			Name : "InputModal",

			init : function(title, inputPlaceHolder, btnText, errorMassage, btnEventFunction) {
				
				this.modalPanel = $('<div class="modal fade input-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"></div>');
				this.modalDialog = $('<div class="modal-dialog"><div>');
				this.modalContent = $('<div class="modal-content"></div>');
				
				// modal header 타이틀 넣는 곳
				this.modalHeader = $('<div id="input-modal-header" class="modal-header input-modal-header"></div>');

				// modal body 부분
				this.modalBody = $('<div class="modal-body input-modal-body"></div>');
				
				this.modalBodyInputGroup=$('<div class="input-group"></div>');
				
				//placeholder 넣는 부분
				this.modalBodyInput = $('<input type="text" class="form-control" id="input-modal-input" placeholder="">');
				this.modalBodyBtnContainer = $('<span class="input-group-btn"></span>');
				
				//btn 부분
				this.modalBodyBtn = $('<button id="input-modal-submit-btn" class="btn modal-color-btn" type="button"></button>');
				
				// modal footer 부분
				this.modalFooter = $('<div class="modal-footer input-modal-error-footer"></div>');
				
				//error 출력 부분
				this.modalErrorMessage = $('<div id="input_modal_error" class="input-modal-error"></div>');
				
				//append 부분
				this.modalFooter.append(this.modalErrorMessage);
				
				this.modalBodyBtnContainer.append(this.modalBodyBtn);
				
				this.modalBodyInputGroup.append(this.modalBodyInput);
				this.modalBodyInputGroup.append(this.modalBodyBtnContainer);
				
				this.modalBody.append(this.modalBodyInputGroup);
				
				this.modalContent.append(this.modalHeader);
				this.modalContent.append(this.modalBody);
				this.modalContent.append(this.modalFooter);
				
				this.modalDialog.append(this.modalContent);

				this.modalPanel.append(this.modalDialog);
				
				//초기 에러메시지 hide;
				this.hideErrorMessage();
				
				//타이틀 등 초기 설정
				this.setTitle(title);
				this.setInputPlaceholder(inputPlaceHolder);
				this.setBtnText(btnText);
				this.setErrorMessage(errorMassage);
				
				this.btnEvent(btnEventFunction);
				
				this.modalPanel.on('hidden', function () {
			        $(this).remove();
			    });

			},
			
			hide:function(){
				this.modalPanel.modal('hide');
			},
			
			show:function(){
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
				return this.modalBodyInput.val(text);
			},

			getInputText : function() {
				return this.modalBodyInput.val();
			},
			
			setBtnText: function(text){
				this.modalBodyBtn.text(text);
			},
			getErrorMessage: function(){
				return this.modalErrorMessage;
			},
			
			setErrorMessage: function(text){
				this.modalErrorMessage.text(text);
			},
			
			
			showErrorMessage: function(){
				this.modalErrorMessage.show();
			},
			
			hideErrorMessage: function(){
				this.modalErrorMessage.hide();
			},
			
			btnEvent : function(f) {
				this.modalBodyBtn.click(f);
			}
		});