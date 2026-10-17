import { Module } from '@nestjs/common';
import { EnquiriesController } from './enquiries.controller';
import { EnquiriesService } from './enquiries.service';
import { EnquiriesRepository } from './repositories/enquiries.repository';
import { EnquiryEmailService } from './enquiry-email.service';
import { CustomersModule } from '../customers/customers.module';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

@Module({
  imports: [CustomersModule],
  controllers: [EnquiriesController, LeadsController],
  providers: [EnquiriesService, EnquiriesRepository, EnquiryEmailService, LeadsService],
  exports: [EnquiriesService, EnquiriesRepository]
})
export class EnquiriesModule {}
