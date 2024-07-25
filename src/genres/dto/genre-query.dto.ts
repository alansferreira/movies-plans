import { PagableQueryDto } from 'src/utils/dto/pageable-query.dto';

export interface GenreQueryDto extends PagableQueryDto {
  name: string;
}
