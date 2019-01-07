var sheetid = ""

function doGet(request) {
  if(request.parameter.operation == "start"){
    var values = new Array();
    var d = new Date();
    values[0] = d.getTime();
    values[1] = request.parameter.title;
    addLine(values);
  }
  
  if(request.parameter.operation == "finish"){
    endTask();
  }
  return  HtmlService.createHtmlOutput("ok");
}

function doPost(request) {
  if(request.parameter.operation == "start"){
    var values = new Array();
    var d = new Date();
    var jsonString = request.postData.getDataAsString();
    var jsonData = JSON.parse(jsonString);
    values[0] = d.getTime();
    values[1] = jsonData.title;
    addLine(values);
  }
  
  if(request.parameter.operation == "finish"){
    endTask();
  }
  return  HtmlService.createHtmlOutput("ok");
}

function addLine(values) {
  var sheet = SpreadsheetApp.openById(sheetid);
  sheet.appendRow(values); 
}

function endTask(){
  var sheet = SpreadsheetApp.openById(sheetid);
  var lastRowIndex = sheet.getLastRow();
  var d = new Date();
  sheet.getRange("C"+lastRowIndex).setValue(d.getTime());
  
}
