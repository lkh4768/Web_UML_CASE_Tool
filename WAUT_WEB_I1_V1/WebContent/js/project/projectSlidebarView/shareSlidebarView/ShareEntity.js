ShareEntity = Class.extend({
	
	
			NAME : "ShareEntity",
			
			init : function(serverRootPath, memberID, memberName, folderID, shareSlidebarView){
				
				this.serverRootPath = serverRootPath;
				this.memberID = memberID;
				this.memberName = memberName;
				this.folderID = folderID;
				this.shareSlidebarView = shareSlidebarView;
				
				
				this.shareEntityContainer = $('<div id="slidebar-shared-entity-container"></div>');
				this.shareEntityPanel = $('<div class="slidebar-shared-entity"></div>');
				this.shareEntityMemberName = $('<div class="slidebar-shared-entity-name">'+this.memberName+'</div>'); 
				this.shareEntityMemberID = $('<div class="slidebar-shared-entity-id">'+this.memberID+'</div>');
				this.shareEntityBtnContainer = $('<div class="slidebar-shared-entity-delete-btn-container"></div>');
				this.shareEntityBtn = $('<button class="btn btn-default slidebar-shared-entity-delete-btn slidebar-btn" type="button"></button>');
				this.shareEntityBtnImg = $('<img class="slidebar-shared-entity-delete-btn-img" src="'+this.serverRootPath+'/img/slidebar/shared/member_delete.png" />');
			
				this.shareEntityBtn.append(this.shareEntityBtnImg);
				this.shareEntityBtnContainer.append(this.shareEntityBtn);
			
				this.shareEntityPanel.append(this.shareEntityMemberName);
				this.shareEntityPanel.append(this.shareEntityMemberID);
				this.shareEntityPanel.append(this.shareEntityBtnContainer);
				this.shareEntityContainer.append(this.shareEntityPanel);
				
				this.deleteBtnEvent();
			},
			getShareEntityContainer : function(){
				return this.shareEntityContainer;
			},
					
			
			deleteBtnEvent : function(){
				var _this = this;
				this.shareEntityBtnContainer.click(function(e){
					
					var smModal = new SmallModal("공유 해제", "공유를 해제 하시겠습니까?");
				
					smModal.confirmEvent(function() {

						$.ajax({
							url : _this.serverRootPath+"/share?action=deleteShareMember",
							type : "POST",
							dataType : "JSON",
							data : {
								"folderID" : _this.folderID,
								"memberID" : _this.memberID
							},
							success : function(data, textStatus, jqXHR) {
								_this.shareEntityContainer.remove();
								if(data.members === 0){
									_this.shareSlidebarView.projectFolder.setShared("0");
								}
								smModal.hide();
							},
							error : function(jqXHR, textStatus, errorThrown) {
							}
						});
			
					});
					smModal.assginModalPanel();
					smModal.show();

				});
			}
			
		});
