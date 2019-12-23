//***********************************************************************************************/
//  When user selects a row, following function enables/disables buttons, and then it writes     /
//  selected row to local storage to understand which stock was selected                         /
//***********************************************************************************************/

function stock_clicked(){
  var slected = $('#TradingStocksList').find('.selected');  // Which row was selected?
  if(slected.length===0){  // This means, the user de-selected an option, disabling buttons

      $("#zoom-in-stock").attr("disabled",true);
      $("#zoom-in-stock-fnt").attr("class","fas fa-search")
      return;   // Does nothing else
  };  

    // enables buttons, makes them bigger
    $("#zoom-in-stock").attr("disabled",false);
    $("#zoom-in-stock-fnt").attr("class","fas fa-2x fa-search")

    // saves name of selected strategy to local storage
    localStorage.setItem("selectedStock",slected[0].cells[1].textContent);
  }


//**********************************************************************************/
//  The following function ranks the stocks and presents the results to the user   /
//**********************************************************************************/

function process_results(){

    // Retrieves the weightings from the strategy selected by the user
    var strat_selected=localStorage.getItem("selectedStrategy");
    var strategies=JSON.parse(localStorage.getItem("strategies"));
    var found_strategy=false;    // Boolean to track whether the strategy selected was found
    var stratx=0;                // Index for the strategy selected
    var results=[];              // Contains stocks to be displayed to user 
    var results_alt=[];          // Potential stocks to be displayed to user

    for(var i=0;i<strategies.length;i++){

       if(strategies[i].name===strat_selected){
           found_strategy=true;
           stratx=i;
       }
    }
    
     // for each stock in list, it will calculate two things:  1) a normalized 0-100 score for each one of the indexes,
     // 2) a composite weighted (based on user input) of the stock.  If any one calculated technical indicator is 0m that
     // means that we couldn't get underlying financial data and therefore the normalized score is 0
     stock_list=JSON.parse(localStorage.getItem("LSstock_list"));

     for(var i=0;i<stock_list.length;i++){

          //  reading the information
          var rsi_ind=stock_list[i].rsi;
          var mom_ind=stock_list[i].mom;

          // scoring adx index.  It is already normalized so won't be changed
          stock_list[i].adxx=stock_list[i].adx;

          // scoring the rsi index.  
          if(rsi_ind>=70){stock_list[i].rsix=rsi_ind}
          else if(rsi_ind>=50){stock_list[i].rsix=rsi_ind-50}
          else if(rsi_ind>=30){stock_list[i].rsix=50-rsi_ind}
          else (stock_list[i].rsix=100-rsi_ind);

          // scoring the srsi index (already normalized from 0 to 1)
          stock_list[i].srsix=100*stock_list[i].srsi;

          // scoring the momentum indicator

          if(mom_ind>-0.10&&mom_ind<0.10){stock_list[i].momx=100}
          else if(mom_ind>-0.20&&mom_ind<0.20){stock_list[i].momx=80}
          else if(mom_ind>-0.50&&mom_ind<0.50){stock_list[i].momx=60}
          else if(mom_ind>-1&&mom_ind<1){stock_list[i].momx=50}
          else if(mom_ind>-2&&mom_ind<2){stock_list[i].momx=40}
          else if(mom_ind>-3&&mom_ind<3){stock_list[i].momx=30}
          else if(mom_ind>-4&&mom_ind<4){stock_list[i].momx=20}
          else if(mom_ind>-5&&mom_ind<5){stock_list[i].momx=10}
          else {stock_list[i].momx=0};

          // calculates the overall score by retrieving 

          stock_list[i].comp=  Math.round(strategies[stratx].adx_wgth)*stock_list[i].adxx +       // normalized adx * weight of ADX
                               Math.round(strategies[stratx].rsi_wgth)*stock_list[i].rsix +       // normalized rsi * weight of rsi
                               Math.round(strategies[stratx].srsi_wgth)*stock_list[i].srsix +     // normalized srsi * weight of srsi
                               Math.round(strategies[stratx].mom_wgth)*stock_list[i].momx         // normalized mom * weight of mom

          stock_list[i].comp=stock_list[i].comp/100;                   // weights are in 1-100 numbers.  Need to convert to percentages
          if(stock_list[i].comp>70){results_alt.push(stock_list[i])}   //  If > 70 composite, adds to list
     }

     // Now that all stocks have been evaluated, it will save the results to local storage
     localStorage.setItem("LSstock_list",JSON.stringify(stock_list));

     //  Sorting stocks in descending order
     results=stock_list.sort(function(a,b){return b.comp-a.comp});

     // making sure the progress bar used for API connection is not visible
     $("#progress-bar-cont").hide();

     // Loading the results into the page
     $("#trading-list").empty()
     for(var i=0;i<results.length;i++){
          var newstock=$("<tr>");                                         // header.  
          var newchkbox=$("<td>");                                        // empty, please leave it for the checkbox
          var newname=$("<td>").text(results[i].name);                    // stock name
          var newsector=$("<td>").text(results[i].sector);                // stock sector
          var newadx=$("<td>").text(results[i].adx.toFixed(0));                      // ADX technical indicator
          var newrsi=$("<td>").text(results[i].rsi.toFixed(0));                      // RSI technical indicator
          var newsrsi=$("<td>").text(results[i].srsi.toFixed(2));                    // SRSI technical indicator
          var newmom=$("<td>").text(results[i].mom.toFixed(2));                      // MOM technical indicator
          var newcomp=$("<td>").text(results[i].comp.toFixed(1));                    // Composite result
          newstock.append(newchkbox);
          newstock.append(newname);
          newstock.append(newsector);
          newstock.append(newadx);
          newstock.append(newrsi);
          newstock.append(newsrsi);
          newstock.append(newmom);
          newstock.append(newcomp);
          $("#trading-list").append(newstock);
     }  // end adding stocks to MD datatable

     // Initialize table
            $('#TradingStocksList').dataTable({
            "scrollX": true,
            "scrollY": 300,
            columnDefs: [{orderable: false, className: 'select-checkbox',targets: 0 }],
                select: { style: 'os', selector: 'td:first-child'}
            });
            $(document).on("click",".select-checkbox",stock_clicked);                         // selects stock

}  // end of function process results


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

        // if list does not exists, it creates one.  Starts adding the S&P500
        stock_list.push({tickler:'MMM',name:'3M Company',sector:'Industrials',subindustry:'Industrial Conglomerates',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'ABT',name:'Abbott Laboratories',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'ABBV',name:'AbbVie Inc.',sector:'Health Care',subindustry:'Pharmaceuticals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'ABMD',name:'ABIOMED Inc',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'ACN',name:'Accenture plc',sector:'Information Technology',subindustry:'IT Consulting & Other Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'ATVI',name:'Activision Blizzard',sector:'Communication Services',subindustry:'Interactive Home Entertainment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'ADBE',name:'Adobe Systems Inc',sector:'Information Technology',subindustry:'Application Software',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'AMD',name:'Advanced Micro Devices Inc',sector:'Information Technology',subindustry:'Semiconductors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'AAP',name:'Advance Auto Parts',sector:'Consumer Discretionary',subindustry:'Automotive Retail',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'AES',name:'AES Corp',sector:'Utilities',subindustry:'Independent Power Producers & Energy Traders',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'AMG',name:'Affiliated Managers Group Inc',sector:'Financials',subindustry:'Asset Management & Custody Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'AFL',name:'AFLAC Inc',sector:'Financials',subindustry:'Life & Health Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'A',name:'Agilent Technologies Inc',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'APD',name:'Air Products & Chemicals Inc',sector:'Materials',subindustry:'Industrial Gases',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'AKAM',name:'Akamai Technologies Inc',sector:'Information Technology',subindustry:'Internet Services & Infrastructure',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'ALK',name:'Alaska Air Group Inc',sector:'Industrials',subindustry:'Airlines',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'ALB',name:'Albemarle Corp',sector:'Materials',subindustry:'Specialty Chemicals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'ARE',name:'Alexandria Real Estate Equities',sector:'Real Estate',subindustry:'Office REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'ALXN',name:'Alexion Pharmaceuticals',sector:'Health Care',subindustry:'Biotechnology',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'ALGN',name:'Align Technology',sector:'Health Care',subindustry:'Health Care Supplies',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'ALLE',name:'Allegion',sector:'Industrials',subindustry:'Building Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'AGN',name:'Allergan, Plc',sector:'Health Care',subindustry:'Pharmaceuticals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'ADS',name:'Alliance Data Systems',sector:'Information Technology',subindustry:'Data Processing & Outsourced Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'LNT',name:'Alliant Energy Corp',sector:'Utilities',subindustry:'Electric Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'ALL',name:'Allstate Corp',sector:'Financials',subindustry:'Property & Casualty Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'GOOGL',name:'Alphabet Inc Class A',sector:'Communication Services',subindustry:'Interactive Media & Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'GOOG',name:'Alphabet Inc Class C',sector:'Communication Services',subindustry:'Interactive Media & Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'MO',name:'Altria Group Inc',sector:'Consumer Staples',subindustry:'Tobacco',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'AMZN',name:'Amazon.com Inc.',sector:'Consumer Discretionary',subindustry:'Internet & Direct Marketing Retail',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        stock_list.push({tickler:'AMCR',name:'Amcor plc',sector:'Materials',subindustry:'Paper Packaging',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AEE',name:'Ameren Corp',sector:'Utilities',subindustry:'Multi-Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AAL',name:'American Airlines Group',sector:'Industrials',subindustry:'Airlines',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AEP',name:'American Electric Power',sector:'Utilities',subindustry:'Electric Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AXP',name:'American Express Co',sector:'Financials',subindustry:'Consumer Finance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AIG',name:'American International Group',sector:'Financials',subindustry:'Property & Casualty Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AMT',name:'American Tower Corp.',sector:'Real Estate',subindustry:'Specialized REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AWK',name:'American Water Works Company Inc',sector:'Utilities',subindustry:'Water Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AMP',name:'Ameriprise Financial',sector:'Financials',subindustry:'Asset Management & Custody Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ABC',name:'AmerisourceBergen Corp',sector:'Health Care',subindustry:'Health Care Distributors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AME',name:'AMETEK Inc.',sector:'Industrials',subindustry:'Electrical Components & Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AMGN',name:'Amgen Inc.',sector:'Health Care',subindustry:'Biotechnology',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'APH',name:'Amphenol Corp',sector:'Information Technology',subindustry:'Electronic Components',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ADI',name:'Analog Devices, Inc.',sector:'Information Technology',subindustry:'Semiconductors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ANSS',name:'ANSYS',sector:'Information Technology',subindustry:'Application Software',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ANTM',name:'Anthem',sector:'Health Care',subindustry:'Managed Health Care',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AON',name:'Aon plc',sector:'Financials',subindustry:'Insurance Brokers',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AOS',name:'A.O. Smith Corp',sector:'Industrials',subindustry:'Building Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'APA',name:'Apache Corporation',sector:'Energy',subindustry:'Oil & Gas Exploration & Production',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AIV',name:'Apartment Investment & Management',sector:'Real Estate',subindustry:'Residential REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AAPL',name:'Apple Inc.',sector:'Information Technology',subindustry:'Technology Hardware, Storage & Peripherals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AMAT',name:'Applied Materials Inc.',sector:'Information Technology',subindustry:'Semiconductor Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'APTV',name:'Aptiv Plc',sector:'Consumer Discretionary',subindustry:'Auto Parts & Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ADM',name:'Archer-Daniels-Midland Co',sector:'Consumer Staples',subindustry:'Agricultural Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ARNC',name:'Arconic Inc.',sector:'Industrials',subindustry:'Aerospace & Defense',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ANET',name:'Arista Networks',sector:'Information Technology',subindustry:'Communications Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AJG',name:'Arthur J. Gallagher & Co.',sector:'Financials',subindustry:'Insurance Brokers',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AIZ',name:'Assurant',sector:'Financials',subindustry:'Multi-line Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ATO',name:'Atmos Energy Corp',sector:'Utilities',subindustry:'Gas Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'T',name:'AT&T Inc.',sector:'Communication Services',subindustry:'Integrated Telecommunication Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ADSK',name:'Autodesk Inc.',sector:'Information Technology',subindustry:'Application Software',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ADP',name:'Automatic Data Processing',sector:'Information Technology',subindustry:'Internet Services & Infrastructure',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AZO',name:'AutoZone Inc',sector:'Consumer Discretionary',subindustry:'Specialty Stores',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AVB',name:'AvalonBay Communities, Inc.',sector:'Real Estate',subindustry:'Residential REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AVY',name:'Avery Dennison Corp',sector:'Materials',subindustry:'Paper Packaging',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BKR',name:'Baker Hughes Co',sector:'Energy',subindustry:'Oil & Gas Equipment & Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BLL',name:'Ball Corp',sector:'Materials',subindustry:'Metal & Glass Containers',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BAC',name:'Bank of America Corp',sector:'Financials',subindustry:'Diversified Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BK',name:'The Bank of New York Mellon Corp.',sector:'Financials',subindustry:'Asset Management & Custody Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BAX',name:'Baxter International Inc.',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BDX',name:'Becton Dickinson',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BRK.B',name:'Berkshire Hathaway',sector:'Financials',subindustry:'Multi-Sector Holdings',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BBY',name:'Best Buy Co. Inc.',sector:'Consumer Discretionary',subindustry:'Computer & Electronics Retail',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BIIB',name:'Biogen Inc.',sector:'Health Care',subindustry:'Biotechnology',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BLK',name:'BlackRock',sector:'Financials',subindustry:'Asset Management & Custody Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BA',name:'Boeing Company',sector:'Industrials',subindustry:'Aerospace & Defense',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BKNG',name:'Booking Holdings Inc',sector:'Consumer Discretionary',subindustry:'Internet & Direct Marketing Retail',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BWA',name:'BorgWarner',sector:'Consumer Discretionary',subindustry:'Auto Parts & Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BXP',name:'Boston Properties',sector:'Real Estate',subindustry:'Office REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BSX',name:'Boston Scientific',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BMY',name:'Bristol-Myers Squibb',sector:'Health Care',subindustry:'Health Care Distributors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'AVGO',name:'Broadcom Inc.',sector:'Information Technology',subindustry:'Semiconductors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BR',name:'Broadridge Financial Solutions',sector:'Information Technology',subindustry:'Data Processing & Outsourced Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BF.B',name:'Brown-Forman Corp.',sector:'Consumer Staples',subindustry:'Distillers & Vintners',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CHRW',name:'C. H. Robinson Worldwide',sector:'Industrials',subindustry:'Air Freight & Logistics',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'COG',name:'Cabot Oil & Gas',sector:'Energy',subindustry:'Oil & Gas Exploration & Production',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CDNS',name:'Cadence Design Systems',sector:'Information Technology',subindustry:'Application Software',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CPB',name:'Campbell Soup',sector:'Consumer Staples',subindustry:'Packaged Foods & Meats',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'COF',name:'Capital One Financial',sector:'Financials',subindustry:'Consumer Finance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CPRI',name:'Capri Holdings',sector:'Consumer Discretionary',subindustry:'Apparel, Accessories & Luxury Goods',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CAH',name:'Cardinal Health Inc.',sector:'Health Care',subindustry:'Health Care Distributors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'KMX',name:'Carmax Inc',sector:'Consumer Discretionary',subindustry:'Specialty Stores',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CCL',name:'Carnival Corp.',sector:'Consumer Discretionary',subindustry:'Hotels, Resorts & Cruise Lines',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CAT',name:'Caterpillar Inc.',sector:'Industrials',subindustry:'Construction Machinery & Heavy Trucks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CBOE',name:'Cboe Global Markets',sector:'Financials',subindustry:'Financial Exchanges & Data',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CBRE',name:'CBRE Group',sector:'Real Estate',subindustry:'Real Estate Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CDW',name:'CDW',sector:'Information Technology',subindustry:'Technology Distributors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CE',name:'Celanese',sector:'Materials',subindustry:'Specialty Chemicals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CNC',name:'Centene Corporation',sector:'Health Care',subindustry:'Managed Health Care',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CNP',name:'CenterPoint Energy',sector:'Utilities',subindustry:'Multi-Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CTL',name:'CenturyLink Inc',sector:'Communication Services',subindustry:'Integrated Telecommunication Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CERN',name:'Cerner',sector:'Health Care',subindustry:'Health Care Technology',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CF',name:'CF Industries Holdings Inc',sector:'Materials',subindustry:'Fertilizers & Agricultural Chemicals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SCHW',name:'Charles Schwab Corporation',sector:'Financials',subindustry:'Investment Banking & Brokerage',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CHTR',name:'Charter Communications',sector:'Communication Services',subindustry:'Cable & Satellite',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CVX',name:'Chevron Corp.',sector:'Energy',subindustry:'Integrated Oil & Gas',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CMG',name:'Chipotle Mexican Grill',sector:'Consumer Discretionary',subindustry:'Restaurants',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CB',name:'Chubb Limited',sector:'Financials',subindustry:'Property & Casualty Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CHD',name:'Church & Dwight',sector:'Consumer Staples',subindustry:'Household Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CI',name:'CIGNA Corp.',sector:'Health Care',subindustry:'Managed Health Care',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'XEC',name:'Cimarex Energy',sector:'Energy',subindustry:'Oil & Gas Exploration & Production',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CINF',name:'Cincinnati Financial',sector:'Financials',subindustry:'Property & Casualty Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CTAS',name:'Cintas Corporation',sector:'Industrials',subindustry:'Diversified Support Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CSCO',name:'Cisco Systems',sector:'Information Technology',subindustry:'Communications Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'C',name:'Citigroup Inc.',sector:'Financials',subindustry:'Diversified Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CFG',name:'Citizens Financial Group',sector:'Financials',subindustry:'Regional Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CTXS',name:'Citrix Systems',sector:'Information Technology',subindustry:'Application Software',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CLX',name:'The Clorox Company',sector:'Consumer Staples',subindustry:'Household Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CME',name:'CME Group Inc.',sector:'Financials',subindustry:'Financial Exchanges & Data',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CMS',name:'CMS Energy',sector:'Utilities',subindustry:'Multi-Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'KO',name:'Coca-Cola Company',sector:'Consumer Staples',subindustry:'Soft Drinks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CTSH',name:'Cognizant Technology Solutions',sector:'Information Technology',subindustry:'IT Consulting & Other Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CL',name:'Colgate-Palmolive',sector:'Consumer Staples',subindustry:'Household Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CMCSA',name:'Comcast Corp.',sector:'Communication Services',subindustry:'Cable & Satellite',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CMA',name:'Comerica Inc.',sector:'Financials',subindustry:'Diversified Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CAG',name:'Conagra Brands',sector:'Consumer Staples',subindustry:'Packaged Foods & Meats',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CXO',name:'Concho Resources',sector:'Energy',subindustry:'Oil & Gas Exploration & Production',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'COP',name:'ConocoPhillips',sector:'Energy',subindustry:'Oil & Gas Exploration & Production',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ED',name:'Consolidated Edison',sector:'Utilities',subindustry:'Electric Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'STZ',name:'Constellation Brands',sector:'Consumer Staples',subindustry:'Distillers & Vintners',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'COO',name:'The Cooper Companies',sector:'Health Care',subindustry:'Health Care Supplies',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CPRT',name:'Copart Inc',sector:'Industrials',subindustry:'Diversified Support Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'GLW',name:'Corning Inc.',sector:'Information Technology',subindustry:'Electronic Components',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CTVA',name:'Corteva',sector:'Materials',subindustry:'Fertilizers & Agricultural Chemicals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'COST',name:'Costco Wholesale Corp.',sector:'Consumer Staples',subindustry:'Hypermarkets & Super Centers',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'COTY',name:'Coty, Inc',sector:'Consumer Staples',subindustry:'Personal Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CCI',name:'Crown Castle International Corp.',sector:'Real Estate',subindustry:'Specialized REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CSX',name:'CSX Corp.',sector:'Industrials',subindustry:'Railroads',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CMI',name:'Cummins Inc.',sector:'Industrials',subindustry:'Industrial Machinery',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CVS',name:'CVS Health',sector:'Health Care',subindustry:'Health Care Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DHI',name:'D. R. Horton',sector:'Consumer Discretionary',subindustry:'Homebuilding',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DHR',name:'Danaher Corp.',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DRI',name:'Darden Restaurants',sector:'Consumer Discretionary',subindustry:'Restaurants',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DVA',name:'DaVita Inc.',sector:'Health Care',subindustry:'Health Care Facilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DE',name:'Deere & Co.',sector:'Industrials',subindustry:'Agricultural & Farm Machinery',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DAL',name:'Delta Air Lines Inc.',sector:'Industrials',subindustry:'Airlines',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'XRAY',name:'Dentsply Sirona',sector:'Health Care',subindustry:'Health Care Supplies',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DVN',name:'Devon Energy',sector:'Energy',subindustry:'Oil & Gas Exploration & Production',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FANG',name:'Diamondback Energy',sector:'Energy',subindustry:'Oil & Gas Exploration & Production',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DLR',name:'Digital Realty Trust Inc',sector:'Real Estate',subindustry:'Specialized REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DFS',name:'Discover Financial Services',sector:'Financials',subindustry:'Consumer Finance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DISCA',name:'Discovery Inc. Class A',sector:'Communication Services',subindustry:'Broadcasting',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DISCK',name:'Discovery Inc. Class C',sector:'Communication Services',subindustry:'Broadcasting',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DISH',name:'Dish Network',sector:'Communication Services',subindustry:'Cable & Satellite',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DG',name:'Dollar General',sector:'Consumer Discretionary',subindustry:'General Merchandise Stores',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DLTR',name:'Dollar Tree',sector:'Consumer Discretionary',subindustry:'General Merchandise Stores',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'D',name:'Dominion Energy',sector:'Utilities',subindustry:'Electric Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DOV',name:'Dover Corp.',sector:'Industrials',subindustry:'Industrial Machinery',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DOW',name:'Dow Inc.',sector:'Materials',subindustry:'Commodity Chemicals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DTE',name:'DTE Energy Co.',sector:'Utilities',subindustry:'Multi-Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DUK',name:'Duke Energy',sector:'Utilities',subindustry:'Electric Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DRE',name:'Duke Realty Corp',sector:'Real Estate',subindustry:'Industrial REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DD',name:'DuPont de Nemours Inc',sector:'Materials',subindustry:'Specialty Chemicals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DXC',name:'DXC Technology',sector:'Information Technology',subindustry:'IT Consulting & Other Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ETFC',name:'E*Trade',sector:'Financials',subindustry:'Investment Banking & Brokerage',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EMN',name:'Eastman Chemical',sector:'Materials',subindustry:'Diversified Chemicals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ETN',name:'Eaton Corporation',sector:'Industrials',subindustry:'Electrical Components & Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EBAY',name:'eBay Inc.',sector:'Consumer Discretionary',subindustry:'Internet & Direct Marketing Retail',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ECL',name:'Ecolab Inc.',sector:'Materials',subindustry:'Specialty Chemicals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EIX',name:"Edison Int'l",sector:'Utilities',subindustry:'Electric Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EW',name:'Edwards Lifesciences',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EA',name:'Electronic Arts',sector:'Communication Services',subindustry:'Interactive Home Entertainment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EMR',name:'Emerson Electric Company',sector:'Industrials',subindustry:'Electrical Components & Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ETR',name:'Entergy Corp.',sector:'Utilities',subindustry:'Electric Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EOG',name:'EOG Resources',sector:'Energy',subindustry:'Oil & Gas Exploration & Production',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EFX',name:'Equifax Inc.',sector:'Industrials',subindustry:'Research & Consulting Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EQIX',name:'Equinix',sector:'Real Estate',subindustry:'Specialized REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EQR',name:'Equity Residential',sector:'Real Estate',subindustry:'Residential REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ESS',name:'Essex Property Trust, Inc.',sector:'Real Estate',subindustry:'Residential REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EL',name:'Estee Lauder Cos.',sector:'Consumer Staples',subindustry:'Personal Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EVRG',name:'Evergy',sector:'Utilities',subindustry:'Electric Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ES',name:'Eversource Energy',sector:'Utilities',subindustry:'Multi-Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'RE',name:'Everest Re Group Ltd.',sector:'Financials',subindustry:'Reinsurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EXC',name:'Exelon Corp.',sector:'Utilities',subindustry:'Multi-Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EXPE',name:'Expedia Group',sector:'Consumer Discretionary',subindustry:'Internet & Direct Marketing Retail',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EXPD',name:'Expeditors',sector:'Industrials',subindustry:'Air Freight & Logistics',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'EXR',name:'Extra Space Storage',sector:'Real Estate',subindustry:'Specialized REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'XOM',name:'Exxon Mobil Corp.',sector:'Energy',subindustry:'Integrated Oil & Gas',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FFIV',name:'F5 Networks',sector:'Information Technology',subindustry:'Communications Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FB',name:'Facebook, Inc.',sector:'Communication Services',subindustry:'Interactive Media & Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FAST',name:'Fastenal Co',sector:'Industrials',subindustry:'Building Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FRT',name:'Federal Realty Investment Trust',sector:'Real Estate',subindustry:'Retail REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FDX',name:'FedEx Corporation',sector:'Industrials',subindustry:'Air Freight & Logistics',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FIS',name:'Fidelity National Information Services',sector:'Information Technology',subindustry:'Data Processing & Outsourced Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FITB',name:'Fifth Third Bancorp',sector:'Financials',subindustry:'Regional Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FE',name:'FirstEnergy Corp',sector:'Utilities',subindustry:'Electric Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FRC',name:'First Republic Bank',sector:'Financials',subindustry:'Regional Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FISV',name:'Fiserv Inc',sector:'Information Technology',subindustry:'Data Processing & Outsourced Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FLT',name:'FleetCor Technologies Inc',sector:'Information Technology',subindustry:'Data Processing & Outsourced Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FLIR',name:'FLIR Systems',sector:'Information Technology',subindustry:'Electronic Equipment & Instruments',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FLS',name:'Flowserve Corporation',sector:'Industrials',subindustry:'Industrial Machinery',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FMC',name:'FMC Corporation',sector:'Materials',subindustry:'Fertilizers & Agricultural Chemicals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'F',name:'Ford Motor',sector:'Consumer Discretionary',subindustry:'Automobile Manufacturers',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FTNT',name:'Fortinet',sector:'Information Technology',subindustry:'Systems Software',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FTV',name:'Fortive Corp',sector:'Industrials',subindustry:'Industrial Machinery',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FBHS',name:'Fortune Brands Home & Security',sector:'Industrials',subindustry:'Building Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FOXA',name:'Fox Corporation Class A',sector:'Communication Services',subindustry:'Movies & Entertainment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FOX',name:'Fox Corporation Class B',sector:'Communication Services',subindustry:'Movies & Entertainment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'BEN',name:'Franklin Resources',sector:'Financials',subindustry:'Asset Management & Custody Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FCX',name:'Freeport-McMoRan Inc.',sector:'Materials',subindustry:'Copper',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'GPS',name:'Gap Inc.',sector:'Consumer Discretionary',subindustry:'Apparel Retail',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'GRMN',name:'Garmin Ltd.',sector:'Consumer Discretionary',subindustry:'Consumer Electronics',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'IT',name:'Gartner Inc',sector:'Information Technology',subindustry:'IT Consulting & Other Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'GD',name:'General Dynamics',sector:'Industrials',subindustry:'Aerospace & Defense',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'GE',name:'General Electric',sector:'Industrials',subindustry:'Industrial Conglomerates',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'GIS',name:'General Mills',sector:'Consumer Staples',subindustry:'Packaged Foods & Meats',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'GM',name:'General Motors',sector:'Consumer Discretionary',subindustry:'Automobile Manufacturers',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'GPC',name:'Genuine Parts',sector:'Consumer Discretionary',subindustry:'Specialty Stores',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'GILD',name:'Gilead Sciences',sector:'Health Care',subindustry:'Biotechnology',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'GL',name:'Globe Life Inc.',sector:'Financials',subindustry:'Life & Health Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'GPN',name:'Global Payments Inc.',sector:'Information Technology',subindustry:'Data Processing & Outsourced Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'GS',name:'Goldman Sachs Group',sector:'Financials',subindustry:'Investment Banking & Brokerage',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'GWW',name:'Grainger (W.W.) Inc.',sector:'Industrials',subindustry:'Industrial Machinery',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HRB',name:'H&R Block',sector:'Consumer Discretionary',subindustry:'Specialized Consumer Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HAL',name:'Halliburton Co.',sector:'Energy',subindustry:'Oil & Gas Equipment & Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HBI',name:'Hanesbrands Inc',sector:'Consumer Discretionary',subindustry:'Apparel, Accessories & Luxury Goods',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HOG',name:'Harley-Davidson',sector:'Consumer Discretionary',subindustry:'Motorcycle Manufacturers',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HIG',name:'Hartford Financial Svc.Gp.',sector:'Financials',subindustry:'Property & Casualty Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HAS',name:'Hasbro Inc.',sector:'Consumer Discretionary',subindustry:'Leisure Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HCA',name:'HCA Healthcare',sector:'Health Care',subindustry:'Health Care Facilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PEAK',name:'Healthpeak Properties',sector:'Real Estate',subindustry:'Health Care REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HP',name:'Helmerich & Payne',sector:'Energy',subindustry:'Oil & Gas Drilling',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HSIC',name:'Henry Schein',sector:'Health Care',subindustry:'Health Care Distributors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HSY',name:'The Hershey Company',sector:'Consumer Staples',subindustry:'Packaged Foods & Meats',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HES',name:'Hess Corporation',sector:'Energy',subindustry:'Integrated Oil & Gas',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HPE',name:'Hewlett Packard Enterprise',sector:'Information Technology',subindustry:'Technology Hardware, Storage & Peripherals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HLT',name:'Hilton Worldwide Holdings Inc',sector:'Consumer Discretionary',subindustry:'Hotels, Resorts & Cruise Lines',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HFC',name:'HollyFrontier Corp',sector:'Energy',subindustry:'Oil & Gas Refining & Marketing',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HOLX',name:'Hologic',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HD',name:'Home Depot',sector:'Consumer Discretionary',subindustry:'Home Improvement Retail',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HON',name:"Honeywell Int'l Inc.",sector:'Industrials',subindustry:'Industrial Conglomerates',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HRL',name:'Hormel Foods Corp.',sector:'Consumer Staples',subindustry:'Packaged Foods & Meats',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HST',name:'Host Hotels & Resorts',sector:'Real Estate',subindustry:'Hotel & Resort REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HPQ',name:'HP Inc.',sector:'Information Technology',subindustry:'Technology Hardware, Storage & Peripherals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HUM',name:'Humana Inc.',sector:'Health Care',subindustry:'Managed Health Care',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HBAN',name:'Huntington Bancshares',sector:'Financials',subindustry:'Regional Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'HII',name:'Huntington Ingalls Industries',sector:'Industrials',subindustry:'Aerospace & Defense',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'IEX',name:'IDEX Corporation',sector:'Industrials',subindustry:'Industrial Machinery',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'IDXX',name:'IDEXX Laboratories',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'INFO',name:'IHS Markit Ltd.',sector:'Industrials',subindustry:'Research & Consulting Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ITW',name:'Illinois Tool Works',sector:'Industrials',subindustry:'Industrial Machinery',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ILMN',name:'Illumina Inc',sector:'Health Care',subindustry:'Life Sciences Tools & Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'IR',name:'Ingersoll-Rand PLC',sector:'Industrials',subindustry:'Industrial Machinery',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'INTC',name:'Intel Corp.',sector:'Information Technology',subindustry:'Semiconductors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ICE',name:'Intercontinental Exchange',sector:'Financials',subindustry:'Financial Exchanges & Data',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'IBM',name:'International Business Machines',sector:'Information Technology',subindustry:'IT Consulting & Other Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'INCY',name:'Incyte',sector:'Health Care',subindustry:'Biotechnology',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'IP',name:'International Paper',sector:'Materials',subindustry:'Paper Packaging',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'IPG',name:'Interpublic Group',sector:'Communication Services',subindustry:'Advertising',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'IFF',name:'Intl Flavors & Fragrances',sector:'Materials',subindustry:'Specialty Chemicals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'INTU',name:'Intuit Inc.',sector:'Information Technology',subindustry:'Application Software',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ISRG',name:'Intuitive Surgical Inc.',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'IVZ',name:'Invesco Ltd.',sector:'Financials',subindustry:'Asset Management & Custody Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'IPGP',name:'IPG Photonics Corp.',sector:'Information Technology',subindustry:'Electronic Manufacturing Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'IQV',name:'IQVIA Holdings Inc.',sector:'Health Care',subindustry:'Life Sciences Tools & Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'IRM',name:'Iron Mountain Incorporated',sector:'Real Estate',subindustry:'Specialized REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'JKHY',name:'Jack Henry & Associates',sector:'Information Technology',subindustry:'Data Processing & Outsourced Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'J',name:'Jacobs Engineering Group',sector:'Industrials',subindustry:'Construction & Engineering',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'JBHT',name:'J. B. Hunt Transport Services',sector:'Industrials',subindustry:'Trucking',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SJM',name:'JM Smucker',sector:'Consumer Staples',subindustry:'Packaged Foods & Meats',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'JNJ',name:'Johnson & Johnson',sector:'Health Care',subindustry:'Pharmaceuticals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'JCI',name:'Johnson Controls International',sector:'Industrials',subindustry:'Building Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'JPM',name:'JPMorgan Chase & Co.',sector:'Financials',subindustry:'Diversified Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'JNPR',name:'Juniper Networks',sector:'Information Technology',subindustry:'Communications Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'KSU',name:'Kansas City Southern',sector:'Industrials',subindustry:'Railroads',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'K',name:'Kellogg Co.',sector:'Consumer Staples',subindustry:'Packaged Foods & Meats',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'KEY',name:'KeyCorp',sector:'Financials',subindustry:'Regional Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'KEYS',name:'Keysight Technologies',sector:'Information Technology',subindustry:'Electronic Equipment & Instruments',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'KMB',name:'Kimberly-Clark',sector:'Consumer Staples',subindustry:'Household Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'KIM',name:'Kimco Realty',sector:'Real Estate',subindustry:'Retail REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'KMI',name:'Kinder Morgan',sector:'Energy',subindustry:'Oil & Gas Storage & Transportation',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'KLAC',name:'KLA Corporation',sector:'Information Technology',subindustry:'Semiconductor Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'KSS',name:"Kohl's Corp.",sector:'Consumer Discretionary',subindustry:'General Merchandise Stores',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'KHC',name:'Kraft Heinz Co',sector:'Consumer Staples',subindustry:'Packaged Foods & Meats',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'KR',name:'Kroger Co.',sector:'Consumer Staples',subindustry:'Food Retail',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LB',name:'L Brands Inc.',sector:'Consumer Discretionary',subindustry:'Apparel Retail',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LHX',name:'L3Harris Technologies',sector:'Industrials',subindustry:'Aerospace & Defense',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LH',name:'Laboratory Corp. of America Holding',sector:'Health Care',subindustry:'Health Care Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LRCX',name:'Lam Research',sector:'Information Technology',subindustry:'Semiconductor Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LW',name:'Lamb Weston Holdings Inc',sector:'Consumer Staples',subindustry:'Packaged Foods & Meats',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LVS',name:'Las Vegas Sands',sector:'Consumer Discretionary',subindustry:'Casinos & Gaming',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LEG',name:'Leggett & Platt',sector:'Consumer Discretionary',subindustry:'Home Furnishings',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LDOS',name:'Leidos Holdings',sector:'Information Technology',subindustry:'IT Consulting & Other Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LEN',name:'Lennar Corp.',sector:'Consumer Discretionary',subindustry:'Homebuilding',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LLY',name:'Lilly (Eli) & Co.',sector:'Health Care',subindustry:'Pharmaceuticals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LNC',name:'Lincoln National',sector:'Financials',subindustry:'Multi-line Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LIN',name:'Linde plc',sector:'Materials',subindustry:'Industrial Gases',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LKQ',name:'LKQ Corporation',sector:'Consumer Discretionary',subindustry:'Distributors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LMT',name:'Lockheed Martin Corp.',sector:'Industrials',subindustry:'Aerospace & Defense',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'L',name:'Loews Corp.',sector:'Financials',subindustry:'Multi-line Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LOW',name:"Lowe's Cos.",sector:'Consumer Discretionary',subindustry:'Home Improvement Retail',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LYB',name:'LyondellBasell',sector:'Materials',subindustry:'Specialty Chemicals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MTB',name:'M&T Bank Corp.',sector:'Financials',subindustry:'Regional Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MAC',name:'Macerich',sector:'Real Estate',subindustry:'Retail REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'M',name:"Macy's Inc.",sector:'Consumer Discretionary',subindustry:'Department Stores',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MRO',name:'Marathon Oil Corp.',sector:'Energy',subindustry:'Oil & Gas Exploration & Production',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MPC',name:'Marathon Petroleum',sector:'Energy',subindustry:'Oil & Gas Refining & Marketing',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MKTX',name:'MarketAxess',sector:'Financials',subindustry:'Financial Exchanges & Data',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MAR',name:"Marriott Int'l.",sector:'Consumer Discretionary',subindustry:'Hotels, Resorts & Cruise Lines',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MMC',name:'Marsh & McLennan',sector:'Financials',subindustry:'Insurance Brokers',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MLM',name:'Martin Marietta Materials',sector:'Materials',subindustry:'Construction Materials',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MAS',name:'Masco Corp.',sector:'Industrials',subindustry:'Building Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MA',name:'Mastercard Inc.',sector:'Information Technology',subindustry:'Data Processing & Outsourced Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MKC',name:'McCormick & Co.',sector:'Consumer Staples',subindustry:'Packaged Foods & Meats',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MXIM',name:'Maxim Integrated Products Inc',sector:'Information Technology',subindustry:'Semiconductors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MCD',name:"McDonald's Corp.",sector:'Consumer Discretionary',subindustry:'Restaurants',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MCK',name:'McKesson Corp.',sector:'Health Care',subindustry:'Health Care Distributors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MDT',name:'Medtronic plc',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MRK',name:'Merck & Co.',sector:'Health Care',subindustry:'Pharmaceuticals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MET',name:'MetLife Inc.',sector:'Financials',subindustry:'Life & Health Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MTD',name:'Mettler Toledo',sector:'Health Care',subindustry:'Life Sciences Tools & Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MGM',name:'MGM Resorts International',sector:'Consumer Discretionary',subindustry:'Casinos & Gaming',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MCHP',name:'Microchip Technology',sector:'Information Technology',subindustry:'Semiconductors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MU',name:'Micron Technology',sector:'Information Technology',subindustry:'Semiconductors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MSFT',name:'Microsoft Corp.',sector:'Information Technology',subindustry:'Systems Software',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MAA',name:'Mid-America Apartments',sector:'Real Estate',subindustry:'Residential REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MHK',name:'Mohawk Industries',sector:'Consumer Discretionary',subindustry:'Home Furnishings',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TAP',name:'Molson Coors Brewing Company',sector:'Consumer Staples',subindustry:'Brewers',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MDLZ',name:'Mondelez International',sector:'Consumer Staples',subindustry:'Packaged Foods & Meats',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MNST',name:'Monster Beverage',sector:'Consumer Staples',subindustry:'Soft Drinks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MCO',name:"Moody's Corp",sector:'Financials',subindustry:'Financial Exchanges & Data',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MS',name:'Morgan Stanley',sector:'Financials',subindustry:'Investment Banking & Brokerage',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MOS',name:'The Mosaic Company',sector:'Materials',subindustry:'Fertilizers & Agricultural Chemicals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MSI',name:'Motorola Solutions Inc.',sector:'Information Technology',subindustry:'Communications Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MSCI',name:'MSCI Inc',sector:'Financials',subindustry:'Financial Exchanges & Data',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'MYL',name:'Mylan N.V.',sector:'Health Care',subindustry:'Pharmaceuticals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NDAQ',name:'Nasdaq, Inc.',sector:'Financials',subindustry:'Financial Exchanges & Data',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NOV',name:'National Oilwell Varco Inc.',sector:'Energy',subindustry:'Oil & Gas Equipment & Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NTAP',name:'NetApp',sector:'Information Technology',subindustry:'Technology Hardware, Storage & Peripherals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NFLX',name:'Netflix Inc.',sector:'Communication Services',subindustry:'Movies & Entertainment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NWL',name:'Newell Brands',sector:'Consumer Discretionary',subindustry:'Housewares & Specialties',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NEM',name:'Newmont Goldcorp',sector:'Materials',subindustry:'Gold',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NWSA',name:'News Corp. Class A',sector:'Communication Services',subindustry:'Publishing',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NWS',name:'News Corp. Class B',sector:'Communication Services',subindustry:'Publishing',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NEE',name:'NextEra Energy',sector:'Utilities',subindustry:'Multi-Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NLSN',name:'Nielsen Holdings',sector:'Industrials',subindustry:'Research & Consulting Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NKE',name:'Nike',sector:'Consumer Discretionary',subindustry:'Apparel, Accessories & Luxury Goods',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NI',name:'NiSource Inc.',sector:'Utilities',subindustry:'Multi-Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NBL',name:'Noble Energy Inc',sector:'Energy',subindustry:'Oil & Gas Exploration & Production',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'JWN',name:'Nordstrom',sector:'Consumer Discretionary',subindustry:'Department Stores',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NSC',name:'Norfolk Southern Corp.',sector:'Industrials',subindustry:'Railroads',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NTRS',name:'Northern Trust Corp.',sector:'Financials',subindustry:'Asset Management & Custody Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NOC',name:'Northrop Grumman',sector:'Industrials',subindustry:'Aerospace & Defense',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NLOK',name:'NortonLifeLock',sector:'Information Technology',subindustry:'Application Software',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NCLH',name:'Norwegian Cruise Line Holdings',sector:'Consumer Discretionary',subindustry:'Hotels, Resorts & Cruise Lines',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NRG',name:'NRG Energy',sector:'Utilities',subindustry:'Independent Power Producers & Energy Traders',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NUE',name:'Nucor Corp.',sector:'Materials',subindustry:'Steel',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NVDA',name:'Nvidia Corporation',sector:'Information Technology',subindustry:'Semiconductors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NVR',name:'NVR Inc',sector:'Consumer Discretionary',subindustry:'Homebuilding',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ORLY',name:"O'Reilly Automotive",sector:'Consumer Discretionary',subindustry:'Specialty Stores',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'OXY',name:'Occidental Petroleum',sector:'Energy',subindustry:'Oil & Gas Exploration & Production',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ODFL',name:'Old Dominion Freight Line',sector:'Industrials',subindustry:'Trucking',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'OMC',name:'Omnicom Group',sector:'Communication Services',subindustry:'Advertising',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'OKE',name:'ONEOK',sector:'Energy',subindustry:'Oil & Gas Storage & Transportation',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ORCL',name:'Oracle Corp.',sector:'Information Technology',subindustry:'Application Software',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PCAR',name:'PACCAR Inc.',sector:'Industrials',subindustry:'Construction Machinery & Heavy Trucks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PKG',name:'Packaging Corporation of America',sector:'Materials',subindustry:'Paper Packaging',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PH',name:'Parker-Hannifin',sector:'Industrials',subindustry:'Industrial Machinery',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PAYX',name:'Paychex Inc.',sector:'Information Technology',subindustry:'Data Processing & Outsourced Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PYPL',name:'PayPal',sector:'Information Technology',subindustry:'Data Processing & Outsourced Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PNR',name:'Pentair plc',sector:'Industrials',subindustry:'Industrial Machinery',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PBCT',name:"People's United Financial",sector:'Financials',subindustry:'Thrifts & Mortgage Finance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PEP',name:'PepsiCo Inc.',sector:'Consumer Staples',subindustry:'Soft Drinks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PKI',name:'PerkinElmer',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PRGO',name:'Perrigo',sector:'Health Care',subindustry:'Pharmaceuticals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PFE',name:'Pfizer Inc.',sector:'Health Care',subindustry:'Pharmaceuticals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PM',name:'Philip Morris International',sector:'Consumer Staples',subindustry:'Tobacco',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PSX',name:'Phillips 66',sector:'Energy',subindustry:'Oil & Gas Refining & Marketing',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PNW',name:'Pinnacle West Capital',sector:'Utilities',subindustry:'Multi-Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PXD',name:'Pioneer Natural Resources',sector:'Energy',subindustry:'Oil & Gas Exploration & Production',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PNC',name:'PNC Financial Services',sector:'Financials',subindustry:'Regional Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PPG',name:'PPG Industries',sector:'Materials',subindustry:'Specialty Chemicals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PPL',name:'PPL Corp.',sector:'Utilities',subindustry:'Electric Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PFG',name:'Principal Financial Group',sector:'Financials',subindustry:'Life & Health Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PG',name:'Procter & Gamble',sector:'Consumer Staples',subindustry:'Personal Products',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PGR',name:'Progressive Corp.',sector:'Financials',subindustry:'Property & Casualty Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PLD',name:'Prologis',sector:'Real Estate',subindustry:'Industrial REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PRU',name:'Prudential Financial',sector:'Financials',subindustry:'Life & Health Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PEG',name:'Public Serv. Enterprise Inc.',sector:'Utilities',subindustry:'Electric Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PSA',name:'Public Storage',sector:'Real Estate',subindustry:'Specialized REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PHM',name:'Pulte Homes Inc.',sector:'Consumer Discretionary',subindustry:'Homebuilding',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PVH',name:'PVH Corp.',sector:'Consumer Discretionary',subindustry:'Apparel, Accessories & Luxury Goods',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'QRVO',name:'Qorvo',sector:'Information Technology',subindustry:'Semiconductors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'PWR',name:'Quanta Services Inc.',sector:'Industrials',subindustry:'Construction & Engineering',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'QCOM',name:'QUALCOMM Inc.',sector:'Information Technology',subindustry:'Semiconductors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DGX',name:'Quest Diagnostics',sector:'Health Care',subindustry:'Health Care Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'RL',name:'Ralph Lauren Corporation',sector:'Consumer Discretionary',subindustry:'Apparel, Accessories & Luxury Goods',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'RJF',name:'Raymond James Financial Inc.',sector:'Financials',subindustry:'Investment Banking & Brokerage',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'RTN',name:'Raytheon Co.',sector:'Industrials',subindustry:'Aerospace & Defense',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'O',name:'Realty Income Corporation',sector:'Real Estate',subindustry:'Retail REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'REG',name:'Regency Centers Corporation',sector:'Real Estate',subindustry:'Retail REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'REGN',name:'Regeneron Pharmaceuticals',sector:'Health Care',subindustry:'Biotechnology',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'RF',name:'Regions Financial Corp.',sector:'Financials',subindustry:'Regional Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'RSG',name:'Republic Services Inc',sector:'Industrials',subindustry:'Environmental & Facilities Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'RMD',name:'ResMed',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'RHI',name:'Robert Half International',sector:'Industrials',subindustry:'Human Resource & Employment Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ROK',name:'Rockwell Automation Inc.',sector:'Industrials',subindustry:'Electrical Components & Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ROL',name:'Rollins Inc.',sector:'Industrials',subindustry:'Environmental & Facilities Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ROP',name:'Roper Technologies',sector:'Industrials',subindustry:'Industrial Conglomerates',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ROST',name:'Ross Stores',sector:'Consumer Discretionary',subindustry:'Apparel Retail',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'RCL',name:'Royal Caribbean Cruises Ltd',sector:'Consumer Discretionary',subindustry:'Hotels, Resorts & Cruise Lines',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SPGI',name:'S&P Global, Inc.',sector:'Financials',subindustry:'Financial Exchanges & Data',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'CRM',name:'Salesforce.com',sector:'Information Technology',subindustry:'Application Software',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SBAC',name:'SBA Communications',sector:'Real Estate',subindustry:'Specialized REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SLB',name:'Schlumberger Ltd.',sector:'Energy',subindustry:'Oil & Gas Equipment & Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'STX',name:'Seagate Technology',sector:'Information Technology',subindustry:'Technology Hardware, Storage & Peripherals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SEE',name:'Sealed Air',sector:'Materials',subindustry:'Paper Packaging',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SRE',name:'Sempra Energy',sector:'Utilities',subindustry:'Multi-Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'NOW',name:'ServiceNow',sector:'Information Technology',subindustry:'Systems Software',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SHW',name:'Sherwin-Williams',sector:'Materials',subindustry:'Specialty Chemicals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SPG',name:'Simon Property Group Inc',sector:'Real Estate',subindustry:'Retail REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SWKS',name:'Skyworks Solutions',sector:'Information Technology',subindustry:'Semiconductors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SLG',name:'SL Green Realty',sector:'Real Estate',subindustry:'Office REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SNA',name:'Snap-on',sector:'Industrials',subindustry:'Industrial Machinery',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SO',name:'Southern Co.',sector:'Utilities',subindustry:'Electric Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'LUV',name:'Southwest Airlines',sector:'Industrials',subindustry:'Airlines',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SWK',name:'Stanley Black & Decker',sector:'Industrials',subindustry:'Industrial Machinery',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SBUX',name:'Starbucks Corp.',sector:'Consumer Discretionary',subindustry:'Restaurants',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'STT',name:'State Street Corp.',sector:'Financials',subindustry:'Asset Management & Custody Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SYK',name:'Stryker Corp.',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SIVB',name:'SVB Financial',sector:'Financials',subindustry:'Regional Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SYF',name:'Synchrony Financial',sector:'Financials',subindustry:'Consumer Finance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SNPS',name:'Synopsys Inc.',sector:'Information Technology',subindustry:'Application Software',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'SYY',name:'Sysco Corp.',sector:'Consumer Staples',subindustry:'Food Distributors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TMUS',name:'T-Mobile US',sector:'Communication Services',subindustry:'Wireless Telecommunication Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TROW',name:'T. Rowe Price Group',sector:'Financials',subindustry:'Asset Management & Custody Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TTWO',name:'Take-Two Interactive',sector:'Communication Services',subindustry:'Interactive Home Entertainment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TPR',name:'Tapestry, Inc.',sector:'Consumer Discretionary',subindustry:'Apparel, Accessories & Luxury Goods',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TGT',name:'Target Corp.',sector:'Consumer Discretionary',subindustry:'General Merchandise Stores',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TEL',name:'TE Connectivity Ltd.',sector:'Information Technology',subindustry:'Electronic Manufacturing Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'FTI',name:'TechnipFMC',sector:'Energy',subindustry:'Oil & Gas Equipment & Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TFX',name:'Teleflex',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TXN',name:'Texas Instruments',sector:'Information Technology',subindustry:'Semiconductors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TXT',name:'Textron Inc.',sector:'Industrials',subindustry:'Aerospace & Defense',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TMO',name:'Thermo Fisher Scientific',sector:'Health Care',subindustry:'Life Sciences Tools & Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TIF',name:'Tiffany & Co.',sector:'Consumer Discretionary',subindustry:'Apparel, Accessories & Luxury Goods',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TJX',name:'TJX Companies Inc.',sector:'Consumer Discretionary',subindustry:'Apparel Retail',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TSCO',name:'Tractor Supply Company',sector:'Consumer Discretionary',subindustry:'Specialty Stores',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TDG',name:'TransDigm Group',sector:'Industrials',subindustry:'Aerospace & Defense',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TRV',name:'The Travelers Companies Inc.',sector:'Financials',subindustry:'Property & Casualty Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TRIP',name:'TripAdvisor',sector:'Communication Services',subindustry:'Interactive Media & Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TFC',name:'Truist Financial',sector:'Financials',subindustry:'Regional Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TWTR',name:'Twitter, Inc.',sector:'Communication Services',subindustry:'Interactive Media & Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'TSN',name:'Tyson Foods',sector:'Consumer Staples',subindustry:'Packaged Foods & Meats',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'UDR',name:'UDR, Inc.',sector:'Real Estate',subindustry:'Residential REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ULTA',name:'Ulta Beauty',sector:'Consumer Discretionary',subindustry:'Specialty Stores',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'USB',name:'U.S. Bancorp',sector:'Financials',subindustry:'Diversified Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'UAA',name:'Under Armour Class A',sector:'Consumer Discretionary',subindustry:'Apparel, Accessories & Luxury Goods',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'UA',name:'Under Armour Class C',sector:'Consumer Discretionary',subindustry:'Apparel, Accessories & Luxury Goods',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'UNP',name:'Union Pacific Corp',sector:'Industrials',subindustry:'Railroads',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'UAL',name:'United Airlines Holdings',sector:'Industrials',subindustry:'Airlines',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'UNH',name:'United Health Group Inc.',sector:'Health Care',subindustry:'Managed Health Care',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'UPS',name:'United Parcel Service',sector:'Industrials',subindustry:'Air Freight & Logistics',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'URI',name:'United Rentals, Inc.',sector:'Industrials',subindustry:'Trading Companies & Distributors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'UTX',name:'United Technologies',sector:'Industrials',subindustry:'Aerospace & Defense',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'UHS',name:'Universal Health Services, Inc.',sector:'Health Care',subindustry:'Health Care Facilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'UNM',name:'Unum Group',sector:'Financials',subindustry:'Life & Health Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'VFC',name:'V.F. Corp.',sector:'Consumer Discretionary',subindustry:'Apparel, Accessories & Luxury Goods',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'VLO',name:'Valero Energy',sector:'Energy',subindustry:'Oil & Gas Refining & Marketing',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'VAR',name:'Varian Medical Systems',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'VTR',name:'Ventas Inc',sector:'Real Estate',subindustry:'Health Care REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'VRSN',name:'Verisign Inc.',sector:'Information Technology',subindustry:'Internet Services & Infrastructure',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'VRSK',name:'Verisk Analytics',sector:'Industrials',subindustry:'Research & Consulting Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'VZ',name:'Verizon Communications',sector:'Communication Services',subindustry:'Integrated Telecommunication Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'VRTX',name:'Vertex Pharmaceuticals Inc',sector:'Health Care',subindustry:'Biotechnology',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'VIAC',name:'ViacomCBS',sector:'Communication Services',subindustry:'Movies & Entertainment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'V',name:'Visa Inc.',sector:'Information Technology',subindustry:'Data Processing & Outsourced Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'VNO',name:'Vornado Realty Trust',sector:'Real Estate',subindustry:'Office REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'VMC',name:'Vulcan Materials',sector:'Materials',subindustry:'Construction Materials',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WRB',name:'W. R. Berkley Corporation',sector:'Financials',subindustry:'Property & Casualty Insurance',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WAB',name:'Wabtec Corporation',sector:'Industrials',subindustry:'Construction Machinery & Heavy Trucks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WMT',name:'Walmart',sector:'Consumer Staples',subindustry:'Hypermarkets & Super Centers',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WBA',name:'Walgreens Boots Alliance',sector:'Consumer Staples',subindustry:'Drug Retail',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'DIS',name:'The Walt Disney Company',sector:'Communication Services',subindustry:'Movies & Entertainment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WM',name:'Waste Management Inc.',sector:'Industrials',subindustry:'Environmental & Facilities Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WAT',name:'Waters Corporation',sector:'Health Care',subindustry:'Health Care Distributors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WEC',name:'Wec Energy Group Inc',sector:'Utilities',subindustry:'Electric Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WCG',name:'WellCare',sector:'Health Care',subindustry:'Managed Health Care',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WFC',name:'Wells Fargo',sector:'Financials',subindustry:'Diversified Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WELL',name:'Welltower Inc.',sector:'Real Estate',subindustry:'Health Care REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WDC',name:'Western Digital',sector:'Information Technology',subindustry:'Technology Hardware, Storage & Peripherals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WU',name:'Western Union Co',sector:'Information Technology',subindustry:'Data Processing & Outsourced Services',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WRK',name:'WestRock',sector:'Materials',subindustry:'Paper Packaging',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WY',name:'Weyerhaeuser',sector:'Real Estate',subindustry:'Specialized REITs',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WHR',name:'Whirlpool Corp.',sector:'Consumer Discretionary',subindustry:'Household Appliances',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WMB',name:'Williams Cos.',sector:'Energy',subindustry:'Oil & Gas Storage & Transportation',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WLTW',name:'Willis Towers Watson',sector:'Financials',subindustry:'Insurance Brokers',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'WYNN',name:'Wynn Resorts Ltd',sector:'Consumer Discretionary',subindustry:'Casinos & Gaming',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'XEL',name:'Xcel Energy Inc',sector:'Utilities',subindustry:'Multi-Utilities',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'XRX',name:'Xerox',sector:'Information Technology',subindustry:'Technology Hardware, Storage & Peripherals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'XLNX',name:'Xilinx',sector:'Information Technology',subindustry:'Semiconductors',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'XYL',name:'Xylem Inc.',sector:'Industrials',subindustry:'Industrial Machinery',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'YUM',name:'Yum! Brands Inc',sector:'Consumer Discretionary',subindustry:'Restaurants',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ZBH',name:'Zimmer Biomet Holdings',sector:'Health Care',subindustry:'Health Care Equipment',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ZION',name:'Zions Bancorp',sector:'Financials',subindustry:'Regional Banks',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
        // stock_list.push({tickler:'ZTS',name:'Zoetis',sector:'Health Care',subindustry:'Pharmaceuticals',dowj: false,sp500: true,nasdaq: false,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsix:0,momx:0,comp:0});
                        
        localStorage.setItem("LSstock_list",JSON.stringify(stock_list));
}  // end of function getStocks


//***************************************************************************************************/
// This function handles an error response from the ajax call.  Basically, it ignores the issue     /
// and lets the application deal with it later by evaluating the quality of its data set.           /
// it keeps making the subsequent call to another ajax call                                         /
//**************************************************************************************************/


function handles_APIerror(finrsp){

  // Getting data from local storage for use during the ajax call
  var current_stock=parseInt(localStorage.getItem("current_stock"));
  var tech_indicator=parseInt(localStorage.getItem("tech_indicator"));
  var nbr_stocks=parseInt(localStorage.getItem("nbr_stocks"));

  //  Gets data from API and saves it to memory
  if(tech_indicator===1){stock_list[current_stock].adx=0;}
  else if (tech_indicator===2){stock_list[current_stock].rsi=0;}
  else if (tech_indicator===3){stock_list[current_stock].srsi=0;}
  else if (tech_indicator===4){stock_list[current_stock].mom=0; }

  //  checks whether this response is the last call (tech_indicator=4 and it is the last stock)
  //  if so, saves the information to local storage

  if(tech_indicator===4&&current_stock>=nbr_stocks-1){ 
      localStorage.setItem("LSstock_list",JSON.stringify(stock_list));              // saving to local storage
      $("#api-call-progress").text("");                                             // Cleaning progress bar text
      localStorage.setItem("last_download",JSON.stringify(moment().format("L")));   //  Recording last download was today
      process_results();                                                            //  Process-display data
      return;
};

  // if not the end of the list, then keeps processing

if(tech_indicator===1){
         tech_indicator++;   // increases the tech indicator to keep track of which one is the current one
         APIquery=base_url+stock_list[current_stock].tickler+"/indicator/rsi?range=6m&token="+api_token;}
else if (tech_indicator===2){
        tech_indicator++;   // increases the tech indicator to keep track of which one is the current one
        APIquery=base_url+stock_list[current_stock].tickler+"/indicator/stochrsi?range=6m&token="+api_token;}
else if (tech_indicator===3){
        tech_indicator++;   // increases the tech indicator to keep track of which one is the current one
        APIquery=base_url+stock_list[current_stock].tickler+"/indicator/mom?range=6m&token="+api_token;}
else if (tech_indicator===4){
        tech_indicator=1;   // increases the tech indicator to keep track of which one is the current one
        current_stock++;    // Changes stock
        APIquery=base_url+stock_list[current_stock].tickler+"/indicator/adx?range=1m&token="+api_token;}

  // saves the changes to local storage for use for the ajax call back function that will be made next
  localStorage.setItem("current_stock",current_stock.toString());
  localStorage.setItem("tech_indicator",tech_indicator.toString());
          
  // Now that everything has been set, calls another ajax function
  $.ajax({url: APIquery,success: process_APIdata, error: handles_APIerror});

  //  Updating the progress bar
  var pct_comp=Math.round(100*current_stock/nbr_stocks);
  $("#api-call-progress").attr("style","width: "+pct_comp+"%");
  $("#api-call-progress").attr("aria-valuenow",pct_comp);
  $("#api-call-progress").text(stock_list[current_stock].tickler+" | "+pct_comp+"%");

}  // ends function handles_APIerror


//**********************************************************************************************/
// This function handles the response from the ajax call, and makes another asynchronous call   /
// it calls for this same function to handle the ajax call back, if successful                  /
//**********************************************************************************************/

function process_APIdata(finrsp){

  // Getting data from local storage for use during the ajax call
  var current_stock=parseInt(localStorage.getItem("current_stock"));
  var tech_indicator=parseInt(localStorage.getItem("tech_indicator"));
  var nbr_stocks=parseInt(localStorage.getItem("nbr_stocks"));

    //  checks there is a response (length of finrsp at least 1).  If no valid response, it returns

    if(finrsp.indicator.length>=1){ rsplng=finrsp.indicator[0].length;}
    else {return}               

    if(tech_indicator===1){stock_list[current_stock].adx=finrsp.indicator[0][rsplng-1];}
    else if (tech_indicator===2){stock_list[current_stock].rsi=finrsp.indicator[0][rsplng-1];}
    else if (tech_indicator===3){stock_list[current_stock].srsi=finrsp.indicator[0][rsplng-1];}
    else if (tech_indicator===4){stock_list[current_stock].mom=finrsp.indicator[0][rsplng-1]; }
  
    //  checks whether this response is the last call (tech_indicator=4 and it is the last stock)
    //  if so, saves the information to local storage

    if(tech_indicator===4&&current_stock>=nbr_stocks-1){ 
        localStorage.setItem("LSstock_list",JSON.stringify(stock_list));              // saving to local storage
        $("#api-call-progress").text("");                                             // Cleaning progress bar text
        localStorage.setItem("last_download",JSON.stringify(moment().format("L")));   //  Recording last download was today
        process_results();                                                            //  Process-display data
        return;
    };

    // if not the end of the list, then keeps processing
  
    if(tech_indicator===1){
      tech_indicator++;   // increases the tech indicator to keep track of which one is the current one
      APIquery=base_url+stock_list[current_stock].tickler+"/indicator/rsi?range=6m&token="+api_token;}
else if (tech_indicator===2){
     tech_indicator++;   // increases the tech indicator to keep track of which one is the current one
     APIquery=base_url+stock_list[current_stock].tickler+"/indicator/stochrsi?range=6m&token="+api_token;}
else if (tech_indicator===3){
     tech_indicator++;   // increases the tech indicator to keep track of which one is the current one
     APIquery=base_url+stock_list[current_stock].tickler+"/indicator/mom?range=6m&token="+api_token;}
else if (tech_indicator===4){
     tech_indicator=1;   // increases the tech indicator to keep track of which one is the current one
     current_stock++;    // Changes stock
     APIquery=base_url+stock_list[current_stock].tickler+"/indicator/adx?range=1m&token="+api_token;}

     // saves the changes to local storage for use for the ajax call back function that will be made next
     localStorage.setItem("current_stock",current_stock.toString());
     localStorage.setItem("tech_indicator",tech_indicator.toString());

    // Now that everything has been set, calls another ajax function
    $.ajax({url: APIquery,success: process_APIdata, error: handles_APIerror});

    //  Updating the progress bar
    var pct_comp=Math.round(100*current_stock/nbr_stocks);
    $("#api-call-progress").attr("style","width: "+pct_comp+"%");
    $("#api-call-progress").attr("aria-valuenow",pct_comp);
    $("#api-call-progress").text(stock_list[current_stock].tickler+" | "+pct_comp+"%");


}  // ends function process_APIdata


//***************************************************************** */
// Main program functionality 
//***************************************************************** */


var stock_list=[];             // global variable, array that contains stock data
var base_url="https://sandbox.iexapis.com/stable/stock/";  // Live data versus sandbox
var api_token="Tsk_c7a9b5b07a7d4570afb668eccf02054b";      // token
var APIquery="";
getStocks();                   // loading the stocks that will be analyzed

var nbr_stocks=stock_list.length;  
var tech_indicator=1;          // which indicator is being retrieved
var current_stock=0;           // which stock is being called for
var rsplng=0;                  // length of the responding variable

// current_stock=500;
localStorage.setItem("current_stock",current_stock.toString());
localStorage.setItem("tech_indicator",tech_indicator.toString());
localStorage.setItem("nbr_stocks",nbr_stocks.toString());

// Gets when the last call was made.  If today, then doesn't call the API anymore.  If different from today, then it does
// makes first ajax call.  Once the first API returns results, the callback function will make
// another ajac call, and so forth until all stocks are covered.  The last ajax call, will then
// call another function that will score the results and sort them

var last_download=JSON.parse(localStorage.getItem("last_download"));

if(last_download!==moment().format("L")){
  $("#progress-bar-cont").show();  // Enables display of the progress bar
  APIquery=base_url+stock_list[current_stock].tickler+"/indicator/adx?range=1m&token="+api_token;  // Preparing first query
  $.ajax({url: APIquery,success: process_APIdata, error: handles_APIerror});}
else {process_results()}

// assign properties to buttons and other objects in page 

$("#back").attr("onclick","window.location.href='trading-main.html'");            // On click to "back button" goes back to trading main
// $(document).on("click",".select-checkbox",stock_clicked);                         // selects stock
$("#zoom-in-stock").attr("onclick","window.location.href='details.html'");   // provides a closer look at the stock
