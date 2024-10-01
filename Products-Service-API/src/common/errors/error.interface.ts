export default interface ErrorTemplate {
  status?: number;
  code?: string;
  message?: string;
  details?: any;
  validation?: Array<any>;
}
