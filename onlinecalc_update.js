var $dropdown_pieces = 8;

var $total_price = 0;

function file_exists (url) {
    // http://kevin.vanzonneveld.net
    // +   original by: Enrique Gonzalez
    // +      input by: Jani Hartikainen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
    // *     example 1: file_exists('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'
    var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!req) {
        throw new Error('XMLHttpRequest not supported');
    }

    // HEAD Results are usually shorter (faster) than GET
    req.open('HEAD', url, false);
    req.send(null);
    if (req.status == 200) {
        return true;
    }

    return false;
}

function show_pieces() {

	var $target = $(".calc_item_number select");

	for ($i = 1; $i <= $dropdown_pieces; $i++) {

		$target.append('<option value="' + $i + '">' + $i + '</option>');

	}

}

function nn($val) {

	if (isNaN($val)) {

		return 0;

	} else {

		return Math.round(Number($val));

	}

}



function copy_desc() {

   $('.calc_desc').html($('.copy_desc').html());

}

function calc_weight() {

	var height = 0.03;

	var total_weight = 0;

	var res = 0;	

	var size = $(".calc_item_measurments input").size()/2;

	for (i=1;i <= size; i++) {

		l = nn($(".calc_item_measurments input[name='piece_l["+i+"]']").val());

		w = nn($(".calc_item_measurments input[name='piece_w["+i+"]']").val());

		res += (l/1000)*(w/1000); 

	}

	var m3_weight = $(".calc_select_mat_left select").val().split(",")[3];

	total_weight = m3_weight*(res);

	var r1 = nn( $('.calc_sink_hole input[name="sinkhole1"]').val())> 0 ? nn( $('.calc_sink_hole input[name="sinkhole1"]').val()) : 0;

	var r2 = nn( $('.calc_sink_hole input[name="sinkhole2"]').val()) > 0 ? nn( $('.calc_sink_hole input[name="sinkhole2"]').val()): 0;

	var r3 = nn( $('.calc_sink_hole input[name="sinkhole3"]').val()) > 0 ? nn( $('.calc_sink_hole input[name="sinkhole3"]').val()) : 0;
	

	total_weight -= (r1+r2+r3)*20;
	
	var r4 = nn( $('.calc_cooker input[name="cooker1"]').val()) > 0 ? nn( $('.calc_cooker input[name="cooker1"]').val()) : 0;

	var r5 = nn( $('.calc_cooker input[name="cooker2"]').val()) > 0 ? nn( $('.calc_cooker input[name="cooker2"]').val()) : 0;

	total_weight -= (r4+r5)*25;


	return parseInt(nn(total_weight));

}

function calc_shapes() {

	//var $shape_work = 87;

	var $shape_square =  218;

	var $shape_rounded = 466;//248

	var $shape_half_rounded = 310;//373;

	var $total =0;

	

	r1 = nn($('.calc_shape input[name="shape_square"]').val());

	r2 = nn($('.calc_shape input[name="shape_half_rounded"]').val());

	r3 = nn($('.calc_shape input[name="shape_rounded"]').val());

	//$total += (r1 ? r1*$shape_work/1000+$shape_square : 0) + (r2 ? r2*$shape_work/1000+$shape_half_rounded : 0) + (r3 ? r3*$shape_work/1000+$shape_rounded : 0);
	$total += (r1 ? r1/1000*$shape_square : 0) + (r2 ? r2/1000*$shape_half_rounded : 0) + (r3 ? r3/1000*$shape_rounded : 0);

	return $total;

}

function calc_corners () {

	var v100 = 140;

	var v300 = 168;

	var $total = 0;

	var r1 = nn( $('.calc_radius input[name="radius1"]').val());

	var r2 = nn( $('.calc_radius input[name="radius2"]').val());

	$total = r1*v100+r2*v300;

	

	return $total;

}

function calc_items() {

	var size = $(".calc_item_measurments input").size()/2;

	var res = 0;

	var weight = 0;

	

	for (i=1;i <= size; i++) {

		l = nn($(".calc_item_measurments input[name='piece_l["+i+"]']").val());

		w = nn($(".calc_item_measurments input[name='piece_w["+i+"]']").val());

		res += (l/1000)*(w/1000); 

	}

	return res;

}

function calc_cookers() {

	var p = 1258;

	var u = 2779;

	var $total = 0;

	var r1 = nn( $('.calc_cooker input[name="cooker1"]').val());

	var r2 = nn( $('.calc_cooker input[name="cooker2"]').val());

	$total = r1*p+r2*u;

	

	return $total;

}

function calc_sinkholes() {

	var p1 = 1258;

	var p2 = 2779;

	var p3 = 2500;

	var $total = 0;

	var r1 = nn( $('.calc_sink_hole input[name="sinkhole1"]').val());

	var r2 = nn( $('.calc_sink_hole input[name="sinkhole2"]').val());

	var r3 = nn( $('.calc_sink_hole input[name="sinkhole3"]').val());	

	$total = r1*p1+r2*p2+r3*p3; 		

	return $total;

}

