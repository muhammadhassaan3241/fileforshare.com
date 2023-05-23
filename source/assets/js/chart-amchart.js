
// andriod and IOS pie chart script

'use strict';
$(function () {
  pieChart();
  pieChart2();
  pieChart3();
  pieChart4();
});


// IOS pie Chart

function pieChart() {
  am4core.useTheme(am4themes_animated);

  var chart = am4core.create("pieChart", am4charts.PieChart);

  chart.data = [{
    "mobApp": "IPhone",
    "litres": 65
  }, {
    "mobApp": "IPad",
    "litres": 25
  }, {
    "mobApp": "IPod",
    "litres": 10
  }];


  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "litres";
  pieSeries.dataFields.category = "mobApp";
  pieSeries.labels.template.disabled = true;
  pieSeries.ticks.template.disabled = true;

  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 1.3;
  pieSeries.slices.template.strokeOpacity = 1;
  pieSeries.labels.template.fill = am4core.color("#9aa0ac");

  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;

  chart.legend = new am4charts.Legend();
  chart.legend.itemContainers.template.paddingTop = 2;
  chart.legend.itemContainers.template.paddingBottom = 2;
  chart.legend.position = "right";
  chart.legend.width = "80";
  let markerTemplate = chart.legend.markers.template;
  markerTemplate.width = 10;
  markerTemplate.height = 10;
}






function pieChart2() {
  am4core.useTheme(am4themes_animated);

  var chart = am4core.create("pieChart2", am4charts.PieChart);

  chart.data = [ {
    "mobApp": "14.7.x",
    "litres": 40
  }, {
    "mobApp": "14.6.x",
    "litres": 25
  }, {
    "mobApp": "14.4.x",
    "litres": 10
  }, {
    "mobApp": "12.x",
    "litres": 5
  }, {
    "mobApp": "8.6.x",
    "litres": 6
  }, {
    "mobApp": "6.x",
    "litres": 4
  }, {
    "mobApp": "5.x",
    "litres": 6
  }, {
    "mobApp": "Other",
    "litres": 4
  }];

  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "litres";
  pieSeries.dataFields.category = "mobApp";
  pieSeries.labels.template.disabled = true;
  pieSeries.ticks.template.disabled = true;

  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 1.3;
  pieSeries.slices.template.strokeOpacity = 1;
  pieSeries.labels.template.fill = am4core.color("#9aa0ac");


  pieSeries.colors.list = [
  am4core.color("#845EC2"),
  am4core.color("#D65DB1"),
  am4core.color("#FF6F91"),
  am4core.color("#FF9671"),
  am4core.color("#ffb6c1"),
  am4core.color("#4682b4"),
  am4core.color("#778899"),
  am4core.color("#dda0dd"),
  ];

  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;

  chart.legend = new am4charts.Legend();
  chart.legend.itemContainers.template.paddingTop = 2;
  chart.legend.itemContainers.template.paddingBottom = 2;
  chart.legend.position = "right";
  chart.legend.width = "80";
  let markerTemplate = chart.legend.markers.template;
  markerTemplate.width = 10;
  markerTemplate.height = 10;
}






// Andriod Pie chart

function pieChart3() {
  am4core.useTheme(am4themes_animated);

  var chart = am4core.create("pieChart3", am4charts.PieChart);

  chart.data = [ {
    "mobApp": "Phone",
    "litres": 68
  }, {
    "mobApp": "Phablet",
    "litres": 7
  }, {
    "mobApp": "Tablet",
    "litres": 10
  }, {
    "mobApp": "Other",
    "litres": 15
  }];

  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "litres";
  pieSeries.dataFields.category = "mobApp";
  pieSeries.labels.template.disabled = true;
  pieSeries.ticks.template.disabled = true;

  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 1.3;
  pieSeries.slices.template.strokeOpacity = 1;
  pieSeries.labels.template.fill = am4core.color("#9aa0ac");

  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;

  chart.legend = new am4charts.Legend();
  chart.legend.itemContainers.template.paddingTop = 2;
  chart.legend.itemContainers.template.paddingBottom = 2;
  chart.legend.position = "right";
  chart.legend.width = "80";
  let markerTemplate = chart.legend.markers.template;
  markerTemplate.width = 10;
  markerTemplate.height = 10;


}




function pieChart4() {
  am4core.useTheme(am4themes_animated);

  var chart = am4core.create("pieChart4", am4charts.PieChart);

  chart.data = [ {
    "mobApp": "11.x",
    "litres": 40
  }, {
    "mobApp": "10.x",
    "litres": 25
  }, {
    "mobApp": "9.x",
    "litres": 10
  }, {
    "mobApp": "8.x",
    "litres": 5
  }, {
    "mobApp": "7.x",
    "litres": 6
  }, {
    "mobApp": "6.x",
    "litres": 4
  }, {
    "mobApp": "5.x",
    "litres": 6
  }, {
    "mobApp": "Other",
    "litres": 4
  }];

  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "litres";
  pieSeries.dataFields.category = "mobApp";
  pieSeries.labels.template.disabled = true;
  pieSeries.ticks.template.disabled = true;
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 1.3;
  pieSeries.slices.template.strokeOpacity = 1;

  pieSeries.colors.list = [
    am4core.color("#845EC2"),
    am4core.color("#D65DB1"),
    am4core.color("#FF6F91"),
    am4core.color("#FF9671"),
    am4core.color("#ffb6c1"),
    am4core.color("#4682b4"),
    am4core.color("#778899"),
    am4core.color("#dda0dd"),
  ];
  
  chart.legend = new am4charts.Legend();
  chart.legend.itemContainers.template.paddingTop = 2;
  chart.legend.itemContainers.template.paddingBottom = 2;
  chart.legend.position = "right";
  chart.legend.width = "80";

  let markerTemplate = chart.legend.markers.template;
  markerTemplate.width = 8;
  markerTemplate.height = 8;
  valueLabels.template.align = "left";
  valueLabels.template.textAlign = "start";

  chart.legend.itemContainers.template.togglable = false;
  chart.legend.itemContainers.template.events.on("hit", function(ev) {
    var slice = ev.target.dataItem.dataContext.slice;
    pieSeries.slices.each(function(item) {
      if (item != slice) {
        item.isActive = false;
      }
      else {
        slice.isActive = !slice.isActive;
      }
    });
  });
}

