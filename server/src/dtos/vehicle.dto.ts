// dtos/vehicle.dto.ts
import { IsOptional, IsString, Matches, Length } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @Matches(/^R[A-Z]{2}\d{3}[A-Z]$/, { message: 'Plate number must follow Rwandan format (e.g., RAA123A)' })
  platenumber!: string;

  @IsString()
  @Length(1, 255)
  model!: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  color?: string;
}

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  @Matches(/^R[A-Z]{2}\d{3}[A-Z]$/, { message: 'Plate number must follow Rwandan format (e.g., RAA123A)' })
  platenumber?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  model?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  color?: string;
}