function calc_watertap() {

	var p = 140;

	var $total = 0;

	var r = nn( $('.calc_water_tap input[name="watertap"]').val());

	

	$total = p*r;

	return $total;

}

function calc_measurment() {

	return ( $('.calc_misc input[name="measurment"]').val().length > 0 ? 1500 : 0);

}
function calc_saagimine() {
	var size = $(".calc_item_measurments input").size()/2;
	res = 0;
	for (i=1;i <= size; i++) {

		l = nn($(".calc_item_measurments input[name='piece_l["+i+"]']").val());

		w = nn($(".calc_item_measurments input[name='piece_w["+i+"]']").val());

		res += (l/1000)+(w/1000);
		

	}
	res = res*87;
	return res;
}

function recalculate() {

	 

	var $transport = $('#calc_transport select').val().split(",")[0];
	var $total_price = 0;

	var $granite = $(".calc_select_mat_left select").val().split(",")[2]*calc_items();
	var $sag =  calc_saagimine();
	$granite += $sag;

	$total_price = nn($transport)+nn($granite);

	$total_price += calc_corners();

	$total_price += calc_cookers();

	$total_price += calc_sinkholes();

	$total_price += calc_watertap();

	$total_price += calc_measurment();

	$total_price += calc_shapes();

	$total_price += nn($('.calc_sink select').val().split(",")[1]);

	var $total_weight = calc_weight();

   $total_price = parseInt($total_price);
   if ($total_weight < 300) {
	   $total_weight += 0;
   } else if ($total_weight >= 300 && $total_weight <= 400) {
	   $total_price += 990;
   } else if ($total_weight > 400 && $total_weight <= 500) {
	   $total_price += 990;
	   $total_price += 500;	   
   } else {
	  var $max = parseInt(($total_weight-500)/100);
	  //console.log($max);
	   	  
	   var i = 0;
	   
	   for (i = 0; i < $max; i++) {
		   $total_price += 500;
	   } 
   
   	}
    
   

	

	// $('#total_price').html($total_price);

    var $output;
    var $weight;

   if ($('#calc_transport select').val() == '' || !$sag) {
      $output = 0;     
      $weight = 0;

   } else {

      $output = $total_price;
      $weight = ($total_weight ? $total_weight+" kg" : 0);

   }



   $('#calc_transport input').val($output);

	$('input[name="total_price_input"]').val($total_price);

	$('#total_weight').html($weight);

	$('input[name="total_weight_input"]').val($total_weight);

}

function add_piece(pieces) {
	var currentSize = $('.calc_item_measurments').size();

	if(currentSize == pieces) {
		return false;
	}

	var maxId;

	maxId = currentSize + 1;

	if(pieces > currentSize) {
		for(var i = 0; i < (pieces - currentSize); i++) {
			var newItem = $('#measurment_block .calc_item_measurments:first').clone();

			newItem.find('span:first').html(maxId + '. ');
			newItem.find('input').eq(0).attr("name", "piece_l[" + maxId + "]");
			newItem.find('input').eq(1).attr("name", "piece_w[" + maxId + "]");
			newItem.find('input').val('');

			$('#measurment_block .calc_item_measurments:last').after(newItem);

			maxId++;
		}
	} else {
		for(var i = 0; i < (currentSize - pieces); i++) {
			$('.calc_item_measurments:last').remove();
		}
	}
}

function add_piece_old($number) {
	var $target = $(".calc_item_measurments");
	var $size = $target.size();

	if ($size > 1) {
		for ($i = 1; $i < $size; $i++) {
			$(".calc_item_measurments:last-child").remove();
		}
	}

	var $new = $("#measurment_block .calc_item_measurments:first-child").clone();

	for ($i = $number; $i > 1; $i--) {
		var $new = $("#measurment_block .calc_item_measurments:last-child").clone();

		$($new).find('input').eq(0).attr("name", "piece_l[" + $i + "]");

		$($new).find('input').eq(1).attr("name", "piece_w[" + $i + "]");

		$($new).find('span:first-child').html($i+'. ');

		$("#measurment_block .calc_item_measurments:first-child").after($new);
	}
}

function validate() {


    $('input[name="customcaptcha"]').removeClass('error');
	$('#error_message').hide();
   $('.error_msg').hide();
	var $cnt=0;
	$("input.required, select.required").each(function () {
		$(this).removeClass('error');
		if ($(this).val().length == 0 || $(this).val() == 0) {
			$(this).addClass('error');
         //console.log($(this).nextAll('.error_msg'));
         $(this).nextAll('.error_msg').show();
			$cnt++;
		}
	});

    if($('input[name="customcaptcha"]').val() != 'granitset') {
        $('input[name="customcaptcha"]').addClass('error');

        $cnt++;
    }

	if ($cnt > 0) {

// $('#error_message').show();

		return false;

	}

	return true;

}

