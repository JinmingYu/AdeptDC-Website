<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
    <style type="text/css">
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
    </style>
</head>
<body>
    <div id="form-data" style="display: none;"
    <?php 
        //$handle = fopen("users.csv", "a");
        //fputcsv($handle, array($_POST["name"], $_POST["email"], $_POST["org"]));
        //fclose($handle);
        echo "workload=".$_POST["workload"]." ";
        echo "temp=".$_POST["temp"]." ";
        echo "rdhx=".$_POST["rdhx"]." ";
        echo "money=".$_POST["money"]." ";
    ?>
    >
    </div>
    <script type="text/javascript" src="view.js"></script>

</body>
</html>