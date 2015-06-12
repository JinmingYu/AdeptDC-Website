function generateChart(var1, var2, xLabel, yLabel) {
    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(0)
        .tickFormat(d3.format(",.0f"));

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
        .y(function(d) {
            return y(d["custom"+var2]);
        })
        .interpolate("basis");

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right + 20)
        .attr("height", height + margin.top + margin.bottom + 20)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var workload = $("#form-data").attr("workload");
    d3.csv("setpoints/" + workload + ".csv", function(error, data) {
        var customVar2 = $("#form-data").attr(var2);

        data.forEach(function(d) {
            d[var1] = +d[var1];
            if (d[var2]) {
                d[var2] = +d[var2];
            } else {
                d[var2] = 0;
            }
            if (customVar2) {
                d["custom"+var2] = +customVar2;
            } else {
                d["custom"+var2] = 0;
            }
        });

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
            .attr("x", -height / 2 + 100)
            .attr("y", 6)
            .attr("dy", "-1.5em")
            .classed("axis-label", true)
            .style("text-anchor", "end")
            .text(yLabel);

        svg.append("g")
            .attr("class", "x axis fake-border")
            .call(topXAxis);
        svg.append("g")
            .attr("class", "y axis fake-border")
            .attr("transform", "translate(" + width + ", 0)")
            .call(rightYAxis);

        //------optimal-----------
        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line)
            .attr("data-legend", "Optimal")
            .attr("fill", "none")
            .attr("stroke", "blue");
      
            
        //------peak-----------

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", customLine)
            .attr("legend", "Peak")
            .attr("fill", "none")
            .attr("stroke", "red");
            
         

    });
}

function generateCostSavingChart() {
    var workload = $("#form-data").attr("workload");
    d3.csv("setpoints/" + workload + ".csv", function(error, data) {
        var standardTemp = $("#form-data").attr("temp");
        var standardRdhx = $("#form-data").attr("rdhx");
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

        // ----------drawing svg-------------
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right + 20)
            .attr("height", height + margin.top + margin.bottom + 20)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var x = d3.scale.linear()
            .range([0, width]);
        var xAxis = d3.svg.axis()
            .scale(x)
            .tickSize(0)
            .orient("bottom")
            .tickFormat("");
        var y = d3.scale.linear()
            .range([height, 0])
            .domain(d3.extent([Math.max(1.2, d3.max(actualData)), 0]));
        var yAxis = d3.svg.axis()
            .scale(y)
            .tickSize(0)
            .orient("left")
            .tickFormat(d3.format(".0%"));
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        svg.append("g")
            .attr("class", "y axis")
            // .attr("transform", "translate(0," + height + ")")
            .call(yAxis);

    //-----------draw baseline-----------
        // svg.selectAll(".baseline")
        //     .data(baseline)
        //     .enter()
        //     .append("rect")
        //     .classed("baseline", true)
        //     .attr("x", function(value, index){return index * 100 + (index+1) * 30})
        //     .attr("y", function(d){return y(d)})
        //     .attr("width", 50)
        //     .attr("height", function(d){return height-y(d)})
        //     .attr("fill", "#7f7f7f");
    // ---------finish draw baseline-----------

        svg.selectAll(".actual")
            .data(actualData)
            .enter()
            .append("rect")
            .classed("actual", true)
            .attr("x", function(value, index){return index * 200 + (index+1) * 30})
            .attr("y", function(d){return y(d)})
            .attr("width", 50)
            .attr("height", function(d) {
                return height - y(d);
                // if (d < 1) {
                //     return height - y(d);
                // } else {
                //     return height - y(d-1);
                // }
            })
            .attr("fill", function(value, index) {
                return index ? "#ABCDEF" : "#009933";
            });

        svg.selectAll(".increase")
            .data(actualData)
            .enter()
            .append("text")
            .attr("font-size", 20)
            .classed("increase", true)
            .attr("x", function(value, index){return index * 200 + (index+1) * 30})
            .attr("y", function(d){return y(d) - 5})
            .text(function(d){return  Math.round(d * 10000) / 100 + "%"});

        // svg.append("line")
        //     .attr("x1", 0)
        //     .attr("y1", y(1))
        //     .attr("x2", width)
        //     .attr("y2", y(1))
        //     .attr("stroke-width", 2)
        //     .attr("stroke", "black");

        svg.selectAll(".labelText")
            .data(labels)
            .enter()
            .append("text")
            .attr("x", function(value, index){return index * 200 + (index+1) * 30})
            .attr("y", height + 50)
            .attr("dy", "-1.5em")
            .text(function(d){return d});

// cost saving
        svg.append("rect")
            .classed("cost-saving", true)
            .attr("x", width - 175)
            .attr("y", 50)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", "#009933");
        svg.append("text")
            .attr("x", width - 200)
            .attr("y", 85)
            .text("CRAC Cost Saving: $" + Math.round(140 * actualTempCost * money * 100 * 24 * 365)/100);

    })
}

