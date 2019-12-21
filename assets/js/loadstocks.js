//******************************************************************** */
//  This function will look if the stock list exists in local storage,
//  if it does, it does nothing and exits.  If it does not exists
//  it creates the list.  This is the list of stocks that we will
//  monitor each time user wants trading tips.  This list can be
//  expanded with nothing else needed to be done to any of the
//  program functionality.
//******************************************************************** */

function getStocks(){
        var temp_stock_list = JSON.parse(localStorage.getItem("LSstock_list"));
        if(temp_stock_list!==null){
            stock_list=temp_stock_list;   // global variable updated
            return;}

        // if list does not exists, it creates one.  Starts adding the Dow Jones 30
        stock_list.push({tickler:"MMM",name:"3M",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"MMM",name:"3M Co",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"AXP",name:"American Express Co",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"AAPL",name:"Apple Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"BA",name:"Boeing Co",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"CAT",name:"Caterpillar Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"CVX",name:"Chevron Corp",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"CSCO",name:"Cisco Systems Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"KO",name:"Coca-Cola Co",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"DIS",name:"Walt Disney Co",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"DOW",name:"Dow Chemical Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"XOM",name:"Exxon Mobile Corp",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"GS",name:"Goldman Sachs Group Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"HD",name:"Home Depot Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"IBM",name:"International Business Machines Corp",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"INT",name:"Intel Corp",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"JNJ",name:"Johnson & Johnson",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"JPM",name:"JP Morgan Chase & Co",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"MCD",name:"McDonald's Corp",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"MRK",name:"Merk & Co Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"MSF",name:"Microsoft Corp",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"NKE",name:"Nike Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"PFE",name:"Pfizer Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"PG",name:"Procter & Gamble Co",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"TRV",name:"Travelers Companies Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"UTX",name:"United Technologies Corp",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"UNH",name:"UnitedHealth Group Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"VZ",name:"Verizon Communications Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"V",name:"Visa Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"WMT",name:"Walmart Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:"WBA",name:"Walgreen Boots Alliance Inc",INDU: true,sp500: true,nasdaq:false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});

        localStorage.setItem("LSstock_list",JSON.stringify(stock_list));
}  // end of function getStocks


//*******************************************************************/
//  Calling IEX API for each stock, getting financial information
//*******************************************************************/

function getFinancialData(){

    //  Will get financial data for all stocks
    var total_stocks=stock_list.length;
    var rsplng=0;

    // for(var i=0;i<total_stocks;i++){

    //  Makes 4 API calls to get the data from API server AIX
        var APIquery="https://cloud.iexapis.com/stable/stock/"+stock_list[0].tickler+"/indicator/adx?range=6m&token=pk_b38152a336f24abcb3cc369bf985f4d3";
        $.ajax({url:APIquery,method:"GET"}).then(function(finrsp){
              rsplng=finrsp.indicator[0].length;
              console.log(finrsp.indicator[0][rsplng-1], typeof finrsp.indicator[0][rsplng-1])
              stock_list[0].adx=finrsp.indicator[0][rsplng-1];
        });
        var APIquery="https://cloud.iexapis.com/stable/stock/"+stock_list[0].tickler+"/indicator/rsi?range=6m&token=pk_b38152a336f24abcb3cc369bf985f4d3";
        $.ajax({url:APIquery,method:"GET"}).then(function(finrsp){
              rsplng=finrsp.indicator[0].length;
              stock_list[0].rsi=finrsp.indicator[0][rsplng-1];
        });
        var APIquery="https://cloud.iexapis.com/stable/stock/"+stock_list[0].tickler+"/indicator/stochrsi?range=6m&token=pk_b38152a336f24abcb3cc369bf985f4d3";
        $.ajax({url:APIquery,method:"GET"}).then(function(finrsp){
              rsplng=finrsp.indicator[0].length;
              stock_list[0].srsi=finrsp.indicator[0][rsplng-1];
        });
        var APIquery="https://cloud.iexapis.com/stable/stock/"+stock_list[0].tickler+"/indicator/mom?range=6m&token=pk_b38152a336f24abcb3cc369bf985f4d3";
        $.ajax({url:APIquery,method:"GET"}).then(function(finrsp){
              rsplng=finrsp.indicator[0].length;
              stock_list[0].mom=finrsp.indicator[0][rsplng-1];
        });


    // }

    // Saves data to local storage
    stock_list[1].adx=30.1111;
    // localStorage.removeItem("LSstock_list");
    localStorage.setItem("LSstock_list",JSON.stringify(stock_list));



}  // end of function getAPIData


//***************************************************************** */
// Main program functionality 
//***************************************************************** */

var stock_list=[];   // global variable, array that contains stock data
getStocks();         // loading the stocks that will be analyzed
getFinancialData();  // Getting data from AIX via API calling
