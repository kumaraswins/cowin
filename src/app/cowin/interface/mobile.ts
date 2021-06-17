export interface Otp {
  mobile: string;
  secret: string;
}
export interface ValidateOtp {
  otp: string;
  txnId: string;
}
