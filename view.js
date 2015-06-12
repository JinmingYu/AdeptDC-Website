
/*
	About d3 and understanding the code below:
		d3 is a javascript library for making data visulization. Its name comes from data driven documentation.
		It is very powerful and not very hard to grasp if you have some background in javascript. 
		I found out this tutorial very helpful: https://www.youtube.com/playlist?list=PL6il2r9i3BqH9PmbOf5wA5E1wOG3FT22p
		the first 10 videos should be enough to understand the code below, I also comment extensively below.
	
	About change view.js not taking effect:
		Try clear your browser cache. It doesn't work usually because the file is cached.
*/

function generateChart(var1, var2) {
	/*
		var1 is "time"; The time(x) axis is same for pressure or temp graph
		var2 is either "temp" or "rdhx"; it is used to determine whether to draw temperature or pressure graph
		xLabel is used to label x axis
		yLabel is used to label y axis
	*/
	
	var xLabel = "Time";
	var yLabel = " "; //it will be determined later based on pressure/temp and unit
	
	/*
		About "workload" and Passing data between PHP and JQuery:
			1. The user picks which csv file to get data 
			from (batch/cloud/hpc/enterprise); In index.php. 
			You can see a dropdown menu there
			
			2. This value is passed to handleInput.php, more
			specifically, passed inside the "div" called "form-data"
			
			3. the workload variable below represents the value of 
			batch/cloud/hpc/enterprise. We use attr() to get it.
			
			This is a very smart and simple way to pass info between php and jquery
	*/
	
    var workload = $("#form-data").attr("workload");
	
	/* 
		The following 3 lines work the same way:
			customVar2 is the numeric value of "rdhx" or "temp"
			tempType is C/F 
			pressureType is psi/kPa
	*/
	var customVar2 = $("#form-data").attr(var2);
	var tempType = $("#form-data").attr("tempType");
	var pressureType = $("#form-data").attr("pressureType");


	//set up the position of the chart
    var margin = {
		top: 20,
		right: 20,
		bottom: 30,
		left: 50
	},
	width = 600 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

	/* 
		About linear() function and its use:
			Imagine you have a bar graph. The first bar is 500 tall and the second is 600 tall, but the maximum height of the
			graph is 500. So what happens? the 2 bars are displayed having the same height 500! To avoid this, we use linear()
			function to Scale the data accordingly.
			
			range() defines the resulting range
			domain() defines the input range
			
			the domain of x and y is defined in the code block d3.cvs(){...}. It makes sense because only after we know the range 
			of data we can define domain
			
			To use scale, we define linear() function first (x, y), and use them when draw the data
	*/
    var x = d3.scale.linear()
        .range([0, width]); 

    var y = d3.scale.linear()
        .range([height, 0]);

	/* we need four axis here so that the graph looks like it's "in a box"
		if we only have 2 axis, the graph will look like this:
			y
			|
			|
			|
			|
			|
			|
			-------------------------------- x
	*/
	var tick_arr = ["0", "T/6", "T/3", "T/2", "2T/3", "5T/6","T"];
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(0)
		.ticks(7)
        .tickFormat(function(d, i) { return tick_arr[i]; });
		
		//d3.format(",.0f"));

    var topXAxis = d3.svg.axis()
        .scale(x)
        .tickSize(0)
        .orient("top");

    var rightYAxis = d3.svg.axis()
        .scale(y)
        .tickSize(0)
        .orient("right");

    var yAxis = d3.svg.axis()
        .scale(y)
        .tickSize(0)
        .orient("left");

	
	/*
		line() function draws the lines in the graph, it is only a framework indicates how data
		is going to be processed. Later svg.append() will Supply data to it by calling datum(data)
		
		"line" is the changing line (a.k.a optimal line)
		"customLine" is the unchanged straight line
		
		For temp, red line should be below blue, if not the area in between is red (otherwise green)
		For rdhx, red line should be above blue, if not the area in between is red (otherwise green)
	*/
    var line = d3.svg.line()
        .x(function(d) {
            return x(d[var1]);
        })
        .y(function(d) {
            return y(d[var2]);
        })
        .interpolate("basis");

    var customLine = d3.svg.line()
        .x(function(d) {
            return x(d[var1]);
        }) 
		//.x(line.x()) // the above code also works. Just want to show we can reuse line's x 
        .y(function(d) {
            return y(d["custom"+var2]);
        })
        .interpolate("basis");
	
	/* 
		x is the x-axis, you could specify x0 and x1, but since x0 and x1 will be the same this case, declare x is enough
	*/
	var areaAboveInputLine = d3.svg.area()
		.x(customLine.x())
		.y0(customLine.y())
		.y1(0)
		.interpolate("basis");
		
	var areaBelowInputLine = d3.svg.area()
		.x(customLine.x())
		.y0(customLine.y())
		.y1(height)
		.interpolate("basis");
		
	var areaAboveOptimalLine = d3.svg.area()
		.x(line.x())
		.y0(line.y())
		.y1(0)
		.interpolate("basis");
		
	var areaBelowOptimalLine = d3.svg.area()
		.x(line.x())
		.y0(line.y())
		.y1(height)
		.interpolate("basis");
	
	// this is the area function when the 2 lines don't cross.
    var area = d3.svg.area()
        .x(function(d) { 
            return x(d[var1]);
        })
		
        .y1(function(d) {
            return y(d[var2]);
        })
        
        .y0(function(d) {
            return y(d["custom" + var2]);
        })
        .interpolate("basis");

	/* Think of var svg as a canvas to draw lines
		to draw something on svg, we "append" it.
		In later code segments, we will see the 3 variables
		above, "line", "customLine", and "area" are all
		appended to the svg canvas
	*/
	
	var area_code;
	
	if(var2 == "temp"){
		area_code = "#area2";
	} else if (var2 == "rdhx") {
		area_code = "#area5";
	}
	
    var svg = d3.select(area_code).append("svg")
        .attr("width", width + margin.left + margin.right + 20)
        .attr("height", height + margin.top + margin.bottom + 20)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	/*
		d3.csv(....) is a way to get data from excel file. 
		1. first argument indicates where the data comes from: setpoints folder
		
		2. second arguments function(error, data){...}  indicates what to do with the data.
		ignore "error", "data" refers to data
	*/
	
    d3.csv("setpoints/" + workload + ".csv", function(error, data) {
		
		/* Set up the data */
		data.forEach(function(d) {
			// those parts are same regardless of unit or temp/pressure
			d[var1] = +d[var1];
		
			if (customVar2) {
				d["custom"+var2] = +customVar2;
			} else {
				d["custom"+var2] = 0;
			}
		});
		
		if (var2 == "temp" && tempType == "f") { //use F for temperature 
			data.forEach(function(d) {
				if (d[var2]) {
					d[var2] = +(d[var2] * 9/5 + 32);
				} else {
					d[var2] = 0;
				}
			});
			
			yLabel = "CRAC Supply Temperature (°F)";
			
		} else if (var2 == "rdhx" && pressureType == "kpa") { //use kPa for pressure
			data.forEach(function(d) {
				if (d[var2]) {
					d[var2] = +(d[var2] * 6.8947);
				} else {
					d[var2] = 0;
				}
			});
			
			yLabel = "RDHx Pressure (kPa)";
		} else {
			data.forEach(function(d) {
				if (d[var2]) {
					d[var2] = +d[var2];
				} else {
					d[var2] = 0;
				}
			});
			if (var2 == "temp") {
				yLabel = "CRAC Supply Temperature (°C)";
			} else {
				yLabel = "RDHx Pressure (psi)";
			}
		}
		
		var maxval = d3.max(data, function(d) { return d[var2]; });
		var minval = d3.min(data, function(d) { return d[var2]; });
		
		/* 
			Remember that x and y are 2 scale functions defined at the beginning. After getting max and min
			we can define their domains below.
		*/
        var max = d3.max(data, function(d) {
            return Math.max(d[var2], d["custom"+var2]);
        });
        var min = d3.min(data, function(d) {
            return Math.min(d[var2], d["custom"+var2]);
        });
        max += 2;
        min -= 2;
        x.domain(d3.extent(data, function(d) {
            return d[var1];
        }));
        y.domain(d3.extent([max, min]));
		
		// ###################### Adding 4 axis ###########################
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", width / 2 + 50)
            .attr("dy", "1.8em")
            .classed("axis-label", true)
            .style("text-anchor", "end")
            .text(xLabel);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2 + 100 * (yLabel.length/18))
            .attr("y", 6)
            .attr("dy", "-1.5em")
            .classed("axis-label", true)
            .style("text-anchor", "end")
            .text(yLabel);

		// Those 2 axis are used as borders
        svg.append("g")
            .attr("class", "x axis fake-border")
            .call(topXAxis);
        svg.append("g")
            .attr("class", "y axis fake-border")
            .attr("transform", "translate(" + width + ", 0)")
            .call(rightYAxis);
	
		// ###################### End of adding 4 axis ###########################
		
        if (!customVar2) {
            return;
        }
		
		var above_color = "lightgreen";
		var below_color = "#FF0000";
		
		if(var2 == "rdhx"){
			above_color = "#FF0000";
			below_color = "lightgreen";
		}
		
		
		if (customVar2 >= minval && customVar2 <= maxval) {
			//temp and pressure require different clip path
			if(var2 == "rdhx"){
				var defs = svg.append('defs');

				defs.append('clipPath')
					.attr('id', 'clip-input')
					.append('path')
					.datum(data)
					.attr('d', areaAboveInputLine);

				defs.append('clipPath')
					.attr('id', 'clip-optimal')
					.append('path')
					.datum(data)
					.attr('d', areaAboveOptimalLine);
			  
				// Input IS ABOVE optimal
				svg.append('path')
					.datum(data)
					.attr('d', areaBelowInputLine)
					.attr('clip-path', 'url(#clip-optimal)')
					.attr("fill", below_color)

				// Optimal IS ABOVE input
				svg.append('path')
					.datum(data)
					.attr('d', areaBelowOptimalLine)
					.attr('clip-path', 'url(#clip-input)')
					.attr("fill", above_color)
			} else {
				var defs = svg.append('defs');

				defs.append('clipPath')
					.attr('id', 'clip-input1')
					.append('path')
					.datum(data)
					.attr('d', areaAboveInputLine);

				defs.append('clipPath')
					.attr('id', 'clip-optimal1')
					.append('path')
					.datum(data)
					.attr('d', areaAboveOptimalLine);
			  
				// Input IS ABOVE optimal
				svg.append('path')
					.datum(data)
					.attr('d', areaBelowInputLine)
					.attr('clip-path', 'url(#clip-optimal1)')
					.attr("fill", below_color)

				// Optimal IS ABOVE input
				svg.append('path')
					.datum(data)
					.attr('d', areaBelowOptimalLine)
					.attr('clip-path', 'url(#clip-input1)')
					.attr("fill", above_color)
			}
		} else {
			// No crossing
			svg.append("path")
				.datum(data)
				.attr("class", "area")
				.attr("d", area)
				.attr("fill", "lightgreen") 
		}
        
		if (customVar2 >= minval && var2 == "temp") { //temp too high
			svg.append("text")
				.attr("font-size", 25)
				.attr("fill", "red")
				.attr("transform", "translate(" + (55) + "," + (320) + ")")
				.text("Temperature too high! ");
		} else if (customVar2 <= maxval && var2 == "rdhx") { //pressure too low
			svg.append("text")
				.attr("font-size", 25)
				.attr("fill", "red")
				.attr("transform", "translate(" + (55) + "," + (320) + ")")
				.text("Pressure too low! ");
		
		}
		
        //--------optimal (chaging line)-----------
        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line)
            .attr("data-legend", function(d) { d.name })
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 2);
            
        //--------peak (straight line)-----------
		svg.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", customLine)
			.attr("legend", "Peak")
			.attr("fill", "none")
			.attr("stroke", "red")
			.attr("stroke-width", 2);
		

		// ###################### Adding Legend ###########################
		// Legend is a text message with a line indicating the color of the line
        svg.append("line")
            .classed("legend-line", true)
            .attr("x1", width - 175)
            .attr("y1", height + 35)
            .attr("x2", width - 150)
            .attr("y2", height + 35)            
            .attr("stroke", "red")
            .attr("stroke-width", 2);
		
		// the text for the red line
		svg.append("text")
			.attr("x", width - 145)
			.attr("y", height + 40)
			.text("Input");

        svg.append("line")
            .classed("legend-line", true)
            .attr("x1", width - 105)
            .attr("y1", height + 35)
            .attr("x2", width - 80)
            .attr("y2", height + 35)            
            .attr("stroke", "blue")
            .attr("stroke-width", 2);

		// the text for the blue line
        svg.append("text")
            .attr("x", width - 75)
            .attr("y", height + 40)
            .text("Optimal");
    });
}

