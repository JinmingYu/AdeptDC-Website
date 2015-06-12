<!DOCTYPE HTML>
<html>
	<head>
		<title>AdeptDC | Homepage</title>
		<?php include_once('i_head.php'); ?>
	</head>

	<body class="homepage">

	<!--=========================================================================================== 
			Nav
	============================================================================================-->

	<nav class="nav">
		<ul class="nav-list">
			<li class="navLogo" style="font-size:30px"><a href="/adeptdc/">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a></li>
			<li class="nav-item"><a href="index.php#datacool">DataCOOL</a></li>
			<li class="nav-item"><a href="index.php#demo">Demo</a></li>
			<li class="nav-item"><a href="index.php#validation">Validation</a></li>
			<li class="nav-item"><a href="index.php#contact">Contact</a></li>
		</ul>
	</nav>

	
	<!--=========================================================================================== 
			DataCOOL
	============================================================================================-->
	
	<section class="demo" id="demo">
	<!--<div class="demo-heading"><div class="container"><h1><span class="red">Data</span><span class="blue">COOL</span></h1></div></div>-->
		<div class="demo-heading"><div class="container"><h1 id="demo-header"><span>Interactive Demo</span></h1></div></div>
		<div class="container">
			<div class="demo-intro">
				<p><h3>DataCOOL uses a data-driven algorithm that keeps the maximum CPU temperature below a critical threshold with most cost-optimal cooling set-points.This demo uses the threshold CPU temperature = 65 °C. 
				Since DataCOOL uses a data-driven algorithm, the demo is case-specific. 
				Following list specifies the case-in-point by defining facility, experimental conditions,
				computational infrastructure, cooling infrastructure, CRAC-based cooling circuit,
				RDHx-based cooling circuit, training data, and cost modeling.</h3> </p>
				<ul>
					<li><a href="#facilityModal">Facility</a></li>
					
				</ul>
				<div id="facilityModal" class="modalWindow">
					<div>
						<a href="#close" title="Close" class="close">X</a>
						<a href="datacool/diagrams/computational-infrastructure.jpg" title="Full Size" class="full-size-image-button" target="blank"><span class="fa fa-arrows-alt"></span></a>
						<img src="datacool/diagrams/facility.jpg">
					</div>
				</div>
				<ul>
					
					<li><a href="#experimentalConditionsModal">Experimental conditions</a></li>
				    
				</ul>
				<div id="experimentalConditionsModal" class="modalWindow">
					<div>
						<a href="#close" title="Close" class="close">X</a>
						<a href="datacool/diagrams/computational-infrastructure.jpg" title="Full Size" class="full-size-image-button" target="blank"><span class="fa fa-arrows-alt"></span></a>
						<img src="datacool/diagrams/experimental-conditions.jpg">
					</div>
				</div>
				<ul>
					
				    <li><a href="#computationalInfrastructureModal">Computational infrastructure</a></li>
					
				</ul>
				<div id="computationalInfrastructureModal" class="modalWindow">
					<div>
						<a href="#close" title="Close" class="close">X</a>
						<a href="datacool/diagrams/computational-infrastructure.jpg" title="Full Size" class="full-size-image-button" target="blank"><span class="fa fa-arrows-alt"></span></a>
						<img src="datacool/diagrams/computational-infrastructure.jpg">
					</div>
				</div>
				<ul>
				
					<li><a href="#coolingInfrastructureModal">Cooling infrastructure</a></li>
					
				</ul>
				<div id="coolingInfrastructureModal" class="modalWindow">
					<div>
						<a href="#close" title="Close" class="close">X</a>
						<a href="datacool/diagrams/cooling-infrastructure.jpg" title="Full Size" class="full-size-image-button" target="blank"><span class="fa fa-arrows-alt"></span></a>
						<img src="datacool/diagrams/cooling-infrastructure.jpg">
					</div>
				</div>
				
				<ul>
				
					<li><a href="#CRACModal">CRAC-based cooling circuit</a></li>
					
				</ul>
				<div id="CRACModal" class="modalWindow">
					<div>
						<a href="#close" title="Close" class="close">X</a>
						<a href="datacool/diagrams/test-crac.jpg" title="Full Size" class="full-size-image-button" target="blank"><span class="fa fa-arrows-alt"></span></a>
						<img src="datacool/diagrams/test-crac.jpg">
					</div>
				</div>
				
				<ul>
				
					<li><a href="#RDHxModal">RDHx-based cooling circuit</a></li>
					
				</ul>
				<div id="RDHxModal" class="modalWindow">
					<div>
						<a href="#close" title="Close" class="close">X</a>
						<a href="datacool/diagrams/rdhx.jpg" title="Full Size" class="full-size-image-button" target="blank"><span class="fa fa-arrows-alt"></span></a>
						<img src="datacool/diagrams/rdhx.jpg">
					</div>
				</div>
				
				<ul>
				
					<li><a href="#TrainingModal">Training data</a></li>
					
				</ul>
				<div id="TrainingModal" class="modalWindow">
					<div>
						<a href="#close" title="Close" class="close">X</a>
						<a href="datacool/diagrams/training-data.jpg" title="Full Size" class="full-size-image-button" target="blank"><span class="fa fa-arrows-alt"></span></a>
						<img src="datacool/diagrams/training-data.jpg">
					</div>
				</div>
				
				
				<ul>
					
					<li><a href="#costModelingModal">Cost modeling</a></li>
				</ul>
				<div id="costModelingModal" class="modalWindow">
					<div>
						<a href="#close" title="Close" class="close">X</a>
						<a href="datacool/diagrams/cost-modeling.jpg" title="Full Size" class="full-size-image-button" target="blank"><span class="fa fa-arrows-alt"></span></a>
						<img src="datacool/diagrams/cost-modeling.jpg">
					</div>
				</div>
			</div>
			
		</div>
	</section>

	
	

	<!--=========================================================================================== 
			Footer
	============================================================================================-->
	
	<?php include_once('i_footer.php'); ?>
		<script>
		(function () {
		
		    // Create mobile element
		    var mobile = document.createElement('div');
		    mobile.className = 'nav-mobile';
		    document.querySelector('.nav').appendChild(mobile);
		
		    // hasClass
		    function hasClass(elem, className) {
		        return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
		    }
		
		    // toggleClass
		    function toggleClass(elem, className) {
		        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
		        if (hasClass(elem, className)) {
		            while (newClass.indexOf(' ' + className + ' ') >= 0) {
		                newClass = newClass.replace(' ' + className + ' ', ' ');
		            }
		            elem.className = newClass.replace(/^\s+|\s+$/g, '');
		        } else {
		            elem.className += ' ' + className;
		        }
		    }
		
		    // Mobile nav function
		    var mobileNav = document.querySelector('.nav-mobile');
		    var toggle = document.querySelector('.nav-list');
		    mobileNav.onclick = function () {
		        toggleClass(this, 'nav-mobile-open');
		        toggleClass(toggle, 'nav-active');
		    };
		})();
		</script>
	
		<!-- Demo Analytics -->
		<script>
			var _gaq=[['_setAccount','UA-20440416-10'],['_trackPageview']];
			(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
			g.src='//www.google-analytics.com/ga.js';
			s.parentNode.insertBefore(g,s)})(document,'script');
		</script>
		<script type="text/javascript">
		var menuOpen = false;
    		$("document").ready(function () {
        		
	        	$(".nav-mobile").click(function () {
	           		menuOpen = !menuOpen;
	           		if (menuOpen) {
	               		$("#demo").animate({
	                   		paddingTop: "215px"
	               		}, 1);
	           		} else {
	               	$("#demo").animate({
	                   	paddingTop: "10px"
	               	}, 1);
	           		}           
	        	});     
    		});
	   		$("#demo").click(function(e) {
	        		$("ul").removeClass("nav-active");
	        		$("ul div").removeClass("nav-mobile-open");
	        		$("#demo").animate({
	                    paddingTop: "10px"
	                }, 1);
	                menuOpen=false;
	        });

	        $(".nav-item, .navLogo").click(function(e) {
	        		$("ul").removeClass("nav-active");
	        		$("ul div").removeClass("nav-mobile-open");
	        		$("#demo").animate({
	                    paddingTop: "10px"
	                }, 1);
	                menuOpen=false;
	        });
	        if ($( window ).width()> 700) {
	        	$("ul").removeClass("nav-active");
	        	$("ul div").removeClass("nav-mobile-open");
	        	menuOpen=false;
	        	$("#demo").animate({
	                paddingTop: "10px"
	            }, 1);
	        }
  		</script>

</body>

</html>