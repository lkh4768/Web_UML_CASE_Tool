/**
 * Created by wes on 15. 11. 10.
 */
ContextMenuItemsInCanvas = Class.extend({
	NAME : "ContextMenuItemsInCanvas",

	init : function(target, x, y) {
		this.target = target;
		this.x = x;
		this.y = y;
		this.items = {};
		this.contextMenu = null;
		this.subMenuItem = {};

		this.sepIndex = 0;

		this.addPortItem = {
			"addPort" : {
				name : "포트 추가",
				icon : ""
			}
		}

		this.deletePortItem = {
			"deletePort" : {
				name : "포트 삭제",
				icon : ""
			}
		}
		this.cutItem = {
			"cut" : {
				name : "오려두기",
				icon : ""
			}
		}

		this.copyItem = {
			"copy" : {
				name : "복사",
				icon : ""
			}
		}

		this.toFrontItem = {
			"toFront" : {
				name : "맨 앞으로 보내기",
				icon : ""
			}
		}

		this.toBackItem = {
			"toBack" : {
				name : "맨 뒤로 보내기",
				icon : ""
			}
		}

		this.deleteItem = {
			"delete" : {
				name : "삭제",
				icon : ""
			}
		}

		this.pasteItem = {
			"paste" : {
				name : "붙여넣기",
				icon : ""
			}
		}

		this.undoItem = {
			"undo" : {
				name : "되돌리기",
				icon : ""
			}
		}

		this.redoItem = {
			"redo" : {
				name : "다시실행",
				icon : ""
			}
		}

		this.connectionChangeItem = {
			"connectionChange" : {
				name : "연결선 변경"
			}
		}

		this.compositionDecoItem = {
			"CompositionDecorator" : {
				name : "Composition"
			}
		}

		this.aggregationDecoItem = {
			"AggregationDecorator" : {
				name : "Aggregation"
			}
		}

		this.realisationDecoItem = {
			"RealisationDecorator" : {
				name : "Realisation"
			}
		}

		this.generalisationDecoItem = {
			"GeneralisationDecorator" : {
				name : "Generalisation"
			}
		}

		this.associationDecoItem = {
			"AssociationDecorator" : {
				name : "Association"
			}
		}

		this.directedAssociationDecoItem = {
			"DirectedAssociationDecorator" : {
				name : "DirectedAssociation"
			}
		}

		this.dependencyDecoItem = {
			"DependencyDecorator" : {
				name : "Dependency"
			}
		}

		this.includeDecoItem = {
			"IncludeDecorator" : {
				name : "Include"
			}
		}

		this.extendDecorator = {
			"ExtendDecorator" : {
				name : "Extend"
			}
		}

		this.messageDeco = {
			"MessageDecorator" : {
				name : "Message"
			}
		}
	},

	getSepItem : function() {
		var sep = {
			sep : "---------"
		};
		var tmp = {};
		this.sepIndex = this.sepIndex + 1;

		tmp["sep" + this.sepIndex] = sep["sep"];

		return tmp;
	},

	getAddPortItem : function() {
		return this.addPortItem;
	},

	getDeletePortItem : function() {
		return this.deletePortItem;
	},

	getCutItem : function() {
		return this.cutItem;
	},

	getCopyItem : function() {
		return this.copyItem;
	},

	getToFrontItem : function() {
		return this.toFrontItem;
	},

	getToBackItem : function() {
		return this.toBackItem;
	},

	getDeleteItem : function() {
		return this.deleteItem;
	},

	getPasteItem : function() {
		return this.pasteItem;
	},

	getUndoItem : function() {
		return this.undoItem;
	},

	getRedoItem : function() {
		return this.redoItem;
	},

	getConnectionChangeItem : function() {
		return this.connectionChangeItem;
	},

	getCompositionDecoItem : function() {
		return this.compositionDecoItem;
	},

	getAggregationDecoItem : function() {
		return this.aggregationDecoItem;
	},

	getRealisationDecoItem : function() {
		return this.realisationDecoItem;
	},

	getGeneralisationDecoItem : function() {
		return this.generalisationDecoItem;
	},

	getAssociationDecoItem : function() {
		return this.associationDecoItem;
	},

	getDirectedAssociationDecoItem : function() {
		return this.directedAssociationDecoItem;
	},
	
	getDependencyDecoItem : function() {
		return this.dependencyDecoItem;
	},
	
	getIncludeDecoItem : function() {
		return this.includeDecoItem;
	},
	
	getExtendDecoItem : function() {
		return this.extendDecorator;
	},
	
	getMessageDecoItem : function() {
		return this.messageDeco;
	},

	appendSubItem : function(parentItem, subItem) {
		var _this = this;

		// 모든 아이템의 처음은 값이 1개이다. 그래서 이렇게해줌. 번거롭지만 유연함.
		$.each(parentItem, function(i, val) {
			parentItem[i]["items"] = $.extend(_this.subMenuItem, subItem);
			return false;
		});
	},

	appendItem : function(newItem) {
		$.extend(this.items, newItem);

		// sub메뉴는 추가시 초기화됨. 다음 sub메뉴 추가할 때 중복을 막기위함.
		this.subMenuItem = {};
	},

	// 다 붙이고 완료 후 호출할 것!
	getContextMenu : function() {
		var _this = this;

		this.contextMenu = $.contextMenu({
			selector : 'body',
			events : {
				hide : function() {
					$.contextMenu('destroy');
				}
			},
			callback : $.proxy(
					function(key, options) {
						switch (key) {
						// _this.target == figure
						case "addPort":
							_this.target.setUserData({
								isAddPort : true
							});
							break;
						case "deletePort":
							// del Port Command
							var cmd = new CommandDelPort(_this.target.getParent(), _this.target, _this.x, _this.y);
							// for Undo, Redo
							_this.target.getParent().getCanvas().getCommandStack().execute(cmd);
							break;
						case "cut":
							var cmd = new CommandCutFigure(_this.target.getCanvas(), _this.target);
							_this.target.getCanvas().getCommandStack().execute(cmd);
							break;
						case "copy":
							var cmd = new CommandCopyFigure(_this.target.getCanvas(), _this.target);
							_this.target.getCanvas().getCommandStack().execute(cmd);
							break;
						case "toFront":
							_this.target.toFront();
							break;
						case "toBack":
							_this.target.toBack();
							break;
						case "delete":
							var cmd = new draw2d.command.CommandDelete(_this.target);
							_this.target.getCanvas().getCommandStack().execute(cmd);
							break;
						// _this.target == connection
						case "CompositionDecorator":
						case "AggregationDecorator":
						case "RealisationDecorator":
						case "GeneralisationDecorator":
						case "AssociationDecorator":
						case "DirectedAssociationDecorator":
						case "DependencyDecorator":
						case "IncludeDecorator":
						case "ExtendDecorator":
						case "MessageDecorator":
							var cmd = new CommandChangeDecorator(_this.target, key);
							_this.target.getCanvas().getCommandStack().execute(cmd);
							break;

						// _this.target == canvas
						case "paste":
							var cmd = new CommandPasteFigure(_this.target, _this.target.getClipboardFigure(), _this.x,
									_this.y);
							_this.target.getCommandStack().execute(cmd);
							break;
						case "undo":
							_this.target.getCommandStack().undo();
							break;
						case "redo":
							_this.target.getCommandStack().redo();
							break;
						default:
							break;
						}

					}, _this.target),
			x : _this.x,
			y : _this.y,
			items : _this.items
		});
		return this.contextMenu;
	}

});
