export type OutputFormat = {
    is_end_user: boolean;
    author_id: number;
    plain_text: string;
  };

export type TicketBody = {
    ticket_info: {
      subdomain: string;
      brand_subdomain: string;
      ticket_id: number;
      description: string;
    };
    comments: OutputFormat[];
  }
  