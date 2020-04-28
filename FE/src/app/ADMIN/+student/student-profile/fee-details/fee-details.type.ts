export interface InstallmentListType {
  installment_id: number;
  installment_name: string;
  installment_amount: number;
  fee_due_date: string;
}

export interface FeeDetailType {
  receipt_id: number;
  student_id: number;
  class_id: number;
  installment_id: number;
  fee_paid_amount: number;
  payment_mode: string;
  paid_on: string;
  class_name: string;
  installment_name: string;
}

export interface InstallmentWithFeeDetailTransform {
  installment_id: number;
  installment_name: string;
  installment_amount: number;
  fee_due_date: string;
  receipt_id: number;
  fee_paid_amount: number;
  payment_mode: string;
  remaining_amount: number;
  paid_on: string;
}
