//*****************************************************/
//  Generate the charts with actual data :  Historical
//*************************************************** */

function generateHsChartData(stock_data) {

    for (var i = 0; i < stock_data.length; i++) {   // data comes from AIX on a daily basis
        var newTime=new Date(stock_data[i].date);   // Creating the new date using last trading date
        chartHsData.push({
            date: newTime,                        // date
            value: stock_data[i].close,         // closing price for stock on that day
        });
    }
}  // last line of generateIDChartData function


//********************************************************************************** */
//  Creates the skeleton for the Historical chart.  Once data is ready, it will be populated
//********************************************************************************** */

function createHsStockChart() {
    chartHs = new AmCharts.AmStockChart();

    // DATASETS //////////////////////////////////////////
    var dataSet = new AmCharts.DataSet();
    dataSet.color = "#0b74eb";    // original #b0de09
    dataSet.fieldMappings = [{
        fromField: "value",
        toField: "value"
    }];
    dataSet.dataProvider = chartHsData;
    dataSet.categoryField = "date";

    chartHs.dataSets = [dataSet];

    // PANELS ///////////////////////////////////////////
    var stockPanel = new AmCharts.StockPanel();
    stockPanel.showCategoryAxis = true;
    stockPanel.title = "Value";
    stockPanel.eraseAll = false;
    stockPanel.addLabel(0, 100, "", "center", 16);

    var graph = new AmCharts.StockGraph();
    graph.valueField = "value";
    graph.bullet = "round";
    graph.bulletColor = "#FFFFFF";
    graph.bulletBorderColor = "#00BBCC";
    graph.bulletBorderAlpha = 1;
    graph.bulletBorderThickness = 2;
    graph.bulletSize = 7;
    graph.lineThickness = 2;
    graph.lineColor = "#00BBCC";
    graph.useDataSetColors = false;
    stockPanel.addStockGraph(graph);

    var stockLegend = new AmCharts.StockLegend();
    stockLegend.valueTextRegular = " ";
    stockLegend.markerType = "none";
    stockPanel.stockLegend = stockLegend;
    stockPanel.drawingIconsEnabled = true;

    chartHs.panels = [stockPanel];


    // OTHER SETTINGS ////////////////////////////////////
    var scrollbarSettings = new AmCharts.ChartScrollbarSettings();
    scrollbarSettings.graph = graph;
    scrollbarSettings.updateOnReleaseOnly = false;
    chartHs.chartScrollbarSettings = scrollbarSettings;

    var cursorSettings = new AmCharts.ChartCursorSettings();
    cursorSettings.valueBalloonsEnabled = true;
    chartHs.chartCursorSettings = cursorSettings;

    var panelsSettings = new AmCharts.PanelsSettings();
    panelsSettings.creditsPosition = "bottom-right";
    panelsSettings.marginRight = 16;
    panelsSettings.marginLeft = 16;
    chartHs.panelsSettings = panelsSettings;


    // PERIOD SELECTOR ///////////////////////////////////
    var periodSelector = new AmCharts.PeriodSelector();
    periodSelector.position = "bottom";
    periodSelector.periods = [{
        period: "DD",
        count: 10,
        label: "10 days"
    }, {
        period: "MM",
        count: 1,
        label: "1 month"
    }, {
        period: "YYYY",
        count: 1,
        label: "1 year"
    }, {
        period: "YTD",
        label: "YTD"
    }, {
        period: "MAX",
        label: "MAX"
    }];
    chartHs.periodSelector = periodSelector;
    chartHs.write('charthist');
}

//*****************************************************/
//  Generate the charts with actual data :  IntraDay
//*************************************************** */

function generateIDChartData(stock_data) {

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
}  // last line of generateIDChartData function


//********************************************************************************** */
//  Creates the skeleton for the Intraday chart.  Once data is ready, it will be populated
//********************************************************************************** */

function createIDStockChart() {
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

function showIDchart(idata) {

    //  updating potential trade with the latest stock price
    latest_stock_price=idata[idata.length-1].average;
    var trade_cost=100*latest_stock_price;
    $("#trade-cost").text("Approximate trade cost $"+trade_cost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));

    if (idata.length>0){
        generateIDChartData(idata);
        createIDStockChart(); }
    else {
        $.confirm({
            title: 'No Intraday Data',
            content: 'There is no recorded market activity today.  Either the market has not opened or today is a holiday',
            type: 'red',   
            buttons: {
                         delete: {text: 'Understand', btnClass: 'btn-red',
                         action: function(){}  }
                      }
        });  // Jquery confirm
    }  // if-then-else
}  // end of function showIDChart

//*************************************************************** */
//  Following function handles API error
//*************************************************************** */

function handles_APIerror(data){

    $.confirm({
        title: 'Error',
        content: 'There was an error getting intraday data.  Please try again, or call us back at 1-900-TRD-BOTS',
        type: 'red',   
        buttons: {
                     delete: {text: 'Understand', btnClass: 'btn-red',
                     action: function(){}  }
                  }
    });  // Jquery confirm

}  // end of function handles_APIerror

//************************************************************************ */
//  The following function responds to the ajax call and orchestrates
//  the creation of a historical chart for the stock selected
//************************************************************************ */

function showHschart() {
    var API_response=JSON.parse(localStorage.getItem("API_response"));     // Getting API responses from local storage
    var historical_data=API_response[sindex].chart;                        // data obtained from API response

    if (historical_data.length>0){
        generateHsChartData(historical_data);
        createHsStockChart(); }
    else {
        $.confirm({
            title: 'R001-Internal error',
            content: 'Please try again and if the issue persists, contact us at 1-800-TRD-BOTS and provide us with the code above',
            type: 'red',   
            buttons: {
                         delete: {text: 'Understand', btnClass: 'btn-red',
                         action: function(){}  }
                      }
        });  // Jquery confirm
    }  // if-then-else
}  // end of function showIDChart


