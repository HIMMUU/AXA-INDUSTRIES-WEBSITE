import { Transform, Type } from 'class-transformer';
import {
  Equals,
  IsBoolean,
  IsEmail,
  IsIn,
  IsISO8601,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator';

const INSTITUTION_TYPES = [
  'school',
  'college-or-university',
  'hospital-or-clinic',
  'bank',
  'corporate-office',
  'factory',
  'hostel',
  'other'
] as const;

const QUANTITY_BANDS = ['1', '2-5', '6-20', '20+'] as const;

const INDIAN_PHONE_PATTERN =
  /^(?:(?:\+?91[\s-]?)?[6-9]\d{9}|0?[1-9]\d{1,4}[-\s]?\d{6,8})$/;

export class LeadAttributionTouchDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  source?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  medium?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  campaign?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  content?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  term?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  gclid?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  wbraid?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  gbraid?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  landing_page?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  referrer?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  page_title?: string;

  @IsOptional()
  @IsISO8601()
  ts?: string;
}

export class LeadAttributionDto {
  @IsObject()
  @ValidateNested()
  @Type(() => LeadAttributionTouchDto)
  first_touch: LeadAttributionTouchDto;

  @IsObject()
  @ValidateNested()
  @Type(() => LeadAttributionTouchDto)
  last_touch: LeadAttributionTouchDto;

  @IsBoolean()
  consent: boolean;
}

export class CreateInstitutionalLeadDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  organisation: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Matches(INDIAN_PHONE_PATTERN, { message: 'Enter a valid Indian mobile or landline number' })
  phone: string;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail()
  @MaxLength(254)
  email?: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  city: string;

  @IsIn(INSTITUTION_TYPES)
  institution_type: (typeof INSTITUTION_TYPES)[number];

  @IsIn(QUANTITY_BANDS)
  quantity: (typeof QUANTITY_BANDS)[number];

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  message?: string;

  @Equals(true)
  consent: boolean;

  @IsString()
  @MaxLength(500)
  company_url: string;

  @IsNumber()
  @Min(0)
  form_started_at: number;

  @IsObject()
  @ValidateNested()
  @Type(() => LeadAttributionDto)
  attribution: LeadAttributionDto;
}
