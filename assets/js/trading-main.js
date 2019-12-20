function editStrategy(){
    var slected = $('#TradingStrategiesList').find('.selected');
    if(slected.length!==0){console.log(slected[0].sectionRowIndex)}
    else {console.log("none selected")}
}

function deleteStrategy(){
    alert("Delete a new strategy")
}

function runStrategy(){
    alert("Run a new strategy")
    // finding the strategy that was checked
    var slected = $('#TradingStrategiesList').find('.selected');
    if(slected.length!==0){console.log(slected[0].sectionRowIndex)}
    else {console.log("none selected")}

}


// Loading all available strategies into the table

var all_strategies=JSON.parse(localStorage.getItem("strategies"));

if(all_strategies!==null){
        for(var i=0;i<all_strategies.length;i++){
            var newstrat=$("<tr>");                                      // header
            var newchkbox=$("<td>");                                     // empty, please leave it for the checkbox
            var newname=$("<td>").text(all_strategies[i].name);             // strategy name
            var newdesc=$("<td>").text(all_strategies[i].desc);             // strategy description
            var created=$("<td>").text(all_strategies[i].date_created);     // Date created
            var edited=$("<td>").text(all_strategies[i].date_edited);       // Date last edited
            var used=$("<td>").text(all_strategies[i].date_used);           // Date last used
            newstrat.append(newchkbox);
            newstrat.append(newname);
            newstrat.append(newdesc);
            newstrat.append(created);
            newstrat.append(edited);
            newstrat.append(used);
            $("#trading-list").append(newstrat);
        }
}

// Assigning click events to all buttons
$("#addStrategy").attr("onclick","window.location.href='trading-main-add.html'");
$("#editStrategy").on("click",editStrategy);
$("#deleteStrategy").on("click",deleteStrategy);
$("#runStrategy").on("click",runStrategy);

//