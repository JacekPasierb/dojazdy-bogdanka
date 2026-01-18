export type OfferType = "offer" | "need";

export type Offer = {
  id?: string;
  _id?: string;
  type: OfferType;
  from: string;
  to: string;
  date: string;
  time: string;
  rideAt?: string;
  seats?: number;
  contact: string;
  note?: string;
  createdAt?: string;
};

// export const DEMO_OFFERS: Offer[] = [
//   { id: "1", type: "offer", from: "Łęczna", to: "Bogdanka", when: "Dziś", time: "07:00", seats: 2, contact: "tel: 5xx xxx xxx", note: "Wyjazd spod rynku." },
//   { id: "2", type: "need", from: "Puchaczów", to: "Bogdanka", when: "Jutro", time: "05:30", contact: "Messenger", note: "Zmiana poranna." },
//   { id: "3", type: "offer", from: "Cyców", to: "Bogdanka", when: "Dziś", time: "13:30", seats: 1, contact: "tel: 6xx xxx xxx" },
// ];
