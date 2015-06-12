//-----------------------------------------------------------
/* Converting all SVGs into inline SVGs */
//-----------------------------------------------------------

jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');

});

//-----------------------------------------------------------
/* Google Maps in Contact Section, using GoogleMaps API */
//-----------------------------------------------------------

function initialize() {
	var contactMap = document.getElementById('contactMap');
	var myLatLng = new google.maps.LatLng(33.7817, -84.406);
    var mapOptions = {
      center: myLatLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(contactMap, mapOptions);
    var marker = new google.maps.Marker({
    	position: myLatLng,
    	map: map,
    	title: 'AdeptDC!'
    });
}
google.maps.event.addDomListener(window, 'load', initialize);

//----------------------------------------------------------
/* Code for Demo */
//---------------------------------------------------------


            $(function() {
                $("#temp_unit").change(function() {
                    var old_number = $("#temp_choice #temp_value").val();
                    if($("#temp_unit option:selected").text() == "°F") {
                        $("#temp_choice #temp_value").replaceWith('<input type="number" name="temp" id = "temp_value" required min="50.00" max="84.20" step="0.01" style="width: 79%">');
                        
                        // from c to f
                        var new_number = old_number * 9/5 + 32;
                        $("#temp_choice #temp_value").val(new_number.toFixed(2));
                    } else {
                        $("#temp_choice #temp_value").replaceWith('<input type="number" name="temp" id = "temp_value" required min="10.00" max="29.00" step="0.01" style="width: 79%">');
                    
                        // from f to c
                        var new_number = (old_number - 32) * 5/9;
                        $("#temp_choice #temp_value").val(new_number.toFixed(2));
                    }
                });
                
                $("#rdhx_unit").change(function() {
                    var old_number = $("#rdhx_choice #rdhx_value").val();
                
                    // 1psi = 6.895 kPa
                    if($("#rdhx_unit option:selected").text() == "psi") {
                        $("#rdhx_choice #rdhx_value").replaceWith('<input type="number" name="rdhx" id = "rdhx_value" required min="4.00" max="12.00" step="0.01" style="width: 79%">');
                    
                        // from kpa to psi
                        var new_number = old_number / 6.895;
                        $("#rdhx_choice #rdhx_value").val(new_number.toFixed(2));
                    } else {
                        $("#rdhx_choice #rdhx_value").replaceWith('<input type="number" name="rdhx" id = "rdhx_value" required min="27.58" max="82.74" step="0.01" style="width: 79%">');
                    
                        // from psi to kpa
                        var new_number = old_number * 6.895;
                        $("#rdhx_choice #rdhx_value").val(new_number.toFixed(2));
                    }
                });

                $(".formRow #rdhx_no").change(function() {
                    var yes = $(".formRow #rdhx_no").val();

                    if(yes == "No"){
                        $("#rdhx_num").hide();
                    } else if (yes == "Yes") {
                        $("#rdhx_num").show();
                    }
                });
                
            });
