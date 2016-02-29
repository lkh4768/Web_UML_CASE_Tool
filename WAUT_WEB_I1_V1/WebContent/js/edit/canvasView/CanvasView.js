CanvasView = Class
		.extend({
			init : function(id, serverRootPath) {
				this.serverRootPath = serverRootPath;
				this.init = false;

				this.canvasTabIndex = 1;

				this.canvasContainer = $("#" + id).children();

				this.prevClickTab = null;

				this.activeCanvasInfo = null;

				// canvas 추가
				this.canvasDiv = $('<div onselectstart="javascript:/*IE8 hack*/return false" id="canvas" style="width: 1500px; height: 1500px;"></div>');
				this.canvasContainer.append(this.canvasDiv);
				this.canvasDiv.hide();

				// 캔버스 설정
				this.canvas = new EditorCanvas("canvas");

				this.canvasInfoList = new draw2d.util.ArrayList();

				$(".canvas-tab-item").each(function(i) {
					if ($(this).hasClass("active")) {
						$(this).children("a").css("background-color", "#c4c0c0");
					}
				});

				// log, comment view 등록
				this.fileLogAndCommentView = new FileLogAndCommentView(this.serverRootPath);

				// event 추가
				this.unloadCanvasViewEvent();
			},

			setActiveCanvasInfo : function(canvasInfo) {
				var _this = this;
				this.canvasInfoList.each(function(i, e) {
					if (e.fileID == _this.activeCanvasInfo.fileID) {
						e.fileID = canvasInfo.fileID;
						e.fileName = canvasInfo.fileName;
						e.fileOwnerID = canvasInfo.fileOwnerID;
						e.fileOwnerName = canvasInfo.fileOwnerName;
						e.fileModifierID = canvasInfo.fileModifierID;
						e.fileModifierName = canvasInfo.fileModifierName;
						e.fileSharedRootID = canvasInfo.fileSharedRootID;
						e.fileParentID = canvasInfo.fileParentID;
						e.fileContent = canvasInfo.fileContent;

						_this.activeCanvasInfo = e;
					}
				});
				
				$(".canvas-tab-item").each(function(i, e) {
					if ($(this).attr("fileID") == _this.activeCanvasInfo.fileID) {
						$(this).children("a").children("#fileName").text(canvasInfo.fileName);
					}
				});
			},

			cropCanvasToPng : function() {
				// convert the canvas into a PNG image source string
				//
				var xCoords = [];
				var yCoords = [];
				this.canvas.getFigures().each(function(i, f) {
					var b = f.getBoundingBox();
					xCoords.push(b.x, b.x + b.w);
					yCoords.push(b.y, b.y + b.h);
				});
				var minX = Math.min.apply(Math, xCoords);
				var minY = Math.min.apply(Math, yCoords);
				var width = Math.max.apply(Math, xCoords) - minX;
				var height = Math.max.apply(Math, yCoords) - minY;

				var cropPNG = null;
				var writer = new draw2d.io.png.Writer();
				writer.marshal(this.canvas, function(png) {
					cropPNG = png;
				}, new draw2d.geo.Rectangle(minX, minY, width, height));

				return cropPNG;
			},

			getActiveCanvasInfo : function() {
				return this.activeCanvasInfo;
			},

			canvasOffChange : function() {
				var _this = this;
				if (this.activeCanvasInfo != null) {
					if (this.activeCanvasInfo.unsave == true) {
						$(".canvas-tab-item").each(function(i, e) {
							if ($(this).attr("fileID") == _this.activeCanvasInfo.fileID) {
								$(this).children("a").children("#unsave").text("");
							}
						});

						this.canvasInfoList.each(function(i, e) {
							if (e.fileID == _this.activeCanvasInfo.fileID) {
								e.unsave = false;
							}
						});

						_this.activeCanvasInfo.unsave = false;
					}
				}
			},

			canvasOnChange : function() {
				var _this = this;
				if (this.activeCanvasInfo != null) {
					if (this.activeCanvasInfo.unsave == false) {
						$(".canvas-tab-item").each(function(i, e) {
							if ($(this).attr("fileID") == _this.activeCanvasInfo.fileID) {
								$(this).children("a").children("#unsave").text("*");
							}
						});

						this.canvasInfoList.each(function(i, e) {
							if (e.fileID == _this.activeCanvasInfo.fileID) {
								e.unsave = true;
							}
						});

						_this.activeCanvasInfo.unsave = true;
					}
				}

			},

			addCanvasInfo : function(fileID, fileName, fileOwnerID, fileOwnerName, fileModifierID, fileModifierName,
					fileSharedRootID, fileParentID, fileContent) {
				var obj = {
					"fileID" : fileID,
					"fileName" : fileName,
					"fileOwnerID" : fileOwnerID,
					"fileOwnerName" : fileOwnerName,
					"fileModifierID" : fileModifierID,
					"fileModifierName" : fileModifierName,
					"fileSharedRootID" : fileSharedRootID,
					"fileParentID" : fileParentID,
					"fileContent" : fileContent,
					"unsave" : false
				}

				this.canvasInfoList.add(obj);

				// 처음 초기화 됐을 때.
				var initCanvasTabItem = this.addFile(obj);
				initCanvasTabItem.click();

			},

			// 그냥 파일 추가
			addFile : function(obj) {
				var canvasTabItem = $('<li role="presentation" class="canvas-tab-item" data-change="true">'
						+ '<a href="#" style="background-color:#FAFAFB;">'
						+ '<button class="close closeTab" type="button" >×</button><span id="fileName">' + obj.fileName
						+ '</span><span id="unsave"></span></a>' + '</li>');
				canvasTabItem.attr("fileID", obj.fileID);

				if ($("#canvasTabs").children().length == 0) {
					this.canvasDiv.show();
					canvasTabItem.children("a").css("background-color", "#c4c0c0");
				}

				$("#canvasTabs").append(canvasTabItem);

				this.registerToggleTabEvent();
				this.registerCloseTabEvent();

				return canvasTabItem;
			},

			// 새문서
			addNewFile : function() {
				var _this = this;
				var canvasTabItem = $('<li role="presentation" class="canvas-tab-item" data-change="true">'
						+ '<a href="#" style="background-color:#FAFAFB;">'
						+ '<button class="close closeTab" type="button" >×</button>새문서_' + this.canvasTabIndex
						+ '<span id="unsave">*</span></a>' + '</li>');
				canvasTabItem.attr("fileID", this.canvasTabIndex);

				var obj = {
					"fileID" : _this.canvasTabIndex,
					"fileName" : "새문서" + _this.canvasTabIndex,
					"fileOwnerID" : null,
					"fileOwnerName" : null,
					"fileModifierID" : null,
					"fileModifierName" : null,
					"fileSharedRootID" : null,
					"fileParentID" : null,
					"fileContent" : [],
					"unsave" : true
				}

				this.canvasInfoList.add(obj);

				if ($("#canvasTabs").children().length == 0) {
					this.canvasDiv.show();
					canvasTabItem.children("a").css("background-color", "#c4c0c0");
				}

				$("#canvasTabs").append(canvasTabItem);

				this.registerToggleTabEvent();
				this.registerCloseTabEvent();

				this.canvasTabIndex++;
				return canvasTabItem;
			},

			registerToggleTabEvent : function() {
				// 클릭했을 때

				var _this = this;
				$(".canvas-tab-item").click(
						function() {

							if (_this.prevClickTab == null)
								_this.prevClickTab = $(this);

							if (_this.init == true) {
								// 이전 클릭의 탭 캔버스 정보 저장
								var writer = new draw2d.io.json.Writer();
								writer.marshal(_this.canvas, function(json) {
									var fileContent = JSON.stringify(json, null, 2);
									var findCanvasInfoIndex = null;

									_this.canvasInfoList.each(function(i, e) {
										if (e.fileID == _this.prevClickTab.attr("fileID")) {
											e.fileContent = fileContent;
										}
									});
								});
							}
							_this.init = true;

							// 출력하기 전에 클리어
							_this.canvas.clear();

							// 현재 클릭 탭의 캔버스 정보 출력
							var fileContent = [];

							var _tabThis = this;
							_this.canvasInfoList.each(function(i, e) {
								if (e.fileID == $(_tabThis).attr("fileID")) {
									fileContent = e.fileContent;

									// 댓글 가져오기
									_this.fileLogAndCommentView.showCommentEntityContainer(e.fileID, e.fileName,
											e.fileOwnerName, e.fileOwnerID);

									// 로그 가져오기
									_this.fileLogAndCommentView.showLogEntityContainer(e.fileID, e.fileName,
											e.fileOwnerName, e.fileOwnerID, e.fileParentID, e.fileModifierID,
											e.fileModifierName);

									// 현재 출력된 canvasInfo 저장.
									_this.activeCanvasInfo = e;
								}
							});

							var reader = new draw2d.io.json.Reader();
							reader.unmarshal(_this.canvas, fileContent);

							if (!($(this).hasClass("active"))) {
								$(this).addClass("active");

								$(this).siblings().removeClass("active");
								$(this).siblings().children().css("background-color", "#fafafb");

								_this.prevClickTab = $(this);
							}

							$(this).children().css("background-color", "#c4c0c0");

							_this.canvas.getCommandStack().addEventListener(function() {
								_this.canvasOnChange();
							});
						});
			},

			registerCloseTabEvent : function() {
				var _this = this;
				$(".closeTab").click(function() {
					// there are multiple elements which has .closeTab icon so
					// close the
					// tab
					// whose close icon is clicked
					var canvastabItem = $(this).parent().parent();

					_this.canvasInfoList.each(function(i, e) {
						if (e.fileID == canvastabItem.attr("fileID")) {
							_this.canvasInfoList.remove(e);

							$.ajax({
								url : _this.serverRootPath+"/editor?action=unlockFile",
								type : "POST",
								dataType : "JSON",
								data : {
									"fileIDList" : ";" + e.fileID
								},
								success : function(data, textStatus, jqXHR) {

								},
								error : function(jqXHR, textStatus, errorThrown) {
								}
							});
						}
					});

					if ($(".canvas-tab-item").last().attr("fileID") === canvastabItem.attr("fileID")) {

						if (canvastabItem.prev().length == 0) {
							_this.canvasDiv.hide();
							_this.canvas.clear();
						}

						canvastabItem.prev().click();
					} else
						canvastabItem.next().click();

					canvastabItem.remove(); // remove li of tab
				});
			},

			getCanvas : function() {
				return this.canvas;
			},

			unloadCanvasViewEvent : function() {
				var _this = this;
				/*
				 * 0-1. save가 안된 것을 보여준다. 0-2. save를 해주세요라고 출력한다. small modal
				 * 1-1. save가 다 됐다. 1-2. fileID를 이용하여lock를 해제한다. 2. 페이지를 나간다.
				 */

				$(window).on('beforeunload', function(event) {
					var count = 0;
					_this.canvasInfoList.each(function(i, entity) {
						if (entity.unsave == true) {
							count++;
						}
					});

					if (count > 0) {
						return "저장하지 않은 파일은 서버에 적용되지 않습니다.";
					}
				});

				$(window).on('unload', function(event) {
					var fileIDList = "";

					_this.canvasInfoList.each(function(i, entity) {
						if (entity.fileParentID != null)
							fileIDList = fileIDList + ";" + entity.fileID;
					});

					$.ajax({
						url : _this.serverRootPath+"/editor?action=unlockFile",
						type : "POST",
						dataType : "JSON",
						async : false,
						data : {
							"fileIDList" : fileIDList
						},
						success : function(data, textStatus, jqXHR) {

						},
						error : function(jqXHR, textStatus, errorThrown) {
						}
					});
				});
			}
		});