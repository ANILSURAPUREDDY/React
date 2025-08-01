import { calculateInvestmentResults, formatter } from "../util/investment.js";

export default function Results({ userInput }) {
  const result = calculateInvestmentResults(userInput);
  const initialInvestment =
    result[0].valueEndOfYear - result[0].interest - result[0].annualInvestment;
  console.log(result);
  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Investment</th>
          <th>Investment Captial</th>
        </tr>
      </thead>
      <tbody>
        {result.map((yearData) => {
          const totalInvestment =
            yearData.valueEndOfYear -
            yearData.annualInvestment * yearData.year -
            initialInvestment;
          const totalAmountInvestment =
            yearData.valueEndOfYear - totalInvestment;
          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.valueEndOfYear)}</td>
              <td>{formatter.format(yearData.interest)}</td>
              <td>{formatter.format(totalInvestment)}</td>
              <td>{formatter.format(totalAmountInvestment)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
