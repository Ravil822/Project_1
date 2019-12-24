//***************************************************************************************/
//  The following function calls the code so that the selected strategy can be edited
//***************************************************************************************/

function editStrategy() {
    // finding the strategy that was checked

    var slected = $('#TradingStrategiesList').find('.selected');
    var edit = {
        name: slected[0].cells[1].textContent,
        description: slected[0].cells[2].textContent
    }

    if (slected.length !== 0) {  // Which strategy was originally selected

        console.log(edit)

        localStorage.setItem("edit-strategy", JSON.stringify(edit));

        window.location = "trading-main-edit.html";

    };
    // else {  // No strategy selected, returns
    //     // Sending message
    //     $.confirm({
    //         icon: 'fa fa-warning',
    //         title: 'Data needed',
    //         content: 'Please select a strategy so that I know which one you would like to edit.',
    //         type: 'red',
    //         typeAnimated: true,
    //         buttons: { tryAgain: { text: 'Start over', btnClass: 'btn-red', action: function () { } } }
    //     });  // jquery confirm           }
    //     //***************************************************************************************/
    //     //  The following function calls the code so that the selected strategy can be deleted
    //     //***************************************************************************************/
}
function deleteStrategy() {
    var slected = $('#TradingStrategiesList').find('.selected');  // Which row was selected?
    var strategy_to_delete = slected[0].cells[1].textContent;  // Selects strategy name

    $.confirm({
        title: 'Delete strategy ' + strategy_to_delete + '?',
        content: 'Once you delete strategy ' + strategy_to_delete + ', it cannot be recovered.  Are you sure you want to continue?',
        type: 'red',
        buttons: {

            delete: {
                text: 'Delete strategy', btnClass: 'btn-red',
                action: function () {

                    // Deleting the strategy
                    var new_strategies = [];
                    var old_strategies = JSON.parse(localStorage.getItem("strategies"));  // gets all strategies
                    for (var i = 0; i < old_strategies.length; i++) {
                        if (old_strategies[i].name !== strategy_to_delete) { new_strategies.push(old_strategies[i]) }
                    }
                    all_strategies = new_strategies;   // updating the global variable that has all of the strategies
                    localStorage.setItem("strategies", JSON.stringify(all_strategies));   // Updating local storage

                    // eliminating the strategy from the current table
                    $("#" + strategy_to_delete).remove();

                    // because the selected strategy has been deleted, there is no selected strategy
                    // therefore, disables buttons

                    $("#runStrategy").attr("disabled", true);
                    $("#run-str-fnt").attr("class", "fas fa-fighter-jet mt-0")
                    $("#editStrategy").attr("disabled", true);
                    $("#edt-str-fnt").attr("class", "fas fa-pencil-alt mt-0")
                    $("#deleteStrategy").attr("disabled", true);
                    $("#dlt-str-fnt").attr("class", "far fa-trash-alt mt-0")

                }
            },

            goback: {
                text: 'Keep it',
                btnClass: 'btn-blue',
                action: function () {
                }
            }
        }
    });

}

function runStrategy() {
    // finding the strategy that was checked
    var slected = $('#TradingStrategiesList').find('.selected');
    if (slected.length !== 0) {  // Which strategy was originally selected

        $.alert({
            title: 'Alert!',
            content: 'nothing here for now.  Will make IEX API calls!',
        });

    }
    else {  // No strategy selected, returns

        // Sending message
        $.confirm({
            icon: 'fa fa-warning',
            title: 'Data needed',
            content: 'Please select a strategy so that I know how you want to analyze stocks.',
            type: 'red',
            typeAnimated: true,
            buttons: { tryAgain: { text: 'Start over', btnClass: 'btn-red', action: function () { } } }
        });  // jquery confirm

        // exits the routine without doing anything
        return;

    } // else

}  // end of function runStrategy()

//*******************************************************************************/
//  The following code checks if a selection has been made.  If it does, it
//  enables the edit strategy, delete strategy, and run strategy buttons 
//*******************************************************************************/

function check_selection() {

    console.log("here")

    var slected = $('#TradingStrategiesList').find('.selected');
    console.log(slected.length)
    if (slected.length !== 0) {  // Which strategy was originally selected

        $("#editStrategy").prop("disabled", false)
    }
}

//*******************************************************************************/
// Main functionality.  The following code will be run automatically 
//*******************************************************************************/

var all_strategies = JSON.parse(localStorage.getItem("strategies"));

if (all_strategies !== null) {
    for (var i = 0; i < all_strategies.length; i++) {
        var newstrat = $("<tr>").attr("id", all_strategies[i].name);       // header.  ID=Strat name for identification later on
        var newchkbox = $("<td>");                                        // empty, please leave it for the checkbox
        var newname = $("<td>").text(all_strategies[i].name);             // strategy name
        var newdesc = $("<td>").text(all_strategies[i].desc);             // strategy description
        var created = $("<td>").text(all_strategies[i].date_created);     // Date created
        var edited = $("<td>").text(all_strategies[i].date_edited);       // Date last edited
        var used = $("<td>").text(all_strategies[i].date_used);           // Date last used
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
$("#addStrategy").attr("onclick", "window.location.href='trading-main-add.html'");
// $("#editStrategy").attr("onclick","window.location.href='trading-main-edit.html'");
$("#editStrategy").on("click", editStrategy);
$("#deleteStrategy").on("click", deleteStrategy);
$("#runStrategy").on("click", runStrategy);


// When strategy is selected, then enable buttons
$(document).on("click", ".select-checkbox", function () {
    //  localStorage.setItem("strategies",JSON.stringify(edit_strategie));


    $("#runStrategy").attr("disabled", false);
    $("#run-str-fnt").attr("class", "fas fa-2x fa-fighter-jet mt-0")

    $("#editStrategy").attr("disabled", false);
    $("#edt-str-fnt").attr("class", "fas fa-2x fa-pencil-alt mt-0")

    $("#deleteStrategy").attr("disabled", false);
    $("#dlt-str-fnt").attr("class", "far fa-2x fa-trash-alt mt-0")

})

