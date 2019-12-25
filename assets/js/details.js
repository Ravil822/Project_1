
//*****************************************************/
//  Generate the charts with actual data
//*************************************************** */

function generateChartData(stock_data) {

    var lastTradingDate = new Date(stock_data[0].date);
    lastTradingDate.setHours(0, 0, 0, 0);


    for (var i = 0; i < stock_data.length; i++) {   // data comes from AIX on a one-minute interval
 
        var newTime=new Date(lastTradingDate);   // Creating the new date using last trading date
        var HrMin=stock_data[i].minute.split(":");
        newTime.setHours(parseInt(HrMin[0]),parseInt(HrMin[1]),0,0);
  
        chartData.push({
            date: newTime,                        // date
            value: stock_data[i].average,         // average price during minute
            volume: stock_data[i].volume          // volume during minute
        });
    }


}  // last line of generateChartData function


//********************************************************************************** */
//  Creates the skeleton for the chart.  Once data is ready, it will be populated
//********************************************************************************** */

function createStockChart() {
    chart = new AmCharts.AmStockChart();

    // As we have minutely data, we should set minPeriod to "mm"
    var categoryAxesSettings = new AmCharts.CategoryAxesSettings();
    categoryAxesSettings.minPeriod = "mm";
    chart.categoryAxesSettings = categoryAxesSettings;

    // DATASETS //////////////////////////////////////////
    var dataSet = new AmCharts.DataSet();
    dataSet.color = "#0b74eb";   // originally "#b0de09"
    dataSet.fieldMappings = [{
        fromField: "value",
        toField: "value"
    }, {
        fromField: "volume",
        toField: "volume"
    }];
    dataSet.dataProvider = chartData;
    dataSet.categoryField = "date";

    // set data sets to the chart
    chart.dataSets = [dataSet];

    // PANELS ///////////////////////////////////////////
    // first stock panel
    var stockPanel1 = new AmCharts.StockPanel();
    stockPanel1.showCategoryAxis = false;
    stockPanel1.title = "Value";
    stockPanel1.percentHeight = 70;

    // graph of first stock panel
    var graph1 = new AmCharts.StockGraph();
    graph1.valueField = "value";
    graph1.type = "smoothedLine";
    graph1.lineThickness = 2;
    graph1.bullet = "round";
    graph1.bulletBorderColor = "#FFFFFF";
    graph1.bulletBorderAlpha = 1;
    graph1.bulletBorderThickness = 3;
    stockPanel1.addStockGraph(graph1);

    // create stock legend
    var stockLegend1 = new AmCharts.StockLegend();
    stockLegend1.valueTextRegular = " ";
    stockLegend1.markerType = "none";
    stockPanel1.stockLegend = stockLegend1;


    // second stock panel
    var stockPanel2 = new AmCharts.StockPanel();
    stockPanel2.title = "Volume";
    stockPanel2.percentHeight = 30;
    var graph2 = new AmCharts.StockGraph();
    graph2.valueField = "volume";
    graph2.type = "column";
    graph2.cornerRadiusTop = 2;
    graph2.fillAlphas = 1;
    stockPanel2.addStockGraph(graph2);

    // create stock legend
    var stockLegend2 = new AmCharts.StockLegend();
    stockLegend2.valueTextRegular = " ";
    stockLegend2.markerType = "none";
    stockPanel2.stockLegend = stockLegend2;

    // set panels to the chart
    chart.panels = [stockPanel1, stockPanel2];


    // OTHER SETTINGS ////////////////////////////////////
    var scrollbarSettings = new AmCharts.ChartScrollbarSettings();
    scrollbarSettings.graph = graph1;
    scrollbarSettings.usePeriod = "10mm"; // this will improve performance
    scrollbarSettings.updateOnReleaseOnly = false;
    scrollbarSettings.position = "top";
    chart.chartScrollbarSettings = scrollbarSettings;

    var cursorSettings = new AmCharts.ChartCursorSettings();
    cursorSettings.valueBalloonsEnabled = true;
    chart.chartCursorSettings = cursorSettings;


    // PERIOD SELECTOR ///////////////////////////////////
    var periodSelector = new AmCharts.PeriodSelector();
    periodSelector.position = "top";
    periodSelector.dateFormat = "YYYY-MM-DD JJ:NN";
    periodSelector.inputFieldWidth = 150;
    periodSelector.periods = [{
        period: "hh",
        count: 1,
        label: "1 hour"
    }, {
        period: "hh",
        count: 2,
        label: "2 hours"
    }, {
        period: "hh",
        count: 5,
        label: "5 hour"
    }, {
        period: "hh",
        count: 12,
        label: "12 hours"
    }, {
        period: "MAX",
        label: "MAX"
    }];
    chart.periodSelector = periodSelector;

    var panelsSettings = new AmCharts.PanelsSettings();
    panelsSettings.mouseWheelZoomEnabled = true;
    panelsSettings.usePrefixes = true;
    chart.panelsSettings = panelsSettings;


    chart.write('chartdiv');
}

//************************************************************************ */
//  The following function responds to the ajax call and orchestrates
//  the creation of an intrad-day chart for the stock selected
//************************************************************************ */

function showtime(idata) {

    generateChartData(idata);
    createStockChart();

}  // end of function showtime


//*************************************************************** */
//  Following function handles API error
//*************************************************************** */

function handles_APIerror(){
    $.confirm({
        title: 'Error',
        content: 'There was an error getting intraday data.  Please try again, or call us back at 1-900-TRD-BOTS',
        type: 'red',   
        buttons: {
                     delete: {text: 'Delete strategy', btnClass: 'btn-red',
                     action: function(){}  }
                  }
    });

}

//********************* */
// main functionality
//********************* */

$("#back").attr("onClick","window.location.href='getstocks.html'");
var chartData = [];
var chart;

// making the AJAX call

var stock_list=[];             // global variable, array that contains stock data
var base_url="https://sandbox.iexapis.com/stable/stock/";  // Live data versus sandbox
var api_token="Tsk_c7a9b5b07a7d4570afb668eccf02054b";      // token
var current_stock=localStorage.getItem("")

// getting the selected stock from local storage, finding it and requesting API information
var stock_selected=localStorage.getItem("selectedStock");
var stock_list=JSON.parse(localStorage.getItem("LSstock_list"));
var sindex=stock_list.map(function(e) {return e.name}).indexOf(stock_selected);
var sTickler=stock_list[sindex].tickler;

// Getting intra-day data from IEX API
var APIquery=base_url+sTickler+"/intraday-prices/adx?range=1m&token="+api_token;
$.ajax({url: APIquery,success: showtime, error: handles_APIerror});