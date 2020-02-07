$(document).ready(function() {
	// Get data from info page
	let getTransferData = getDataFromLocalStorage("dataTable");
	let getInfoData = getDataFromLocalStorage("infoData");
	let getCounter = getDataFromLocalStorage("counter");

	// Calculate tax data
	let taxData = calcData(getTransferData);
	taxData.push(calcSumRow(taxData));

	// Initialize tax datatable
	let $taxTable = $("#taxTable");
	$taxTable.bootstrapTable({
		data: taxData
	});

	// Update Summary
	$("#summary .card").append(
		"<div>Total employees: " + getCounter + "</div>"
	);
	$("#summary .card").append("<div>Month: " + getInfoData.time + "</div>");
	$("#summary .card").append("<div>Profit: " + getInfoData.profit + "</div>");

	// Switch back to info page
	$("#back").on("click", function() {
		$taxTable.bootstrapTable("destroy");
		localStorage.clear();
		window.location.href = "../../../index.html";
	});

	/** Function description:
	 *      Calculate data for one row of the table
	 *  Parameters:
	 *      + row: one row from table
	 *  Returns:
	 *      - Oject of row data
	 */
	function calcRowData(row) {
		const defaultInsuranceFee = 9000000;
		const bonusInsuranceFeePerPerson = 3600000;
		// Profit sheet data
		let profitPercent = Math.round((Number(getInfoData.profit) * 15) / 100);
		let totalBonusMoney = Number(row["6"]) * profitPercent;

		// Overtime sheet data
		let overtimeDays = (Number(row["5"]) / 8).toFixed(2);
		let averageSalaryPerDay = Math.round((Number(row["2"]) * 12) / 256);
		let bonusPerDay = row["6"] * Number(averageSalaryPerDay);
		let overtimeSalary = Math.round(
			(Number(bonusPerDay) + Number(averageSalaryPerDay)) *
				Number(overtimeDays)
		);

		// Tax sheet data
		let salary = Number(row["2"]);
		let realSalary = salary;
		let totalSum =
			Number(salary) +
			Number(totalBonusMoney) +
			Number(overtimeSalary) * 2;
		let insuranceFee = Math.round((Number(salary) * 10.5) / 100);
		let totalTaxPaymentAmount =
			Number(totalSum) -
			Number(overtimeSalary) -
			Number(insuranceFee) -
			Number(defaultInsuranceFee) -
			Number(row["7"]) * Number(bonusInsuranceFeePerPerson);
		let realTaxPaymentAmount = Math.round(
			(Number(totalTaxPaymentAmount) * 5) / 100
		);
		let data = {
			"1": row["A"],
			"2": row["B"],
			"3": row["1"],
			"4": totalSum,
			"5": realSalary,
			"6": totalBonusMoney,
			"7": overtimeSalary,
			"8": overtimeSalary,
			"9": insuranceFee,
			"10": row["7"],
			"11": totalTaxPaymentAmount,
			"12": realTaxPaymentAmount
		};
		return data;
	}

	/** Function description:
	 *      Calculate data for tax table
	 *  Parameters:
	 *      + table: table data
	 *  Returns:
	 *      - Array of objects of table data
	 */
	function calcData(table) {
		let data = [];
		table.forEach(element => {
			data.push(calcRowData(element));
		});
		return data;
	}

	/** Function description:
	 *      Calculate sum row data at the end of the table
	 *  Parameters:
	 *      + data: table data
	 *  Returns:
	 *      - Object of sum row data
	 */
	function calcSumRow(data) {
		let totalSum = 0;
		let realSalarySum = 0;
		let totalBonusMoneySum = 0;
		let overtimeSalarySum = 0;
		let insuranceFeeSum = 0;
		let totalTaxPaymentAmountSum = 0;
		let realTaxPaymentAmountSum = 0;

		data.forEach(element => {
			totalSum += Number(element["4"]);
			realSalarySum += Number(element["5"]);
			totalBonusMoneySum += Number(element["6"]);
			overtimeSalarySum += Number(element["7"]);
			insuranceFeeSum += Number(element["9"]);
			totalTaxPaymentAmountSum += Number(element["11"]);
			realTaxPaymentAmountSum += Number(element["12"]);
		});

		let sumRow = {
			"1": "",
			"2": "Sum",
			"3": "",
			"4": totalSum,
			"5": realSalarySum,
			"6": totalBonusMoneySum,
			"7": overtimeSalarySum,
			"8": overtimeSalarySum,
			"9": insuranceFeeSum,
			"10": "",
			"11": totalTaxPaymentAmountSum,
			"12": realTaxPaymentAmountSum
		};

		return sumRow;
	}
});
