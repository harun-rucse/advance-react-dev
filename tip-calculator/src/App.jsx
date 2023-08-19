import { useState } from "react";
import BillInput from "./components/bill-input";
import SelectPercentage from "./components/select-percentage";
import Output from "./components/output";
import Button from "./components/button";

export default function App() {
  const [bill, setBill] = useState(0);
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = (bill * (percentage1 + percentage2)) / 2 / 100;

  const handleReset = () => {
    setBill(0);
    setPercentage1(0);
    setPercentage2(0);
  };

  return (
    <div className="app">
      <BillInput value={bill} onSetBill={setBill} />
      <SelectPercentage percentage={percentage1} onSelect={setPercentage1} />
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2} />
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Button onReset={handleReset}>Reset Bill</Button>
        </>
      )}
    </div>
  );
}
