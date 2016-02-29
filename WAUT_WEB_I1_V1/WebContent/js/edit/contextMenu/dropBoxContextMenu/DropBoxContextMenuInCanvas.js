draw2d.Configuration.factory.createConnection = function(sourcePort, targetPort, callback, dropTarget) {
	
	var dropBoxContextCreator = new DropBoxContextFactoryInCanvas();
	
	var pos = dropTarget.getAbsolutePosition();
	pos = dropTarget.canvas.fromCanvasToDocumentCoordinate(pos.x, pos.y);
	
	var targetFigure = targetPort.getParent();
	var sourceFigure = sourcePort.getParent();
	
	var context = dropBoxContextCreator.createDropBoxContext(targetFigure, sourceFigure);
	
	$("body").append(context);
	
	context.show().css({
		left : pos.x,
		top : pos.y
	}).find("a").on("click", function() {
		context.remove();
		
		//connection 설정
		var connectionFactory = new ConnectionFactory();
		var connection = connectionFactory.createConnection($(this).data("connection"));
		
		// 셀프커넥션은 라우터가 달라야함.
		if (sourceFigure === targetFigure) {
			connection.setRouter(new draw2d.layout.connection.VertexRouter());
			connection.installEditPolicy(new draw2d.policy.line.VertexSelectionFeedbackPolicy());
		}
		
		//connection deco 설정
		var decoratorFactory = new DecoratorFactory();
		var decorator = decoratorFactory.createDecorator(connection, $(this).data("decorator"));
		
		connection.setTargetDecorator(decorator);
		callback(connection);
	});
};
