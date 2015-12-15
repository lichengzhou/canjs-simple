require.config({

	paths: {
		jquery: '../bower_components/jquery/dist/jquery',
		can: '../bower_components/canjs/amd/can',
		text: '../bower_components/text/text',
		template_text:'templates/test.mustache'
	}
});

define("areaCenter",
  [
    'can',
    'jquery',
	'text!template_text'
  ],
  function(can, $, template_text) {
    var center = can.Control.extend({

      /**
       * [init 初始化]
       */
      init: function() {
        this.render();
      },

      /**
       * [render 渲染]
       */
      render: function() {
		this.options.message = "1232332";
		this.options.button = "OK";
		this.options.data = new can.Map({
			message: 'Tina Fey',
			button: "OK"
		});
        var renderFn = can.mustache(template_text);
		var html = renderFn(this.options.data)
		this.element.html(html);
      },
	  
	  ".name focus": function(element, event){
		  var textvalue = event.target;
		  this.options.data.attr('textValue',$(textvalue).val());
	  },
	  
	  "button click": function(element, event){
		  var textvalue = event.target;
		  this.options.data.attr('textValue',$(textvalue).text() + ":" + $(".name").val());
	  }
    });

    new center('#area');
  });
  
  require(['areaCenter']);
