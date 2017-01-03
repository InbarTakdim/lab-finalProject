var myApp = angular.module('myApp',[]);

myApp.run(function($http){
        d3.csv('./data/DBfiles/grades-data.csv',function(dataSet) {
           
            var margin = {top: 40, right: 20, bottom: 30, left: 40},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            
            var x = d3.scaleLinear()
                    .range([0, width]);

            var y = d3.scaleLinear()
                    .range([height, 0]);
            
                x.domain([0, d3.max(dataSet, function(d,i) { return i+1; })]);
                y.domain([0, d3.max(dataSet, function(d) { return d.finalGrade; })]);
            
            var xAxis = d3.axisBottom()
                        .ticks(d3.max(dataSet, function(d,i) { return i+1; }))
                        .scale(x);

            var yAxis = d3.axisLeft().ticks(50)
                        .scale(y);

            var canvas = d3.select("body").select("p")
                        .insert("svg")
                        .attr("width", width + margin.left+10 + margin.right)
                        .attr("height", height + margin.top+10 + margin.bottom)
                        .style("background", "EEEEEE")
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                        .call(yAxis);

                canvas.append("g")
                        .attr("transform", "translate(8," + height + ")")
                        .call(xAxis);

            var div = d3.select("body").append("div")   
                        .attr("class", "tooltip")               
                        .style("opacity", 0);
                
            var circle = canvas.selectAll("circle")
                        .data(dataSet)
                        .enter()
                        .append("circle")
                        .attr("r", 1)
                        .attr("cx", function(ds, i){return(x(i));})
                        .attr("cy", function(ds){return(y(ds.finalGrade));})
                        .on("mouseover", function(d) {      
                            div.transition()        
                                .duration(200)      
                                .style("opacity", .9);      
                            div .html("<h6><b>"+d.firstName +" "+ d.lastName  + "</b></h6>" + "finalGrade: " + d.finalGrade)  
                                .style("left", (d3.event.pageX) + "px")     
                                .style("top", (d3.event.pageY - 28) + "px");    
                            })                  
                        .on("mouseout", function(d) {       
                            div.transition()        
                                .duration(500)      
                                .style("opacity", 0);   
                        })
                        .attr("fill", function(ds){return(d3.interpolateMagma(Math.random()));})
                        .attr("fill-opacity", function(ds, i){return(ds.finalGrade * 0.01)})
                        .transition()
                        .duration(1000)
                        .attr("transform", "translate(10,0)")
                        .transition()
                        .duration(1000)
                        .attr("r", 8);
            //Add lines to dots
            // var line = canvas.selectAll("div")
            //             .data(dataSet)
            //             .enter()
            //             .append("div")
            //             .class("stroke")
            //             .attr("x1", function(ds, i){return(x(i)+20);})
            //             .attr("y1", function(ds){return(y(ds.finalGrade)-10);})
            //             .attr("x2", function(ds, i){return(x(i)+20);})
            //             .attr("y2", 0);
        });
        //not in use. for top menu
        // $( document ).tooltip({
        //     tooltipClass: "custom-tooltip-styling"
        // });
})


// var app = angular.module('slApp', []);
// app.config();
// app.run(function($http){
//     var mainInfo = null;
//     $http.get('./data/F2Cals.json').success(function(data) {
//         mainInfo = data;
//         console.log(data);
//     });
// });
var app = angular.module('slApp', ['ngRoute','angular-svg-round-progressbar']); 
console.log("hi");
// app.value('slApp', 'ngRoute');
// app.value('slApp', 'angular-svg-round-progressbar');
// app.config(
// ['$routeProvider',
//                 function($routeProvider) {
//                   $routeProvider.
//                     when('/add', {
//                       templateUrl: '../test/login.html'
//                     }).
//                     when('/burn', {
//                       templateUrl: '../test/contactus.html'
//                     }).
//                     when('/calc', {
//                         templateUrl: '../test/home.html',
//                         cntroller: 'WGHomeLanCtrl'
//                       }).
//                     otherwise({
//                       redirectTo: 'home.html',
//                       controller: 'WGHomeLanCtrl'
//                     });
//                 }],function($locationProvider) {
//     $locationProvider.html5Mode({
//         enabled: true,
//         requireBase: false
//     });
// });   
                
// app.controller( 'WGHomeLanCtrl', function ( $scope ) {
// });
// app.controller("addCalCtrl", function ($scope) {
//     $scope.msg = "I love London";
// });
// app.controller("burnCalCtrl", function ($scope) {
//     $scope.msg = "I love Paris";
// });


