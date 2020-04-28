import {
  InstallmentListType,
  FeeDetailType,
  InstallmentWithFeeDetailTransform,
} from "./fee-details.type";

export function feeTypeUpdate(
  installmentList: InstallmentListType[]
): InstallmentWithFeeDetailTransform[] {
  let installmentWithFeeDetails: InstallmentWithFeeDetailTransform[] = [];
  installmentList.filter((installment) => {
    let temp = {
      installment_id: installment.installment_id,
      installment_name: installment.installment_name,
      installment_amount: installment.installment_amount,
      fee_due_date: installment.fee_due_date,
      receipt_id: -1,
      fee_paid_amount: 0,
      payment_mode: "None",
      remaining_amount: installment.installment_amount,
      paid_on: "",
    };
    installmentWithFeeDetails.push(temp);
  });
  return installmentWithFeeDetails;
}

export function feeStatusUpdate(
  installmentWithFeeDetail: InstallmentWithFeeDetailTransform[],
  feeDetails: FeeDetailType[]
): InstallmentWithFeeDetailTransform[] {
  if (installmentWithFeeDetail.length) {
    installmentWithFeeDetail.filter((installment) => {
      if (feeDetails.length) {
        feeDetails.filter((fee) => {
          if (installment.installment_id === fee.installment_id) {
            installment.receipt_id = fee.receipt_id;
            installment.fee_paid_amount = fee.fee_paid_amount;
            installment.payment_mode = fee.payment_mode;
            installment.remaining_amount =
              installment.installment_amount - fee.fee_paid_amount;
            installment.paid_on = fee.paid_on;
          }
        });
      }
    });
  }
  return installmentWithFeeDetail;
}
