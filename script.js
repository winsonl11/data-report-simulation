const CUSTOMER_COUNT = Math.floor(Math.random() * (10000 - 1000) + 1000);
var array;
var numberOfPplPlan;
function initialize() {
	var jsonData = {};
	var user = []
	var winson = []
	for (var i = 0; i < CUSTOMER_COUNT; i++) {
		var plan = generateCustomerPlan()
		var data = generateDataUsage()
		var pN = generatePhoneNumber()
		winson.push(pN)
		var data = {
			"phoneNumber": pN,
			"dataUsage": data,
			"plan": plan,
			"bill": genBill(plan, data)
		}
		user.push(data)
	}
	array = user
	getArray()
}
function getArray() {
	for (var i = 0; i < array.length; i++) {
		var table = document.getElementById("customerTable");
		var row = table.insertRow(1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);

		cell1.innerHTML = array[i]["phoneNumber"];
		cell2.innerHTML = array[i]["dataUsage"];
		cell3.innerHTML = array[i]["plan"];
		cell4.innerHTML = "$" + array[i]["bill"];

	}
  numberOfPplPlanGen()
}
function generatePhoneNumber() {
	a = Math.floor(Math.random() * (999 - 111) + 111);
	b = Math.floor(Math.random() * (999 - 111) + 111);
	c = Math.floor(Math.random() * (9999 - 1111) + 1111);	
	return "(" + a + ")" + "-" + b + "-" + c
}
function generateDataUsage() {
	return Math.floor(Math.random() * (40000 - 1) + 1);
}
function generateCustomerPlan() {
	arr = ["Basic", "Comprehensive", "Sucker"]
	var num = Math.floor(Math.random() * (3));
	return arr[num]
}
function genBill(plan, dataUsage) {
	var fee = 0
	if (plan == "Basic") {
		if (1000 - dataUsage < 0) {
			fee += (0.1 * (dataUsage - 1000))
		}
		fee += 19.99
	} else if (plan == "Comprehensive") {
		if (4000 - dataUsage < 0) {
			fee += (0.25 * (dataUsage - 4000))
		}
		fee += 24.99
	} else {
		fee += (0.02 * dataUsage);
		fee += 4.99;
	}
  	fee = Math.round(fee * 100) / 100
	return fee;
}

function numberOfPplPlanGen() {
	var p1 = 0
	var p2 = 0
	var p3 = 0
	var p1Price = 0
	var p2Price = 0
	var p3Price = 0

	for (var i = 0; i < array.length; i++) {
		if (array[i]["plan"] == "Sucker") {
			p3 += 1
			p3Price += array[i]["bill"]
		} 
		if (array[i]["plan"] == "Comprehensive") {
			p2 += 1
			p2Price += array[i]["bill"]
		} 
		if (array[i]["plan"] == "Basic") {
			p1 += 1
			p1Price += array[i]["bill"]
		} 

	}
	smallest = Math.min((p3Price / p3), (p2Price / p2), (p1Price / p1));
	biggest = Math.max((p3Price / p3), (p2Price / p2), (p1Price / p1));
	var thePlan;
	var thePlan2;
	var thePlanNumber;
	var thePlanNumber2;
	if (smallest == (p3Price / p3)) {
		thePlan = "Sucker"
		thePlanNumber = p3
	} else if (smallest == (p2Price / p2)) {
		thePlan = "Comprehensive"
		thePlanNumber = p2
	} else {
		thePlan = "Basic"
		thePlanNumber = p1
	}
	if (biggest == (p3Price / p3)) {
		thePlan2 = "Sucker"
		thePlanNumber2 = p3
	} else if (biggest == (p2Price / p2)) {
		thePlan2 = "Comprehensive"
		thePlanNumber2 = p2
	} else {
		thePlan2 = "Basic"
		thePlanNumber2 = p1
	}
  console.log(thePlan);
  console.log(thePlan2);
	//[# of ppl using plan1, # of ppl using plan2, # of ppl using plan3, Best Plan Price, Best Plan, Worst Plan Price, Worst Plan]
	var total = p1 + p2 + p3
  var usingBest = 0;
  var cheapestPlan = "";
  var overpayment = 0;
  var plan1Count = 0;
  var plan2Count = 0;
  var plan3Count = 0;
  var bestPercent = 0;
  for(var i = 0; i < total; i++)
  {
    if(array[i]["plan"] == "Basic") plan1Count ++;
    if(array[i]["plan"] == "Comprehensive") plan2Count ++;
    if(array[i]["plan"] == "Sucker") plan3Count ++;
    plan1Cost = 0;
    plan2Cost = 0;
    plan3Cost = 0;
    var dataUsage = array[i]["dataUsage"]
    var planNumber = array[i]["plan"];
		if (1000 - dataUsage < 0) {
			plan1Cost += (0.1 * (dataUsage - 1000))
		}
		plan1Cost += 19.99
		if (4000 - dataUsage < 0) {
			plan2Cost += (0.25 * (dataUsage - 4000))
		}
		plan2Cost += 24.99
		plan3Cost += (0.02 * dataUsage);
		plan3Cost += 4.99;
    var cheapest = Math.min(plan1Cost, plan2Cost, plan3Cost);
    if(cheapest == plan1Cost) cheapestPlan = "Basic";
    if(cheapest == plan2Cost) cheapestPlan = "Comprehensive";
    if(cheapest == plan3Cost) cheapestPlan = "Sucker";
    if(planNumber == cheapestPlan) usingBest++;
    if(planNumber != cheapestPlan)
    {
      overpayment += array[i]["bill"] - cheapest;
    }

  }

  bestPercent = usingBest/total;
  overpayment /= (total - usingBest);
  
  var el = document.querySelector(".card-main-second");
  var worstPercent = (100 - Math.round((bestPercent) * 10000) / 100)
  el.innerHTML = "Total Customers: " + total + "<br>" + "Using Best Plan: " + Math.round((bestPercent) * 10000) / 100 + "%" + "<br>" + "Customers Not Using Best Plan: " + Math.round((worstPercent) * 100) / 100 + "%" + "<br>" + "Average Overpayment: $" +  Math.round(overpayment * 100) / 100 + "<br>" + "Basic Plan Count: " + plan1Count + "<br>" + "Comprehensive Plan Count: " + plan2Count + "<br>" + "Sucker Plan Count: " + plan3Count +  "<br>" + "Best Plan for Company: " + thePlan + "<br>" + "Worst Plan for Company: " + thePlan2
  ;
}

function unlimitedReport()
{
  document.getElementById("card2").style.display = "flex";
  var unlimited = 0;
  for(var i = 0; i<CUSTOMER_COUNT; i++)
  {
    if(array[i]["bill"] > 49.99)
    {
      unlimited++;
    }
  }
  unlimited /= CUSTOMER_COUNT;
  console.log(Math.round((unlimited) * 10000) / 100);
  var el = document.querySelector(".card2-main2-second2");
  el.innerHTML = "The unlimited plan has a base price of $49.99 with no further charge on any usage." + "<br>" + "Percentage of Customers That Would Benefit From Unlimited Plan: " + Math.round((unlimited) * 10000) / 100 + "%"
}


