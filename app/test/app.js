require.config({
	paths: {
		jquery: 'jquery',
		can: 'can'
	}
});

define('23',
  [
    'can',
    'jquery'
  ],
  function(can, $) {
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
		var data = {
			message:"we are soilder.",
			button: "OK"
		};
        var html = can.mustache(template_component_addrcreate, data);
		this.element.html(html);
      }
    });

    new center('#area');
  })