DecoratorFactory = Class.extend({

	NAME : "DecoratorFactory",

	init : function() {
	},

	createDecorator : function(targetConnection, decoratorName) {
		var decorator = null;

		targetConnection.setDashArray("");
		targetConnection.setStereoType("");
		
		switch (decoratorName) {
		case "RealisationDecorator":
		case "DependencyDecorator":
			decorator = eval("new " + decoratorName + "()");
			targetConnection.setDashArray("- ");
			break;
		case "AggregationDecorator":
		case "CompositionDecorator":		
		case "DirectedAssociationDecorator":
		case "GeneralisationDecorator":
		case "MessageDecorator":
			decorator = eval("new " + decoratorName + "()");
			break;
		case "ExtendDecorator":
			decorator = eval("new " + decoratorName + "()");
			targetConnection.setStereoType("Extend");
			targetConnection.setDashArray("- ");
			break;
		case "IncludeDecorator":
			decorator = eval("new " + decoratorName + "()");
			targetConnection.setStereoType("Include");
			targetConnection.setDashArray("- ");
			break;
		default:
			break;
		}
		return decorator;
	}
});