function generateCapacityChart() {
    var workload = $("#form-data").attr("workload");
    d3.csv("setpoints/" + workload + ".csv", function(error, data) {
        var standardTemp = $("#form-data").attr("temp");
        var standardRdhx = $("#form-data").attr("rdhx");
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

        // ----------drawing svg-------------
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right + 20)
            .attr("height", height + margin.top + margin.bottom + 20)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var x = d3.scale.linear()
            .range([0, width]);
        var xAxis = d3.svg.axis()
            .scale(x)
            .tickSize(0)
            .orient("bottom")
            .tickFormat("");
        var y = d3.scale.linear()
            .range([height, 0])
            .domain(d3.extent([Math.max(1.2, d3.max(actualData)), 0]));
        var yAxis = d3.svg.axis()
            .scale(y)
            .tickSize(0)
            .orient("left")
            .tickFormat(d3.format(".0%"));
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        svg.append("g")
            .attr("class", "y axis")
            // .attr("transform", "translate(0," + height + ")")
            .call(yAxis);

    //-----------draw baseline-----------
        // svg.selectAll(".baseline")
        //     .data(baseline)
        //     .enter()
        //     .append("rect")
        //     .classed("baseline", true)
        //     .attr("x", function(value, index){return index * 100 + (index+1) * 30})
        //     .attr("y", function(d){return y(d)})
        //     .attr("width", 50)
        //     .attr("height", function(d){return height-y(d)})
        //     .attr("fill", "#7f7f7f");
    // ---------finish draw baseline-----------

        svg.selectAll(".actual")
            .data(actualData)
            .enter()
            .append("rect")
            .classed("actual", true)
            .attr("x", function(value, index){return index * 200 + (index+1) * 30})
            .attr("y", function(d){return y(d)})
            .attr("width", 50)
            .attr("height", function(d) {
                return height - y(d);
                // if (d < 1) {
                //     return height - y(d);
                // } else {
                //     return height - y(d-1);
                // }
            })
            .attr("fill", function(value, index) {
                return index ? "#ABCDEF" : "#009933";
            });

        svg.selectAll(".increase")
            .data(actualData)
            .enter()
            .append("text")  
            .attr("font-size", 20)
            .classed("increase", true)
            .attr("x", function(value, index){return index * 200 + (index+1) * 30})
            .attr("y", function(d){return y(d) - 5})
            .text(function(d){return  Math.round(d * 10000) / 100 + "%"});

        // svg.append("line")
        //     .attr("x1", 0)
        //     .attr("y1", y(1))
        //     .attr("x2", width)
        //     .attr("y2", y(1))
        //     .attr("stroke-width", 2)
        //     .attr("stroke", "black");

        svg.selectAll(".labelText")
            .data(labels)
            .enter()
            .append("text")
            .attr("x", function(value, index){return index * 200 + (index+1) * 30})
            .attr("y", height + 50)
            .attr("dy", "-1.5em")
            .text(function(d){return d});

// cost saving
        svg.append("rect")
            .classed("cost-saving", true)
            .attr("x", width - 175)
            .attr("y", 50)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", "#009933");
        svg.append("text")
            .attr("x", width - 200)
            .attr("y", 85)
            .text("RDHx Cost Saving: $" + Math.round(20 * rdhxCostAvg * money*100 * 24 * 365)/100);


    })
}
generateChart("time", "temp", "Time (s)", "CRAC Supply Temperature (°C)");
generateChart("time", "rdhx", "Time (s)", "RDHx Pressure (psi)");
document.write('hi');  

generateCostSavingChart();
generateCapacityChart();
