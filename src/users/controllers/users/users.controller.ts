import { UsersService } from './../../services/users/users.service';
import { CreateUserDto } from './../../dtos/CreateUser.dto';
import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response, response } from 'express';
import { request } from 'http';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {

  }

  @Get()
  getUsers() {
    return this.userService.fetchUsers()
  }
  //// http://localhost:3001/users?sortDesc=true [GET]
  // getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean  ) {
  //   console.log(sortDesc);
    
  //   return [{ username: 'Anson', email: 'anson@anson.com' }];
  // }

  //// http://localhost:3001/users?sortBy=asc [GET]
  // getUsers(@Query('sortBy') sortBy: string) {
  //   console.log(sortBy);
  //   return [{ username: 'Anson', email: 'anson@anson.com' }];
  // }

  // getUsers() {
  //   return [{ username: 'Anson', email: 'anson@anson.com' }];
  // }

  @Post('create')
  //// http://localhost:3001/users/create [POST]
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    console.log(userData);
    return this.userService.createUser(userData); 
  }

  // createUser(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.body);
  //   response.send('Created');
  // }

  //// http://localhost:3001/users/12
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUserById(id); 
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return user;
  }

  //// http://localhost:3001/users/12/13
  // @Get(':id/:postId')
  // getUserById(@Param('id') id: string, @Param('postId') postId: string) {
  //   console.log(id);
  //   return { id, postId };
  // }

  //// http://localhost:3001/users/12
  // getUserById(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.params);
  //   response.send('');
  // }

  //// http://localhost:3001/posts
  @Get('posts')
  getUsersPosts() {
    return [
      { 
        username: 'Anson', 
        email: 'anson@anson.com', 
        posts: [
          {
            id: 1,
            title: 'Post 1',
          },
          {
            id: 2,
            title: 'Post 2',
          },
        ],
      },
    ];
  }

  //// http://localhost:3001/posts/comments
  @Get('posts/comments')
  getUsersPostsComments() {
    return [
      {
        id: 1,
        title: 'Post 1',
        comments: [],
      }
    ]
  }
}
