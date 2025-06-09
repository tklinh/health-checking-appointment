export interface Doctor {
  id: string
  name: string
  title: string
  department: string
  description: string
  image_src: string
}

export interface Appointment {
  id: string
  name: string
  address: string
  phone_number: string
  order_number: string
  selectted_doctor_id: string
  selected_doctor: string
  room_number: string
  date: string
  time: string
}
