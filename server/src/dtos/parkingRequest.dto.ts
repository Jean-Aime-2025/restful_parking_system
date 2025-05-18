import { IsNotEmpty, IsString, IsDateString, IsUUID } from 'class-validator';

export class CreateParkingRequestDto {
  @IsNotEmpty()
  @IsUUID()
  vehicleId: string;

  @IsNotEmpty()
  @IsDateString()
  startTime: string;

  @IsNotEmpty()
  @IsDateString()
  endTime: string;

  @IsString()
  notes?: string;
}
