import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  customer_name: string;
  product_category: string;
  size: number;
  length: number;
  weight: number;
  purity: number;
  screw_type: string;
  rhodium_details: string;
  delivery_date: any;
  company_id: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  _count?: {};
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_name?: string;
  product_category?: string;
  screw_type?: string;
  rhodium_details?: string;
  company_id?: string;
}
