<html>
<head>
	
	

    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
    <style type="text/css">
		body {
			background: linear-gradient(to bottom, #fffff0 0%,#fffff0 50%,#fffff0 50%,#f0ffff 50%,#f0ffff 100%); 
			margin: 0;
		}

		#wrap1 {
			width: 1500px;
			height: 500px;
			margin: 0 auto;
			padding: 50px;
			background:#fffff0 !important;

		}
		#wrap2 {
			width: 1500px;
			height: 500px;
			margin: 0 auto;
			
			padding: 50px;
			background:#f0ffff !important;
		}
		@media screen and (max-width: 560px) {
			#wrap1 {
				display:flex; 
				flex-direction: column;
				padding-bottom: 700px;
				margin-left: 0;
				background:#fffff0 !important;
			}
			#area1 {
				float:left;
				padding-right: 10px;
				padding-left: 6px;
				padding-top: 60px;
				padding-bottom: 300px;
			}
			#area2, #area3 {
				float:left;
				padding-right: 10px;
				padding-left: 6px;
				padding-top: 60px;
				padding-bottom: 380px;
			}
			#wrap2 {
				display:flex; 
				flex-direction: column;
				padding-bottom: 700px;
				margin-left: 0;
				background:#f0ffff !important;
			}

			#area4 {
				float:left;
				padding-right: 10px;
				padding-left: 6px;
				padding-top: 60px;
				padding-bottom: 300px;
			}
			#area5 {
				float:left;
				padding-right: 10px;
				padding-left: 6px;
				padding-top: 60px;
				padding-bottom: 380px;
			}
			#area6 {
				float:left;
				padding-right: 10px;
				padding-left: 6px;
				padding-top: 60px;
				padding-bottom: 300px;
			}
		}	
        .axis-label {
            font-size: 1.5em;
        }

        .fake-border .tick {
            display: none;
        }
		
        .domain { 
          fill: none; 
          stroke: black; 
          stroke-width; 1; 
        } 
		
		#area1, #area4, #area3, #area6 {
			float:left;
			padding-right: 100px;
			padding-left: 60px;
			padding-top: 60px;
		}
		
		.tooltip {                                                        
			background: #eee;                                               
			box-shadow: 0 0 5px #999999;                                    
			color: #333;                                                    
			display: none;                                                  
			font-size: 20px;                                                
			left: 80px;                                                    
			padding: 10px;                                                  
			position: absolute;                                             
			text-align: center;                                             
			top: 80px;                                                      
			width: 100px;                                                    
			z-index: 10;                                                    
		}  
		
		.legend {
			font-size: 12px;
		}
		
		rect {
			stroke-width: 2;
		}
    </style>
</head>
<body>
    <div id="form-data" style="display: none;"
    <?php 
        //$handle = fopen("users.csv", "a");asasasasasasasasasas
        //fputcsv($handle, array($_POST["name"], $_POST["email"], $_POST["org"]));
        //fclose($handle);asasas
        echo "workload=".$_POST["workload"]." ";
        echo "temp=".$_POST["temp"]." ";
        echo "rdhx=".$_POST["rdhx"]." ";
        echo "money=".$_POST["money"]." ";
		echo "tempType=".$_POST["TempType"]." ";
		echo "pressureType=".$_POST["PressureType"]." ";
		echo "crac_no=".$_POST["crac_no"]." ";
		echo "rdhx_no=".$_POST["rdhx_no"]." ";
		
    ?>
    >
    </div>

    

	<!-- 
		The layout works like this:
		1     2     3
		4     5     6
	-->

	<div id = "wrap1" style="background:#fffff0">
		<div id = "area1" style="float:left"></div>
		<div id = "area2" style="float:left"></div>
		<div id = "area3" style="float:left"></div>
	</div>
	<div id = "wrap2" style="background:#f0ffff">
		<div id = "area4" style="float:left"></div>
		<div id = "area5" style="float:left"></div>
		<div id = "area6" style="float:left"></div>
	</div>

	<script type="text/javascript" src="view.js"></script>

</body>
</html>