// This is for temp graph
function generateCostSavingChart() {
    var workload = $("#form-data").attr("workload");
	
	var width = 260;
	var height = 260;
	var radius = 130; 
	var donutWidth = 25;
	var legendRectSize = 18;                                   
	var legendSpacing = 4;                                     
	var color = d3.scale.category20();
	
	var tooltip = d3.select('#area1')                                
		.append('div')                                                 
		.attr('class', 'tooltip');                                     
					  
	tooltip.append('div')                                            
		.attr('class', 'label');                                       
	 
	tooltip.append('div')                                            
		.attr('class', 'count');                                       

	tooltip.append('div')                                            
		.attr('class', 'percent');         
		
    d3.csv("setpoints/" + workload + ".csv", function(error, data) {
        var standardTemp = $("#form-data").attr("temp");
		
		//If needed, change user input back to C, because later calculation assume unit of C
		if ($("#form-data").attr("tempType") == "f") {
			standardTemp = (standardTemp - 32) * 5/9;
		}
        var money = $("#form-data").attr("money");
        var tempAvg = 0,
            tempCount = 0,
            tempCapacityAvg = 0;
        data.forEach(function(d) {
            d["time"] = +d["time"];
            if (d["temp"]) {
				d["temp"] = +d["temp"];
				tempCapacityAvg += (d["temp"] - standardTemp) * 0.03;
				tempAvg += (d["temp"] - standardTemp) * 0.02;
                tempCount++;
            }
        });
        var actualTempCost = tempAvg / tempCount,
            actualTempCapacity = tempCapacityAvg / tempCount;
            // actualRdhxCost = 1 - rdhxAvg / rdhxCount;

        var actualData = [actualTempCost, actualTempCapacity];
        var baseline = [1, 1];
        var labels = ["CRAC Cost Saving", "CRAC Capacity Improvement"];

		
		// for drawing the pie chart
		var dataset = [
		  { label: 'Saving', count: Math.round(actualTempCost * 10000) / 100 }, 
		  { label: 'Payed', count: 100 -  Math.round(actualTempCost * 10000) / 100},
		];
		
		// Yearly cost saving
		var total_cost_saving = Math.round(140 * actualTempCost * money * $("#form-data").attr("crac_no") * 100 * 24 * 365/100);
		var capacity_imporvement = Math.round(actualTempCapacity * 10000) / 100;
		
		//------If the lines cross, Do not draw the graph-------
		var minval = d3.min(data, function(d) { return d["temp"]; });
		
		var svg = d3.select("#area1").append("svg")
			.attr("width", width)
			.attr("height", height+50)
			.append("g")
			.attr("transform", "translate(" + (width/2) + "," + (height/2 + 50) + ")");
			
		var arc = d3.svg.arc()
			.innerRadius(radius - donutWidth)   
			.outerRadius(radius);
		
		var pie = d3.layout.pie()
			.value(function(d) { return d.count; })
			.sort(null);	
			
		svg.append("circle")
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", radius)
			.attr("fill", "#ffffcc"); //ffffcc
		
		// Draw a cross to warn user
		if (standardTemp >= minval) {
			 svg.append("line")
			 .attr("x1", -75)
			 .attr("y1", -75)
			 .attr("x2", 75)
			 .attr("y2", 75)
			 .attr("stroke-width", 7.5)
             .attr("stroke", "red");
			 
			 svg.append("line")
			 .attr("x1", 75)
			 .attr("y1", -75)
			 .attr("x2", -75)
			 .attr("y2", 75)
			 .attr("stroke-width", 7.5)
             .attr("stroke", "red");
		} else {
			// Show improvement number
			var svg2 = d3.select("#area3").append("svg")
			.attr("width", width+40)
			.attr("height", height + 50)
			.append("g")
			.attr("transform", "translate(" + (width/2) + "," + (height/2 + 50) + ")");
		
			var arc2 = d3.svg.arc()
			.innerRadius(radius - donutWidth)   
			.outerRadius(radius);
		
			svg2.append("circle")
				.attr("cx", 0)
				.attr("cy", 0)
				.attr("r", radius)
				.attr("fill", "#ffffcc"); //ffffcc
			
			var dataset2 = [
			  { label: 'Improve Percent', count: Math.round(actualTempCapacity * 10000 / 100) },
			  { label: 'trash', count: 100 - Math.round(actualTempCapacity * 10000 / 100) }
			];
			
			var path2 = svg2.selectAll('path')
				.data(pie(dataset2))
				.enter()
				.append('path')
				.attr('d', arc)
				.attr('fill', function(d, i) { 
					return color(d.data.label);
				});
			
			path2.on('mouseover', function(d) {                             
				tooltip.select('.label').html(d.data.label + ":");                 
				tooltip.select('.count').html(d3.round(d.data.count, 2) + "%");   
				if (d.data.label != "trash"){
					tooltip.style('display', 'block');  
				}                         
			});                                                            
			  
			path2.on('mouseout', function() {                               
				tooltip.style('display', 'none');                            
			});   
			
			path2.on('mousemove', function(d) {                             
				tooltip.style('top', (d3.event.pageY + 10) + 'px')           
					.style('left', (d3.event.pageX + 10) + 'px');              
			});
		
			//------------ Improvement Title -------------------
			svg2.append("text")
				.attr("font-size", 30)
				.attr("fill", "green")
				.attr("transform", "translate(" + (-131) + "," + (-150) + ")")
				.text("Capacity Improvement");
			
			svg2.append("text")
				.attr("font-size", 40)
				.attr("fill", "green")
				.attr("transform", "translate(" + (-55) + "," + (10) + ")")
				.text(capacity_imporvement + "%");
		}
		
		//------------ Path tooltips ----------------------	
		var path = svg.selectAll('path')
			.data(pie(dataset))
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill', function(d, i) { 
				return color(d.data.label);
			});
		
		path.on('mouseover', function(d) {                             
			tooltip.select('.label').html(d.data.label + ":");                 
			tooltip.select('.count').html(d3.round(d.data.count, 2) + "%");   
			tooltip.style('display', 'block');                           
		});                                                            
		  
		path.on('mouseout', function() {                               
			tooltip.style('display', 'none');                            
		});   
		
		path.on('mousemove', function(d) {                             
			tooltip.style('top', (d3.event.pageY + 10) + 'px')           
				.style('left', (d3.event.pageX + 10) + 'px');              
		});
		
		//------------ Title -------------------
		svg.append("text")
			.attr("font-size", 35)
			.attr("fill", "green")
			.attr("transform", "translate(" + (-80) + "," + (-150) + ")")
			.text("Cost Saving");
			
		//------------- Show cost saving tooltips and percentage ---------------------
		svg.append("text")
			.attr("font-size", 40)
			.attr("fill", "green")
			.attr("transform", "translate(" + (-50) + "," + (-20) + ")")
			.text(Math.round(actualTempCost * 10000) / 100+"%")
			.on('mouseover', function(d){  
				tooltip.select('.label').html("Yearly Saving Percentage");
				tooltip.select('.count').html("");
				tooltip.style('display', 'block');    
			})
			.on('mouseout', function(d){
				tooltip.style('display', 'none');   
			})
			.on('mousemove', function(d){
				tooltip.style('top', (d3.event.pageY + 10) + 'px')           
				.style('left', (d3.event.pageX + 10) + 'px'); 
			});
			
		svg.append("text")
			.attr("font-size", 35)
			.attr("fill", "green")
			.attr("transform", "translate(" + (-50) + "," + (20) + ")")
			.text("$" + total_cost_saving)
			.on('mouseover', function(d){  
				tooltip.select('.label').html("Yearly Cost Saving");
				tooltip.select('.count').html("");
				tooltip.style('display', 'block');    
			})
			.on('mouseout', function(d){
				tooltip.style('display', 'none');   
			})
			.on('mousemove', function(d){
				tooltip.style('top', (d3.event.pageY + 10) + 'px')           
				.style('left', (d3.event.pageX + 10) + 'px'); 
			});                                                             
    })
}

