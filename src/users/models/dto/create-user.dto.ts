import {
  IsString,
  IsInt,
  IsEmail,
  MinLength,
  MaxLength,
  IsMobilePhone,
  IsDateString,
  Matches,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsInt({
    message: 'Id is not a integer',
  })
  @IsPositive({
    message: 'Id must be greater than 1',
  })
  readonly id?: number;

  @IsString({
    message: 'Name must be in string format',
  })
  @MinLength(2, {
    message:
      'Name is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(30, {
    message:
      'Name is too long. Maximum length is $constraint1 characters, but actual is $value',
  })
  readonly name?: string;

  @IsString()
  @MinLength(2, {
    message:
      'Surname is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(30, {
    message:
      'Surname is too long. Maximum length is $constraint1 characters, but actual is $value',
  })
  readonly surname?: string;

  @IsEmail(
    {},
    {
      message: 'Email format is incorrect',
    },
  )
  readonly email?: string;

  @IsOptional()
  @Matches(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/, {
    message: 'Bithday format is incorrect',
  })
  readonly birthdate?: string;

  @IsMobilePhone('any', {
    message: 'Phone number is in the wrong format.',
  })
  @MinLength(8, {
    message:
      'Phone number is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(15, {
    message:
      'Phone number is too long. Maximum length is $constraint1 characters, but actual is $value',
  })
  readonly phoneNumber?: string;

  @IsOptional()
  @IsDateString({
    message: 'Datetime format is incorrect',
    always: false,
  })
  readonly createdAt?: Date;

  @IsOptional()
  @IsDateString({
    message: 'Datetime format is incorrect',
    always: false,
  })
  readonly updatedAt?: Date;
}
