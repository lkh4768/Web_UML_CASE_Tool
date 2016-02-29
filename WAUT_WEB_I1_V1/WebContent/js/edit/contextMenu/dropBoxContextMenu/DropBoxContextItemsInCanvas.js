DropBoxContextItemsInCanvas = Class
		.extend({
			NAME : "DropBoxContextItemsInCanvas",

			/*
			 * data-connection은 연결선의 종류
			 * data-decorator는 연결선 데코레이터의 종류(데코레이터가 없을때 기본값은 default)
			 */
			init : function() {
				this.context = $('<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu"></ul>');

				this.compositionDecoratorLiTag = $('<li><a data-connection="DefaultConnection" data-decorator="CompositionDecorator" tabindex="-1" href="#">Composition</a></li>');
				
				this.aggregationDecoratorLiTag = $('<li><a data-connection="DefaultConnection" data-decorator="AggregationDecorator" tabindex="-1" href="#">Aggregation</a></li>');
				
				this.realisationDecoratorLiTag = $('<li><a data-connection="DefaultConnection" data-decorator="RealisationDecorator" tabindex="-1" href="#">Realisation</a></li>');
				
				this.generalisationDecoratorLiTag = $('<li><a data-connection="DefaultConnection" data-decorator="GeneralisationDecorator" tabindex="-1" href="#">Generalisation</a></li>');
				
				this.associationDecoratorLiTag = $('<li><a data-connection="DefaultConnection" data-decorator="default" tabindex="-1" href="#">Association</a></li>');
				
				this.directedAssociationDecoratorLiTag = $('<li><a data-connection="DefaultConnection" data-decorator="DirectedAssociationDecorator" tabindex="-1" href="#">DirectedAssociation</a></li>');
				
				this.dependencyDecoratorLiTag = $('<li><a data-connection="DefaultConnection" data-decorator="DependencyDecorator" tabindex="-1" href="#">Dependency</a></li>');
				
				this.includeDecoratorLiTag = $('<li><a data-connection="DefaultConnection" data-decorator="IncludeDecorator" tabindex="-1" href="#">Include</a></li>');
				
				this.extendDecoratorLiTag = $('<li><a data-connection="DefaultConnection" data-decorator="ExtendDecorator" tabindex="-1" href="#">Extend</a></li>');
				
				this.sequenceMessageDecoratorLiTag = $('<li><a data-connection="SequenceMessageConnection" data-decorator="MessageDecorator" tabindex="-1" href="#">Message</a></li>');
				
				//replayMessage는 모양이 dependency와 똑같음.
				this.replyMessageDecoratorLiTag = $('<li><a data-connection="DefaultConnection" data-decorator="DependencyDecorator" tabindex="-1" href="#">Reply Message</a></li>');
				
				//arrow connection은 모양이 directed association과 같음.
				this.arrowConnectionDecoratorLiTag = $('<li><a data-connection="DefaultConnection" data-decorator="DirectedAssociationDecorator" tabindex="-1" href="#">Arrow Connection</a></li>');
				
				//communication diagram
				this.communicationConnectionDecoratorLiTag = $('<li><a data-connection="CommunicationConnection" data-decorator="MessageDecorator" tabindex="-1" href="#">Send Message</a></li>');

			},
			
			getCommunicationConnectionDecoratorLiTag : function(){
				return this.communicationConnectionDecoratorLiTag;
			},
			getArrowConnectionDecoratorLiTag : function(){
				return this.arrowConnectionDecoratorLiTag
			},
			

			getCompositionDecoratorLiTag : function() {
				return this.compositionDecoratorLiTag;
			},

			getAggregationDecoratorLiTag : function() {
				return this.aggregationDecoratorLiTag;
			},

			getRealisationDecoratorLiTag : function() {
				return this.realisationDecoratorLiTag;
			},

			getAssociationDecoratorLiTag : function() {
				return this.associationDecoratorLiTag;
			},

			getGeneralisationDecoratorLiTag : function() {
				return this.generalisationDecoratorLiTag;
			},

			getDirectedAssociationDecoratorLiTag : function() {
				return this.directedAssociationDecoratorLiTag;
			},

			getDependencyDecoratorLiTag : function() {
				return this.dependencyDecoratorLiTag;
			},
			
			getIncludeDecoratorLiTag : function() {
				return this.includeDecoratorLiTag;
			},
			
			getExtendDecoratorLiTag : function() {
				return this.extendDecoratorLiTag;
			},
			
			getSequenceMessageDecoratorLiTag : function() {
				return this.sequenceMessageDecoratorLiTag;
			},
			
			getReplyMessageDecoratorLiTag : function() {
				return this.replyMessageDecoratorLiTag;
			},

			addLiTag : function(liTag) {
				this.context.append(liTag);
			},
			
			getContext: function(){
				return this.context;
			}

		});