app.controller('progress1',function ($scope, $http, $location) {
    var userName = $location.search().username;
    $scope.abs = function(obj){
        return(Math.abs(obj));
    };
    $scope.checkValue = function(obj){
        if(obj<0)
            return("progress-bar progress-bar-success progress-bar-striped pull-right");
        else if(obj<=30 && obj>0)
            return("progress-bar progress-bar-warning progress-bar-striped pull-right");
        else(obj>30)
            return("progress-bar progress-bar-danger progress-bar-striped pull-right");
    };
    $scope.compare = function(){
        $scope.dayInfo = {
            total:0, 
            burn:0, 
            eat:0
        };
        $scope.chosenDay = $('#day').val();
        $http.get('http://slimizyapp.herokuapp.com/user/gregory').success(function(data){
            var userData = data;
            $scope.day = [];
            data.dailyGraph.forEach(function(obj){
                if(obj.date == $scope.chosenDay){
                    $scope.dayInfo.total += obj.calories;
                    if(obj.calories>=0)
                        $scope.dayInfo.eat += obj.calories;
                    else
                        $scope.dayInfo.burn += Math.abs(obj.calories);
                    $scope.day.push(obj);
                }
            });
        })
        $scope.date = $scope.chosenDay;
        $scope.burn = Math.abs($scope.dayInfo.burn); //insert here burned calories
        $scope.maxBurn = 1000; //insert here max calories per day
        $scope.eat = $scope.dayInfo.eat; //insert here burned calories
        $scope.maxEat = 1600; //insert here max calories per day
    };
    $('#day').val('2016-07-16');
    $scope.compare();
});


$('#day').datepicker({
    beforeShow(){
        $('#mainContainer').addClass('mainContainer');
        $('#floatBG').addClass('floatBG');
    },
    constrainInput: true,
    dateFormat: 'yy-mm-dd',
    altFormat: 'yy-mm-dd',
    navigationAsDateFormat: true,
    onClose(){
        $('#mainContainer').removeClass('mainContainer');
        $('#floatBG').removeClass('floatBG');
    },
    autoSize: true,
});//defualt day



//var carRentalApp = angular.module('slimizylApp',[]);
var app = angular.module('slApp', ['angular-svg-round-progressbar']);
var today = {
    currentBurnCal : 150,
    maxBurnCal : 350,
    currentEatCal : 1250,
    maxEatCal : 1600
};
app.controller('progress1',function ($scope, $http) {
    $scope.current = 50; //insert here burned calories
    $scope.max = 100; //insert here max calories per day
});
app.controller('progress2',function ($scope, $http) {
    $scope.current = 90; //insert here burned calories
    $scope.max = 100; //insert here max calories per day
});
app.controller('test',function($scope, $http){
    $scope.value = 350;
    $scope.max = 3000;
});


jQuery(function($){ 
        $('#day').datepicker({
            beforeShow(){
                $('#mainContainer').addClass('mainContainer');
                $('#floatBG').addClass('floatBG');
            },
            onClose(){
                $('#mainContainer').removeClass('mainContainer');
                $('#floatBG').removeClass('floatBG');
            },
            autoSize: true,
        });
    })
  

// slimizylApp.controller('counterCTRL', function ($scope, $http) {
//     $scope.getAllCars = function(){
//     $http.get("https://ex1part2.herokuapp.com/getallcars").success(function(data){
//             $scope.cars = data; 
//             $scope.warning = function(){
//                 if($scope.cars.length <7 && $scope.cars.length >4)
//                     return "alert-warning";
//                 else if ($scope.cars.length <4)
//                     return "alert-danger";
//             };
//         });
//     }
//     $scope.order = function(){
//                 $scope.cars.pop();
//                 return;
//             };
//     $scope.api= function(){
//         $http.redirect("https://ex1part2.herokuapp.com/api").success(function(data){
//             return(data);
//         });
//     }
//     $scope.getCarById= function(searchText){
//         $scope.cars={};
//         $http.get("https://ex1part2.herokuapp.com/getCarById/"+searchText).success(function(data){
//                 console.log(data);
//                 $scope.cars = data;
//                 });
//     }
//     $scope.getAllCarsByCategory= function(searchText){
//         $scope.cars={};
//         $http.get("https://ex1part2.herokuapp.com/getAllCarsByCategory/"+searchText).success(function(data){
//                 console.log(data);
//                 $scope.cars = data;
//                 });
//     }
// });



