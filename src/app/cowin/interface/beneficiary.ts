export interface Appointment {
  appointment_id: string;
  center_id: number;
  name: string;
  state_name: string;
  district_name: string;
  block_name: string;
  from: string;
  to: string;
  dose: number;
  session_id: string;
  date: string;
  slot: string;
}

export interface Beneficiary {
  beneficiary_reference_id: string;
  name: string;
  birth_year: string;
  gender: string;
  mobile_number: string;
  photo_id_type: string;
  photo_id_number: string;
  comorbidity_ind: string;
  vaccination_status: string;
  vaccine: string;
  dose1_date: string;
  dose2_date: string;
  appointments: Appointment[];
}

export interface Registered {
  beneficiaries: Beneficiary[];
}
