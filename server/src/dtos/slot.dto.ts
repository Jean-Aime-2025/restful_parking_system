import { IsBoolean, IsOptional, IsString, Length, IsInt, IsNotEmpty } from 'class-validator';

export class CreateSlotDto {
  @IsString()
  @Length(1, 10)
  code: string;

  @IsOptional()
  @IsBoolean()
  occupied?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateSlotDto {
  @IsOptional()
  @IsString()
  @Length(1, 10)
  code?: string;

  @IsOptional()
  @IsBoolean()
  occupied?: boolean;

  @IsOptional()
  @IsInt()
  assignedUserId?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class AssignSlotDto {
  @IsInt()
  @IsNotEmpty()
  slotId: string;

  @IsInt()
  @IsNotEmpty()
  userId: string;
}