// This is for rdhx graph
function generateCapacityChart() {
    var workload = $("#form-data").attr("workload");                              
	
	var width = 260;
	var height = 260;
	var radius = 130; 
	var donutWidth = 25;
	var legendRectSize = 18;                                   
	var legendSpacing = 4;                                     
	var color = d3.scale.category20();
	
	var svg = d3.select("#area4").append("svg")
		.attr("width", width)
		.attr("height", height + 50)
		.append("g")
		.attr("transform", "translate(" + (width/2) + "," + (height/2+50) + ")");

	var arc = d3.svg.arc()
		.innerRadius(radius - donutWidth)   
		.outerRadius(radius);
	
	svg.append("circle")
		.attr("cx", 0)
		.attr("cy", 0)
		.attr("r", radius)
		.attr("fill", "#ffffcc"); //ffffcc
	
	var pie = d3.layout.pie()
		.value(function(d) { return d.count; })
		.sort(null);	
		
	var tooltip = d3.select('#area1')                                
		.append('div')                                                 
		.attr('class', 'tooltip');                                     
				  
	tooltip.append('div')                                            
		.attr('class', 'label');                                       
	 
	tooltip.append('div')                                            
		.attr('class', 'count');                                       

	tooltip.append('div')                                            
		.attr('class', 'percent');           
		
    d3.csv("setpoints/" + workload + ".csv", function(error, data) {
        var standardRdhx = $("#form-data").attr("rdhx");
		
		if($("#form-data").attr("pressureType") == "kpa"){
			standardRdhx = standardRdhx * 0.145037738;
		}
		
        var money = $("#form-data").attr("money");
        var rdhxCount = 0,
            rdhxCostAvg = 0,
            rdhxCapacityAvg = 0;
        data.forEach(function(d) {
            d["time"] = +d["time"];
            if (d["rdhx"]) {
                d["rdhx"] = +d["rdhx"];
                rdhxCostAvg += (1 - Math.pow(d["rdhx"],2)/Math.pow(standardRdhx,2));
                rdhxCapacityAvg += 1/(d["rdhx"]/standardRdhx);
                rdhxCount++;
            }
        });
		
        var rdhxCostAvg = rdhxCostAvg / rdhxCount,
            actualRdhxCapacity = rdhxCapacityAvg / rdhxCount;

        var actualData = [rdhxCostAvg, actualRdhxCapacity];
        var baseline = [1, 1];
        var labels = ["RDHx Cost Saving", "RDHx Capacity Improvement"];


		// for drawing the pie chart
		var dataset = [
		  { label: 'Saving', count: Math.round(rdhxCostAvg * 10000) / 100 },
		  { label: 'Payed', count: 100 - Math.round(rdhxCostAvg * 10000) / 100 }
		];
		
		var total_cost_saving = Math.round(20 * rdhxCostAvg * money*100 * 24 * 365/100);
		var capacity_imporvement = Math.round(actualRdhxCapacity * 10000) / 100;
		
		//------If the lines cross, Do not draw the graph-------
		var maxval = d3.max(data, function(d) { return d["rdhx"]; });
		
		// Draw a cross to warn user
		if (standardRdhx <= maxval) {
			 svg.append("line")
			 .attr("x1", -75)
			 .attr("y1", -75)
			 .attr("x2", 75)
			 .attr("y2", 75)
			 .attr("stroke-width", 7.5)
             .attr("stroke", "red");
			 
			 svg.append("line")
			 .attr("x1", 75)
			 .attr("y1", -75)
			 .attr("x2", -75)
			 .attr("y2", 75)
			 .attr("stroke-width", 7.5)
             .attr("stroke", "red");
		} else {
			// Show improvement number
			var svg2 = d3.select("#area6").append("svg")
			.attr("width", width + 40)
			.attr("height", height + 50)
			.append("g")
			.attr("transform", "translate(" + (width/2) + "," + (height/2 + 50) + ")");
		
			var arc2 = d3.svg.arc()
			.innerRadius(radius - donutWidth)   
			.outerRadius(radius);
		
			svg2.append("circle")
				.attr("cx", 0)
				.attr("cy", 0)
				.attr("r", radius)
				.attr("fill", "#ffffcc"); //ffffcc
			
			var num = 0;
			if ((Math.round(actualRdhxCapacity * 10000) / 100) > 100) {
				num = 0;
			} else {
				num = 100 - Math.round(actualRdhxCapacity * 10000) / 100
			}
			var dataset2 = [
			  { label: 'Improve Percent', count: Math.round(actualRdhxCapacity * 10000 / 100) }, 
			  { label: 'Filling', count: num },
			];
			
			var path2 = svg2.selectAll('path')
				.data(pie(dataset2))
				.enter()
				.append('path')
				.attr('d', arc)
				.attr('fill', function(d, i) { 
					return color(d.data.label);
				});
			
			path2.on('mouseover', function(d) {                             
				tooltip.select('.label').html(d.data.label + ":");                 
				tooltip.select('.count').html(d3.round(d.data.count, 2) + "%");   
				if(d.data.label == "Improve Percent"){
					tooltip.style('display', 'block');
				}                        
			});                                                            
			  
			path2.on('mouseout', function() {                               
				tooltip.style('display', 'none');                            
			});   
			
			path2.on('mousemove', function(d) {                             
				tooltip.style('top', (d3.event.pageY + 10) + 'px')           
					.style('left', (d3.event.pageX + 10) + 'px');              
			});
		
			//------------ Improvement Title -------------------
			svg2.append("text")
				.attr("font-size", 30)
				.attr("fill", "green")
				.attr("transform", "translate(" + (-131) + "," + (-150) + ")")
				.text("Capacity Improvement");
			
			svg2.append("text")
				.attr("font-size", 40)
				.attr("fill", "green")
				.attr("transform", "translate(" + (-55) + "," + (10) + ")")
				.text(capacity_imporvement + "%");
		}
		
		//------------ Title -------------------
		svg.append("text")
			.attr("font-size", 35)
			.attr("fill", "green")
			.attr("transform", "translate(" + (-80) + "," + (-150) + ")")
			.text("Cost Saving");
			
		//Show cost saving tooltips	
		var path = svg.selectAll('path')
			.data(pie(dataset))
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill', function(d, i) { 
				return color(d.data.label);
			});
		
		path.on('mouseover', function(d) {            
            tooltip.select('.label').html(d.data.label + ":");                 
            tooltip.select('.count').html(d3.round(d.data.count, 2) + "%");   
			tooltip.style('display', 'block');                           
        });                                                            
          
		path.on('mouseout', function() {                               
			tooltip.style('display', 'none');                            
		});   
  
		path.on('mousemove', function(d) {                             
			tooltip.style('top', (d3.event.pageY + 10) + 'px')           
				.style('left', (d3.event.pageX + 10) + 'px');              
		});                          
  
		//------------- Show cost saving tooltips and percentage ---------------------
		svg.append("text")
			.attr("font-size", 40)
			.attr("fill", "green")
			.attr("transform", "translate(" + (-50) + "," + (-20) + ")")
			.text( Math.round(rdhxCostAvg * 10000) / 100+"%")
			.on('mouseover', function(d){  
				tooltip.select('.label').html("Saving Percentage");
				tooltip.select('.count').html("");
				tooltip.style('display', 'block');    
			})
			.on('mouseout', function(d){
				tooltip.style('display', 'none');   
			})
			.on('mousemove', function(d){
				tooltip.style('top', (d3.event.pageY + 10) + 'px')           
				.style('left', (d3.event.pageX + 10) + 'px'); 
			});
			
		svg.append("text")
			.attr("font-size", 35)
			.attr("fill", "green")
			.attr("transform", "translate(" + (-50) + "," + (20) + ")")
			.text("$" + total_cost_saving)
			.on('mouseover', function(d){  
				tooltip.select('.label').html("Yearly Cost Saving");
				tooltip.select('.count').html("");
				tooltip.style('display', 'block');    
			})
			.on('mouseout', function(d){
				tooltip.style('display', 'none');   
			})
			.on('mousemove', function(d){
				tooltip.style('top', (d3.event.pageY + 10) + 'px')           
				.style('left', (d3.event.pageX + 10) + 'px'); 
			});          
    })
}

// Only show graph when there is CRAC unit
if ($("#form-data").attr("crac_no") > 0) {
		generateChart("time", "temp");
		generateCostSavingChart();
}

// Only show graph when there is RDHx unit
if ($("#form-data").attr("rdhx_no") == "Yes") {
		generateChart("time", "rdhx");
		generateCapacityChart(); // for rdhx
}