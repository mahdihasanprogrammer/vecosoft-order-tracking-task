export type ViewState =
  | "normal"
  | "delayed"
  | "delivered_not_received"
  | "tracking_not_available";

export type OrderStatus =
  | "In Transit"
  | "Shipment Delayed"
  | "Delivered Today"
  | "Processing Order";

export type BadgeVariant = "blue" | "amber" | "emerald" | "slate";

export type StepStatus = "completed" | "active" | "upcoming";

export type StepIconType =
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered";

export interface TimelineStep {
  id: string;
  stageName: "Processing" | "Shipped" | "Out for Delivery" | "Delivered";
  title: string;
  description: string;
  timestamp?: string;
  location?: string;
  status: StepStatus;
  iconType: StepIconType;
}

export interface OrderItem {
  id: string;
  name: string;
  variant: string;
  sku: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface NoticeBannerInfo {
  type: "warning" | "delay" | "info" | "delivered_warning";
  title: string;
  message: string;
  actionText?: string;
  actionType?: "claim" | "carrier_link" | "refresh";
}

export interface OrderDetails {
  stateKey: ViewState;
  orderId: string;
  placedDate: string;
  statusLabel: string;
  badgeVariant: BadgeVariant;
  etaDisplay: string;
  subEta: string;
  carrier: string;
  trackingNumber?: string;
  noticeBanner?: NoticeBannerInfo;
  timeline: TimelineStep[];
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: string;
  paymentMethod: string;
}
