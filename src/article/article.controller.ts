import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('article')
@ApiTags('Articles')
@UseGuards(JwtGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiResponse({ type: ArticleEntity })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.remove(+id);
  }
}
