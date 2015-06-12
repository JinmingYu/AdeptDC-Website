<html>
<head>
<script language="JavaScript">
	function alertName() {
		var myName = document.getElementById("myName").value;
		alert('My name is ' . myName);
		}
	google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses'],
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540]
        ]);

        var options = {
          title: 'Company Performance'
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
</script>

</head>

<body onLoad="alertName()">

DataCOOL promotes usage-based operational costing for data centers. It offers two compelling value propositions for data centers:
<ul>
	<li>Reducing server failure rates from CPU overheating without compromising CPU utilization</li>
	<li>Minimizing cooling resource over-provisioning and associated electricity cost</li>
</ul>
<a href="http://datacool.files.wordpress.com/2014/05/datacool_schematic.jpg"><img class="aligncenter size-full wp-image-80" src="http://datacool.files.wordpress.com/2014/05/datacool_schematic.jpg" alt="Datacool_Schematic" width="625" height="315" /></a>

<?php
/* Pulling variables from the form. Making calculations. */
$name = $_POST["Name"];

$cost = $_POST["cost"];
$power = $_POST["power"];
$poe = $_POST["poe"];


?>

<!-- Pulling variables into the HTML for chart display -->
<form name="chart" method="post" action="">
	<input type="text" name="name" id="myName" value="<?php echo $name; ?>">
	Should be alerting the name.<br />

</form>

<div id="chart_div" style="width: 900px; height: 500px;"></div>

</body>
</html>