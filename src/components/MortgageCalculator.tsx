import React, { useState } from 'react';
import { Calculator, Euro, Percent, HelpCircle, ShieldCheck } from 'lucide-react';

interface MortgageCalculatorProps {
  propertyPrice: number;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ propertyPrice }) => {
  const [price, setPrice] = useState(propertyPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(3.2);
  const [years, setYears] = useState(25);

  const downPaymentAmount = (price * downPaymentPercent) / 100;
  const loanAmount = price - downPaymentAmount;

  // Spanish acquisition taxes & notary fees (~12% on Costa Blanca: 10% ITP/VAT + 1.5% Notary/Registry + 1% Legal)
  const transferTax = price * 0.10;
  const notaryAndRegistry = price * 0.015;
  const legalFees = price * 0.01;
  const totalPurchaseCosts = transferTax + notaryAndRegistry + legalFees;
  const totalCashNeeded = downPaymentAmount + totalPurchaseCosts;

  // Monthly mortgage calculation formula: M = P * [r(1+r)^n] / [(1+r)^n – 1]
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = years * 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : loanAmount / numberOfPayments;

  return (
    <div className="bg-white rounded-2xl border border-[#E7DDCF] p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-[#E7DDCF] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#2C6E49]/10 text-[#2C6E49]">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-[#1D1B16]">
              Mortgage & Purchase Tax Estimator
            </h4>
            <p className="text-xs text-[#7D7564]">
              Calculate monthly payments and Costa Blanca Spanish tax overheads (10% ITP/VAT)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
              Property Value (€)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              step="10000"
              className="w-full px-3 py-2 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-sm font-semibold text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span>€{Math.round(downPaymentAmount).toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#2C6E49] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="10"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                Loan Term (Years)
              </label>
              <select
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FCF9F3] border border-[#E7DDCF] rounded-lg text-sm text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
              >
                <option value="15">15 Years</option>
                <option value="20">20 Years</option>
                <option value="25">25 Years</option>
                <option value="30">30 Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Breakdown */}
        <div className="bg-[#FCF9F3] rounded-xl p-5 border border-[#E7DDCF] flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#7D7564] block">
              Estimated Monthly Mortgage
            </span>
            <span className="font-display text-3xl font-bold text-[#2C6E49]">
              €{Math.round(monthlyPayment).toLocaleString()}
              <span className="text-sm font-normal text-[#7D7564]"> / month</span>
            </span>
          </div>

          <div className="space-y-2 text-xs text-[#4B4539] border-t border-[#E7DDCF] pt-3">
            <div className="flex justify-between">
              <span>Mortgage Loan Amount:</span>
              <span className="font-semibold">€{Math.round(loanAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Spanish Transfer Tax (ITP 10%):</span>
              <span className="font-semibold">€{Math.round(transferTax).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Notary, Registry & Legal (~2.5%):</span>
              <span className="font-semibold">€{Math.round(notaryAndRegistry + legalFees).toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-[#E7DDCF] font-bold text-[#1D1B16]">
              <span>Total Initial Cash Required:</span>
              <span className="text-[#2C6E49]">€{Math.round(totalCashNeeded).toLocaleString()}</span>
            </div>
          </div>

          <div className="text-[11px] text-[#7D7564] flex items-center gap-1.5 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2C6E49]" />
            <span>World Housing Spain partners with Sabadell, CaixaBank & Santander</span>
          </div>
        </div>
      </div>
    </div>
  );
};
