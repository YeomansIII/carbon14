src = "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
src = "Chart.min.js";

var data = null;
var options = null;
var ctx;

function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}

function graph(a0,at,t) {

//Get context with jQuery - using jQuery's .get() method.


    var labelt;
    
    var r = 0;
    
     if(t<=50) {
        labelt = new Array(parseInt((t/1),10));
        for(var x=0;x<(t/1);x++) {
            labelt[x] = r;
            r = r+1;
        }
    }
    else if(t>50 && t<=300) {
        labelt = new Array(parseInt((t/10),10));
        for(var x=0;x<(t/10);x++) {
            labelt[x] = r;
            r = r+10;
        }
    }
    else if(t>300 && t<7000) {
        labelt = new Array(parseInt((t/100),10));
        for(var x=0;x<(t/100);x++) {
            labelt[x] = r;
            r = r+100;
        }
    }
    else if(t>=7000) {
        labelt = new Array(parseInt((t/1000),10));
        for(var x=0;x<(t/1000);x++) {
            labelt[x] = r;
            r = r+1000;
        }
    }
    //labelt[labelt.length] = t;
    
    var dataAt = [];
    
    for(var y=0;y<=labelt.length;y++) {
        dataAt[y] = a0*(Math.pow(2,((-(labelt[y]))/5730)));
    }
    //dataAt[labelt.length] = a0*(Math.pow(2,((-(t))/5730)));
    
    data = {
        labels : labelt,
        datasets : [
            {
                fillColor : "rgba(210,210,210,0.5)",
                strokeColor : "rgba(190,190,190,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                data : dataAt
            }
        ]
    };
    
    options =  {
				
    //Boolean - If we show the scale above the chart data			
    scaleOverlay : false,
    
    //Boolean - If we want to override with a hard coded scale
    scaleOverride : false,
    
    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps : null,
    //Number - The value jump in the hard coded scale
    scaleStepWidth : null,
    //Number - The scale starting value
    scaleStartValue : null,
    
    //String - Colour of the scale line	
    scaleLineColor : "rgba(0,0,0,.1)",

    //Number - Pixel width of the scale line	
    scaleLineWidth : 1,
    
    //Boolean - Whether to show labels on the scale	
    scaleShowLabels : true,

    //Interpolated JS string - can access value
    scaleLabel : "<%=value%>",
	
    //String - Scale label font declaration for the scale label
    scaleFontFamily : "'Arial'",
	
    //Number - Scale label font size in pixels	
    scaleFontSize : 12,

    //String - Scale label font weight style	
    scaleFontStyle : "normal",

    //String - Scale label font colour	
    scaleFontColor : "#666",	

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,	

    //Boolean - Whether the line is curved between points
    bezierCurve : false,

    //Boolean - Whether to show a dot for each point
    pointDot : false,
    
    //Number - Radius of each point dot in pixels
    pointDotRadius : 3,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 3,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //Boolean - Whether to animate the chart
    animation : true,
    
    //Number - Number of animation steps
    animationSteps : 60,
    
    //String - Animation easing effect
    animationEasing : "easeOutQuart",
    
    //Function - Fires when the animation is complete
    onAnimationComplete : null

    };

new Chart(ctx).Line(data,options);
}

$(document).ready(function () {

 var switchState = false
ctx = $("#myChart").get(0).getContext("2d");
//var myNewChart = new Chart(ctx);

var width = $('canvas').parent().width();
$('canvas').attr("width",width);
var height = $('canvas').parent().height();
$('canvas').attr("height",height);

window.onresize = function(event){
    var width = $('canvas').parent().width();
    $('canvas').attr("width",width);
    var height = $('canvas').parent().height();
    $('canvas').attr("height",height);
    
    if((options!==null)&&(data!==null)) {
        new Chart(ctx).Line(data,options);
    }
};

$("#collapse").click( function () {
    $("#explanation").addClass("collapseEx"); 
    $("#explanation").removeClass("expandEx"); 
});

$("#expand").click( function () {
    $("#explanation").addClass("expandEx"); 
    $("#explanation").removeClass("collapseEx"); 
});

$("#submit").click( function () {

        $("#explanation").addClass("collapseEx"); 
        $("#explanation").removeClass("expandEx"); 
        
       var a0=parseFloat($("#inInitial").val(),10);
       var at=parseFloat($("#inFinal").val(),10);
       var t=parseFloat($("#inTime").val(),10);
        
        log(a0);
        log(at);
        log(t);
        
        if(isNaN(a0)) {
            a0 = at/(Math.pow(2,((-t)/5730)));
            a0 = a0.toFixed(2);
        }
        
        else if(isNaN(at)) {
            at = a0*(Math.pow(2,((-t)/5730)));
            at = at.toFixed(2);
        }
        
        else if(isNaN(t)) {
            t=-5730*((Math.log(at/a0))/(Math.log(2)));
            t = t.toFixed(0);
        }
        
        
        
        //////////
        if($("#calcA0").html().indexOf("%")>=0) {
            $("#calcA0").html(""+a0+"%");
            $("#calcAt").html(""+at+"%");
        }
        else {
            $("#calcA0").html(""+a0);
            $("#calcAt").html(""+at);
        }
            
            $("#calcT").html(""+t+" years");
        
        graph(a0,at,t);
    });

});

