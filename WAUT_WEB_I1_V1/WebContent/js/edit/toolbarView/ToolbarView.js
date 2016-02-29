ToolbarView = Class.extend({

	init : function(canvasView, serverRootPath) {
		this.canvasView = canvasView;
		this.canvas = canvasView.getCanvas();
		this.serverRootPath = serverRootPath;
		var _this = this;

		// 저장하기
		this.saveBtn = $("#saveBtn");

		this.saveBtn.click(function() {

			var activeCanvasInfo = _this.canvasView.getActiveCanvasInfo();

			var writer = new draw2d.io.json.Writer();
			var fileContent = "";
			var fileImg = _this.canvasView.cropCanvasToPng();

			writer.marshal(_this.canvas, function(json) {
				fileContent = JSON.stringify(json, null, 2);
			});

			// 새문서 일경우 fileParentID가 null 임.
			if (activeCanvasInfo.fileParentID == null) {
				var explorerModal = new ExplorerModal(_this.serverRootPath, null, "저장", "", "이름을 입력해주세요", "저장",
						"같은 이름이 존재합니다.");

				explorerModal.setInputText(activeCanvasInfo.fileName);

				explorerModal.btnEvent(function() {

					var parentEntity = explorerModal.getCurrentEntity();

					if (parentEntity instanceof ProjectExplorerEntity) {

						if (parentEntity.getID() == 0 || parentEntity.getID() == 0) {
							explorerModal.setErrorMessage("프로젝트 폴더에는 파일이 존재할 수 없습니다.");
							explorerModal.showErrorMessage();
						} else {
							if (explorerModal.getInputText() != "") {
								$.ajax({
									url : _this.serverRootPath+"/editor?action=saveAsFile",
									type : "POST",
									dataType : "JSON",
									data : {
										"fileName" : explorerModal.getInputText(),
										"fileOwnerID" : parentEntity.getOwnerID(),
										"fileModifierID" : $("#header-user-id").attr("uid"),
										"fileParentID" : parentEntity.getID(),
										"fileContent" : fileContent,
										"fileSharedRootID" : parentEntity.getSharedRootID(),
										"fileImg" : fileImg
									},
									success : function(data, textStatus, jqXHR) {
										console.log(data.result);
										if (data.result == "true") {
											// cavansInfo 변경 필.
											_this.canvasView.setActiveCanvasInfo(data);
											_this.canvasView.canvasOffChange();
											explorerModal.hide();
											console.log(_this.canvasView.getActiveCanvasInfo().fileID);
										} else {
											explorerModal.setErrorMessage("같은 이름이 존재합니다.");
											explorerModal.showErrorMessage();
										}
									},
									error : function(jqXHR, textStatus, errorThrown) {
									}
								});
							} else {
								explorerModal.setErrorMessage("이름을 입력해주세요");
								explorerModal.showErrorMessage();
							}
						}
					}
				});

				explorerModal.assginModalPanel();
				explorerModal.show();
			} else {

				$.ajax({
					url : _this.serverRootPath+"/editor?action=saveFile",
					type : "POST",
					dataType : "JSON",
					data : {
						"fileID" : activeCanvasInfo.fileID,
						"fileOwnerID" : activeCanvasInfo.fileOwnerID,
						"fileModifierID" : $("#header-user-id").attr("uid"),
						"fileParentID" : activeCanvasInfo.fileParentID,
						"fileContent" : fileContent,
						"fileImg" : fileImg
					},
					success : function(data, textStatus, jqXHR) {
						_this.canvasView.canvasOffChange();
					},
					error : function(jqXHR, textStatus, errorThrown) {
					}
				});
			}
		});

		// 새로 저장
		this.saveAsBtn = $("#saveAsBtn");
		this.saveAsBtn.click(function() {
			var activeCanvasInfo = _this.canvasView.getActiveCanvasInfo();

			var writer = new draw2d.io.json.Writer();
			var fileContent = "";
			var fileImg = _this.canvasView.cropCanvasToPng();

			writer.marshal(_this.canvas, function(json) {
				fileContent = JSON.stringify(json, null, 2);
			});

			var explorerModal = new ExplorerModal(_this.serverRootPath, null, "저장", "", "이름을 입력해주세요", "저장",
					"같은 이름이 존재합니다.");

			explorerModal.setInputText(activeCanvasInfo.fileName);

			explorerModal.btnEvent(function() {

				var parentEntity = explorerModal.getCurrentEntity();

				if (parentEntity instanceof ProjectExplorerEntity) {
					if (parentEntity.getID() == 0 || parentEntity.getID() == 0) {
						explorerModal.setErrorMessage("프로젝트 폴더에는 파일이 존재할 수 없습니다.");
						explorerModal.showErrorMessage();
					} else {
						if (explorerModal.getInputText() != "") {
							$.ajax({
								url : _this.serverRootPath+"/editor?action=saveAsFile",
								type : "POST",
								dataType : "JSON",
								data : {
									"fileName" : explorerModal.getInputText(),
									"fileOwnerID" : parentEntity.getOwnerID(),
									"fileModifierID" : $("#header-user-id").attr("uid"),
									"fileParentID" : parentEntity.getID(),
									"fileContent" : fileContent,
									"fileSharedRootID" : parentEntity.getSharedRootID(),
									"fileImg" : fileImg
								},
								success : function(data, textStatus, jqXHR) {
									if (data.result == "true") {
										_this.canvasView.setActiveCanvasInfo(data);
										_this.canvasView.canvasOffChange();
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
							explorerModal.setErrorMessage("이름을 입력해주세요");
							explorerModal.showErrorMessage();
						}
					}
				}
			});

			explorerModal.assginModalPanel();
			explorerModal.show();
		});

		// 열기
		this.openFileBtn = $("#openBtn");

		this.openFileBtn.click(function() {
			var explorerModal = new ExplorerModal(_this.serverRootPath, null, "열기", "", "이름을 입력해주세요", "열기",
					"같은 이름이 존재합니다.");

			explorerModal.hideModalBodyFormInputGroup();

			explorerModal.btnEvent(function() {

				var parentEntity = explorerModal.getCurrentEntity();

				if (parentEntity instanceof ProjectExplorerEntity) {
					explorerModal.setErrorMessage("파일을 선택해주세요.");
					explorerModal.showErrorMessage();
				} else {
					if (parentEntity.isLock() == "true") {
						explorerModal.setErrorMessage("현재 다른 사용자가 사용중입니다.");
						explorerModal.showErrorMessage();
					} else {
						$.ajax({
							url : _this.serverRootPath+"/editor?action=openFile",
							type : "POST",
							dataType : "JSON",
							data : {
								fileID : parentEntity.getID(),
								fileModifierID : $("#header-user-id").attr("uid")
							},
							success : function(data, textStatus, jqXHR) {
								if (data.result == "false") {

									explorerModal.setErrorMessage("같은 이름이 존재합니다.");
									explorerModal.showErrorMessage();

								} else {
									_this.canvasView.addCanvasInfo(data.fileID, data.fileName, data.fileOwnerID,
											data.fileOwnerName, data.fileModifierID, data.fileModifierName,
											data.fileSharedRootID, data.fileParentID, data.fileContent);
									explorerModal.hide();
								}
							},
							error : function(jqXHR, textStatus, errorThrown) {
							}
						});
					}
				}
			});

			explorerModal.assginModalPanel();
			explorerModal.show();
		});

		// 새문서
		this.newFileBtn = $("#newFileBtn");
		this.newFileBtn.click(function() {
			canvasView.addNewFile();
		});

		// Inject the UNDO Button and the callbacks
		//
		this.undoBtn = $("#undoBtn");
		this.undoBtn.click($.proxy(function() {
			_this.canvas.getCommandStack().undo();
		}, this));

		// Inject the REDO Button and the callback
		//
		this.redoBtn = $("#redoBtn");
		this.redoBtn.click($.proxy(function() {
			_this.canvas.getCommandStack().redo();
		}, this));

		// 내보내기
		this.exprotBtn = $("#exportBtn");
		this.exprotBtn.click(function() {
			var activeCanvasInfo = _this.canvasView.getActiveCanvasInfo();
			var writer = new JSONWriter();
			writer.marshal(_this.canvas, function(json) {
				var fileContent = JSON.stringify(json, null, 2);

				$.post(_this.serverRootPath+"/editor?action=export", {
					"fileContent" : fileContent,
					"fileName" : activeCanvasInfo.fileName
				}).done(
						function(data) {
							location.href = _this.serverRootPath+"/editor?action=download&fileName="
									+ activeCanvasInfo.fileName + ".wml";
						});
			});

		});

		// 가져오기
		var importBtn = $("#importBtn");
		importBtn.click(function() {
			$("#uploadFile").click();
		});

		var uploadFile = $("#uploadFile");
		uploadFile.change(function() {
			var fileData = $("#uploadFile")[0].files[0];

			var formData = new FormData();

			formData.append("file", fileData);

			$.ajax({
				url : _this.serverRootPath+"/editor?action=import",
				type : "POST",
				dataType : "TEXT",
				data : formData,
				processData : false,
				contentType : false,
				success : function(data, textStatus, jqXHR) {
					var reader = new draw2d.io.json.Reader();
					reader.unmarshal(_this.canvas, data);
				},
				error : function(jqXHR, textStatus, errorThrown) {
				}
			});
		});
	}
});