function getOriginalWidthOfImg(img_element) {

    var t = new Image();

        t.src = (img_element.getAttribute ? img_element.getAttribute("src") : false) || img_element.src;

            return t.width;

}

$(document).ready(function() {

   //copy_desc();

	/*
	$('.hand').hover( function(evt) {

		$(this).find('.float_image, .float_image2, .float_image3').show();
      $('.calc_input').css('position','static');
if ($.browser.safari) {
scrollTo(document.body.scrollLeft, document.body.scrollTop + 1);
scrollTo(document.body.scrollLeft, document.body.scrollTop - 1);
}
	}, function() {
		$(this).find('.float_image, .float_image2, .float_image3').hide();
      $('.calc_input').css('position','relative');
if ($.browser.safari) {
scrollTo(document.body.scrollLeft, document.body.scrollTop + 1);
scrollTo(document.body.scrollLeft, document.body.scrollTop - 1);
}
	});
	*/

	show_pieces();

	$(".calc_item_number select").change(function() {

		var $items = $(".calc_item_number select").val();

		add_piece($items);

	});

	$(".calc_select_mat_left select").change(function() {

		var $items = $(".calc_select_mat_left select").val().split(",");

		if ($items[1]) {

			$('#mat_picture').html('<img class="mat_normal" src="/public/product/'+$items[1]+'.jpg" />');

		} else {

			$('#mat_picture').html('');

		}

		recalculate();

	});

	$(document).on('click', '.sink_pic', function() {
		$('.sink_pic_hidden').hide();
		$(this).next().show();

		return false;
	});

	$(".calc_sink select").change(function() {
		$('.sink_pic_hidden').hide();

		var $items = $(".calc_sink select").val().split(",");

		if ($items[1]) {

//			$('#sink_picture .hand').html('Vasken bild<span class="float_image2"><img src="/public/product/'+$items[2]+'" /><img src="/public/product/'+$items[3]+'" /></span>');


            if(!file_exists('/public/product/'+$items[2])) {
                var image = '/public/product/'+$items[2].replace('/', ':').replace('png', 'jpg');

                if(!file_exists(image)) {
                    var image = image.split(' ').join('');
                }
            } else {
                var image = '/public/product/'+$items[2];
            }

			$('#sink_picture .hand').html('<a href="' + image + '" class="fancybox sink_pic">Vasken bild</a>');

            if($(window).width() <= 480) {
                $('#sink_picture').css('padding-top', '0px');
            } else {
                $('#sink_picture').css('padding-top', '0px');
            }

            $('#sink_picture').css('width', '120px');

            $('.fancybox').fancybox({
                tpl: {
                    closeBtn : '<a title="Close" class="fancybox-item fancybox-close" style="right: 15px; top: auto; bottom: -8px;" href="javascript:;"></a>'
                },
                maxWidth: 300,
                maxHeight: 300
            });

		} else {

			$('#sink_picture .hand').html('');

		}

		recalculate();

	});

	$('#calc_transport select').change(function() {

// var $items = $(this).val().split(",");

// $('#calc_transport input').val($items[0]);
	recalculate();

/*		if (!validate()) {
			recalculate();

			return false;

		} else {

		recalculate();
		} */
	});

/*
	$('input').live('keyup click', function() {
*/
	$('input').on('keyup click', function() {
		recalculate();
	});
	
	$("#submit_place input").click(function() {

		if (!validate()) {

			return false;

		} else {

			$('#calc_container form').submit();

		}

		return false;

			  

	});
/*
	$('input[type=file]').live('change', function(e){
*/
	$('input[type=file]').on('change', function(e){
		  var size = $('input[type=file]').size();
		  if (size < 5 && $(this).val().length > 0) {
		  	copy=$(this).clone();
		  	$(copy).val('').attr("name", "upload["+(size+1)+"]");
		  	$(this).after(copy);
		  }		
	});

	$("#calc_container form").bind("keypress", function(e) {



	    var c = e.which ? e.which : e.keyCode;



	    if (c == 13) {



	        return false;



	    }



	});
	/*
	$("#mat_picture img").live(
	*/
	
   $("#mat_picture img").on(
      'hover',
        function (ev) {
            if (ev.type == 'mouseenter') {
                $(this).removeClass("mat_normal").addClass("mat_hovered");
if ($.browser.safari) {
scrollTo(document.body.scrollLeft, document.body.scrollTop + 1);
scrollTo(document.body.scrollLeft, document.body.scrollTop - 1);
}
            }

            if (ev.type == 'mouseleave') {
                $(this).removeClass("mat_hovered").addClass("mat_normal");
if ($.browser.safari) {
scrollTo(document.body.scrollLeft, document.body.scrollTop + 1);
scrollTo(document.body.scrollLeft, document.body.scrollTop - 1);
}
            }
        });
   

   $(".calc_select_mat_left select").change();

});
