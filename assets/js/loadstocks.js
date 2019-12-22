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
        stock_list.push({tickler:'MMM',name:'3M Company',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AOS',name:'A.O. Smith Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ABT',name:'Abbott Laboratories',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ABBV',name:'AbbVie Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ACN',name:'Accenture plc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ATVI',name:'Activision Blizzard',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AYI',name:'Acuity Brands Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ADBE',name:'Adobe Systems Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AAP',name:'Advance Auto Parts',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AMD',name:'Advanced Micro Devices Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AES',name:'AES Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'AET',name:'Aetna Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AMG',name:'Affiliated Managers Group Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AFL',name:'AFLAC Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'A',name:'Agilent Technologies Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'APD',name:'Air Products & Chemicals Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ALK',name:'Alaska Air Group Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AKAM',name:'Akamai Technologies Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ALB',name:'Albemarle Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ARE',name:'Alexandria Real Estate Equities Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ALXN',name:'Alexion Pharmaceuticals',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ALGN',name:'Align Technology',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ALLE',name:'Allegion',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AGN',name:'Allergan, Plc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ADS',name:'Alliance Data Systems',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'LNT',name:'Alliant Energy Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ALL',name:'Allstate Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GOOGL',name:'Alphabet Inc Class A',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GOOG',name:'Alphabet Inc Class C',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MO',name:'Altria Group Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AMZN',name:'Amazon.com Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AEE',name:'Ameren Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AAL',name:'American Airlines Group',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AEP',name:'American Electric Power',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AXP',name:'American Express Co',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AIG',name:'American International Group, Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AMT',name:'American Tower Corp A',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AWK',name:'American Water Works Company Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AMP',name:'Ameriprise Financial',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ABC',name:'AmerisourceBergen Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AME',name:'AMETEK Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AMGN',name:'Amgen Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'APH',name:'Amphenol Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'APC',name:'Anadarko Petroleum Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ADI',name:'Analog Devices, Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'ANDV',name:'Andeavor',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ANSS',name:'ANSYS',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ANTM',name:'Anthem Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AON',name:'Aon plc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'APA',name:'Apache Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AIV',name:'Apartment Investment & Management',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AAPL',name:'Apple Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AMAT',name:'Applied Materials Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'APTV',name:'Aptiv Plc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ADM',name:'Archer-Daniels-Midland Co',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ARNC',name:'Arconic Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AJG',name:'Arthur J. Gallagher & Co.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AIZ',name:'Assurant Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'T',name:'AT&T Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ADSK',name:'Autodesk Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ADP',name:'Automatic Data Processing',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AZO',name:'AutoZone Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AVB',name:'AvalonBay Communities, Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AVY',name:'Avery Dennison Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BHGE',name:'Baker Hughes, a GE Company',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BLL',name:'Ball Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BAC',name:'Bank of America Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BAX',name:'Baxter International Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BBT',name:'BB&T Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BDX',name:'Becton Dickinson',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BRK.B',name:'Berkshire Hathaway',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BBY',name:'Best Buy Co. Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BIIB',name:'Biogen Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BLK',name:'BlackRock',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HRB',name:'Block H&R',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BA',name:'Boeing Company',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BKNG',name:'Booking Holdings Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BWA',name:'BorgWarner',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BXP',name:'Boston Properties',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BSX',name:'Boston Scientific',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BHF',name:'Brighthouse Financial Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BMY',name:'Bristol-Myers Squibb',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'AVGO',name:'Broadcom',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BF.B',name:'Brown-Forman Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CHRW',name:'C. H. Robinson Worldwide',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'CA',name:'CA, Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'COG',name:'Cabot Oil & Gas',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CDNS',name:'Cadence Design Systems',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CPB',name:'Campbell Soup',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'COF',name:'Capital One Financial',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CAH',name:'Cardinal Health Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'KMX',name:'Carmax Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CCL',name:'Carnival Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CAT',name:'Caterpillar Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CBOE',name:'Cboe Global Markets',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CBRE',name:'CBRE Group',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CBS',name:'CBS Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CELG',name:'Celgene Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CNC',name:'Centene Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CNP',name:'CenterPoint Energy',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CTL',name:'CenturyLink Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CERN',name:'Cerner',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CF',name:'CF Industries Holdings Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SCHW',name:'Charles Schwab Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CHTR',name:'Charter Communications',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CVX',name:'Chevron Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CMG',name:'Chipotle Mexican Grill',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CB',name:'Chubb Limited',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CHD',name:'Church & Dwight',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CI',name:'CIGNA Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'XEC',name:'Cimarex Energy',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CINF',name:'Cincinnati Financial',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CTAS',name:'Cintas Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CSCO',name:'Cisco Systems',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'C',name:'Citigroup Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CFG',name:'Citizens Financial Group',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CTXS',name:'Citrix Systems',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CME',name:'CME Group Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CMS',name:'CMS Energy',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'KO',name:'Coca-Cola Company (The)',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CTSH',name:'Cognizant Technology Solutions',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CL',name:'Colgate-Palmolive',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CMCSA',name:'Comcast Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CMA',name:'Comerica Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CAG',name:'Conagra Brands',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CXO',name:'Concho Resources',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'COP',name:'ConocoPhillips',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ED',name:'Consolidated Edison',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'STZ',name:'Constellation Brands',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GLW',name:'Corning Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'COST',name:'Costco Wholesale Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'COTY',name:'Coty, Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CCI',name:'Crown Castle International Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'CSRA',name:'CSRA Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CSX',name:'CSX Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CMI',name:'Cummins Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CVS',name:'CVS Health',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DHI',name:'D. R. Horton',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DHR',name:'Danaher Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DRI',name:'Darden Restaurants',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DVA',name:'DaVita Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DE',name:'Deere & Co.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DAL',name:'Delta Air Lines Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'XRAY',name:'Dentsply Sirona',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DVN',name:'Devon Energy Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DLR',name:'Digital Realty Trust Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DFS',name:'Discover Financial Services',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DISCA',name:'Discovery Inc. Class A',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DISCK',name:'Discovery Inc. Class C',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DISH',name:'Dish Network',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DG',name:'Dollar General',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DLTR',name:'Dollar Tree',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'D',name:'Dominion Energy',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DOV',name:'Dover Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DWDP',name:'DowDuPont',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'DPS',name:'Dr Pepper Snapple Group',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DTE',name:'DTE Energy Co.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DUK',name:'Duke Energy',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DRE',name:'Duke Realty Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DXC',name:'DXC Technology',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ETFC',name:'E*Trade',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EMN',name:'Eastman Chemical',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ETN',name:'Eaton Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EBAY',name:'eBay Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ECL',name:'Ecolab Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EIX',name:'Edison Intl',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EW',name:'Edwards Lifesciences',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EA',name:'Electronic Arts',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EMR',name:'Emerson Electric Company',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ETR',name:'Entergy Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'EVHC',name:'Envision Healthcare',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EOG',name:'EOG Resources',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EQT',name:'EQT Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EFX',name:'Equifax Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EQIX',name:'Equinix',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EQR',name:'Equity Residential',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ESS',name:'Essex Property Trust, Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EL',name:'Estee Lauder Cos.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'RE',name:'Everest Re Group Ltd.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ES',name:'Eversource Energy',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EXC',name:'Exelon Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EXPE',name:'Expedia Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EXPD',name:'Expeditors International',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'ESRX',name:'Express Scripts',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'EXR',name:'Extra Space Storage',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'XOM',name:'Exxon Mobil Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FFIV',name:'F5 Networks',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FB',name:'Facebook, Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FAST',name:'Fastenal Co',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FRT',name:'Federal Realty Investment Trust',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FDX',name:'FedEx Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FIS',name:'Fidelity National Information Services',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FITB',name:'Fifth Third Bancorp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FE',name:'FirstEnergy Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FISV',name:'Fiserv Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FLIR',name:'FLIR Systems',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FLS',name:'Flowserve Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FLR',name:'Fluor Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FMC',name:'FMC Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FL',name:'Foot Locker Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'F',name:'Ford Motor',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FTV',name:'Fortive Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FBHS',name:'Fortune Brands Home & Security',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BEN',name:'Franklin Resources',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FCX',name:'Freeport-McMoRan Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GPS',name:'Gap Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GRMN',name:'Garmin Ltd.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'IT',name:'Gartner Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GD',name:'General Dynamics',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GE',name:'General Electric',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'GGP',name:'General Growth Properties Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GIS',name:'General Mills',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GM',name:'General Motors',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GPC',name:'Genuine Parts',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GILD',name:'Gilead Sciences',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GPN',name:'Global Payments Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GS',name:'Goldman Sachs Group',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GT',name:'Goodyear Tire & Rubber',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'GWW',name:'Grainger (W.W.) Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HAL',name:'Halliburton Co.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HBI',name:'Hanesbrands Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HOG',name:'Harley-Davidson',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HRS',name:'Harris Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HIG',name:'Hartford Financial Svc.Gp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HAS',name:'Hasbro Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HCA',name:'HCA Holdings',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HCP',name:'HCP Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HP',name:'Helmerich & Payne',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HSIC',name:'Henry Schein',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HES',name:'Hess Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HPE',name:'Hewlett Packard Enterprise',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HLT',name:'Hilton Worldwide Holdings Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HOLX',name:'Hologic',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HD',name:'Home Depot',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HON',name:'Honeywell Intl Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HRL',name:'Hormel Foods Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HST',name:'Host Hotels & Resorts',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HPQ',name:'HP Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HUM',name:'Humana Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HBAN',name:'Huntington Bancshares',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HII',name:'Huntington Ingalls Industries',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'IDXX',name:'IDEXX Laboratories',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'INFO',name:'IHS Markit Ltd.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ITW',name:'Illinois Tool Works',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ILMN',name:'Illumina Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'INCY',name:'Incyte',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'IR',name:'Ingersoll-Rand PLC',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'INTC',name:'Intel Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ICE',name:'Intercontinental Exchange',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'IBM',name:'International Business Machines',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'IP',name:'International Paper',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'IPG',name:'Interpublic Group',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'IFF',name:'Intl Flavors & Fragrances',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'INTU',name:'Intuit Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ISRG',name:'Intuitive Surgical Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'IVZ',name:'Invesco Ltd.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'IPGP',name:'IPG Photonics Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'IQV',name:'IQVIA Holdings Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'IRM',name:'Iron Mountain Incorporated',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'JBHT',name:'J. B. Hunt Transport Services',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'JEC',name:'Jacobs Engineering Group',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SJM',name:'JM Smucker',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'JNJ',name:'Johnson & Johnson',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'JCI',name:'Johnson Controls International',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'JPM',name:'JPMorgan Chase & Co.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'JNPR',name:'Juniper Networks',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'KSU',name:'Kansas City Southern',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'K',name:'Kellogg Co.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'KEY',name:'KeyCorp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'KMB',name:'Kimberly-Clark',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'KIM',name:'Kimco Realty',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'KMI',name:'Kinder Morgan',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'KLAC',name:'KLA-Tencor Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'KSS',name:'Kohls Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'KHC',name:'Kraft Heinz Co',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'KR',name:'Kroger Co.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'LB',name:'L Brands Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'LLL',name:'L-3 Communications Holdings',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'LH',name:'Laboratory Corp. of America Holding',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'LRCX',name:'Lam Research',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'LEG',name:'Leggett & Platt',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'LEN',name:'Lennar Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'LUK',name:'Leucadia National Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'LLY',name:'Lilly (Eli) & Co.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'LNC',name:'Lincoln National',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'LKQ',name:'LKQ Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'LMT',name:'Lockheed Martin Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'L',name:'Loews Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'LOW',name:'Lowes Cos.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'LYB',name:'LyondellBasell',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MTB',name:'M&T Bank Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MAC',name:'Macerich',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'M',name:'Macys Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MRO',name:'Marathon Oil Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MPC',name:'Marathon Petroleum',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MAR',name:'Marriott Intl.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MMC',name:'Marsh & McLennan',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MLM',name:'Martin Marietta Materials',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MAS',name:'Masco Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MA',name:'Mastercard Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MAT',name:'Mattel Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MKC',name:'McCormick & Co.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MCD',name:'McDonalds Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MCK',name:'McKesson Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MDT',name:'Medtronic plc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MRK',name:'Merck & Co.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MET',name:'MetLife Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MTD',name:'Mettler Toledo',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MGM',name:'MGM Resorts International',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        // stock_list.push({tickler:'KORS',name:'Michael Kors Holdings',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MCHP',name:'Microchip Technology',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MU',name:'Micron Technology',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MSFT',name:'Microsoft Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MAA',name:'Mid-America Apartments',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MHK',name:'Mohawk Industries',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TAP',name:'Molson Coors Brewing Company',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MDLZ',name:'Mondelez International',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'MON',name:'Monsanto Co.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MNST',name:'Monster Beverage',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MCO',name:'Moodys Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MS',name:'Morgan Stanley',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MSI',name:'Motorola Solutions Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MYL',name:'Mylan N.V.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NDAQ',name:'Nasdaq, Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NOV',name:'National Oilwell Varco Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NAVI',name:'Navient',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NKTR',name:'Nektar Therapeutics',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NTAP',name:'NetApp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NFLX',name:'Netflix Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NWL',name:'Newell Brands',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        // stock_list.push({tickler:'NFX',name:'Newfield Exploration Co',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NEM',name:'Newmont Mining Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NWSA',name:'News Corp. Class A',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NWS',name:'News Corp. Class B',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NEE',name:'NextEra Energy',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NLSN',name:'Nielsen Holdings',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NKE',name:'Nike',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NI',name:'NiSource Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NBL',name:'Noble Energy Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'JWN',name:'Nordstrom',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NSC',name:'Norfolk Southern Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NTRS',name:'Northern Trust Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NOC',name:'Northrop Grumman Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NCLH',name:'Norwegian Cruise Line',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NRG',name:'NRG Energy',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NUE',name:'Nucor Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'NVDA',name:'Nvidia Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ORLY',name:'OReilly Automotive',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'OXY',name:'Occidental Petroleum',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'OMC',name:'Omnicom Group',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'OKE',name:'ONEOK',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ORCL',name:'Oracle Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PCAR',name:'PACCAR Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PKG',name:'Packaging Corporation of America',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PH',name:'Parker-Hannifin',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PAYX',name:'Paychex Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PYPL',name:'PayPal',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PNR',name:'Pentair Ltd.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PBCT',name:'People United Financial',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PEP',name:'PepsiCo Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PKI',name:'PerkinElmer',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PRGO',name:'Perrigo',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PFE',name:'Pfizer Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PCG',name:'PG&E Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PM',name:'Philip Morris International',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PSX',name:'Phillips 66',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PNW',name:'Pinnacle West Capital',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PXD',name:'Pioneer Natural Resources',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PNC',name:'PNC Financial Services',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'RL',name:'Polo Ralph Lauren Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PPG',name:'PPG Industries',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PPL',name:'PPL Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        // stock_list.push({tickler:'PX',name:'Praxair Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PFG',name:'Principal Financial Group',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PG',name:'Procter & Gamble',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PGR',name:'Progressive Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PLD',name:'Prologis',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PRU',name:'Prudential Financial',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PEG',name:'Public Serv. Enterprise Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PSA',name:'Public Storage',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PHM',name:'Pulte Homes Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PVH',name:'PVH Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'QRVO',name:'Qorvo',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'QCOM',name:'QUALCOMM Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'PWR',name:'Quanta Services Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DGX',name:'Quest Diagnostics',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'RRC',name:'Range Resources Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'RJF',name:'Raymond James Financial Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'RTN',name:'Raytheon Co.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'O',name:'Realty Income Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'RHT',name:'Red Hat Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'REG',name:'Regency Centers Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'REGN',name:'Regeneron',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'RF',name:'Regions Financial Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'RSG',name:'Republic Services Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'RMD',name:'ResMed',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'RHI',name:'Robert Half International',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ROK',name:'Rockwell Automation Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'COL',name:'Rockwell Collins',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ROP',name:'Roper Technologies',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ROST',name:'Ross Stores',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'RCL',name:'Royal Caribbean Cruises Ltd',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SPGI',name:'S&P Global, Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CRM',name:'Salesforce.com',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SBAC',name:'SBA Communications',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'SCG',name:'SCANA Corp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SLB',name:'Schlumberger Ltd.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'STX',name:'Seagate Technology',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SEE',name:'Sealed Air',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SRE',name:'Sempra Energy',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SHW',name:'Sherwin-Williams',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SPG',name:'Simon Property Group Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SWKS',name:'Skyworks Solutions',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SLG',name:'SL Green Realty',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SNA',name:'Snap-On Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SO',name:'Southern Co.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'LUV',name:'Southwest Airlines',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SWK',name:'Stanley Black & Decker',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SBUX',name:'Starbucks Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'STT',name:'State Street Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SRCL',name:'Stericycle Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SYK',name:'Stryker Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'STI',name:'SunTrust Banks',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SIVB',name:'SVB Financial',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SYMC',name:'Symantec Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SYF',name:'Synchrony Financial',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SNPS',name:'Synopsys Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'SYY',name:'Sysco Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TROW',name:'T. Rowe Price Group',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TTWO',name:'Take-Two Interactive',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TPR',name:'Tapestry, Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TGT',name:'Target Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TEL',name:'TE Connectivity Ltd.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FTI',name:'TechnipFMC',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TXN',name:'Texas Instruments',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TXT',name:'Textron Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'BK',name:'The Bank of New York Mellon Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'CLX',name:'The Clorox Company',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'COO',name:'The Cooper Companies',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'HSY',name:'The Hershey Company',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'MOS',name:'The Mosaic Company',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TRV',name:'The Travelers Companies Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'DIS',name:'The Walt Disney Company',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TMO',name:'Thermo Fisher Scientific',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TIF',name:'Tiffany & Co.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'TWX',name:'Time Warner Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TJX',name:'TJX Companies Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TMK',name:'Torchmark Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TSS',name:'Total System Services',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TSCO',name:'Tractor Supply Company',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TDG',name:'TransDigm Group',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TRIP',name:'TripAdvisor',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FOXA',name:'Twenty-First Century Fox Class A',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'FOX',name:'Twenty-First Century Fox Class B',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'TSN',name:'Tyson Foods',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'USB',name:'U.S. Bancorp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'UDR',name:'UDR Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ULTA',name:'Ulta Beauty',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'UAA',name:'Under Armour Class A',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'UA',name:'Under Armour Class C',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'UNP',name:'Union Pacific',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'UAL',name:'United Continental Holdings',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'UNH',name:'United Health Group Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'UPS',name:'United Parcel Service',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'URI',name:'United Rentals, Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'UTX',name:'United Technologies',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'UHS',name:'Universal Health Services, Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'UNM',name:'Unum Group',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'VFC',name:'V.F. Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'VLO',name:'Valero Energy',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'VAR',name:'Varian Medical Systems',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'VTR',name:'Ventas Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'VRSN',name:'Verisign Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'VRSK',name:'Verisk Analytics',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'VZ',name:'Verizon Communications',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'VRTX',name:'Vertex Pharmaceuticals Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'VIAB',name:'Viacom Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'V',name:'Visa Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'VNO',name:'Vornado Realty Trust',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'VMC',name:'Vulcan Materials',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WMT',name:'Wal-Mart Stores',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WBA',name:'Walgreens Boots Alliance',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WM',name:'Waste Management Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WAT',name:'Waters Corporation',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WEC',name:'Wec Energy Group Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WFC',name:'Wells Fargo',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WELL',name:'Welltower Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WDC',name:'Western Digital',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WU',name:'Western Union Co',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WRK',name:'WestRock Company',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WY',name:'Weyerhaeuser Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WHR',name:'Whirlpool Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WMB',name:'Williams Cos.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WLTW',name:'Willis Towers Watson',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'WYN',name:'Wyndham Worldwide',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'WYNN',name:'Wynn Resorts Ltd',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'XEL',name:'Xcel Energy Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'XRX',name:'Xerox Corp.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'XLNX',name:'Xilinx Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
      //   stock_list.push({tickler:'XL',name:'XL Capital',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'XYL',name:'Xylem Inc.',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'YUM',name:'Yum! Brands Inc',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ZBH',name:'Zimmer Biomet Holdings',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ZION',name:'Zions Bancorp',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});
        stock_list.push({tickler:'ZTS',name:'Zoetis',INDU: true,sp500: true,nasdaq: true,adx:0,rsi:0,srsi:0,mom:0,adxx:0,rsix:0,srsi:0,smom:0,comp:0});

        localStorage.setItem("LSstock_list",JSON.stringify(stock_list));
}  // end of function getStocks


//***************************************************************************************************/
// This function handles an error response from the ajax call.  Basically, it ignores the issue     /
// and lets the application deal with it later by evaluating the quality of its data set.           /
// it keeps making the subsequent call to another ajax call                                         /
//**************************************************************************************************/


function handles_error(finrsp){

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

  if(tech_indicator===4&&current_stock===nbr_stocks-1){ 
    localStorage.setItem("LSstock_list",JSON.stringify(stock_list));   // saving to local storage
    $("#api-call-progress").text("");  // Cleaning progress bar text
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
  $.ajax({url: APIquery,success: process_data, error: handles_error});

  //  Updating the progress bar
  var pct_comp=Math.round(100*current_stock/nbr_stocks);
  $("#api-call-progress").attr("style","width: "+pct_comp+"%");
  $("#api-call-progress").attr("aria-valuenow",pct_comp);
  $("#api-call-progress").text(stock_list[current_stock].tickler+" | "+pct_comp+"%");

}  // ends function handles_error


//**********************************************************************************************/
// This function handles the response from the ajax call, and makes another asynchronous call   /
// it calls for this same function to handle the ajax call back, if successful                  /
//**********************************************************************************************/

function process_data(finrsp){

  // Getting data from local storage for use during the ajax call
  var current_stock=parseInt(localStorage.getItem("current_stock"));
  var tech_indicator=parseInt(localStorage.getItem("tech_indicator"));
  var nbr_stocks=parseInt(localStorage.getItem("nbr_stocks"));

    //  checks there is a response (length of finrsp at least 1).  If no valid response, it returns
    // console.log(stock_list[current_stock].name)

    if(finrsp.indicator.length>=1){ rsplng=finrsp.indicator[0].length;}
    else {return}               

    if(tech_indicator===1){stock_list[current_stock].adx=finrsp.indicator[0][rsplng-1];}
    else if (tech_indicator===2){stock_list[current_stock].rsi=finrsp.indicator[0][rsplng-1];}
    else if (tech_indicator===3){stock_list[current_stock].srsi=finrsp.indicator[0][rsplng-1];}
    else if (tech_indicator===4){stock_list[current_stock].mom=finrsp.indicator[0][rsplng-1]; }
  
    //  checks whether this response is the last call (tech_indicator=4 and it is the last stock)
    //  if so, saves the information to local storage

    if(tech_indicator===4&&current_stock>=nbr_stocks-1){ 
        localStorage.setItem("LSstock_list",JSON.stringify(stock_list));   // saving to local storage
        $("#api-call-progress").text("");  // Cleaning progress bar text
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
    $.ajax({url: APIquery,success: process_data, error: handles_error});

    //  Updating the progress bar
    var pct_comp=Math.round(100*current_stock/nbr_stocks);
    $("#api-call-progress").attr("style","width: "+pct_comp+"%");
    $("#api-call-progress").attr("aria-valuenow",pct_comp);
    $("#api-call-progress").text(stock_list[current_stock].tickler+" | "+pct_comp+"%");


}  // ends function process data


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

localStorage.setItem("current_stock",current_stock.toString());
localStorage.setItem("tech_indicator",tech_indicator.toString());
localStorage.setItem("nbr_stocks",nbr_stocks.toString());


// makes first ajax call.  callback function keeps making subsequent calls
APIquery=base_url+stock_list[current_stock].tickler+"/indicator/adx?range=1m&token="+api_token;  // Preparing first query
$.ajax({url: APIquery,success: process_data, error: handles_error});
