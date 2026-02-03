import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOkResponse({
    type: UserDto,
  })
  @ApiOperation({
    summary: 'Get information about the currently logged in user',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Request() req): Promise<UserDto> {
    return await this.usersService.getCurrentUser(req);
  }
}
