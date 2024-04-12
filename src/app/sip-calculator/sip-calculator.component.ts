import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sip-calculator',
  templateUrl: './sip-calculator.component.html',
  styleUrls: ['./sip-calculator.component.css']
})
export class SipCalculatorComponent implements OnInit {

  investmentForm!: FormGroup;
  result!: {
    totalInvestment: number, totalReturn: number, amountGained: number
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.investmentForm = this.formBuilder.group({
      monthlyInvestment: ['', Validators.required],
      expectedReturn: ['', Validators.required],
      timePeriod: ['', Validators.required]
    });

    console.log(Math.pow(2,2));
  
  }

  calculateSIP() {
    if(this.investmentForm.valid) {
      const monthlyInvestment = this.investmentForm.value.monthlyInvestment;
      const expectedReturn = this.investmentForm.value.expectedReturn;
      const timePeriod = this.investmentForm.value.timePeriod;

      const totalInvestment = monthlyInvestment * (timePeriod * 12);
      const totalReturn = monthlyInvestment * (((Math.pow((1+(expectedReturn/(12*100))),(timePeriod*12)))-1)/(expectedReturn/(12*100)));
      const amountGained = totalReturn - totalInvestment;
      this.result = {
        totalInvestment: totalInvestment,
        totalReturn: totalReturn,
        amountGained: amountGained
      }
    }
  }

}
