import { Module } from '@nestjs/common';
import { EnquiriesController } from './enquiries.controller';
import { EnquiriesService } from './enquiries.service';
import { EnquiriesRepository } from './repositories/enquiries.repository';
import { EnquiryEmailService } from './enquiry-email.service';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [CustomersModule],
  controllers: [EnquiriesController],
  providers: [EnquiriesService, EnquiriesRepository, EnquiryEmailService],
  exports: [EnquiriesService, EnquiriesRepository]
})
export class EnquiriesModule {}