//************************************************************************************ */
//  The following function will display a message about trading long
//************************************************************************************ */

function trd_long(){

    // checking the number of shares to trade
    var qty=0;
    if ($("#option1").is(":checked")){qty=100}
    else if($("#option2").is(":checked")){qty=200}
    else if($("#option3").is(":checked")){qty=300}
    else if($("#option4").is(":checked")){qty=400}
    else if($("#option5").is(":checked")){qty=500}
    
    $.confirm({
        title: 'Trading confirmation',
        content: 'Confirmation for trading long '+qty+' shares of '+sTickler+" - "+sName+" at a price of $"+latest_stock_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        type: 'green',   
        buttons: {
                     delete: {text: 'Got it', btnClass: 'btn-green',
                     action: function(){}  }
                  }
    });  // Jquery confirm

}

//************************************************************************************ */
//  The following function will display a message about trading short
//************************************************************************************ */

function trd_short(){

    // checking the number of shares to trade
    var qty=0;
    if ($("#option1").is(":checked")){qty=100}
    else if($("#option2").is(":checked")){qty=200}
    else if($("#option3").is(":checked")){qty=300}
    else if($("#option4").is(":checked")){qty=400}
    else if($("#option5").is(":checked")){qty=500}
    
    $.confirm({
        title: 'Trading confirmation',
        content: 'Confirmation for trading short '+qty+' shares of '+sTickler+" - "+sName+" at a price of $"+latest_stock_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
        type: 'purple',   
        buttons: {
                     delete: {text: 'Got it', btnClass: 'btn-purple',
                     action: function(){}  }
                  }
    });  // Jquery confirm

}

function showNews(response){
 
    localStorage.setItem("news_response",JSON.stringify(response));
    // var response=JSON.parse(localStorage.getItem("news_response"));  

// appends items to table
    for(var i=0;i<response.data.length;i++){
        var newnews=$("<tr>");                                                      // header.  
        var newdate=$("<td>").text(moment(response.data[i].date).format("L"));      // date of article
        var newsent=$("<td>").text(response.data[i].sentiment);                     // sentient of news
        var newtitle=$("<td>").text(response.data[i].title);                        // Title of the news
        var newsource=$("<td>").text(response.data[i].source_name);                 // Source of the news
        var newurl=$("<td>").text(response.data[i].news_url);                       // URL for the news
        newnews.append(newdate);
        newnews.append(newsent);
        newnews.append(newtitle);
        newnews.append(newsource);
        newnews.append(newurl);
        $("#article-list").append(newnews);
    }

     // Initialize table -  Required by MDBootstrap
     $('#news-list').dataTable({
        "scrollX": true,
        "scrollY": 300
        });

}

//********************* */
// main functionality
//********************* */

$("#back").attr("onClick","window.location.href='getstocks.html'");   // on back, it will load functon getstocks
$("#trd-long").click(trd_long);                                       // function to cover clicking on long button
$("#trd-short").click(trd_short);                                     //  function to cover clicking on short button

var chartData = [];        // Initializes chart, required by AMD charts
var chart;                 // Initializes chart, required by AMD charts
var chartHsData = [];      // Initializes chart, required by AMD charts
var chartHs;               // Initializes chart, required by AMD charts

// Setting global variables

var stock_list=[];                                         // global variable, array that contains stock data
var base_url="https://sandbox.iexapis.com/stable/stock/";  // Live data versus sandbox
var api_token="Tsk_c7a9b5b07a7d4570afb668eccf02054b";      // token
var current_stock=localStorage.getItem("");                // stock whose information is being fetched by API
var latest_stock_price=0;                                  // last known stock price returned by API

// getting which stock was selected from local storage, finding its index, showing it in the title
var stock_selected=localStorage.getItem("selectedStock");
var stock_list=JSON.parse(localStorage.getItem("LSstock_list"));
var sindex=stock_list.map(function(e) {return e.name}).indexOf(stock_selected);
var sTickler=stock_list[sindex].tickler;
var sName=stock_list[sindex].name;
$("#det-title").text("Stock details for "+sTickler+" - "+stock_list[sindex].name);  

// Getting intra-day data from IEX API
var APIquery=base_url+sTickler+"/intraday-prices/adx?range=1m&token="+api_token;
$.ajax({url: APIquery,success: showIDchart, error: handles_APIerror});

// while waiting for API response, setting up the 6-month historical-data using API responses previously stored
showHschart();

//  Assigns actions to the trading quantity buttons
$("#trd100").click(function(){$("#trade-cost").text("Approximate trade cost $"+(100*latest_stock_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))});
$("#trd200").click(function(){$("#trade-cost").text("Approximate trade cost $"+(200*latest_stock_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))});
$("#trd300").click(function(){$("#trade-cost").text("Approximate trade cost $"+(300*latest_stock_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))});
$("#trd400").click(function(){$("#trade-cost").text("Approximate trade cost $"+(400*latest_stock_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))});
$("#trd500").click(function(){$("#trade-cost").text("Approximate trade cost $"+(500*latest_stock_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))});

//  Fetching articles based on the last week of trading
var News_base_url="https://stocknewsapi.com/api/v1"
var News_stock_ticker="?tickers="+sTickler+"&items=50"
var News_api_token="&token=zgnr45fiudxhs9tdc9thlumkkwril7vqlmoqnbtp"
var News_API_query=News_base_url+News_stock_ticker+News_api_token;
$.ajax({url: News_API_query,success: showNews, error: handles_APIerror});
