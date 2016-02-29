ShareSlidebarView = Class.extend({
	
	NAME : "ShareSlidebarView",
	
	init : function(serverRootPath, folderID, folderName, projectFolder, projectSlidebarView){
		this.serverRootPath =  serverRootPath;
		this.folderID = folderID;
		this.folderName = folderName;
		this.projectSlidebarView = projectSlidebarView;
		this.projectFolder = projectFolder;
		
		this.shareSlidebarContainer = $('<div id="slidebar-shared-container"></div>');
		this.shareSlidebarHeader =  $('<div id="slidebar-shared-header" class="slidebar-header"></div>');
		this.shareSlidebarTitle = $('<div id="slidebar-shared-title" class="slidebar-title">'+this.folderName+'</div>');
		this.shareSlidebarCloseBtn = $('<button type="button" id ="share-slide-close-btn" class="btn btn-default slidebar-shared-title-close-btn slidebar-btn slidebar-close-btn"></button>');
		this.shareSlidebarCloseBtnImg = $('<img class="slidebar-title-close-btn-img" src="'+this.serverRootPath+'/img/delete.png" />');
		this.shareSlidebarInputContainer = $('<div id="slidebar-shared-input-container"></div>');
		this.shareSlidebarInputGroup = $('<div class="input-group slidebar-shared-input-group"></div>');
		this.shareSlidebarInputBox = $('<input id="slidebar-shared-input" type="text" class="form-control" placeholder="아이디를 입력해주세요."> ');
		this.shareSlidebarInputBtn = $('<button id="slidebar-shared-add-member-btn" class="btn modal-color-btn" type="button">추가</button>');
		this.shareSlidebarInputBtnGroup = $('<span class="input-group-btn"></span>');
		this.shareSlidebarErrorMessage = $('<div id="input_share_error" class="input-share-error"></div>');
		

		
		this.shareSlidebarCloseBtn.append(this.shareSlidebarCloseBtnImg);
		
		this.shareSlidebarHeader.append(this.shareSlidebarTitle);
		this.shareSlidebarHeader.append(this.shareSlidebarCloseBtn);
		
		this.shareSlidebarInputBtnGroup.append(this.shareSlidebarInputBtn);
		this.shareSlidebarInputGroup.append(this.shareSlidebarInputBox);
		this.shareSlidebarInputGroup.append(this.shareSlidebarInputBtnGroup);
		
		this.shareSlidebarInputContainer.append(this.shareSlidebarInputGroup);
		this.shareSlidebarInputContainer.append(this.shareSlidebarErrorMessage);
		this.shareSlidebarContainer.append(this.shareSlidebarHeader);
		this.shareSlidebarContainer.append(this.shareSlidebarInputContainer);
		
		this.addShareEntity(this.serverRootPath, this.memberID, this.memberName,this.folderID);
		this.addMemberEvent();
		this.slidebarCloseEvent();
	},
	
	addShareEntity : function(serverRootPath, memberID, memberName, folderID) {
		if(typeof memberID !== "undefined") {
			var shareEntity = new ShareEntity(serverRootPath, memberID, memberName, folderID, this);
			this.shareSlidebarContainer.append(shareEntity.getShareEntityContainer());
		}
	
	},
	
	getSharedmemberListlength : function(){
		return this.sharedMemberList.length;
	},
	
	getShareSlidebarContainer : function(){
		return this.shareSlidebarContainer;
	},
	
	slidebarCloseEvent : function(){
		var _this = this;
		this.shareSlidebarCloseBtn.click(function(e){
			_this.projectSlidebarView.hideProjectSlideView();
		});
	},
	
	addMemberEvent : function(){
		var _this = this;
		this.shareSlidebarInputBtn.click(function(e){
			if(_this.shareSlidebarInputBox.val()===""){
				_this.shareSlidebarErrorMessage.text("입력란이 비어있습니다.");	
			}else if(($("#header-user-id").attr("uid")===(_this.shareSlidebarInputBox.val()))){
				_this.shareSlidebarErrorMessage.text("자신을 공유할 수 없습니다.");	
			}else{
				$.ajax({
					url : _this.serverRootPath+"/share?action=addShareMember",
					type : "POST",
					dataType : "JSON",
					data : {
						"folderID" : _this.folderID,
						"memberID" : _this.shareSlidebarInputBox.val()
					},
					success : function(data, textStatus, jqXHR) {
							if(data.result === "true"){
								_this.addShareEntity(_this.serverRootPath, data.userID, data.userName, data.folderID);
								_this.projectFolder.setShared("show");
								_this.shareSlidebarErrorMessage.val("");

							}else if(data.result ==="overlapped"){
								_this.shareSlidebarErrorMessage.text("이미 추가된 아이디(이메일)입니다.");
							}else{
								_this.shareSlidebarErrorMessage.text("회원정보가 존재하지 않습니다.");
							}
					},
					error : function(jqXHR, textStatus, errorThrown) {
					}
				});_this.shareSlidebarInputBox.val("");
			}
		});
	}
	
	
});
